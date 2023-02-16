import { useContext, useState } from 'react';
import BooksContext from '../context/books';
import BookEdit from './BookEdit';

function BookShow({ book }) {
  const { deleteBook, editBook } = useContext(BooksContext);
  const [showEdit, setShowEdit] = useState(false);

  const handleEdit = () => {
    setShowEdit(!showEdit);
  };

  const handleDelete = () => {
    deleteBook(book.id);
  };

  const onSubmit = (id, title) => {
    setShowEdit(false);
    editBook(id, title);
  };

  const content = showEdit ? (
    <BookEdit book={book} onSubmit={onSubmit} />
  ) : (
    <h3>{book.title}</h3>
  );

  return (
    <div className="book-show">
      <img
        alt="book-cover"
        src={`https://picsum.photos/id/${book.id}/300/200`}
      />
      <div>{content}</div>
      <div className="actions">
        <button className="edit" onClick={handleEdit}>
          Edit
        </button>
        <button className="delete" onClick={handleDelete}>
          Delete
        </button>
      </div>
    </div>
  );
}

export default BookShow;
