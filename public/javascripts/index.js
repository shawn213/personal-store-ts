import moment from "moment";

new Vue({
  el: '.app',
  data: {
    products: [],
    maintain: false
  },
  created() {
    axios.get('/').then(res => {
      this.products = res.data.products;
    });
    this.maintain = $navbar.auth > 0;
  },
  filters: {
    timeFormat: function (startDate, endDate) {
      return moment(startDate).format('YYYY-MM-DD') + ' ~ ' + moment(endDate).format('YYYY-MM-DD HH:mm');
    },
    commaFormat: function (value) {
      if (value) {
        return _changeCurrency(value);
      }
    }
  },
  methods: {
    updateCard: function (index) {
      let product = this.products[index];
      location = `/product/m/${product.id}`;
    },
    deleteCard: async function (index) {
      $loading.show();
      let { id } = this.products[index];
      let res = await axios.delete(`/product/${id}`);
      console.log(res);
      if (res.data.isOK) {
        this.products.splice(index, 1);
        _message.success('isOK');
      } else {
        _message.danger('is not OK');
      }
      $loading.hide();
    },
    viewDetail: function (index) {
      let { id } = this.products[index];
      location = `/product/${id}`;
    }
  }
});
