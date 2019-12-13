const http = require('http')

const server = http.createServer((req, res) => {
  console.log('this is a log')
  console.error('this is a error')
  // res.setHeader('Content-type', 'appliction/json')
  res.end(JSON.stringify({
    error: 0,
    msg: 'pm2 test server 11'
  }))
})

server.listen(8000)
console.log("OK")