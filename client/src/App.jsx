import { Route, Routes } from "react-router-dom";
import Navbar from "./components/navbar/Navbar.jsx";
import Homepage from "./components/home/Homepage.jsx";
import Books from "./components/books/Books.jsx";
import Students from "./components/students/Students.jsx";
import Transaction from "./components/transaction/Transaction.jsx";
import History from "./components/history/History.jsx";

function App() {
  return (
    <>
      <div className="mx-5 md:mx-16 lg:mx-32 xl:mx-[20rem] pb-5">
        <Navbar />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/books" element={<Books />} />
          <Route path="/students" element={<Students />} />
          <Route path="/transaction" element={<Transaction />} />
          <Route path="/history" element={<History />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
