import {Sequelize} from 'sequelize-typescript';
const env = process.env.NODE_ENV || 'production';
const config = require('../../config/db')[env];

config.models = [__dirname + '/models'];

export const db = new Sequelize(config);
