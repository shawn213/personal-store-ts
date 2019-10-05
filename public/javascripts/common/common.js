import VueI18n from 'vue-i18n';

//locales
import tw from '../../../config/i18n/tw';

const i18n = new VueI18n({
  locale: 'tw',
  messages: { tw }
});

const init = Vue.prototype._init
Vue.prototype._init = function (options) {
  init.call(this, {
    i18n,
    ...options,
  })
}

document.addEventListener("DOMContentLoaded", function () {
  let values = document.getElementsByClassName('currency');
  for (let i = 0; i < values.length; i++) {
    let num = values[i].innerHTML;
    values[i].innerHTML = _changeCurrency(num);
    values[i].style.color = 'red';
  }
});

window._changeCurrency = function (str) {
  return parseInt(str).toLocaleString('zh-TW', { style: 'currency', currency: 'TWD', minimumFractionDigits: 0 });
}
