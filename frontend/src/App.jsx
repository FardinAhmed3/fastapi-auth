import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Pages/Login.jsx";
import Signup from "./Pages/Signup.jsx";
import ProtectedPage from "./Pages/Protected";
import ChangeCredentials from "./Pages/ChangeCredentials.jsx";

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/protected" element={<ProtectedPage />} />
          <Route path="/change-credentials" element={<ChangeCredentials/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
