
window.$navbar = new Vue({
  el: '#navbar',
  data: {
    isLogin: false,
    showCart: true,
    auth: 0,
    items: [
      { name: 'suyeon', link: 'https://i.imgur.com/Bqqw622.jpg' }
    ],
    userInfo: {},
    online: 0
  },
  created() {
    this.refresh();
    let socket = io.connect();
    socket.on('online', (data) => {
      this.online = data.online;
    });
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
      axios.delete('/rest/main/logout').then(res => {
        if (res.data.isOK) {
          window.localStorage.removeItem('token');
          location = '/';
        }
      });
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
