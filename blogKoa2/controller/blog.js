const { exec, escape } = require('../db/mysql')
const xss = require('xss')

const getList = async (author, keyword) => {
  keyword = escape(keyword)
  let sql = `select * from blogs where 1=1 `
  if (author) {
    sql += `and author='${author}'`
  }
  if (keyword === "") {
    sql += `and title like %${keyword}%`
  }
  sql += `order by createtime desc;`

  return await exec(sql)
}

const getDetail = async (id) => {
  const sql = `select * from blogs where id='${id}'`
  return (await exec(sql))[0]
  // return await exec(sql).then(rows => {
  //   return rows[0]
  // })
}

const newBlog = async (blogData = {}) => {
  // blogData 是博客数据对象
  let title = xss(blogData.title)
  let content = xss(blogData.content)
  title = escape(title)
  content = escape(content)
  const author = blogData.author
  const createtime = Date.now()

  const sql = `
    insert into blogs (title, content, createtime, author)
    value (${title}, ${content}, '${createtime}', '${author}');
  `
  const insertData = await exec(sql)
  return {id: insertData.insertId}
  // return await exec(sql).then(insertData => {
  //   return {id: insertData.insertId}
  // })
}

const updateBlog = async (id, blogData = {}) => {
  let title = xss(blogData.title)
  let content = xss(blogData.content)
  title = escape(title)
  content = escape(content)

  const sql = `
    update blogs set title=${title}, content=${content} where id='${id}';
  `
  const updateData = await exec(sql)
  return updateData.affectedRows > 0
  // return exec(sql).then(updateData => {
  //   if (updateData.affectedRows > 0) {
  //     return true
  //   }
  //   return false
  // })
}

const delBlog = async (id, author) => {
  const sql = `
    delete from blogs where id='${id}' and author='${author}';
  `
  const delData = await exec(sql)
  return delData.affectedRows > 0
  // return exec(sql).then(delData => {
  //   if (delData.affectedRows > 0) {
  //     return true
  //   }
  //   return false
  // })
}
module.exports = {
  getList,
  getDetail,
  newBlog,
  updateBlog,
  delBlog
}