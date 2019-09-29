window.$loading = new Vue({
  el: '.overlay',
  data: {
    isShow: false,
    text: ''
  },
  methods: {
    show(text){
      this.text = text || 'Loading';
      this.isShow = true;
    },
    hide(){
      this.isShow = false;
    }
  }
});
