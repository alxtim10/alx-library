const express = require("express");
const router = express.Router();

const { getBookshelf } = require("../service/bookshelf.service");

router.get("/", async (req, res) => {
    try {
      const bookshelf = await getBookshelf();
      res.send(bookshelf);
    } catch (error) {
      res.status(404).send(error.message);
    }
  });

  module.exports = router;