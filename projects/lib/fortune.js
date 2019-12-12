var fortuneCookies = [
  "1111111111",
  "2222222222",
  "3333333333",
  "4444444444"
]

exports.getFortune = ()=>{
  var idx = Math.floor(Math.random() * fortuneCookies.length)
  return fortuneCookies[idx]
}