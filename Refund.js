// Gửi dữ liệu Hoàn Tiền
const axios = require("axios");
const CryptoJS = require("crypto-js");
const moment = require("moment");

const config = {
  appid: "553",
  key1: "9phuAOYhan4urywHTh0ndEXiV3pKHr5Q",
  key2: "Iyz2habzyr7AG8SgvoBCbKwKi3UzlLi3",
  endpoint: "https://sandbox.zalopay.com.vn/v001/tpe/partialrefund",
};

const timestamp = Date.now();
const uid = `${timestamp}${Math.floor(111 + Math.random() * 999)}`; // unique id

let params = {
  appid: config.appid,
  mrefundid: `${moment().format("YYMMDD")}_${config.appid}_${uid}`,
  timestamp,
  zptransid: "190508000000022", // Mã Này Thanh Toán Sẽ Trả Về
  amount: "50000",
  description: "ZaloPay Refund Demo",
};

// appid|zptransid|amount|description|timestamp
let data =
  params.appid +
  "|" +
  params.zptransid +
  "|" +
  params.amount +
  "|" +
  params.description +
  "|" +
  params.timestamp;
params.mac = CryptoJS.HmacSHA256(data, config.key1).toString();

axios
  .post(config.endpoint, null, { params })
  .then((res) => console.log(res.data))
  .catch((err) => console.log(err));
