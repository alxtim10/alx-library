const express = require('express')
const bodyparser = require('body-parser')
const app = express()
app.use(bodyparser.json())

app.get("/", ()=>console.log('asdadsads'))

app.listen(5000, ()=>console.log('listen on port 50000'))