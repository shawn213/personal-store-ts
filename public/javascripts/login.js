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
        axios.post('/login', { userId, password }).then(res => {
          window.sessionStorage.user = JSON.stringify(res.data.user);
          $loading.hide();
          $navbar.refresh();
          location = '/';
        }).catch(e => {
          _message.danger('login error');
          $loading.hide();
        });
      }
    }
  }
})
