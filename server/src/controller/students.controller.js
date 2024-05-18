const express = require("express");
const router = express.Router();

const { addStudent } = require("../service/students.service");


router.post("/", async (req, res) => {
  try {
    const newStudent = req.body;
    await addStudent(newStudent);

    res.send({
      message: "Student Added.",
    });
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = router;
