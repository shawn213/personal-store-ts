import axios from 'axios';

new Vue({
  el: '.app',
  data: {
    username: '',
    password: ''
  },
  created() {
    _cart.showCart();
  },
  methods: {
    login() {
      $loading.show();
      let { username, password } = this;
      let error = [];
      if (!username) {
        error.push('username is null');
      }
      if (!password) {
        error.push('password is null');
      }
      if (error.length > 0) {
        _message.danger(error);
        return;
      }
      axios.post('/login', {
        username,
        password
      }).then(res => {
        if (res.status === 200) {
          window.sessionStorage.user = res.data.user;
        }
        $loading.hide();
      }).catch(e => {
        _message.danger('login error');
        $loading.hide();
      });
    }
  }
})
