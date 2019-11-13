new Vue({
  el: '.app',
  data: {
    orders: [],
    opened: []
  },
  created() {
    _cart.showCart();
    axios.get('/order/m').then(res => {
      this.orders = res.data.orders;
    });
  },
  methods: {
    toggle(id) {
      let index = this.opened.indexOf(id);
      if (index > -1) {
        this.opened.splice(index, 1);
      } else {
        this.opened.push(id);
      }
    }
  }
});
