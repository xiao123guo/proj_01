const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const empRouter = require('./api/emp')
const app = express()

app.use(cors())
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
app.use(empRouter)

app.listen(3000,()=>{
  console.log('listening...')
})