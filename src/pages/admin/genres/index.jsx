import React, { useState, useEffect } from 'react';
import { getGenres, createGenre, updateGenre, deleteGenre } from '../../../_services/genres';

export default function GenresAdmin() {
  const [genres, setGenres] = useState([]);
  const [name, setName] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchGenres();
  }, []);

  const fetchGenres = async () => {
    try {
      setLoading(true);
      const data = await getGenres();
      setGenres(Array.isArray(data) ? data : data.data || []);
    } catch (error) {
      console.error("Gagal memuat genre:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    try {
      if (editingId) {
        await updateGenre(editingId, { name });
        setEditingId(null);
      } else {
        await createGenre({ name });
      }
      setName('');
      fetchGenres();
    } catch (error) {
      console.error("Gagal menyimpan genre:", error);
    }
  };

  const handleEdit = (genre) => {
    setEditingId(genre.id || genre._id);
    setName(genre.name);
  };

  const handleDelete = async (id) => {
    if (confirm('Apakah Anda yakin ingin menghapus genre ini?')) {
        try {
            await deleteGenre(id);
            const updated = await getGenres();
            setGenres(updated);
        } catch (error) {
            console.error("Gagal menghapus genre:", error);
        }
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Manajemen Genre</h1>
      
      {/* Form Tambah / Edit */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-lg font-semibold mb-4">
          {editingId ? 'Edit Genre' : 'Tambah Genre Baru'}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Nama Genre..."
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div className="flex gap-4">
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition"
            >
              {editingId ? 'Update' : 'Simpan'}
            </button>
            {editingId && (
              <button
                type="button"
                onClick={() => { setEditingId(null); setName(''); }}
                className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition"
              >
                Batal
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Tabel Daftar Genre */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <h2 className="text-lg font-semibold p-6 border-b">Daftar Genre</h2>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-100 border-b">
              <th className="p-4 font-semibold text-gray-700 w-16">No</th>
              <th className="p-4 font-semibold text-gray-700">Nama Genre</th>
              <th className="p-4 font-semibold text-gray-700 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="3" className="p-6 text-center text-gray-500">Memuat data...</td>
              </tr>
            ) : genres.length === 0 ? (
              <tr>
                <td colSpan="3" className="p-6 text-center text-gray-500">Belum ada data genre.</td>
              </tr>
            ) : (
              genres.map((genre, index) => (
                <tr key={genre.id || genre._id} className="border-b hover:bg-gray-50">
                  <td className="p-4">{index + 1}</td>
                  <td className="p-4 font-medium">{genre.name}</td>
                  <td className="p-4 text-right space-x-2">
                    <button
                      onClick={() => handleEdit(genre)}
                      className="bg-yellow-500 text-white px-3 py-1 rounded text-sm hover:bg-yellow-600 transition"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(genre.id || genre._id)}
                      className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600 transition"
                    >
                      Hapus
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}