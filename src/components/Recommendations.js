import React from 'react';
import { getRecommendedBook } from '../utils/getRecommendedBook';

const Recommendations = ({ books }) => {
  const recommendedBook = getRecommendedBook(books);

  if (!recommendedBook) return <div className=" self-end">Нет рекомендаций</div>;

  return (
    <div className=" self-end text-start basis-1/4">
      <h2 className="text-xl font-semibold">Книга дня: <span>{recommendedBook.title}</span></h2>
    </div>
  );
};

export default Recommendations;
