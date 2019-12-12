const fs = require('fs')
const path = require('path')

var filename1 = path.resolve(__dirname, 'data1.txt')
var filename2 = path.resolve(__dirname, 'data2.txt')

var readStream = fs.createReadStream(filename1)
var writeStream = fs.createWriteStream(filename2)

readStream.pipe(writeStream)
readStream.on('data', chunk => {
  console.log(chunk.toString())
})
readStream.on('end', () => {
  console.log('copy complete')
})