const mysql = require('mysql')

// 创建连接池
const pool = mysql.createPool({
  host:'127.0.0.1', //服务器地址
  user:'root',  //账号
  password:'123456', //密码
  database:'student' //数据库名称
})

// 封装sql执行函数
const executeSQL = (sql,values)=>{
  return new Promise((resolve,reject)=>{
    pool.getConnection((err,connection)=>{
      if(err){
        reject(err)
        return;
      }
/**
 * connection.query() 方法通常用于执行SQL查询，并返回查询结果。它通常接受一个SQL字符串作为参数，
 * 以及可选的参数数组（用于查询中的占位符），并返回一个Promise或回调，解析为查询结果。
 * 在开发项目时，建立一个数据库连接所消耗的性能成本是比较高的，如果为每一个接收到的客户端请求都建立一个或者多个数据库连接，将会严重降低应用程序的性能，因此，通常需要为多个数据库连接创建并维护一个连接池，当连接不再需要使用时，这些连接可以缓存在连接池中，当接收到下一个客户端请求时，可以从连接池中取出连接并重新利用，而不需要再重新建立数据库连接

在mysql模块中，使用createPool方法创建连接池，在建立了连接池之后，
可以直接使用连接池对象的getConnection方法从连接池中获取一个连接，如果连接池中没有可用连接，将隐式的建立一个数据库连接。
connection.release() 当一个连接不需要使用时，使用该方法将其归还到连接池中
 */
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