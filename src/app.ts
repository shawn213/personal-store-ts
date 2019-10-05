import createError from 'http-errors';
import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import sassMiddleware from 'node-sass-middleware';
import I18n from 'i18n';
import bodyParser from 'body-parser';
import session from 'express-session';
import helmet from 'helmet';
import { config } from 'dotenv';

import indexRouter from './routes/index';
import productRouter from './routes/product';

var app = express();
config();

// view engine setup
app.set('views', path.join(__dirname, '../public', 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 }));
app.use(cookieParser());
app.use(session({
  secret: process.env.SECRET,
  name: 'sessionId',
  cookie: {
    maxAge: 60 * 1000 * 30
  },
  saveUninitialized: true,
  resave: false
}));
app.use(sassMiddleware({
  src: path.join(__dirname, '../public'),
  dest: path.join(__dirname, '../public'),
  indentedSyntax: false, // true = .sass and false = .scss
  sourceMap: true
}));
app.use(helmet());
app.use(express.static(path.join(__dirname, '../public')));
app.use(express.static(path.join(__dirname, '../node_modules', 'jquery', 'dist')));
app.use(express.static(path.join(__dirname, '../node_modules', 'bootstrap', 'dist')));
app.use(express.static(path.join(__dirname, '../node_modules', 'jquery-cropper', 'dist')));
app.use(express.static(path.join(__dirname, '../node_modules', 'cropperjs', 'dist')));
app.use(express.static(path.join(__dirname, '../node_modules', 'vue', 'dist')));
app.use(express.static(path.join(__dirname, '../node_modules', 'highlight.js')));
app.use(express.static(path.join(__dirname, '../node_modules', 'axios', 'dist')));

I18n.configure({
  locales: ['tw', 'en'],
  defaultLocale: 'tw',
  directory: __dirname + '/../config/language',
  cookie: 'locale',
  queryParameter: 'locale'
});
app.use(I18n.init);

app.locals.moment = require('moment');
app.use((req, res, next) => {
  app.locals.session = req.session;
  next();
});

app.use('/', indexRouter);
app.use('/product', productRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err: any, req: express.Request, res: express.Response, next: express.NextFunction) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('common/error');
});

export default app;
