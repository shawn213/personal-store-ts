const testObj = {
  signed: '12345678',
  clientId: 'Client-ID cec5ec6f6f514de'
}
module.exports = {
  development: testObj,
  test: testObj,
  production: {
      signed: 'shopping',
      clientId: 'Client-ID cec5ec6f6f514de'
  }
}
