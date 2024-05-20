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

  // Находим книгу с максимальным рейтингом
  let recommendedBook = eligibleBooks[0];
  for (const book of eligibleBooks) {
    if (book.rating > recommendedBook.rating) {
      recommendedBook = book;
    }
  }

  // Возвращаем одну книгу с максимальным рейтингом
  return recommendedBook;
};
