import React from 'react';
import BookItem from './BookItem';

const BookGroup = ({ keyName, books, deleteBook, setEditingBook, editingBook, onUpdateBook }) => {
  return (
    <div className="mb-4">
      <h2 className="text-xl font-semibold mb-2">{keyName}</h2>
      <ul className="list-disc list-inside">
        {books.map(book => (
          <BookItem
            key={book.id}
            book={book}
            deleteBook={deleteBook}
            setEditingBook={setEditingBook}
            editingBook={editingBook}
            onUpdateBook={onUpdateBook}
          />
        ))}
      </ul>
    </div>
  );
};

export default BookGroup;
