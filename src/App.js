import { Routes, Route } from "react-router-dom";
import "./App.scss";
import HomePage from "./Pages/HomePage";
import ModalLogin from "./Components/Login Modal";
import Profile from "./Pages/Profile";
import { getUserWithStoredToken } from "./store/user/actions";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserWithStoredToken());
  }, [dispatch]);

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<ModalLogin />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </div>
  );
}

export default App;
