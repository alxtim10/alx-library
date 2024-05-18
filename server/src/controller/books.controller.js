const express = require("express");
const router = express.Router();

const { getPagingBooks, addBook } = require("../service/books.service");

router.get("/", async (req, res) => {
  try {
    const params = req.query;
    const books = await getPagingBooks(params);

    res.send(books);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.post("/", async (req, res) => {
  try {
    const newBook = req.body;
    await addBook(newBook);

    res.send({
      message: "Book Added.",
    });
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = router;
