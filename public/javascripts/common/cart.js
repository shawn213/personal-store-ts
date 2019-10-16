window._cart = new Vue({
  el: '.cart',
  data: {
    items: [],
    isShow: false,
    show: true
  },
  created() {
    let value = window.sessionStorage.cart;
    if (value) {
      let carts = JSON.parse(value);
      this.items = carts;
    }
  },
  computed: {
    count: function () {
      return this.items.length;
    },
    isCheckout: function () {
      return this.items.length > 0;
    }
  },
  methods: {
    addItem: function (item) {
      this.items.push(item);
      window.sessionStorage.cart = JSON.stringify(this.items);
    },
    removeItem: function (index) {
      this.items.splice(index, 1);
      window.sessionStorage.cart = JSON.stringify(this.items);
      this.isShow = this.items.length > 0;
    },
    checkout: function () {
      location = '/checkout';
    },
    isShowList: function () {
      this.isShow = !this.isShow && this.items.length > 0;
    },
    showCart: function () {
      this.show = !this.show;
    }
  }
});
