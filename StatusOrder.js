// Truy vấn trạng thái thanh toán của đơn hàng

const axios = require("axios");
const CryptoJS = require("crypto-js");
const qs = require("qs");

const config = {
  appid: "553",
  key1: "9phuAOYhan4urywHTh0ndEXiV3pKHr5Q",
  key2: "Iyz2habzyr7AG8SgvoBCbKwKi3UzlLi3",
  endpoint: "https://sandbox.zalopay.com.vn/v001/tpe/getstatusbyapptransid",
};

let postData = {
  appid: config.appid,
  apptransid: "230829_7d775434-5693-43d5-97b0-2e5e851ff857", // Nhập Dữ Liệu Của Thằng APPID bên tạo
};
let data = postData.appid + "|" + postData.apptransid + "|" + config.key1; // appid|apptransid|key1
postData.mac = CryptoJS.HmacSHA256(data, config.key1).toString();

let postConfig = {
  method: "post",
  url: config.endpoint,
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
  },
  data: qs.stringify(postData),
};

axios(postConfig)
  .then(function (response) {
    console.log(JSON.stringify(response.data));
  })
  .catch(function (error) {
    console.log(error);
  });
