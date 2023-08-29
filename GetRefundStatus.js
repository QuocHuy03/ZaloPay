// Truy vấn trạng thái hoàn tiền 

const axios = require("axios");
const CryptoJS = require("crypto-js");
const { v4: uuidv4 } = require("uuid");
const moment = require("moment");

const config = {
  appid: "553",
  key1: "9phuAOYhan4urywHTh0ndEXiV3pKHr5Q",
  key2: "Iyz2habzyr7AG8SgvoBCbKwKi3UzlLi3",
  endpoint: "https://sandbox.zalopay.com.vn/v001/tpe/getpartialrefundstatus",
};
const randomNumber = uuidv4().replace(/-/g, "").substring(0, 6);

const huydev = {
  appid: config.appid,
  timestamp: Date.now(),
  mrefundid: `${moment().format("YYMMDD")}_${config.appid}_${randomNumber}`,
};

const data = config.appid + "|" + huydev.mrefundid + "|" + huydev.timestamp;
const mac = CryptoJS.HmacSHA256(data, config.key1).toString();
huydev.mac = mac;

console.log("KQ : ", huydev);

axios
  .post(config.endpoint, null, { params: huydev })
  .then((res) => console.log(res.data))
  .catch((err) => console.log(err));
