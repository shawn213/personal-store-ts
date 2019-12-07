new Vue({
  el: '.app',
  data: {
    userId: '',
    password: ''
  },
  validators: {
    userId: function (value) {
      return this.$Validator.value(value).required();
    },
    password: function (value) {
      return this.$Validator.value(value).required();
    }
  },
  methods: {
    async login() {
      let success = await this.$validate();
      if (success) {
        $loading.show();
        let { userId, password } = this;
        axios.post('/rest/login', { userId, password }).then(res => {
          if (res.data.isOK) {
            window.sessionStorage.user = JSON.stringify(res.data.user);
            $loading.hide();
            $navbar.refresh();
            location = '/';
          } else {
            _message.danger(this.$t('__message.error.password'));
            $loading.hide();
          }
        });
      }
    }
  }
})
