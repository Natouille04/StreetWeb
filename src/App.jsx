import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

import axios from "axios";

import Home from "./pages/Home.jsx";
import Login from "./pages/auth/Login.jsx"
import Register from "./pages/auth/Register.jsx";
import MiiEditor from "./pages/MiiEditor.jsx";

export default function App() {

  const apiUrl = import.meta.env.VITE_API_URL;

  axios.defaults.withCredentials = true;
  axios.defaults.withXSRFToken = true;
  axios.defaults.baseURL = apiUrl;

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />

        <Route
          path="/editor"
          element={
            <ProtectedRoute>
              <MiiEditor />
            </ProtectedRoute>
          }
        />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}