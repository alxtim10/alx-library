import { Route, Routes } from "react-router-dom";
import Navbar from "./components/navbar/Navbar.jsx";
import Homepage from "./components/home/Homepage.jsx";

function App() {
  return (
    <>
      <div className="mx-5 md:mx-16 lg:mx-32 xl:mx-[20rem] pb-5">
        <Navbar />
        <Routes>
          <Route path="/" element={<Homepage />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
