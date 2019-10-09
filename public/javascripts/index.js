import Axios from "axios";
import moment from "moment";

new Vue({
  el: '.app',
  data: {
    products: [],
    maintain: false
  },
  created() {
    Axios.get('/').then(res => {
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
    deleteCard: function (index) {
      this.products.splice(index, 1);
      // let {id} = this.products[index];
      // Axios.delete(`/product/${id}`).then(res => {
      //   console.log(res);
      //   this.products.slice(index, 1);
      //   $loading.hide();
      // });
    },
    viewDetail: function (index) {
      let { id } = this.products[index];
      location = `/product/${id}`;
    }
  }
});
