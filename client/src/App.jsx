import { Route, Routes } from "react-router-dom";
import Navbar from "./components/navbar/Navbar.jsx";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<h1>Vite + React</h1>} />
      </Routes>
    </>
  );
}

export default App;
