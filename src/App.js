import React, { useEffect, useState } from 'react';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from './utils/firebase';
import Recommendations from './components/Recommendations';
import BookList from './components/BookList';
import BookForm from './components/BookForm';
import SortSelector from './components/SortSelector';

function App() {
  const [books, setBooks] = useState([]);
  const [sortMode, setSortMode] = useState('year');
  const booksCollectionRef = collection(db, 'books');

  const fetchBooks = async () => {
    try {
      const data = await getDocs(booksCollectionRef);
      const filteredData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      setBooks(filteredData);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const handleAddBook = (book) => {
    setBooks([...books, book]);
  };

  const handleUpdateBook = (updatedBook) => {
    setBooks(books.map(book => (book.id === updatedBook.id ? updatedBook : book)));
  };

  const deleteBook = async (id) => {
    await deleteDoc(doc(db, 'books', id));
    setBooks(books.filter(book => book.id !== id));
  };

  return (
    <div className=" p-4 bg-stone-500">
      <BookForm onAddBook={handleAddBook} />
      <Recommendations books={books} />
      <h1 className="text-2xl font-bold mb-4 text-red-700">Каталог книг</h1>
      <SortSelector sortMode={sortMode} setSortMode={setSortMode} />
      <BookList books={books} deleteBook={deleteBook} sortMode={sortMode} onUpdateBook={handleUpdateBook} />
    </div>
  );
}

export default App;
