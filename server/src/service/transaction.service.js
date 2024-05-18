const prisma = require("../db");

const borrowBook = async (params) => {
  const student = await prisma.students.findFirst({
    where: {
      NIM: params.nim,
    },
  });

  if (student != null) {
    if (student.IS_ACTIVE) {
      const transaction = await prisma.transaction.create({
        data: {
          STUDENT_ID: student.STUDENT_ID,
          TRANSACTION_DATE: new Date(params.start_date),
        },
      });

      let tempTransactionBooks = [];
      let tempHistory = [];

      for (let i = 0; i < params.books.length; i++) {
        const existingBook = await prisma.books.findFirst({
          where: {
            BOOK_ID: params.books[i],
          },
        });

        tempTransactionBooks.push({
          TRANSACTION_ID: transaction.TRANSACTION_ID,
          STUDENT_ID: student.STUDENT_ID,
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
            STOCK: { gt: 0 },
          },
        });

        if (existingBookShelfBooks) {
          let bookshelfbooksid = existingBookShelfBooks.BOOKSHELF_BOOKS_ID;
          await prisma.bookshelfBooks.update({
            where: {
              BOOKSHELF_BOOKS_ID: bookshelfbooksid,
            },
            data: {
              STOCK: { decrement: 1 },
            },
          });
        }
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
  } else {
    throw new Error("Student not exists");
  }
};

module.exports = {
  borrowBook,
};
