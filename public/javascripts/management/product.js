import Crooper from 'cropperjs';
import DatePicker from 'vue2-datepicker';
import moment from 'moment';
import axios from 'axios';
import _ from 'lodash';
import marked from 'marked';
import emoji from 'node-emoji';
import VueLoading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
import hljs from 'highlight.js';
import 'highlight.js/styles/vs2015.css';
import config from '../../../config';

Vue.use(VueLoading);

new Vue({
  el: ".app",
  components: { DatePicker },
  data: {
    product: {
      name: '',
      price: '',
      types: [],
      link: '',
      deletehash: '',
      startDate: '',
      endDate: '',
      content: '',
      images: [
        { id: '', link: '', deletehash: '', src: '', fileName: '', isLoading: false }
      ]
    },
    titleFileName: '',
    url: '',
    types: [],
    range: [],
    lang: {
      days: ['日', '一', '二', '三', '四', '五', '六'],
      months: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
      pickers: ['未來 7 天', '未來 30 天', '過去 7 天', '過去 30 天'],
      placeholder: {
        date: '請選擇日期',
        dateRange: '請選擇日期範圍'
      }
    },
    imagePreview: '',
    showPreview: false,
    visible: false,
    btn_c: false,
    btn_u: false
  },
  created() {
    _cart.showCart();
    if (location.pathname.search('/m/') > -1) {
      let loading = this.$loading.show();
      let id = location.pathname.split('/').pop();
      axios.get(`/product/${id}`)
        .then(res => {
          let { product } = res.data;
          _.assignIn(this.product, product);
          this.range = [product.startDate, product.endDate];
          this.url = product.link;
          let { images } = this.product;
          _.each(images, item => {
            item.src = item.link;
          });
          let { types } = this.product;
          let lines = [];
          _.each(types, type => {
            let { value, text } = type;
            lines.push(`${value},${text}`);
          });
          this.types = _.join(lines, '\n');
          loading.hide();
        });
      this.btn_u = true;
    } else {
      this.btn_c = true;
    }
  },
  mounted() {
    marked.setOptions({
      highlight: function (code) {
        return hljs.highlightAuto(code).value;
      }
    });
  },
  watch: {
    url(value) {
      if (/\.(jpe?g|png|gif)$/i.test(value)) {
        this.imagePreview = value;
        this.showPreview = true;
      } else {
        if (this.cropper) {
          this.imagePreview = '';
          this.cropper.destroy();
        }
      }
    },
    types(value) {
      if (value) {
        let items = value.split('\n');
        let types = [];
        _.forEach(items, (item, i) => {
          let [value, text] = item.split(',');
          if (!text) {
            text = value;
            value = i;
          }
          types.push({
            value,
            text
          });
        })
        this.product.types = types;
      } else {
        this.product.types = [];
      }
    }
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
    dateRangeFormat: function (value) {
      if (value.length > 0) {
        let df = 'YYYY-MM-DD';
        let [startDate, endDate] = value;
        return moment(startDate).format(df) + ' ~ ' + moment(endDate).format(df);
      }
    }
  },
  validators: {
    'product.name': function (value) {
      return this.$Validator.value(value).required();
    },
    range: function (value) {
      return this.$Validator.value(value).required();
    },
    'product.price': function (value) {
      return this.$Validator.value(value).required('零元商品!!!不用上架了我全都要');
    }
  },
  methods: {
    changeImage(e) {
      let file = this.$refs.file.files[0];
      let reader = new FileReader();
      reader.addEventListener("load", function () {
        this.showPreview = true;
        this.imagePreview = reader.result;
      }.bind(this), false);
      if (file) {
        if (/\.(jpe?g|png|gif)$/i.test(file.name)) {
          reader.readAsDataURL(file);
          this.titleFileName = file.name;
        }
      } else {
        this.imagePreview = '';
        this.titleFileName = '';
        this.cropper.destroy();
        if (this.product.deletehash) {
          this.deleteImage(this.product.deletehash);
          this.product.deletehash = '';
          this.product.link = '';
        }
      }
    },
    loadImage(e) {
      let preview = document.getElementsByClassName("img-preview")[0];
      let card = document.getElementsByClassName("card-body")[0];
      let width = card.offsetWidth;
      let height = (width / 16) * 9;
      preview.style.width = '100%';
      preview.style.height = height + 'px';
      preview.style.overflow = 'hidden';
      if (this.cropper) {
        this.cropper.destroy();
      }
      let img = document.getElementById('img');
      let cropper = new Crooper(img, {
        viewMode: 2,
        preview: '.img-preview',
        aspectRatio: 16 / 9,
        guides: false,
        dragMode: 'none'
      });
      this.cropper = cropper;
    },
    keyupUrlList(index) {
      let { images } = this.product;
      let url = images[index].url;
      if (/\.(jpe?g|png|gif)$/i.test(url)) {
        images[index].src = url;
      } else {
        images[index].src = '';
      }
    },
    changeImageList(index, e) {
      let files = e.target.files;
      let { images } = this.product;
      if (files && files[0]) {
        let file = files[0];
        let reader = new FileReader();
        reader.addEventListener("load", function () {
          let base64 = reader.result;
          images[index].src = base64;
          let result = this.uploadImage(base64.split(',')[1]);
          result.then(function (res) {
            images[index].link = res.data.link;
            images[index].deletehash = res.data.deletehash;
            images[index].isLoading = false;
          }.bind(this)).catch(function (e) {
            console.log(`error , ${e}`);
          });
        }.bind(this), false);
        if (file) {
          if (/\.(jpe?g|png|gif)$/i.test(file.name)) {
            reader.readAsDataURL(file);
            images[index].fileName = file.name;
            images[index].isLoading = true;
          }
        }
      } else {
        let image = images[index];
        image.fileName = '';
        image.src = '';
        if (image.deletehash) {
          this.deleteImage(image.deletehash);
          image.deletehash = '';
          image.link = '';
        }
      }
    },
    blurImageList(index, e) {
      let url = this.product.images[index].url;
      if (/\.(jpe?g|png|gif)$/i.test(url)) {
      }
    },
    addRow() {
      this.product.images.push({
        url: '',
        src: '',
        link: '',
        fileName: '',
        deletehash: '',
        isLoading: false
      });
    },
    removeRow: function (index) {
      let { images } = this.product;
      if (images[index].deletehash) {
        let result = this.deleteImage(images[index].deletehash);
        result.then(res => {
          console.log(res);
        });
        images.splice(index, 1);
        if (images.length == 0) {
          this.addRow();
        }
      } else {
        images.splice(index, 1);
      }
    },
    uploadImage(base64) {
      return new Promise((resolve, reject) => {
        axios.post('https://api.imgur.com/3/image', {
          image: base64
        }, {
          headers: {
            Authorization: config[process.env.NODE_ENV].clientId
          }
        }).then(res => {
          let data = res.data;
          resolve(data);
        }).catch(e => {
          reject(e);
        });
      });
    },
    deleteImage(deletehash) {
      return new Promise((resolve, reject) => {
        axios.delete(`https://api.imgur.com/3/image/${deletehash}`, { headers: { Authorization: config[process.env.NODE_ENV].clientId } })
          .then(data => {
            let res = data.data;
            resolve(res);
          }).catch(e => {
            reject(e);
          });
      });
    },
    async create() {
      let success = await this.$validate();
      if (success) {
        $loading.show();
        let [startDate, endDate] = this.range;
        let { name, price, content, images, types } = this.product;
        let cropBase64 = '';
        if (this.cropper) {
          cropBase64 = this.cropper.getCroppedCanvas().toDataURL("image/jpeg", 1.0).split(',')[1];
        }
        axios.post('/product', {
          name,
          price,
          types,
          startDate,
          endDate,
          content,
          cropBase64,
          images
        }).then(res => {
          if (res.status === 200) {
          }
          $loading.hide();
          _message.success(this.$t('__message.success', { action: this.$t('__message.create') }));
        }).catch(e => {
          $loading.hide();
          console.log(e);
        });
      }
    },
    async update() {
      let success = await this.$validate();
      if (success) {
        $loading.show();
        let { product, range } = this;
        let [startDate, endDate] = range;
        product.startDate = startDate;
        product.endDate = endDate;
        let { id } = this.product;
        let cropBase64 = '';
        if (this.cropper) {
          cropBase64 = this.cropper.getCroppedCanvas().toDataURL("image/jpeg", 1.0).split(',')[1];
        }
        axios.patch(`/product/${id}`, {
          product,
          cropBase64
        }).then(res => {
          console.log(res);
          $loading.hide();
          _message.success(this.$t('__message.success'/*{action} 成功*/, { action: this.$t('__message.update'/*更新*/) }));
        }).catch(e => {
          $loading.hide();
        });
      }
    },
    goHome() {
      location = '/';
    }
  }
});
