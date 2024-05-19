import React, { useState } from 'react';
import { db } from '../utils/firebase';
import { collection, addDoc } from 'firebase/firestore';

const BookForm = ({ onAddBook }) => {
  const [title, setTitle] = useState('');
  const [authors, setAuthors] = useState('');
  const [year, setYear] = useState('');
  const [rating, setRating] = useState(0);
  const [isbn, setIsbn] = useState('');
  
  const booksCollectionRef = collection(db, 'books');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newBook = {
      title,
      authors: authors.split(',').map(author => author.trim()),
      year: year ? parseInt(year) : null,
      rating: parseInt(rating),
      isbn,
    };

    await addDoc(booksCollectionRef, newBook);
    onAddBook({ id: booksCollectionRef.id, ...newBook });
    setTitle('');
    setAuthors('');
    setYear('');
    setRating(0);
    setIsbn('');
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <div className="mb-2">
        <input type="text" value={title} onChange={e => setTitle(e.target.value)} placeholder="Название" required maxLength="100" className="border p-2 w-full"/>
      </div>
      <div className="mb-2">
        <input type="text" value={authors} onChange={e => setAuthors(e.target.value)} placeholder="Авторы" required className="border p-2 w-full"/>
      </div>
      <div className="mb-2">
        <input type="number" value={year} onChange={e => setYear(e.target.value)} placeholder="Год публикации" min="1800" className="border p-2 w-full"/>
      </div>
      <div className="mb-2">
        <input type="number" value={rating} onChange={e => setRating(e.target.value)} placeholder="Рейтинг" min="0" max="10" className="border p-2 w-full"/>
      </div>
      <div className="mb-2">
        <input type="text" value={isbn} onChange={e => setIsbn(e.target.value)} placeholder="ISBN" className="border p-2 w-full"/>
      </div>
      <button type="submit" className="bg-blue-500 text-white p-2 w-full">Добавить книгу</button>
    </form>
  );
};

export default BookForm;
