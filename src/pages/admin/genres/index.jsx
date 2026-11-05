import React, { useEffect, useState } from "react";
import { getGenres, createGenre } from "../../../_services/genres";

export default function GenresAdmin() {
  const [genres, setGenres] = useState([]);
  const [name, setName] = useState("");

  // Fungsi ambil data (Read)
  const fetchGenres = async () => {
    try {
      const data = await getGenres();
      setGenres(data);
    } catch (error) {
      console.error("Gagal memuat genres:", error);
    }
  };

  useEffect(() => {
    fetchGenres();
  }, []);

  // Fungsi tambah data (Create)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createGenre({ name });
      setName("");
      fetchGenres(); // Refresh data setelah tambah
      alert("Genre berhasil ditambahkan!");
    } catch (error) {
      console.error("Gagal menambah genre:", error);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Manajemen Genre</h1>

      {/* Form Create */}
      <form onSubmit={handleSubmit} className="mb-6 bg-white p-4 rounded shadow">
        <h2 className="text-lg font-semibold mb-2">Tambah Genre Baru</h2>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Nama Genre..."
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border px-3 py-2 rounded w-full"
            required
          />
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            Simpan
          </button>
        </div>
      </form>

      {/* Tabel Read */}
      <div className="bg-white p-4 rounded shadow">
        <h2 className="text-lg font-semibold mb-2">Daftar Genre</h2>
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100 border-b">
              <th className="p-2 text-left">No</th>
              <th className="p-2 text-left">Nama Genre</th>
            </tr>
          </thead>
          <tbody>
            {genres.length > 0 ? (
              genres.map((genre, index) => (
                <tr key={genre.id || index} className="border-b">
                  <td className="p-2">{index + 1}</td>
                  <td className="p-2">{genre.name}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="2" className="p-4 text-center text-gray-500">Belum ada data genre.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}