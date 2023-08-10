const CryptoJS = require("crypto-js");
const { v4: uuidv4 } = require("uuid");
const moment = require("moment");

const config = {
  appid: "1234",
  key1: "your_key1_here",
  key2: "your_key2_here",
};

let appTransID = `${moment().format("YYMMDD")}_${uuidv4()}`; //

const order = {
  appid: config.appid,
  apptransid: appTransID,
  appuser: "huydev",
  apptime: Date.now(),
  item: "[]",
  embeddata: "{}",
  amount: 7000,
  description: "Demo Order",
  bank_code: "zalo_pay",
};

const data =
  config.appid +
  "|" +
  order.apptransid +
  "|" +
  order.appuser +
  "|" +
  order.amount +
  "|" +
  order.apptime +
  "|" +
  order.embeddata +
  "|" +
  order.description +
  "|" +
  order.bank_code +
  "|" +
  order.item;
const mac = CryptoJS.HmacSHA256(data, config.key1).toString();

order.mac = mac;
const b64Order = Buffer.from(JSON.stringify(order)).toString("base64");
console.log(
  "https://sbgateway.zalopay.vn/openinapp?order=" + encodeURIComponent(b64Order)
);
