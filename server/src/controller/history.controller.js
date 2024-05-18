const express = require("express");
const router = express.Router();

const { getPagingHistory } = require("../service/history.service");

router.get("/", async (req, res) => {
  try {
    const params = req.query;
    const books = await getPagingHistory(params);

    res.send(books);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = router;
