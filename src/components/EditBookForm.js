import React, { useState } from 'react';
import { db } from '../utils/firebase';
import { doc, updateDoc } from 'firebase/firestore';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faRotateLeft } from "@fortawesome/free-solid-svg-icons"

const EditBookForm = ({ book, onUpdateBook, onCancel }) => {
  // Хуки для состояния формы редактирования
  const [title, setTitle] = useState(book.title);
  const [authors, setAuthors] = useState(book.authors.join(', '));
  const [year, setYear] = useState(book.year);
  const [rating, setRating] = useState(book.rating);
  const [isbn, setIsbn] = useState(book.isbn);

  // Обработчик отправки формы редактирования
  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedBook = {
      title,
      authors: authors.split(',').map(author => author.trim()),
      year: year ? parseInt(year) : null,
      rating: parseInt(rating),
      isbn,
    };

    const bookDoc = doc(db, 'books', book.id);
    await updateDoc(bookDoc, updatedBook);
    onUpdateBook({ id: book.id, ...updatedBook });
    onCancel();
  };

  return (
    <form onSubmit={handleSubmit} className=" flex flex-col gap-1 text-zinc-700 hover:text-zinc-700">
      <input type="text" value={title} onChange={e => setTitle(e.target.value)} placeholder="Название" required maxLength="100" className="border border-neutral-700 rounded p-1 bg-neutral-100" />
      <input type="text" value={authors} onChange={e => setAuthors(e.target.value)} placeholder="Авторы" required className="border border-neutral-700 rounded p-1 bg-neutral-100" />
      <input type="number" value={year} onChange={e => setYear(e.target.value)} placeholder="Год публикации" min="1800" className="border border-neutral-700 rounded p-1 bg-neutral-100" />
      <input type="number" value={rating} onChange={e => setRating(e.target.value)} placeholder="Рейтинг" min="0" max="10" className="border border-neutral-700 rounded p-1 bg-neutral-100" />
      <input type="text" value={isbn} onChange={e => setIsbn(e.target.value)} placeholder="ISBN" className="border border-neutral-700 rounded p-1 bg-neutral-100" />
      <button type="submit" className=' bg-yellow-500 rounded cursor-pointer text-white p-1 text-xl hover:bg-yellow-400'>
        <FontAwesomeIcon icon={faCheck} />
      </button>
      <button type="button" onClick={onCancel} className="bg-neutral-500 rounded cursor-pointer text-white p-1 text-xl hover:bg-neutral-400">
        <FontAwesomeIcon icon={faRotateLeft} />
      </button>
    </form>
  );
};

export default EditBookForm;
