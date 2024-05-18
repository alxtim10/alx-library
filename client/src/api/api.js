import axios from "axios";

const URL = "http://localhost:5000";

export const getPagingBooks = async (params) => {
  const res = await axios
    .get(URL + "/books", {
      params: params,
    })
    .catch((error) => {
      console.error(error);
    });
    return res;
};

export const getPagingHistory = async (params) => {
  const res = await axios
    .get(URL + "/history", {
      params: params,
    })
    .catch((error) => {
      console.error(error);
    });
    return res;
};

export const addBook = async (params) => {
  const res = await axios
    .post(URL + "/books", params)
    .then((res) => {
      return true;
    })
    .catch((error) => {
      console.error(error);
      return false;
    });
    return res;
};

export const getBookshelf = async () => {
  const res = await axios.get(URL + "/bookshelf").catch((error) => {
    console.error(error);
  });

  return res;
};

export const addStudent = async (params) => {
  const res = await axios
    .post(URL + "/students", params)
    .then((res) => {
      return true;
    })
    .catch((error) => {
      return false;
    });
    return res;
};

export const borrowBook = async (params) => {
  const res = await axios
    .post(URL + "/transaction", params)
    .then((res) => {
      return true;
    })
    .catch((error) => {
      return false;
    });

    return res;
};
