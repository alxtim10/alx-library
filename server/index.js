const express = require('express')
const bodyparser = require('body-parser')
const app = express()
app.use(bodyparser.json())


app.listen(5000, ()=>console.log('listen on port 50000'))

const bookshelfController = require("./src/controller/bookshelf.controller");
const booksController = require("./src/controller/books.controller");
const studentsController = require("./src/controller/students.controller");
const transactionController = require("./src/controller/transaction.controller");

app.use("/bookshelf", bookshelfController);
app.use("/books", booksController);
app.use("/students", studentsController);
app.use("/transaction", transactionController);