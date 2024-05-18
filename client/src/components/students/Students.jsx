import { useState } from "react";
import { addStudent } from "../../api/api";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Students = () => {
  const navigate = useNavigate();
  const [request, setRequest] = useState({
    nim: "",
    name: "",
  });

  const handleSubmit = () => {
    if (request.nim != "" && request.name != "") {
      const res = addStudent(request);
      if (res) {
        toast.success("Student added", {
          position: "top-right",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        setRequest({
          nim: "",
          name: "",
        });
        setTimeout(() => {
          navigate("/");
        }, 1500);
      }
    } else {
      toast.error("Fill all fields", {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <section className="flex items-center justify-center w-full mt-44">
        <div className="w-full shadow-xl rounded-lg bg-slate-300 p-5 px-10 flex flex-col items-center justify-center sm:w-[30rem]">
          <h1 className="font-bold text-2xl text-center mb-5">Student</h1>
          <div className="w-full grid grid-cols-1 gap-4">
            <div className="relative">
              <label className="text-md font-outfit font-bold">
                Nomor Induk Mahasiswa
              </label>
              <input
                className="mt-1 w-full bg-zinc-200 text-zinc-600  ring-1 ring-zinc-400 focus:ring-2 focus:ring-blue-400 outline-none duration-300 placeholder:text-zinc-600 placeholder:opacity-50 rounded-sm px-4 py-1 shadow-md focus:shadow-lg focus:shadow-blue-400"
                placeholder="NIM"
                type="text"
                onChange={(e) => {
                  setRequest((prev) => ({
                    ...prev,
                    nim: e.target.value,
                  }));
                }}
              />
            </div>
            <div className="relative">
            <label className="text-md font-outfit font-bold">
                Name
              </label>
              <input
                className="mt-1 w-full bg-zinc-200 text-zinc-600  ring-1 ring-zinc-400 focus:ring-2 focus:ring-blue-400 outline-none duration-300 placeholder:text-zinc-600 placeholder:opacity-50 rounded-sm px-4 py-1 shadow-md focus:shadow-lg focus:shadow-blue-400"
                placeholder="NIM"
                type="text"
                onChange={(e) => {
                  setRequest((prev) => ({
                    ...prev,
                    name: e.target.value,
                  }));
                }}
              />
              
            </div>
          </div>
          <button
            onClick={handleSubmit}
            className="mt-6 hover:brightness-110  font-bold py-3 px-6 rounded-full bg-blue-700 shadow-lg shadow-blue-700/50 text-white"
          >
            Submit
          </button>
        </div>
      </section>
    </>
  );
};

export default Students;
