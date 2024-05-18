const prisma = require("../db");

const borrowBook = async (params) => {
  const student = await prisma.students.findFirst({
    where: {
      STUDENT_ID: params.student_id,
    },
  });

  if (student.IS_ACTIVE) {
    const transaction = await prisma.transaction.create({
      data: {
        STUDENT_ID: params.student_id,
        TRANSACTION_DATE: new Date(params.transaction_date),
      },
    });

    let tempTransactionBooks = [];
    let tempHistory = [];

    for (let i = 0; i < params.books.length; i++) {
      const existingBook = await prisma.books.findFirst({
        where: {
          BOOK_ID: params.books[i].BOOK_ID,
        },
      });

      tempTransactionBooks.push({
        TRANSACTION_ID: transaction.TRANSACTION_ID,
        STUDENT_ID: params.student_id,
        BOOK_ID: params.books[i],
        START_DATE: new Date(params.start_date),
        RETURN_DATE: new Date(params.return_date),
      });
      tempHistory.push({
        NIM: student.NIM,
        STUDENT_NAME: student.STUDENT_NAME,
        BOOK_ID: params.books[i],
        TITLE: existingBook.TITLE,
        START_DATE: new Date(params.start_date),
        RETURN_DATE: new Date(params.return_date),
        BORROWING_TIME: String(
          Math.round(
            (new Date(params.return_date).getTime() -
              new Date(params.start_date).getTime()) /
              (1000 * 3600 * 24)
          ) + " Days"
        ),
      });

      await prisma.books.update({
        where: {
          BOOK_ID: existingBook.BOOK_ID,
        },
        data: {
          STOCK: { decrement: 1 },
        },
      });

      const existingBookShelfBooks = await prisma.bookshelfBooks.findFirst({
        where: {
          BOOK_ID: existingBook.BOOK_ID,
          BOOKSHELF_ID: params.bookshelf_id,
        },
      });

      await prisma.bookshelfBooks.update({
        where: {
          BOOKSHELF_BOOKS_ID: existingBookShelfBooks.BOOKSHELF_BOOKS_ID,
        },
        data: {
          STOCK: { decrement: 1 },
        },
      });
    }

    await prisma.transaction_Books.createMany({
      data: tempTransactionBooks,
    });

    await prisma.history.createMany({
      data: tempHistory,
    });

    return transaction;
  } else {
    throw new Error("Student is not active");
  }
};

module.exports = {
  borrowBook,
};
