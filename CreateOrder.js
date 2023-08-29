// Tạo 1 Đơn Hàng

const axios = require("axios");
const CryptoJS = require("crypto-js");
const { v4: uuidv4 } = require("uuid");
const moment = require("moment");
// APP INFO
const config = {
  appid: "554",
  key1: "8NdU5pG5R2spGHGhyO99HN1OhD8IQJBn",
  key2: "uUfsWgfLkRLzq6W2uNXTCxrfxs51auny",
  endpoint: "https://sandbox.zalopay.com.vn/v001/tpe/createorder",
};

const embeddata = {
  merchantinfo: "embeddata123",
  // bankgroup: "ATM",
};

const items = [
  {
    itemid: "qh",
    itemname: "huydev",
    itemprice: 198400,
    itemquantity: 1,
  },
];
console.log(moment().format("YYMMDD") + "_" + uuidv4());
const order = {
  appid: config.appid,
  apptransid: `${moment().format("YYMMDD")}_${uuidv4()}`, // mã giao dich có định dạng yyMMdd_xxxx
  appuser: "demo",
  apptime: Date.now(),
  item: JSON.stringify(items),
  embeddata: JSON.stringify(embeddata),
  amount: 100000,
  description: "ZaloPay Integration Demo",
  bankcode: "zalopayapp",
};

// appid|apptransid|appuser|amount|apptime|embeddata|item
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
  order.item;
order.mac = CryptoJS.HmacSHA256(data, config.key1).toString();

axios
  .post(config.endpoint, null, { params: order })
  .then((res) => {
    console.log(res.data);
  })
  .catch((err) => console.log(err));
