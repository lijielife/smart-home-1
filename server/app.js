const Koa = require('koa')
const app = new Koa()

const router = require('./routes/router')()
app.use(router.routes())
  .use(router.allowedMethods())

app.listen(3000, () => {
  console.log('app started at port 3000 ...')
})
