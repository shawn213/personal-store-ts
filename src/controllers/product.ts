import { Request, Response, NextFunction } from 'express';
import { Product } from '../db/models/Product';
import axios from 'axios';
import _ from 'lodash';

const env = process.env.NODE_ENV || 'production';
const config = require('../../config')[env];

let options = { headers: { Authorization: config.clientId } };

export const queryAll = (req: Request, res: Response) => {
  Product.findAll().then(products => {
    res.json({ products });
  });
}

export const querySelect = (req: Request, res: Response) => {
  Product.findAll({
    attributes: ['id', 'name']
  }).then(products => {
    res.json({ products });
  });
}

export const queryById = (req: Request, res: Response) => {
  let id = req.params.id;
  Product.findByPk(id).then(product => {
    res.json({ product });
  });
}

export const createProduct = async (req: Request, res: Response) => {
  let { name, price, onSale, cropBase64, startDate, endDate, content, images, types } = req.body;
  let { data } = await axios.post('https://api.imgur.com/3/image', { image: cropBase64 }, options);
  let { link, deletehash } = data.data;
  let items = [];
  _.forEach(images, url => {
    items.push({
      link: url.link,
      deletehash: url.deletehash
    });
  });
  types = types || [];
  let product = await Product.create({
    name, price, onSale, startDate, endDate, link, deletehash, content, images: items, types: types
  });
  res.json({ product });
}

export const updateProduct = async (req: Request, res: Response) => {
  let { product, cropBase64 } = req.body;
  let { id, name, price, onSale, startDate, endDate, link, deletehash, content, types } = product;
  let urls = product.images;
  let images = [];
  _.each(urls, item => {
    images.push({
      link: item.link,
      deletehash: item.deletehash,
      productId: id
    });
  });
  if (!deletehash) {
    let { data } = await axios.post('https://api.imgur.com/3/image', { image: cropBase64 }, options);
    link = data.data.link;
    deletehash = data.data.deletehash;
  }
  types = types || [];
  Product.findByPk(id).then(item => {
    item.update({
      name, price, onSale, startDate, endDate, link, deletehash, content, images, types
    }).then(() => {
      res.json({ isOK: true });
    });
  });
}

export const deleteProduct = (req: Request, res: Response) => {
  let productId = req.params.id;
  Product.findByPk(productId).then(product => {
    let { deletehash, images } = product;
    deleteImage(deletehash);
    _.forEach(images, image => {
      deleteImage(image.deletehash);
    });
    product.destroy();
  });
  res.json({ isOK: true });
}

function deleteImage(deletehash: string) {
  return new Promise((resolve, reject) => {
    axios.delete(`https://api.imgur.com/3/image/${deletehash}`, options)
      .then(data => {
        let res = data.data;
        resolve(res);
      }).catch(e => {
        reject(e);
      });
  });
}
