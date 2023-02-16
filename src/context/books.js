import { createContext, useState, useCallback } from 'react';
import axios from 'axios';

const BooksContext = createContext();

function Provider({ children }) {
  const [books, setBooks] = useState([]);

  const fetchBooks = useCallback(async () => {
    const response = await axios.get('http://localhost:3001/books');
    setBooks(response.data);
  }, []);

  const createBook = async (title) => {
    const response = await axios.post('http://localhost:3001/books', {
      title,
    });

    setBooks([...books, response.data]);
  };

  const deleteBook = async (id) => {
    await axios.delete(`http://localhost:3001/books/${id}`);
    setBooks(books.filter((book) => book.id !== id));
  };

  const editBook = async (id, title) => {
    const response = await axios.put(`http://localhost:3001/books/${id}`, {
      title,
    });

    setBooks(
      books.map((book) => {
        if (book.id === id) {
          return { ...book, ...response.data };
        }

        return book;
      })
    );
  };

  const valueToShare = {
    books,
    fetchBooks,
    createBook,
    deleteBook,
    editBook,
  };

  return (
    <BooksContext.Provider value={valueToShare}>
      {children}
    </BooksContext.Provider>
  );
}

export { Provider };
export default BooksContext;
