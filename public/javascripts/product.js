import marked from 'marked';
import _ from 'lodash';
import Axios from 'axios';
import emoji from 'node-emoji';
import hljs from 'highlight.js';

import 'highlight.js/styles/vs.css';

new Vue({
  el: '.app',
  data: {
    product: {
      id: '',
      name: '',
      price: 0,
      types: [],
      link: '',
      startDate: '',
      endDate: '',
      images: [],
      content: ''
    },
    type: '',
    amount: 1
  },
  created() {
    $loading.show();
    let productId = location.pathname.split('/').pop();
    Axios.get(`/product/${productId}`).then(res => {
      let { product } = res.data;
      this.product = product;
    });
    $loading.hide();
  },
  mounted() {
    marked.setOptions({
      highlight: function (code) {
        return hljs.highlightAuto(code).value;
      }
    });
  },
  computed: {
    updateMd: function () {
      let replacer = (match) => emoji.emojify(match);
      let markdown = this.product.content;
      markdown = markdown.replace(/(:.*:)/g, replacer);
      return marked(markdown);
    }
  },
  filters: {
    commaFormat: function (value) {
      if (value) {
        let number = parseInt(value).toLocaleString('zh-TW', { style: 'currency', currency: 'TWD', minimumFractionDigits: 0 });
        return number;
      }
    },
  },
  validators: {
    type: function (value) {
      if (this.product.types.length > 0) {
        return this.$Validator.value(value).required().minLength(1);
      } else {
        return true;
      }
    },
    amount: function (value) {
      return this.$Validator.value(value).required().greaterThan(0);
    }
  },
  methods: {
    buyItem: async function () {
      let success = await this.$validate();
      if (success) {
        let { id, name, price, link } = this.product;
        let { type, amount } = this;
        price = parseInt(price);
        _cart.addItem({
          id, name, price, link, type, amount
        });
        _message.info(this.$t('__message.success', { action: this.$t('__message.addItem', { name: this.product.name }) }));
      }
    }
  }
});
