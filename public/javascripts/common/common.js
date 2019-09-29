document.addEventListener("DOMContentLoaded", function () {
  let values = document.getElementsByClassName('currency');
  for (let i = 0;i< values.length;i++){
     let num = values[i].innerHTML;
     values[i].innerHTML = parseInt(num).toLocaleString('zh-TW', { style: 'currency', currency: 'TWD', minimumFractionDigits: 0 });
     values[i].style.color = 'red';
  }
});
