const express = require('express')
const { executeSQL } = require('../config')

const router = express.Router()

router.get('/list',async(req,res)=>{
  try{
    // 访问所有员工的信息
    const sql = `SELECT * FROM emp`
    const data = await executeSQL(sql)
    res.send({
      data,
      code:200
    })
  }catch(error){
    console.log(error)
    res.status(500).send('Internal Server Error')
  }
})

router.post('/del',async(req,res)=>{
  try{
    const {id} = req.body
    const sql = `DELETE FROM emp WHERE id=${id}`
    const data = await executeSQL(sql)
    res.send({
      data,
      code:200
    })
  }catch(error){
    console.log(error)
    res.status(500).send('Internal Server Error')
  }
})

router.post('/add',async(req,res)=>{
  try{
    const {name} = req.body
    const sql = `INSERT INTO emp (name) VALUE ('${name}')`
    const data = await executeSQL(sql)
    res.send({
      data,
      code:200
    })
  }catch(error){
    console.log(error)
    res.status(500).send('Internal Server Error')
  }
})

module.exports = router