import React, { useState, useEffect } from 'react';
import { getAuthors, createAuthor, updateAuthor, deleteAuthor } from '../../../_services/authors';

export default function AuthorsAdmin() {
  const [authors, setAuthors] = useState([]);
  const [name, setName] = useState('');
  const [bio, setBio] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchAuthors();
  }, []);

  const fetchAuthors = async () => {
    try {
      setLoading(true);
      const data = await getAuthors();
      setAuthors(Array.isArray(data) ? data : data.data || []);
    } catch (error) {
      console.error("Gagal memuat author:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    try {
      if (editingId) {
        await updateAuthor(editingId, { name, bio });
        setEditingId(null);
      } else {
        await createAuthor({ name, bio });
      }
      setName('');
      setBio('');
      fetchAuthors();
    } catch (error) {
      console.error("Gagal menyimpan author:", error);
    }
  };

  const handleEdit = (author) => {
    setEditingId(author.id || author._id);
    setName(author.name);
    setBio(author.bio);
  };

  const handleDelete = async (id) => {
    if (confirm('Apakah Anda yakin ingin menghapus author ini?')) {
        try {
            await deleteAuthor(id);
            const updated = await getAuthors();
            setAuthors(updated);
        } catch (error) {
            console.error("Gagal menghapus author:", error);
        }
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Manajemen Author</h1>
      
      {/* Form Tambah / Edit */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-lg font-semibold mb-4">
          {editingId ? 'Edit Author' : 'Tambah Author Baru'}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Nama Author..."
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <textarea
            placeholder="Biografi singkat..."
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            rows="3"
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
                onClick={() => { setEditingId(null); setName(''); setBio(''); }}
                className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition"
              >
                Batal
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Tabel Daftar Author */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <h2 className="text-lg font-semibold p-6 border-b">Daftar Author</h2>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-100 border-b">
              <th className="p-4 font-semibold text-gray-700 w-16">No</th>
              <th className="p-4 font-semibold text-gray-700">Nama Author</th>
              <th className="p-4 font-semibold text-gray-700">Biografi</th>
              <th className="p-4 font-semibold text-gray-700 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="4" className="p-6 text-center text-gray-500">Memuat data...</td>
              </tr>
            ) : authors.length === 0 ? (
              <tr>
                <td colSpan="4" className="p-6 text-center text-gray-500">Belum ada data author.</td>
              </tr>
            ) : (
              authors.map((author, index) => (
                <tr key={author.id || author._id} className="border-b hover:bg-gray-50">
                  <td className="p-4">{index + 1}</td>
                  <td className="p-4 font-medium">{author.name}</td>
                  <td className="p-4 text-gray-600">{author.bio}</td>
                  <td className="p-4 text-right space-x-2">
                    <button
                      onClick={() => handleEdit(author)}
                      className="bg-yellow-500 text-white px-3 py-1 rounded text-sm hover:bg-yellow-600 transition"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(author.id || author._id)}
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