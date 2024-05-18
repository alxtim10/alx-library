const prisma = require('../db')

const getBookshelfById = async (id) => {
    const bookshelf = await prisma.bookshelf.findUnique({
        where: {
          BOOKSHELF_ID: id,
        },
      });

      if(bookshelf == null){
        throw new Error("Data not Found");
      }
    
      return bookshelf; 
}

module.exports = {
    getBookshelfById
}