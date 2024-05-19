import React from 'react';
import EditBookForm from './EditBookForm';

const BookItem = ({ book, deleteBook, setEditingBook, editingBook, onUpdateBook }) => {
  // Проверка и преобразование авторов в строку
  const authors = Array.isArray(book.authors) ? book.authors.join(', ') : book.authors;

  return (
    <li className="mb-2">
      {editingBook && editingBook.id === book.id ? (
        <EditBookForm book={editingBook} onUpdateBook={onUpdateBook} onCancel={() => setEditingBook(null)} />
      ) : (
        <div className="flex justify-between items-center">
          <div>
            <h4 className="text-lg font-bold">{book.title}</h4>
            <p>Автор: {authors}</p>
            {book.year ? <p>Год: {book.year}</p> : null}
            <p>Рейтинг: {book.rating}</p>
            {book.isbn ? <p>ISBN: {book.isbn}</p> : null}
          </div>
          <div>
            <button onClick={() => deleteBook(book.id)} className="bg-red-500 text-white p-1 ml-4">x</button>
            <button onClick={() => setEditingBook(book)} className="bg-blue-500 text-white p-1 ml-4">Редактировать</button>
          </div>
        </div>
      )}
    </li>
  );
};

export default BookItem;
