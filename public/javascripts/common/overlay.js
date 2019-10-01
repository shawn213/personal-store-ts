window.$loading = new Vue({
  el: '.overlay',
  data: {
    isShow: false,
    text: ''
  },
  methods: {
    show(text){
      this.text = text || this.$t('__wait');
      this.isShow = true;
    },
    hide(){
      this.isShow = false;
    }
  }
});
