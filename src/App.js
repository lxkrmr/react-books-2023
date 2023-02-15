import { useState } from 'react';
import BookCreate from './components/BookCreate';
import BookList from './components/BookList';

function App() {
  const [books, setBooks] = useState([]);

  const createBook = (title) => {
    const book = {
      id: Math.round(Math.random() * 9_999),
      title,
    };
    setBooks([...books, book]);
  };

  const deleteBook = (id) => {
    setBooks(books.filter((book) => book.id !== id));
  };

  const editBook = (id, title) => {
    setBooks(
      books.map((book) => {
        if (book.id === id) {
          return { ...book, title };
        }

        return book;
      })
    );
  };

  return (
    <div className="app">
      <h1>Reading List</h1>
      <BookList books={books} onDelete={deleteBook} onEdit={editBook} />
      <BookCreate onCreate={createBook} />
    </div>
  );
}

export default App;
