const STORAGE_KEY = 'booksales_authors';

export const getAuthors = async () => {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
};

export const showAuthor = async (id) => {
    const authors = await getAuthors();
    return authors.find(a => a.id == id || a._id == id) || null;
};

export const createAuthor = async (data) => {
    const authors = await getAuthors();
    const newAuthor = { id: Date.now(), ...data };
    authors.push(newAuthor);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(authors));
    return newAuthor;
};

export const updateAuthor = async (id, data) => {
    let authors = await getAuthors();
    authors = authors.map(a => (a.id == id || a._id == id ? { ...a, ...data } : a));
    localStorage.setItem(STORAGE_KEY, JSON.stringify(authors));
    return data;
};

export const deleteAuthor = async (id) => {
    let authors = await getAuthors();
    authors = authors.filter(a => a.id != id && a._id != id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(authors));
    return { success: true };
};