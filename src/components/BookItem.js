import React from 'react';
import EditBookForm from './EditBookForm';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faPenToSquare } from "@fortawesome/free-solid-svg-icons"

const BookItem = ({ book, deleteBook, setEditingBook, editingBook, onUpdateBook }) => {
  // Проверка и преобразование авторов в строку
  const authors = Array.isArray(book.authors) ? book.authors.join(', ') : book.authors;

  return (
    <li className=" bg-zinc-300 hover:bg-indigo-200 w-64 h-80 rounded border-4 border-solid border-indigo-500  mx-4 my-4 px-4 py-4 flex flex-col justify-between items-center">
      {editingBook && editingBook.id === book.id ? (
        <EditBookForm book={editingBook} onUpdateBook={onUpdateBook} onCancel={() => setEditingBook(null)} />
      ) : (
        <div className=" w-full h-full flex flex-col justify-between text-base">
            <h4 className=" text-lg font-medium bg-zinc-400 border-2 rounded py-2 self-center text-center text-pretty truncate w-full h-36">{book.title}</h4>
            <div>
              <p className='font-medium'>Автор: {authors}</p>
              {book.year ? <p className='font-normal'>Год: {book.year}</p> : null}
              {book.rating != '0' ? <p className=' font-normal'>Рейтинг: {book.rating}</p> : null}
              {book.isbn ? <p classsName='font-normal'>ISBN: {book.isbn}</p> : null}
            </div>
          <div className='flex justify-around'>
            <FontAwesomeIcon onClick={() => setEditingBook(book)} className="text-yellow-500 hover:text-yellow-400 cursor-pointer text-2xl" icon={faPenToSquare} />
            <FontAwesomeIcon onClick={() => deleteBook(book.id)} className=" text-red-700 hover:text-red-600 cursor-pointer text-2xl" icon={faTrash} />
          </div>
        </div>
      )}
    </li>
  );
};

export default BookItem;
