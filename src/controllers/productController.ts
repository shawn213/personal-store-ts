import { Request, Response, NextFunction } from 'express';
import { Product } from '../db/models/Product';
import { Op } from 'sequelize';
import axios from 'axios';
import _ from 'lodash';

const env = process.env.NODE_ENV || 'production';
const config = require('../../config')[env];

let options = { headers: { Authorization: config.clientId } };

export const query = async (req: Request, res: Response) => {
  if (req.headers.accept.search('json') > -1) {
    let productId = req.params.id;
    let product = await Product.findByPk(productId);
    res.json({ product });
  } else {
    res.render('product');
  }
}

export const queryAll = async (req: Request, res: Response) => {
  let products = await Product.findAll({
    where: {
      startDate: { [Op.lte]: new Date() },
      endDate: { [Op.gt]: new Date() }
    }
  });
  res.render('index', {
    products
  });
}

export const createProduct = async (req: Request, res: Response) => {
  let { name, price, cropBase64, startDate, endDate, content, images } = req.body;
  let { data } = await axios.post('https://api.imgur.com/3/image', { image: cropBase64 }, options);
  let { link, deletehash } = data.data;
  let items = [];
  _.forEach(images, url => {
    items.push({
      link: url.link,
      deletehash: url.deletehash
    });
  });
  let test = [
    {
      name: 'color',
      type: 'radio',
      data: { 1: 'red', 2: 'blue' }
    },
    {
      name: 'type',
      type: 'checkbox',
      data: { 1: 'XL', 2: 'L', 3: 'M' }
    }
  ]
  let product = await Product.create({
    name, price, startDate, endDate, link, deletehash, content, images: items, types: test
  });
  res.json({ product });
}

export const updateProduct = async (req: Request, res: Response) => {
  let id = req.params.id;
  let { product, cropBase64 } = req.body;
  let { name, price, startDate, endDate, link, deletehash, content } = product;
  let urls = product.images;
  let images = [];
  _.each(urls, item => {
    images.push({
      link: item.link,
      deletehash: item.deletehash,
      productId: id
    });
  });
  if (product.deletehash) {
    let { data } = await axios.post('https://api.imgur.com/3/image', { image: cropBase64 }, options);
    link = data.link;
    deletehash = data.deletehash;
  }
  Product.findByPk(id).then(item => {
    item.update({
      name, price, startDate, endDate, link, deletehash, content, images
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
