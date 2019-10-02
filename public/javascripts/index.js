new Vue({
  el: '.app',
  data: {
    products: []
  },
  created() {
    let value = window.sessionStorage.user;
    if (!value) {
      let user = JSON.parse(value);
      if (user) {

      }
    }
  }
})
