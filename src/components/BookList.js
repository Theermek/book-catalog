import React, { useState } from 'react';
import BookGroup from './BookGroup';
import groupBooks from '../utils/grouping';

const BookList = ({ books, deleteBook, sortMode, onUpdateBook }) => {
  const { groupedBooks, sortedKeys } = groupBooks(books, sortMode);
  const [editingBook, setEditingBook] = useState(null);

  return (
    <div className=''>
      {sortedKeys.map(key => (
        <BookGroup
          key={key}
          keyName={key}
          books={groupedBooks[key]}
          deleteBook={deleteBook}
          setEditingBook={setEditingBook}
          editingBook={editingBook}
          onUpdateBook={onUpdateBook}
        />
      ))}
    </div>
  );
};

export default BookList;
