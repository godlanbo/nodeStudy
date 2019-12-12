const fs = require('fs')
const path = require('path')

// function getFileContent (filename, callback) {
//   const fullFileName = path.resolve(__dirname, 'files', filename)
//   fs.readFile(fullFileName, (err, data) => {
//     if (err) {
//       console.error(err)
//       return
//     }
//     callback(JSON.parse(data.toString()))
//   })
// }

// getFileContent('a.json', aData => {
//   console.log('a data', aData)
//   getFileContent(aData.next, bData => {
//     console.log('b data', bData)
//     getFileContent(bData.next, cData => {
//       console.log('c data', cData)
//     })
//   })
// })

function getFileContent (filename) {
  const promise = new Promise((resolve, reject) => {
    const fullFileName = path.resolve(__dirname, 'files', filename)
    fs.readFile(fullFileName, (err, data) => {
      if (err) {
        reject(err)
        return
      }
      resolve(JSON.parse(data.toString()))
    })
  })
  return promise
}

// getFileContent('a.json').then(aData => {
//   console.log('a Data ', aData)
//   return getFileContent(aData.next)
// }).then(bData => {
//   console.log('b Data ', bData)
//   return getFileContent(bData.next)
// }).then(cData => {
//   console.log('c Data ', cData)
// })

// async function readFileData() {
//   const aData = await getFileContent('a.json')
//   console.log('a Data ', aData)
//   const bData = await getFileContent(aData.next)
//   console.log('b Data ', bData)
//   const cData = await getFileContent(bData.next)
//   console.log('c Data ', cData)
// }

// readFileData()

async function readAData() {
  const aData = await getFileContent('a.json')
  return aData
}
async function test(){
  const data = await readAData()
  console.log(data)
}

test()