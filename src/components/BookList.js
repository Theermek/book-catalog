import React from 'react';

const groupBooksByYear = (books) => {
    const groupedBooks = {};
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
  
    return { groupedBooks, sortedYears };
  };
  
  const BookList = ({ books, deleteBook }) => {
    const { groupedBooks, sortedYears } = groupBooksByYear(books);
  
    return (
      <div>
        {sortedYears.map(year => (
          <div key={year}>
            <h2>{year}</h2>
            <ul>
              {groupedBooks[year].map(book => (
                 <li key={book.id}>
                 <h4>{book.title}</h4>
                 <p>Автор: {book.authors}</p>
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