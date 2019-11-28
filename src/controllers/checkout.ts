import { Request, Response } from 'express';
import { Order } from '../db/models/Order';

export const createOrder = (req: Request, res: Response) => {
  let { userId, amount, products, address, count } = req.body;
  let orderTime = new Date();
  Order.create({
    userId, count, amount, products, address, orderTime
  }).then(order => {
    console.log(order);
    res.json({ isOK: true });
  });
}

export const serverReply = (req: Request, res: Response) => {
  let { MerchantID, MerchantTradeNo, LogisticsSubType, CVSStoreID, CVSStoreName, CVSAddress, CVSTelephone, ExtraData } = req.body;
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
}

export const init = (req: Request, res: Response) => {
  let storeUrl = '';
  if (process.env.NODE_ENV === 'development') {
    storeUrl = process.env.STORE_MAP;
  }
  res.render('checkout', { storeUrl });
}
