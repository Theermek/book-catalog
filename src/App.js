import { useEffect, useState } from 'react';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from './utils/firebase';
import Recommendations from './components/Recommendations';
import BookList from './components/BookList';
import BookForm from './components/BookForm';
import SortSelector from './components/SortSelector';
import './app.css'

function App() {
  // Состояние для хранения списка книг
  const [books, setBooks] = useState([]);
  // Состояние для хранения режима сортировки
  const [sortMode, setSortMode] = useState('year');
  // Ссылка на коллекцию книг в Firestore
  const booksCollectionRef = collection(db, 'books');

  // Функция для получения данных из Firestore
  const fetchBooks = async () => {
    try {
      // Получаем все документы из коллекции книг
      const data = await getDocs(booksCollectionRef);
      // Преобразуем документы в массив объектов
      const filteredData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      // Обновляем состояние списка книг
      setBooks(filteredData);
    } catch (err) {
      // Выводим ошибку в консоль, если что-то пошло не так
      console.error(err);
    }
  };

  // useEffect для получения данных при первом рендере
  useEffect(() => {
    fetchBooks();
  }, []); // Пустой массив зависимостей означает, что этот эффект выполнится только один раз

  // Обработчик добавления новой книги
  const handleAddBook = (book) => {
    // Добавляем новую книгу в список книг
    setBooks([...books, book]);
  };

  // Обработчик обновления информации о книге
  const handleUpdateBook = (updatedBook) => {
    // Обновляем информацию о книге в списке
    setBooks(books.map(book => (book.id === updatedBook.id ? updatedBook : book)));
  };

  // Функция удаления книги из Firestore
  const deleteBook = async (id) => {
    // Удаляем документ книги из Firestore
    await deleteDoc(doc(db, 'books', id));
    // Удаляем книгу из состояния списка книг
    setBooks(books.filter(book => book.id !== id));
  };

  // Рендерим компоненты и передаем нужные пропсы
  return (
    <div className="p-4 bg-zinc-100 text-zinc-700">
      <BookForm onAddBook={handleAddBook} />
      <div className='flex justify-between mt-8 h-32 mb-4'>
        <Recommendations books={books} />
        <h1 className=" text-6xl basis-1/2 font-bold text-indigo-600 text-center">Каталог книг</h1>
        <SortSelector sortMode={sortMode} setSortMode={setSortMode} />
      </div>
      <BookList books={books} deleteBook={deleteBook} sortMode={sortMode} onUpdateBook={handleUpdateBook} />
    </div>
  );
}


export default App;
