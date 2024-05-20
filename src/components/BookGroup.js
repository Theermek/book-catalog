import React from 'react';
import BookItem from './BookItem';

const BookGroup = ({ keyName, books, deleteBook, setEditingBook, editingBook, onUpdateBook }) => {
  return (
    <div className="mb-8 outline-2 outline-dashed outline-zinc-700 rounded-md bg-neutral-200">
      <h2 className="text-3xl border-2 border-dashed border-b-zinc-700 bg-neutral-300 font-semibold mb-2 px-4">{keyName}</h2>
      <ul className=" flex justify-center items-center flex-wrap px-10">
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
