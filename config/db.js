module.exports = {
  development: {
    username: 'postgres',
    password: 'postgres',
    database: 'personal',
    host: 'localhost',
    dialect: 'postgres',
    timezone: '+08:00'
  },
  test: {
    username: 'postgres',
    password: 'postgres',
    database: 'personal',
    host: 'localhost',
    dialect: 'postgres',
    timezone: '+08:00'
  },
  production: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOST,
    dialect: 'postgres',
    protocol: 'postgres',
    dialectOptions: {
      ssl: true
    },
    timezone: '+08:00'
  }
};
