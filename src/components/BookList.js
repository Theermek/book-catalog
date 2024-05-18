import React from 'react';

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
      const author = book.authors[0] || 'Без автора';
      if (!groupedBooks[author]) {
        groupedBooks[author] = [];
      }
      groupedBooks[author].push(book);
    });

    const sortedAuthors = Object.keys(groupedBooks).sort((a, b) => a.localeCompare(b));
    sortedAuthors.forEach(author => {
      groupedBooks[author].sort((a, b) => a.title.localeCompare(b.title));
    });

    return { groupedBooks, sortedKeys: sortedAuthors };
  }

  return { groupedBooks: {}, sortedKeys: [] };
};

const BookList = ({ books, deleteBook, sortMode }) => {
  const { groupedBooks, sortedKeys } = groupBooks(books, sortMode);

  return (
    <div>
      {sortedKeys.map(key => (
        <div key={key}>
          <h2>{key}</h2>
          <ul>
            {groupedBooks[key].map(book => (
              <li key={book.id}>
                <h4>{book.title}</h4>
                <p>Автор: {book.authors.join(', ')}</p>
                {book.year ? <p>Год: {book.year}</p> : null}
                <p>Рейтинг: {book.rating}</p>
                {book.isbn ? <p>ISBN: {book.isbn}</p> : null}
                <button onClick={() => deleteBook(book.id)}>x</button>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default BookList;
