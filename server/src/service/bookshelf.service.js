const prisma = require('../db')

const getBookshelf = async () => {
    const bookshelf = await prisma.bookshelf.findMany();

      if(bookshelf == null){
        throw new Error("Data not Found");
      }
    
      return bookshelf; 
}

module.exports = {
  getBookshelf
}