const fs = require('fs')
const path = require('path')

const filename = path.resolve(__dirname, 'data.txt')

// fs.readFile(filename, (err, data) => {
//   if (err) {
//     console.log(err)
//     return
//   }
//   console.log(data.toString())
// })
const content = '7789798\n'
const opt = {
  flag: 'a' // 追加用a 覆盖用w
}
fs.writeFile(filename, content, opt, (err) => {
  if (err) {
    console.log(err)
  }
})
fs.exists(filename, (exist) => {
  console.log(exist)
})