const express = require("express");
const router = express.Router();

const { getBookshelfById } = require("../service/bookshelf.service");

router.get("/:id", async (req, res) => {
    try {
      const bookshelfId = parseInt(req.params.id);
      const bookshelf = await getBookshelfById(bookshelfId);
  
      res.send(bookshelf);
    } catch (error) {
      res.status(404).send(error.message);
    }
  });

  module.exports = router;