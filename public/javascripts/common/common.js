import VueI18n from 'vue-i18n';
import SimpleVueValidation from 'simple-vue-validator';
const Validator = SimpleVueValidation.Validator;

//locales
import tw from '../../../config/i18n/tw';

const i18n = new VueI18n({
  locale: 'tw',
  messages: { tw }
});

SimpleVueValidation.extendTemplates({
  error: '錯誤.',
  required: '此項必須輸入.',
  float: '必須是數字.',
  integer: '必須是整數.',
  number: '必須是數字.',
  lessThan: '必須小於 {0}.',
  lessThanOrEqualTo: '必須小於或等於 {0}.',
  greaterThan: '必須大於 {0}.',
  greaterThanOrEqualTo: '必須大於或等於 {0}.',
  between: '必須介於 {0} 和 {1} 之間.',
  size: '大小必須為 {0}.',
  length: '長度必須為 {0}.',
  minLength: '必須至少包含 {0} 個字符.',
  maxLength: '最多包含 {0} 個字符.',
  lengthBetween: '長度必須介於 {0} 和 {1} 之間.',
  in: '必須為 {0}.',
  notIn: '不得為 {0}.',
  match: '不相符.',
  regex: '無效的格式.',
  digit: '必須是數字.',
  email: '無效的電子郵件地址.',
  url: '無效的網址.'
});

Vue.use(SimpleVueValidation);

Vue.directive('focus', {
  inserted: function (el) {
    el.focus()
  }
});

Vue.prototype.$Validator = Validator;

const init = Vue.prototype._init
Vue.prototype._init = function (options) {
  init.call(this, {
    i18n,
    ...options
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
