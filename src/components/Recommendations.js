import React from 'react';
import { getRecommendedBook } from '../utils/getRecommendedBook';

const Recommendations = ({ books }) => {
  const recommendedBook = getRecommendedBook(books);

  if (!recommendedBook) return <div>Нет рекомендаций</div>;

  return (
    <div className="mb-4">
      <h2 className="text-xl font-bold">Рекомендуемая книга</h2>
      <p>{recommendedBook.title}</p>
    </div>
  );
};

export default Recommendations;
