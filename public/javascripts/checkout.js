new Vue({
  el: '.app',
  data: {
    products: [],
    sumTotal: 0,
    storeId: '',
    storeName: '',
    storeAddr: '',
    storeInfo: {},
    action: 'https://logistics-stage.ecpay.com.tw/Express/map',
    attrs: {
      MerchantID: '2000132',
      MerchantTradeNo: 'no20171226140813',
      LogisticsSubType: 'UNIMART',
      IsCollection: 'N',
      ServerReplyURL: 'https://personal-store.herokuapp.com/checkout',
      ExtraData: '測試額外資訊',
      Device: '0',
      LogisticsType: 'CVS'
    }
  },
  created() {
    let vm = this;
    let cartStr = window.sessionStorage.cart;
    if (cartStr) {
      let cart = JSON.parse(cartStr);
      this.products = cart;
    } else {
      location = '/';
    }
    let storeInfoStr = document.querySelector('#storeInfo').innerHTML;
    if (storeInfoStr) {
      this.storeInfo = JSON.parse(storeInfoStr);
    }
    if (navigator.userAgent.match(/Android/i)
      || navigator.userAgent.match(/webOS/i)
      || navigator.userAgent.match(/iPhone/i)
      || navigator.userAgent.match(/iPad/i)
      || navigator.userAgent.match(/iPod/i)
      || navigator.userAgent.match(/BlackBerry/i)
      || navigator.userAgent.match(/Windows Phone/i)
    ) {
      this.Device = 1;
    }
    _cart.showCart();
    this.$watch("products", function (after, before) {
      after.filter(function (p, idx) {
        vm.products[idx].subTotal = p.amount * p.price;
        return true;
      });
      vm.sumTotal = _.sumBy(this.products, 'subTotal');
    }, { deep: true, immediate: true });
  },
  computed: {
    sumAmount: function () {
      return _.sumBy(this.products, 'amount');
    },
    store: function () {
      if (this.storeInfo.length > 0) {
        let { storeId, storeName, storeAddr } = this.storeInfo;
        return this.$t('__html.store', { id: storeId, name: storeName, addr: storeAddr });
      }
    }
  },
  validators: {
    storeInfo: function (value) {
      return this.$Validator.custom(() => {
        if (value.length === 0) {
          return 'this is required'
        }
      });
    }
  },
  methods: {
    getStoreInfo: function () {
      let f = document.createElement('form');
      f.setAttribute('method', 'POST');
      f.setAttribute('action', this.action);
      f.setAttribute('style', 'display:none');
      _.each(this.attrs, (val, key) => {
        let i = document.createElement('input');
        i.setAttribute('type', 'hidden');
        i.setAttribute('name', key);
        i.setAttribute('value', val);
        f.appendChild(i);
      });
      document.body.appendChild(f);
      f.submit();
    },
    confirmOrder: async function () {
      let success = await this.$validate();
      if (success) {
        let user = $navbar.userInfo;
        axios.put('/checkout', {
          userId: user.userId,
          amount: this.sumPrice,
          address: this.storeInfo,
          products: this.products
        }).then(() => {
          window.sessionStorage.removeItem('cart');
          _message.success(this.$t('__message.success', { action: this.$t('__message.order') }));
          location = '/';
        }).catch(e => {
          _message.danger(this.$t('__message.fail', { action: this.$t('__message.order') }))
        });
      }
    },
    removeRow: function (index) {
      this.products.splice(index, 1);
      window.sessionStorage.cart = JSON.stringify(this.products);
    }
  }
});
