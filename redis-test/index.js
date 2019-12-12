const redis = require('redis')

const redisClient = redis.createClient(6379, '127.0.0.1')
redisClient.on('error', err => {
  console.log(err)
})

redisClient.set('myname', 'zhangsan', redis.print)
redisClient.get('myname', (err, value) => {
  if (err) {
    console.error(err)
    return
  }
  console.log(value)

  redisClient.quit()
})

