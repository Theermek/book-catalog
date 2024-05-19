export const getRecommendedBook = (books) => {
    const now = new Date();
    const eligibleBooks = books.filter(book => {
      const bookAge = now.getFullYear() - (book.year || now.getFullYear());
      return bookAge >= 3 && book.rating > 0;
    });
  
    if (eligibleBooks.length === 0) return null;
  
    const maxRating = Math.max(...eligibleBooks.map(book => book.rating));
    const bestBooks = eligibleBooks.filter(book => book.rating === maxRating);
  
    return bestBooks[Math.floor(Math.random() * bestBooks.length)];
  };
  