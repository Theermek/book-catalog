import React, { useState} from 'react';
import { db } from '../utils/firebase';
import { doc, updateDoc } from 'firebase/firestore';

const EditBookForm = ({ book, onUpdateBook, onCancel }) => {
  const [title, setTitle] = useState(book.title);
  const [authors, setAuthors] = useState(book.authors.join(', '));
  const [year, setYear] = useState(book.year);
  const [rating, setRating] = useState(book.rating);
  const [isbn, setIsbn] = useState(book.isbn);

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
    <form onSubmit={handleSubmit} className="mb-4">
      <input type="text" value={title} onChange={e => setTitle(e.target.value)} placeholder="Название" required maxLength="100" className="border p-2 mb-2" />
      <input type="text" value={authors} onChange={e => setAuthors(e.target.value)} placeholder="Авторы" required className="border p-2 mb-2" />
      <input type="number" value={year} onChange={e => setYear(e.target.value)} placeholder="Год публикации" min="1800" className="border p-2 mb-2" />
      <input type="number" value={rating} onChange={e => setRating(e.target.value)} placeholder="Рейтинг" min="0" max="10" className="border p-2 mb-2" />
      <input type="text" value={isbn} onChange={e => setIsbn(e.target.value)} placeholder="ISBN" className="border p-2 mb-2" />
      <button type="submit" className="bg-blue-500 text-white p-2">Сохранить</button>
      <button type="button" onClick={onCancel} className="bg-gray-500 text-white p-2 ml-2">Отмена</button>
    </form>
  );
};

export default EditBookForm;
