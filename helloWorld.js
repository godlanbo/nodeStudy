var http = require('http')
var fs = require('fs')
var query = require('querystring')
var path = require('path')

serveStaticFile = (res, path, contentType, responseCode) => {
  if(!responseCode) {
    responseCode = 200
  }
  fs.readFile(__dirname + path, (err, data) => {
    if (err) {
      res.writeHead(500, {'ContentType': 'text/plain'})
      res.end('500 - Internal Error')
    } else {
      res.writeHead(responseCode, {'ContentType': contentType})
      res.end(data)
    }
  })
}

http.createServer((req, res) => {
  var path = req.url.replace(/\/?(?:\?.*)?$/, '').toLowerCase()
  switch(path){
    case '':
      serveStaticFile(res, '/public/home.html', 'text/html')
      break
    case '/about':
      serveStaticFile(res, '/public/about.html', 'text/html')
      break
    default:
      serveStaticFile(res, '/public/404.html', 'text/html', 404)
      break
  }
  // res.writeHead(200, {'ContentType': 'text/plain'})
  // res.end('hello world')
}).listen(3000)

console.log('Serve start :3000')