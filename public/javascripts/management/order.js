new Vue({
  el: '.app',
  data: {
    orders: [],
    opened: [],
    users: [],
    products: [],
    userId: '',
    productId: ''
  },
  created() {
    _cart.showCart();
    axios.get('/rest/product/2').then(res => {
      this.products = res.data.products;
    });
    axios.get('/rest/user/2').then(res => {
      this.users = res.data.users;
    });
    axios.get('/rest/order/1').then(res => {
      this.orders = res.data.orders;
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
    },
    checkIn(index) {
      let { id } = this.orders[index];
      axios.patch('/rest/order', {
        id,
        status: 'Y'
      }).then(res => {
        if (res.data.isOK) {
          this.orders[index].status = 'Y';
        }
      });
    },
    deleteOrder(index) {
      let { id } = this.orders[index];
      axios.delete('/rest/order', { data: { id } }).then(res => {
        this.orders.splice(index, 1);
      });
    },
    query() {
      let where = [];
      if (this.productId) {
        where.push(`productId=${this.productId}`);
      }
      if (this.userId) {
        where.push(`userId=${this.userId}`);
      }
      let condition = '';
      if (where.length > 0) {
        condition = '?' + _.join(where, '&');
      }
      axios.get(`/rest/order${condition}`).then(res => {
        this.orders = res.data.orders;
      });
    }
  }
});
