import React, { useState } from 'react';
import EditBookForm from './EditBookForm';

const groupBooks = (books, sortMode) => {
  const groupedBooks = {};

  if (sortMode === 'year') {
    books.forEach(book => {
      const year = book.year || 'Без года';
      if (!groupedBooks[year]) {
        groupedBooks[year] = [];
      }
      groupedBooks[year].push(book);
    });

    const sortedYears = Object.keys(groupedBooks).sort((a, b) => b - a);
    sortedYears.forEach(year => {
      groupedBooks[year].sort((a, b) => a.title.localeCompare(b.title));
    });

    return { groupedBooks, sortedKeys: sortedYears };
  }

  if (sortMode === 'rating') {
    books.forEach(book => {
      const rating = book.rating || 0;
      if (!groupedBooks[rating]) {
        groupedBooks[rating] = [];
      }
      groupedBooks[rating].push(book);
    });

    const sortedRatings = Object.keys(groupedBooks).sort((a, b) => b - a);
    sortedRatings.forEach(rating => {
      groupedBooks[rating].sort((a, b) => a.title.localeCompare(b.title));
    });

    return { groupedBooks, sortedKeys: sortedRatings };
  }

  if (sortMode === 'author') {
    books.forEach(book => {
      book.authors.forEach(author => {
        if (!groupedBooks[author]) {
          groupedBooks[author] = [];
        }
        groupedBooks[author].push(book);
      });
    });

    const sortedAuthors = Object.keys(groupedBooks).sort((a, b) => a.localeCompare(b));
    sortedAuthors.forEach(author => {
      groupedBooks[author].sort((a, b) => a.title.localeCompare(b.title));
    });

    return { groupedBooks, sortedKeys: sortedAuthors };
  }

  return { groupedBooks: {}, sortedKeys: [] };
};

const BookList = ({ books, deleteBook, sortMode, onUpdateBook }) => {
  const { groupedBooks, sortedKeys } = groupBooks(books, sortMode);
  const [editingBook, setEditingBook] = useState(null);

  return (
    <div className=' bg-red-500'>
      {sortedKeys.map(key => (
        <div key={key} className="mb-4">
          <h2 className="text-xl font-semibold mb-2">{key}</h2>
          <ul className="list-disc list-inside">
            {groupedBooks[key].map(book => (
              <li key={book.id} className="mb-2">
                {editingBook && editingBook.id === book.id ? (
                  <EditBookForm book={editingBook} onUpdateBook={onUpdateBook} onCancel={() => setEditingBook(null)} />
                ) : (
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="text-lg font-bold">{book.title}</h4>
                      <p>Автор: {book.authors.join(', ')}</p>
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
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default BookList;
