import marked from 'marked';
import _ from 'lodash';
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
      onSale: 0,
      types: [],
      link: '',
      startDate: '',
      endDate: '',
      images: [],
      content: ''
    },
    type: '',
    count: 1
  },
  created() {
    $loading.show();
    let productId = location.pathname.split('/').pop();
    axios.get(`/rest/product/i/${productId}`).then(res => {
      let { product } = res.data;
      this.product = product;
      this.type = this.product.types.length ? this.product.types[0].text : '';
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
  validators: {
    count: function (value) {
      return this.$Validator.value(value).required().greaterThan(0);
    }
  },
  methods: {
    buyItem: async function () {
      let success = await this.$validate();
      if (success) {
        let { id, name, price, link, onSale } = this.product;
        let { type, count } = this;
        price = parseInt(price);
        _cart.addItem({
          id, name, price, link, type, count, onSale
        });
        _message.info(this.$t('__message.success', { action: this.$t('__message.addItem', { name: this.product.name }) }));
      }
    }
  }
});
