import { Routes, Route } from "react-router-dom";
import "./App.scss";
import HomePage from "./Pages/HomePage";
import ModalLogin from "./Components/Login Modal";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage />} />
        {/* <Route path="/signup" element={<SignUp />} /> */}
        <Route path="/login" element={<ModalLogin />} />
      </Routes>
    </div>
  );
}

export default App;
