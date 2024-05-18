const prisma = require("../db");

const addStudent = async (params) => {
  const existing = await prisma.students.findFirst({
    where: {
      STUDENT_NAME: params.name,
      NIM: params.nim,
    },
  });

  if (existing != null) {
    throw new Error("Student already registered");
  }

  const student = await prisma.students.create({
    data: {
      STUDENT_NAME: params.name,
      NIM: params.nim,
      IS_ACTIVE: true,
    },
  });
  return student;
};

module.exports = {
  addStudent,
};
