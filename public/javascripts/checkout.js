new Vue({
  el: '.app',
  data: {
    products: []
  },
  created() {
    let cartStr = window.sessionStorage.cart;
    if (cartStr) {
      let cart = JSON.parse(cartStr);
      this.products = cart;
    } else {
      location = '/';
    }
    _cart.showCart();
  },
  computed: {
    sumAmount: function () {
      return _.sumBy(this.products, 'amount');
    },
    sumPrice: function () {
      return _.sumBy(this.products, 'price');
    }
  }
});
