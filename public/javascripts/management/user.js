new Vue({
  el: '.app',
  data: {
    users: [],
    isOwner: false
  },
  created() {
    if ($navbar.auth > 0) {
      this.isOwner = $navbar.auth == 99;
      axios.get('/user').then(res => {
        this.users = res.data.users;
      });
    } else {
      location = '/';
    }
    _cart.showCart();
  },
  methods: {
    update: async function (index) {

    },
    reset: async function (index) {
      let user = this.users[index];
      axios.patch('/user', { user }).then(res => {
        this.users[index] = res.data.user;
        _message.success('密碼重設成功');
      });
    }
  }
});
