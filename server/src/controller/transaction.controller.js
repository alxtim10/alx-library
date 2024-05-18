const express = require("express");
const router = express.Router();

const { borrowBook } = require("../service/transaction.service");


router.post("/", async (req, res) => {
  try {
    const newOrder = req.body;
    await borrowBook(newOrder);

    res.send({
      message: "Books borrowed",
    });
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = router;
