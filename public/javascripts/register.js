import SimpleVueValidation from 'simple-vue-validator';
const Validator = SimpleVueValidation.Validator;

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
      return Validator.value(value).required();
    },
    username: function (value) {
      return Validator.value(value).required();
    },
    password: function (value) {
      return Validator.value(value).required();
    },
    'confirm, password': function (confirm, password) {
      return Validator.value(confirm).required().match(password);
    },
    email: function (value) {
      return Validator.value(value).email();
    },
    cellPhone: function (value) {
      return Validator.value(value).maxLength(10);
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
          window.sessionStorage.user = res.data.user;
          $loading.hide();
        });
      }
    }
  }
})
