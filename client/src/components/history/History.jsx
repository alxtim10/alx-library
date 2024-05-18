import { useEffect, useState } from "react";
import { getPagingHistory } from "../../api/api";

const History = () => {
  const [history, setHistory] = useState([]);
  const [pageResponse, setPageResponse] = useState(1);

  const [request, setRequest] = useState({
    page: 1,
    size: 10,
  });

  async function getPaging(request) {
    if (request != null && request.year == 0) {
      request.year = null;
    }
    const response = await getPagingHistory(request);
    setHistory(response.data.history);
    setPageResponse(response.data);
  }

  useEffect(() => {
    getPaging(request);
  }, []);

  return (
    <section className="py-1 bg-blueGray-50">
      <h1 className="text-3xl mt-20 text-center text-blue-700 font-bold">
        Library History
      </h1>
      <div className="flex items-center justify-center gap-2 mt-5">
        <input
          className="w-full border border-gray-400 rounded-full py-2 px-4 outline-none text-sm shadow-md"
          type="text"
          placeholder="Nomor Induk Mahasiswa"
          onChange={(e) => {
            setRequest((prev) => ({
              ...prev,
              NIM: e.target.value,
            }));
          }}
        />
        <input
          className="w-full border border-gray-400 rounded-full py-2 px-4 outline-none text-sm shadow-md"
          type="text"
          placeholder="Student Name"
          onChange={(e) => {
            setRequest((prev) => ({
              ...prev,
              STUDENT_NAME: e.target.value,
            }));
          }}
        />
        <input
          className="w-full border border-gray-400 rounded-full py-2 px-4 outline-none text-sm shadow-md"
          type="text"
          placeholder="Title"
          onChange={(e) => {
            setRequest((prev) => ({
              ...prev,
              TITLE: e.target.value,
            }));
          }}
        />
        <button
          onClick={() => getPaging(request)}
          className="w-1/4 bg-blue-700 shadow-xl text-white py-1 px-3 text-sm rounded-md hover:bg-blue-900 transition-all"
        >
          Search
        </button>
      </div>
      <div className="w-full  mb-12 xl:mb-0 px-4 mx-auto mt-10">
        <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded ">
          <div className="block w-full overflow-x-auto">
            <table className="items-center bg-transparent w-full border-collapse ">
              <thead>
                <tr>
                  <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                    NIM
                  </th>
                  <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                    Student Name
                  </th>
                  <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                    Book ID
                  </th>
                  <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                    Title
                  </th>
                  <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                    Start Date
                  </th>
                  <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                    Return Date
                  </th>
                  <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                    Borrowing Time
                  </th>
                </tr>
              </thead>

              <tbody>
                {history.map((item, i) => {
                  return (
                    <tr key={i}>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
                        {item.NIM}
                      </td>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
                        {item.STUDENT_NAME}
                      </td>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
                        {item.BOOK_ID}
                      </td>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
                        {item.TITLE}
                      </td>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
                        {new Date(item.START_DATE).toLocaleDateString()}
                      </td>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
                        {new Date(item.RETURN_DATE).toLocaleDateString()}
                      </td>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
                        {item.BORROWING_TIME}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};

export default History;
