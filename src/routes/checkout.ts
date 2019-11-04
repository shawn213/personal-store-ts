import { Router, Request, Response } from 'express';
import { Order } from '../db/models/Order';

const router = Router();

router.route('/')
  .get((req, res) => {
    res.render('checkout');
  })
  .post((req, res) => {
    let { MerchantID, MerchantTradeNo, LogisticsSubType, CVSStoreID, CVSStoreName, CVSAddress, CVSTelephone, ExtraData } = req.body;
    console.log(req.body);
    let data = {
      id: MerchantID,
      tradeNo: MerchantTradeNo,
      type: LogisticsSubType,
      storeId: CVSStoreID,
      storeName: CVSStoreName,
      storeAddr: CVSAddress,
      storePhone: CVSTelephone,
      extraData: ExtraData
    }
    if (process.env.NODE_ENV === 'development') {
      data = { "id": "2000132", "tradeNo": "no20171226140813", "type": "UNIMART", "storeId": "991182", "storeName": "馥樺門市", "storeAddr": "台北市南港區三重路23號1樓", "storePhone": "", "extraData": "測試額外資訊" };
    }
    res.render('checkout', { data });
  })
  .put((req, res) => {
    let { userId, amount, products, address } = req.body;
    let orderTime = new Date();
    Order.create({
      userId, amount, products, address, orderTime
    }).then(order => {
      console.log(order);
      res.json({ isOK: true });
    });
  });

export default router;
