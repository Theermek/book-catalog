import React, { useState } from 'react';
import { db } from '../utils/firebase';
import { collection, addDoc, getDocs } from 'firebase/firestore';

const BookForm = ({ onAddBook }) => {
  // Хранения состояния
  const [title, setTitle] = useState('');
  const [authors, setAuthors] = useState('');
  const [year, setYear] = useState('');
  const [rating, setRating] = useState(0);
  const [isbn, setIsbn] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Ссылка на коллекцию книг в Firestore
  const booksCollectionRef = collection(db, 'books');

  // Функция для перевода имени автора в верхний регистр
  const capitalizeName = (name) => {
    return name
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  };

  // Обработчик отправки формы
  const handleSubmit = async (e) => {
    e.preventDefault();

    const newBookTitle = title.toLowerCase();
    const newBookAuthors = authors.split(',').map(author => author.trim().toLowerCase());

    // Получаем все книги из Firestore
    const querySnapshot = await getDocs(booksCollectionRef);
    const books = querySnapshot.docs.map(doc => doc.data());

    // Проверяем, существует ли книга с таким же названием и автором
    const bookExists = books.some(book => 
      book.title.toLowerCase() === newBookTitle && 
      book.authors.some(author => newBookAuthors.includes(author.toLowerCase()))
    );

    // Если книга существует, выводим сообщение об ошибке
    if (bookExists) {
      setErrorMessage('Такая книга уже существует');
      return;
    }

    // Создаем новую книгу
    const newBook = {
      title,
      authors: authors.split(',').map(author => capitalizeName(author.trim())),
      year: year ? parseInt(year) : null,
      rating: parseInt(rating),
      isbn,
    };

    // Добавляем новую книгу в Firestore
    await addDoc(booksCollectionRef, newBook);
    onAddBook({ id: booksCollectionRef.id, ...newBook });

    // Очищаем поля формы
    setTitle('');
    setAuthors('');
    setYear('');
    setRating(0);
    setIsbn('');
    setErrorMessage(''); // Очищаем сообщение об ошибке
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={e => setTitle(e.target.value)}
        placeholder="Название"
        required
        maxLength="100"
      />
      <input
        type="text"
        value={authors}
        onChange={e => setAuthors(e.target.value)}
        placeholder="Авторы"
        required
      />
      <input
        type="number"
        value={year}
        onChange={e => setYear(e.target.value)}
        placeholder="Год публикации"
        min="1800"
      />
      <input
        type="number"
        value={rating}
        onChange={e => setRating(e.target.value)}
        placeholder="Рейтинг"
        min="0"
        max="10"
      />
      <input
        type="text"
        value={isbn}
        onChange={e => setIsbn(e.target.value)}
        placeholder="ISBN"
      />
      <button type="submit">Добавить книгу</button>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
    </form>
  );
};

export default BookForm;
