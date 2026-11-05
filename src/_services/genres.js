const STORAGE_KEY = 'booksales_genres';

export const getGenres = async () => {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
};

export const createGenre = async (data) => {
    const genres = await getGenres();
    const newGenre = { id: Date.now(), ...data };
    genres.push(newGenre);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(genres));
    return newGenre;
};

export const updateGenre = async (id, data) => {
    let genres = await getGenres();
    genres = genres.map(g => (g.id === id || g._id === id ? { ...g, ...data } : g));
    localStorage.setItem(STORAGE_KEY, JSON.stringify(genres));
    return data;
};

export const deleteGenre = async (id) => {
    let genres = await getGenres();
    genres = genres.filter(g => g.id !== id && g._id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(genres));
    return { success: true };
};