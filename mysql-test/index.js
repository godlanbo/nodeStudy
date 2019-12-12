const mysql = require('mysql')

const con = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'jyl62166123',
  port: '3306',
  database: 'myblog'
})

con.connect()

const sql = `insert into blogs(title, content, createtime, author)values('标题2','内容2','1575809618952','zhangsan');`
con.query(sql, (err, result) => {
  if (err) {
    console.log(err)
    return
  }
  console.log(result)
})

con.end()

