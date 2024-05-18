const getPagingHistory = async (params) => {

    

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