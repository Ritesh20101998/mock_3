import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
// import Book from '../Backend/models/book.model';

const AddBook = () => {
  const [title, setTitle] = useState('');
  const [image, setImage] = useState('');
  const [author, setAuthor] = useState('');
  const [genre, setGenre] = useState('Fiction');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newBook = {
      Title: title,
      Author: author,
      Genre: genre,
      Description: description,
      Price: price,
    };

    try {
      await axios.post('http://localhost:410/books', newBook);
      // Clear form fields
      setTitle('');
      setImage('');
      setAuthor('');
      setGenre('Fiction');
      setDescription('');
      setPrice('');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className='addbooks'>
      <h2>Add Book</h2>
      <form onSubmit={handleSubmit} className='form'>
        <div>
          <label>Title:</label><br />
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Image:</label><br />
          <input
            type="img"
            value={image}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Author:</label><br />
          <input
            type="text"
            value={author}
            onChange={(e) => setImage(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Genre:</label><br />
          <select value={genre} onChange={(e) => setGenre(e.target.value)}>
          <option value="">Select Genre</option>
            <option value="Fiction">Fiction</option>
            <option value="Science">Science</option>
            <option value="Comic">Comic</option>
          </select>
        </div>
        <div>
          <label>Description:</label><br />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>
        <div>
          <label>Price:</label><br/>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>
        <button type="submit">Add Book</button>
      </form>
    </div>
  );
};

const MyBooks = () => {
  const [books, setBooks] = useState([]);
  const [genreFilter, setGenreFilter] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [sortOrder, setSortOrder] = useState('');

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await axios.get('http://localhost:4100/books');
      setBooks(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteBook = async (bookId) => {
    try {
      await axios.delete(`http://localhost:8080/books/${bookId}`);
      setBooks(books.filter((book) => book._id !== bookId));
    } catch (error) {
      console.error(error);
    }
  };

  const filterBooks = async () => {
    try {
      const response = await axios.get('http://localhost:8080/books/filter', {
        params: { Genre: genreFilter },
      });
      setBooks(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const sortBooks = async () => {
    try {
      const response = await axios.get('http://localhost:8080/books/sort', {
params: { sortBy, order: sortOrder },
      });
      setBooks(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className='mybooks'>
      <h2>My Books</h2>
      <br />
      <div>
        <label>Filter by Genre:</label>
        <select>
          <option value="">Select Genre</option>
            <option value="Fiction">Fiction</option>
            <option value="Science">Science</option>
            <option value="Comic">Comic</option>
          </select>
        <button onClick={filterBooks}>Filter</button>
        
      </div>

      <div>
        <label>Sort by:</label>
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          {/* <option value="">-- Select --</option>
          <option value="Title">Title</option>
          <option value="Author">Author</option> */}
          <option value="Price">Price</option>
        </select>

        <label>Order:</label>
        <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
          {/* <option value="">-- Select --</option> */}
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>

        <button onClick={sortBooks}>Sort</button>
      </div>

      <ul>
        {books.map((book) => (
          <li key={book._id}>
            <strong></strong>{book.Image}
            <strong>Title:</strong> {book.Title},
            <strong>Author:</strong>{' '}
            {book.Author}, <strong>Genre:</strong> {book.Genre},{' '}
            <strong>Price:</strong> ${book.Price}
            <button onClick={() => deleteBook(book._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

const App = () => {
  return (
    <>
      <h1 className='title'>Book Library</h1>
      <hr />
      <div className='container'>
        <AddBook />
        <MyBooks />
      </div>
    </>
    
  );
};

export default App;