import React, { useEffect, useState } from 'react';
import { db } from './utils/firebase';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore'
import Recommendations from './components/Recommedations';
import BookList from './components/BookList';
import BookForm from './components/BookForm';

function App() {
  const [books, setBooks] = useState([]);
  const booksCollectionRef = collection(db, 'books')

  //FETCH FETCH FETCH
  const fetchBooks = async () => {
    try {
      const data = await getDocs(booksCollectionRef)
      const filteredData = data.docs.map((doc) => ({...doc.data(), id: doc.id}))
      setBooks(filteredData)
    } catch(err) {
      console.error(err)
    }
  };

  useEffect(() => {
    fetchBooks();
  });

  const handleAddBook = (book) => {
    setBooks([...books, book]);
  };

  const deleteBook = async (id) => {
    await deleteDoc(doc(db, 'books', id))
    // setBooks(books.filter(book => book.id !== id));
};

  return (
    <div className="App">
  
    <BookForm onAddBook={handleAddBook} />
      <Recommendations books={books} />
      <h2>Каталог книг</h2>
      <BookList books={books} deleteBook={deleteBook} />
    </div>
  );
}

export default App;