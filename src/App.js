import React, { useEffect, useState } from 'react';
import { db } from './utils/firebase';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import Recommendations from './components/Recommedations';
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
  });

  const handleAddBook = (book) => {
    setBooks([...books, book]);
  };

  const deleteBook = async (id) => {
    await deleteDoc(doc(db, 'books', id));
    setBooks(books.filter(book => book.id !== id));
  };

  return (
    <div className="App">
      <h1>Каталог книг</h1>
      <SortSelector sortMode={sortMode} setSortMode={setSortMode} />
      <BookForm onAddBook={handleAddBook} />
      <Recommendations books={books} />
      <BookList books={books} deleteBook={deleteBook} sortMode={sortMode} />
    </div>
  );
}

export default App;
