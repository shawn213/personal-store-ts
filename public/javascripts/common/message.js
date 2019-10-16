import _ from 'lodash';

window._message = new Vue({
  el: '.common-message',
  data: {
    isShow: false,
    messages: [],
    style: 'success',
    delay: 2000
  },
  methods: {
    info() {
      this.showMessage(arguments, 'info');
    },
    primary() {
      this.showMessage(arguments, 'primary');
    },
    success() {
      this.showMessage(arguments, 'success');
    },
    danger() {
      this.showMessage(arguments, 'danger');
    },
    warning() {
      this.showMessage(arguments, 'warning');
    },
    putMessage(messages) {
      for (let idx = 0; idx < messages.length; idx++) {
        let p = messages[idx];
        if (typeof p == 'string') {
          this.messages.push(p);
        } else if (Array.isArray(p)) {
          this.putMessage(p);
        }
      }
    },
    showMessage(messages, style) {
      this.putMessage(messages);
      this.style = `alert alert-fixed alert-${style}`;
      this.isShow = true;
      setTimeout(() => {
        this.isShow = false;
        this.messages = [];
        this.style = 'alert alert-fixed alert-info';
      }, this.delay || 2000);
    }
  }
});
