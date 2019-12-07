new Vue({
  el: '.app',
  data: {
    users: [],
    isOwner: false,
    isManager: false
  },
  created() {
    if ($navbar.auth > 0) {
      this.isOwner = $navbar.auth == 99;
      this.isManager = $navbar.auth > 0;
      axios.get('/rest/user/1').then(res => {
        this.users = res.data.users;
      });
    } else {
      location = '/';
    }
    _cart.showCart();
  },
  methods: {
    changeAuth: function (index, num) {
      let { id, authority } = this.users[index];
      authority += num;
      if (authority <= 0) {
        authority = 0;
      } else if (authority > 1) {
        authority = 1;
      }
      axios.put('/rest/user', { id, authority }).then(res => {
        if (res.data.isOK) {
          this.users[index].authority = authority;
          _message.success('更新成功');
        }
      });
    },
    reset: async function (index) {
      let user = this.users[index];
      axios.patch('/rest/user', { user }).then(res => {
        this.users[index] = res.data.user;
        _message.success('已將顧客的密碼重設為手機號碼');
      });
    }
  }
});
