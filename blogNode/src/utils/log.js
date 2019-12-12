const fs = require('fs')
const path = require('path')
// 写日志函数
function writeLog(writeStream, log) {
  writeStream.write(log + '\n')
}

function createWriteStream(filename) {
  const fullfilename = path.join(__dirname, '../', '../', 'logs', filename)
  const writeStream = fs.createWriteStream(fullfilename, {
    flags: 'a'
  })
  return writeStream
}
const accessWriteStream = createWriteStream('access.log')
const eventWriteStream = createWriteStream('event.log')
const errorWriteStream = createWriteStream('error.log')
// 写访问日志
function access(log) {
  writeLog(accessWriteStream, log)
}
// 写报错日志
function error(log) {
  writeLog(errorWriteStream, log)
}
// 写事件日志
function event(log) {
  writeLog(eventWriteStream, log)
}
module.exports = {
  access,
  error,
  event
}