var nodemailer = require('nodemailer');
//連線資訊
nodemailer.SMTP = {
  host: "stmp.gmail.com",//server位置
  // port: 25,//可不給,預設25
  ssl: true,//可不給,預設false
  // user: '帳號@gmail.com',//可不給
  // pass: '密碼',//可不給
  // use_authentication: true//可不給
}
//create reusable transporter object using SMTP transport
var transporter = nodemailer.createTransport();

//信件內容參數
var mailOptions = {
  from: '"假的發信者mail" <shawn21364@gmail.com>',
  to: 'shuwei213@gmail.com',
  subject: '信件title',
  text: '信件內容',
};


export const send = () => {
  return new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, (error: any, response: any) => {
      if (error) {
        reject(error);
      }
      resolve(response);
    });
  });
}
