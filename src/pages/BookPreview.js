import React, { useEffect, useState } from 'react';
import { navigate } from '@reach/router';
import { API, graphqlOperation } from 'aws-amplify';
import { createBook } from '../graphql/mutations';
import { FaPlusCircle } from 'react-icons/fa';
import { BookThumbnail } from '../components/BookThumbnail';
import { BookInfo } from '../components/BookInfo';

function BookPreview({ isbn }) {
  const [book, setBook] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!isbn) {
      return;
    }

    setError(null);

    fetch(
      `https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}&maxResults=1`
    )
      .then((response) => response.json())
      .then(({ items }) => {
        setBook(items[0]);
      })
      .catch((error) => {
        setError(error.message);
      });
  }, [isbn]);

  function addBook(book) {
    const {
      title,
      authors,
      categories,
      description,
      pageCount,
      publisher,
      industryIdentifiers,
      imageLinks,
    } = book;

    const newBook = {
      title,
      authors,
      categories,
      description,
      pageCount,
      publisher,
      isbn: industryIdentifiers[0].identifier,
      thumbnail: imageLinks.thumbnail,
      status: 'WISHLIST',
    };

    setError(null);

    API.graphql(graphqlOperation(createBook, { input: newBook }))
      .then(({ data }) => {
        navigate(`/books/${data.createBook.id}`);
      })
      .catch(({ errors }) => {
        const { message } = errors[0];

        if (message) {
          setError(message);
        }
      });
  }

  if (error) {
    return (
      <div
        className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 flex justify-between"
        role="alert"
      >
        <div>
          <p className="font-bold">Error</p>
          <p>{error}</p>
        </div>
        <button
          className="bg-transparent hover:bg-red-500 text-red-700 font-semibold hover:text-white py-2 px-4 border border-red-500 hover:border-transparent rounded"
          onClick={() => setError(null)}
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div>
      {book && (
        <div className="flex flex-col md:flex-row">
          <div className="flex flex-row md:flex-col book-details">
            <BookThumbnail
              thumbnail={book.volumeInfo.imageLinks.thumbnail}
              title={book.volumeInfo.title}
            />
            <div className="ml-6 md:ml-0 md:mt-6">
              <BookInfo book={{ ...book.volumeInfo, isbn }} />
            </div>
          </div>
          <div className="flex flex-col">
            <div className="book-description md:ml-6">
              <div className="flex flex-col justify-between">
                <div>
                  <h2 className="text-4xl font-extrabold mt-6 md:mt-0">
                    {book.volumeInfo.title}
                  </h2>
                  {book.volumeInfo.authors && (
                    <h3 className="text-blue-600">
                      {book.volumeInfo.authors.join(', ')}
                    </h3>
                  )}
                </div>
                <button
                  className="bg-indigo-500 hover:bg-indigo-800 text-white font-bold py-2 px-4 rounded-full w-40 mt-6"
                  onClick={() => addBook(book.volumeInfo)}
                >
                  <span className="flex items-center">
                    Add Book <FaPlusCircle className="ml-2" />
                  </span>{' '}
                </button>
              </div>
              <h2 className="text-2xl font-semibold mb-2 mt-6">Description</h2>
              <p className="text-gray-700 text-sm">
                {book.volumeInfo.description}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default BookPreview;
