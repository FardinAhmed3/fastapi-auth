import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Pages/Login.jsx";
import ProtectedPage from "./Pages/Protected";

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/protected" element={<ProtectedPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
