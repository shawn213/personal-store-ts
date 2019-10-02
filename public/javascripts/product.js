import marked from 'marked';
import _ from 'lodash';
import Axios from 'axios';
import emoji from 'node-emoji';
import hljs from 'highlight.js';

import 'highlight.js/styles/vs.css';
import { O_CREAT } from 'constants';

new Vue({
  el: '.app',
  data: {
    product: {
      id: '',
      name: '',
      price: '',
      types: [],
      link: '',
      startDate: '',
      endDate: '',
      images: [],
      content: ''
    }
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
  mounted(){
    marked.setOptions({
      highlight: function(code) {
        return hljs.highlightAuto(code).value;
      }
    });
  },
  computed: {
    updateMd: function() {
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
  methods: {
    buyItem: function(){
      _cart.addItem(this.product);
      _message.info(this.$t('__message.success', {action: this.$t('__message.addItem', {name: this.product.name})}));
    }
  }
});
