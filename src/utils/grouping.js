const groupBooks = (books, sortMode) => {
  const groupedBooks = {};

  books.forEach(book => {
    if (!Array.isArray(book.authors)) {
      book.authors = [book.authors];
    }
  });

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

export default groupBooks;
