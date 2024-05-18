import React from 'react';

const getRecommendedBook = (books) => {
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

const Recommendations = ({ books }) => {
  const recommendedBook = getRecommendedBook(books);

  if (!recommendedBook) return <div>Нет рекомендаций</div>;

  return (
    <div>
      <h2>Рекомендуемая книга</h2>
      <p>{recommendedBook.title}</p>
    </div>
  );
};

export default Recommendations;