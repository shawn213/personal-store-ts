new Vue({
  el: '.app',
  data: {
    userId: '',
    username: '',
    password: '',
    confirm: '',
    email: '',
    cellPhone: ''
  },
  created() {
    _cart.showCart();
  },
  validators: {
    userId: function (value) {
      return this.$Validator.value(value).required();
    },
    username: function (value) {
      return this.$Validator.value(value).required();
    },
    password: function (value) {
      return this.$Validator.value(value).required();
    },
    'confirm, password': function (confirm, password) {
      return this.$Validator.value(confirm).required().match(password);
    },
    email: function (value) {
      return this.$Validator.value(value).required().email();
    },
    cellPhone: function (value) {
      return this.$Validator.value(value).required().maxLength(10);
    }
  },
  methods: {
    async register() {
      let success = await this.$validate();
      if (success) {
        $loading.show();
        let { userId, username, password, confirm, email, cellPhone } = this;
        axios.post('/register', {
          userId, username, password, cellPhone, confirm, email
        }).then(res => {
          window.sessionStorage.user = JSON.stringify(res.data.user);
          $loading.hide();
          location = '/';
        });
      }
    }
  }
})
