const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const app = express()

const empRouter = require('./api/emp')
/**
 * 当初始启动服务访问/list时：如果产生报错：
 * Error: ER_NOT_SUPPORTED_AUTH_MODE: Client does not support authentication protocol requested by server; 
 * consider upgrading MySQL client...
 * 原因：最新的mysql模块并未完全支持MySQL的“caching_sha2_password”加密方式，而“caching_sha2_password”在MySQL中是默认的加密方式。
 * 因此，下面的方式命令是默认已经使用了“caching_sha2_password”加密方式，该账号、密码无法在mysql模块中使用。
 * 解决办法：
 * 解决方法是从新修改用户root的密码，并指定mysql模块能够支持的加密方式。
 * mysql> ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '123456';
 * 然后重新启动服务：node index.js
 */
// app.get('/list',async(req,res)=>{
//   try{
//     const sql = `SELECT * FROM emp;`
//     const result = await executeSQL(sql)
//     res.send({
//       result,
//       code:200
//     })
//   }catch(error){
//     console.log(error)
//     res.status(500).send('Internal Server Error')
//   }
// })
app.use(cors())
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
app.use(empRouter)

app.listen(3000,()=>{
  console.log('listening...')
})