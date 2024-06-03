const mysql = require('mysql')

// 创建连接池
const pool = mysql.createPool({
  host:'127.0.0.1',
  user:'root',
  password:'123456',
  database:'student'
})

// sql
const executeSQL = (sql,values)=>{
  return new Promise((resolve,reject)=>{
    pool.getConnection((err,connection)=>{
      if(err){
        reject(err)
        return;
      }
      //connection.query:用于执行sql查询，返回查询结果
      connection.query(sql,values,(err,result)=>{
        connection.release()
        if(err){
          reject(err)
        }else{
          resolve(result)
        }
      })
    })
  })
}

module.exports = {
  pool,
  executeSQL
}