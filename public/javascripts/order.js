new Vue({
  el: '.app',
  data: {
    orders: [],
    opened: []
  },
  created() {
    axios.get('/rest/order/1').then(res => {
      this.orders = res.data.orders;
    }).catch(e => {
      sessionStorage.removeItem('user');
      location = '/';
    });
  },
  filters: {
    orderTime: function (value) {
      return moment(value).format('YYYY-MM-DD HH:mm:ss');
    }
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
