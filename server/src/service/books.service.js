const prisma = require("../db");

const getPagingBooks = async (params) => {
  const books = await prisma.books.findMany({
    where: {
      OR: [
        {
          TITLE: { contains: params.title, mode: "insensitive" },
        },
        {
          AUTHOR: { contains: params.author, mode: "insensitive" },
        },
        {
          RELEASE_YEAR: { equals: Number(params.year) },
        },
      ],
    },
  });

  if (books == null) {
    throw new Error("Data not Found");
  }

  return books;
};

const addBook = async (params) => {
  const existingBook = await prisma.books.findFirst({
    where: {
      TITLE: params.title,
      AUTHOR: params.author,
      RELEASE_YEAR: params.year,
    },
  });

  if (existingBook != null) {
    await prisma.books.update({
      where: {
        BOOK_ID: existingBook.BOOK_ID,
      },
      data: {
        STOCK: existingBook.STOCK + 1,
      },
    });

    const existingBookShelfBooks = await prisma.bookshelfBooks.findFirst({
      where: {
        BOOKSHELF_ID: params.bookshelf_id,
        BOOK_ID: existingBook.BOOK_ID,
      },
    });

    if (existingBookShelfBooks != null) {
      await prisma.bookshelfBooks.update({
        where: {
          BOOKSHELF_BOOKS_ID: existingBookShelfBooks.BOOKSHELF_BOOKS_ID,
        },
        data: {
          STOCK: existingBookShelfBooks.STOCK + 1,
        },
      });
    } else {
      await prisma.bookshelfBooks.create({
        data: {
          BOOKSHELF_ID: params.bookshelf_id,
          BOOK_ID: existingBook.BOOK_ID,
          STOCK: 1,
        },
      });
    }

    return;
  } else {
    const book = await prisma.books.create({
      data: {
        TITLE: params.title,
        AUTHOR: params.author,
        RELEASE_YEAR: params.year,
        STOCK: 1,
      },
    });

    await prisma.bookshelfBooks.create({
      data: {
        BOOKSHELF_ID: params.bookshelf_id,
        BOOK_ID: book.BOOK_ID,
        STOCK: 1,
      },
    });
    return;
  }
};

module.exports = {
  getPagingBooks,
  addBook,
};
