import React, { useState } from 'react';
import Modal from 'react-modal';
import { db } from '../utils/firebase';
import { collection, addDoc, getDocs } from 'firebase/firestore';

Modal.setAppElement('#root'); //Модалка для добавления

const BookForm = ({ onAddBook }) => {
  // Хранения состояния формы и модального окна
  const [title, setTitle] = useState('');
  const [authors, setAuthors] = useState('');
  const [year, setYear] = useState('');
  const [rating, setRating] = useState(0);
  const [isbn, setIsbn] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [modalIsOpen, setModalIsOpen] = useState(false);

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

    // Очищаем поля формы и закрываем модальное окно
    setTitle('');
    setAuthors('');
    setYear('');
    setRating(0);
    setIsbn('');
    setErrorMessage(''); // Очищаем сообщение об ошибке
    setModalIsOpen(false); // Закрываем модальное окно
  };

  return (
    <div>
      <button onClick={() => setModalIsOpen(true)} className="bg-yellow-500 hover:bg-yellow-400 text-white h-24 w-24 outline-4 outline-dotted outline-offset-4 outline-indigo-600 fixed text-lg font-medium bottom-20 right-20 rounded-full">
        Добавить книгу
      </button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        contentLabel="Добавить новую книгу"
        className="modal"
        overlayClassName="overlay"
      >
        <h2 className=' text-center text-2xl font-bold my-8 text-neutral-700'>Добавить новую книгу</h2>
        <form onSubmit={handleSubmit} className='flex flex-col justify-between h-96 my-4 gap-2'>
          <input
            type="text"
            value={title}
            onChange={e => setTitle(e.target.value)}
            placeholder="Название"
            required
            maxLength="100"
            className=' py-2 px-4 rounded bg-neutral-200 border-2 border-neutral-300'
          />
          <input
            type="text"
            value={authors}
            onChange={e => setAuthors(e.target.value)}
            placeholder="Авторы"
            required
            className=' py-2 px-4 rounded bg-neutral-200 border-2 border-neutral-300'
          />
          <input
            type="number"
            value={year}
            onChange={e => setYear(e.target.value)}
            placeholder="Год публикации"
            min="1800"
            className=' py-2 px-4 rounded bg-neutral-200 border-2 border-neutral-300'
          />
          <input
            type="number"
            value={rating}
            onChange={e => setRating(e.target.value)}
            placeholder="Рейтинг"
            min="0"
            max="10"
            className=' py-2 px-4 rounded bg-neutral-200 border-2 border-neutral-300'
          />
          <input
            type="text"
            value={isbn}
            onChange={e => setIsbn(e.target.value)}
            placeholder="ISBN"
            className=' py-2 px-4 rounded bg-neutral-200 border-2 border-neutral-300'
          />
          <button type="submit" className="btn bg-yellow-500 hover:bg-yellow-400 text-white py-3 rounded">Добавить</button>
          <button onClick={() => setModalIsOpen(false)} className="btn bg-neutral-500 hover:bg-neutral-400 text-white py-3 rounded">Отмена</button>
          {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        </form>
      </Modal>
    </div>
  );
};

export default BookForm;
