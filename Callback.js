// Callback ( này chỉ dành cho callback check cron cộng tiền )

const CryptoJS = require("crypto-js");
const express = require("express");
const bodyParser = require("body-parser");
const app = express();

const config = {
  key2: "eG4r0GcoNtRGbO8",
};

app.use(bodyParser.json());

app.post("/callback", (req, res) => {
  let result = {};

  try {
    let dataStr = req.body.data;
    let reqMac = req.body.mac;

    let mac = CryptoJS.HmacSHA256(dataStr, config.key2).toString();
    console.log("mac =", mac);

    // kiểm tra callback hợp lệ (đến từ ZaloPay server)
    if (reqMac !== mac) {
      // callback không hợp lệ
      result.returncode = -1;
      result.returnmessage = "mac not equal";
    } else {
      // thanh toán thành công
      // merchant cập nhật trạng thái cho đơn hàng
      let dataJson = JSON.parse(dataStr, config.key2);
      console.log(
        "update order's status = success where apptransid =",
        dataJson["apptransid"]
      );

      result.returncode = 1;
      result.returnmessage = "success";
    }
  } catch (ex) {
    result.returncode = 0; // ZaloPay server sẽ callback lại (tối đa 3 lần)
    result.returnmessage = ex.message;
  }

  // thông báo kết quả cho ZaloPay server
  res.json(result);
});

app.listen(8888, function () {
  console.log("Server is listening at port :8888");
});
