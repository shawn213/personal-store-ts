
window.$navbar = new Vue({
  el: '#navbar',
  data: {
    isLogin: false,
    showCart: true,
    auth: 0,
    items: [
      { name: 'suyeon', link: 'https://i.imgur.com/Bqqw622.jpg' }
    ],
    userInfo: {}
  },
  created() {
    this.refresh();
  },
  computed: {
    count: function () {
      return this.items.length;
    }
  },
  methods: {
    logout() {
      window.sessionStorage.removeItem('user');
      this.auth = 0;
      this.isLogin = false;
      location = '/';
    },
    refresh() {
      let userStr = window.sessionStorage.user;
      if (userStr) {
        let user = JSON.parse(userStr);
        this.auth = user.authority;
        this.isLogin = true;
        this.userInfo = user;
      }
    }
  }
})
