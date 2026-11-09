import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import GenresAdmin from "./pages/admin/genres";
import AuthorsAdmin from "./pages/admin/authors";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 flex">
        {/* Sidebar Navigasi */}
        <aside className="w-64 bg-slate-800 text-white p-5 flex flex-col gap-4">
          <h1 className="text-xl font-bold mb-4">Booksales Admin</h1>
          <Link to="/admin/genres" className="hover:bg-slate-700 p-2 rounded">
            Manajemen Genre
          </Link>
          <Link to="/admin/authors" className="hover:bg-slate-700 p-2 rounded">
            Manajemen Author
          </Link>
          <div className="border-t border-slate-700 my-2"></div>
          <Link to="/login" className="hover:bg-indigo-600 p-2 rounded bg-indigo-500 text-center font-medium">
            Login
          </Link>
          <Link to="/register" className="hover:bg-slate-700 p-2 rounded text-center">
            Register
          </Link>
        </aside>

        {/* Konten Utama */}
        <main className="flex-1 p-6">
          <Routes>
            <Route path="/admin/genres" element={<GenresAdmin />} />
            <Route path="/admin/authors" element={<AuthorsAdmin />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}