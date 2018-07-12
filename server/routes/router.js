const Router = require('koa-router')

module.exports = () => {
  const router = new Router({
    prefix: '/api'
  })

  router
    .get('/getData', async (ctx, next) => {
      ctx.body = {
        success: true,
        data: [{
          time: +new Date(),
          temp: 25,
          hum: 71
        }, {
          time: +new Date(),
          temp: 25,
          hum: 73
        }, {
          time: +new Date(),
          temp: 26,
          hum: 74
        }, {
          time: +new Date(),
          temp: 27,
          hum: 75
        }, {
          time: +new Date(),
          temp: 27,
          hum: 76
        }, {
          time: +new Date(),
          temp: 27,
          hum: 77
        }, {
          time: +new Date(),
          temp: 28,
          hum: 76
        }, {
          time: +new Date(),
          temp: 26,
          hum: 74
        }]
      }
    })
    .post('/face', async (ctx, next) => {
      console.log(ctx.request)
      ctx.body = {
        success: true
      }
    })

  return router
}
