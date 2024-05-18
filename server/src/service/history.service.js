const prisma = require("../db");

const getPagingHistory = async (params) => {
  const pageNumber = parseInt(params.page, 10);
  const pageSize = parseInt(params.size, 10);

  const skip = (pageNumber - 1) * pageSize;
  const take = pageSize;

  const [history, totalHistory] = await Promise.all([
    prisma.history.findMany({
      where: {
        NIM: params.NIM
          ? { contains: params.NIM, mode: "insensitive" }
          : undefined,

        STUDENT_NAME: params.STUDENT_NAME
          ? { contains: params.STUDENT_NAME, mode: "insensitive" }
          : undefined,

        BOOK_ID: params.BOOK_ID
          ? { equals: Number(params.BOOK_ID) }
          : undefined,
          
        TITLE: params.TITLE
          ? { contains: params.TITLE, mode: "insensitive" }
          : undefined,
      },
      skip,
      take,
    }),
    prisma.history.count(),
  ]);

  const totalPages = Math.ceil(totalHistory / pageSize);

  if (history == null) {
    throw new Error("Data not Found");
  }

  const res = {
    totalHistory,
    totalPages,
    currentPage: pageNumber,
    pageSize,
    history,
  };

  return res;
};

module.exports = {
  getPagingHistory,
};
