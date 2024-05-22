export const getRecommendedBook = (books) => {
  const now = new Date();
  const currentYear = now.getFullYear();

  // Фильтрация книг, которые старше 3 лет и имеют положительный рейтинг
  const eligibleBooks = books.filter(book => {
    const bookYear = book.year || currentYear;
    const bookAge = currentYear - bookYear;
    return bookAge >= 3 && book.rating > 0;
  });

  // Если нет подходящих книг, возвращаем null
  if (eligibleBooks.length === 0) return null;

  // Находим максимальный рейтинг среди подходящих книг
  const maxRating = Math.max(...eligibleBooks.map(book => book.rating));

  // Фильтруем книги с максимальным рейтингом
  const bestBooks = eligibleBooks.filter(book => book.rating === maxRating);

  // Возвращаем одну случайную книгу из книг с максимальным рейтингом
  const randomIndex = Math.floor(Math.random() * bestBooks.length);
  return bestBooks[randomIndex];
};
