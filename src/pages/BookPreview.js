import React, { useEffect, useState } from 'react';
import { navigate } from '@reach/router';
import { API, graphqlOperation } from 'aws-amplify';
import { createBook } from '../graphql/mutations';
import { FaPlusCircle } from 'react-icons/fa';

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
        <div className="flex flex-col">
          <div className="flex p-12 pb-0 book-img-container">
            <img
              className="shadow-md thumbnail-lg"
              src={book.volumeInfo.imageLinks.thumbnail}
              alt={`${book.volumeInfo.title} cover`}
            />
            <div className="ml-12 flex flex-col justify-between">
              <div>
                <h2 className="text-4xl font-extrabold">
                  {book.volumeInfo.title}
                </h2>
                {book.volumeInfo.authors && (
                  <h3 className="text-blue-600">
                    {book.volumeInfo.authors.join(', ')}
                  </h3>
                )}
              </div>
              <button
                className="bg-indigo-500 hover:bg-indigo-800 text-white font-bold py-2 px-4 rounded-full w-40"
                onClick={() => addBook(book.volumeInfo)}
              >
                <span className="flex items-center">
                  Add Book <FaPlusCircle className="ml-2" />
                </span>{' '}
              </button>
            </div>
          </div>
          <div className="flex p-12 pt-6">
            <div className="book-details mt-2">
              {book.volumeInfo.categories && (
                <p className="text-gray-600 text-xs">
                  {book.volumeInfo.categories.join(', ')}
                </p>
              )}
              <p className="text-gray-600 text-xs">
                {book.volumeInfo.publisher}
              </p>
              {book.volumeInfo.pageCount ? (
                <p className="text-gray-600 text-xs">
                  {book.volumeInfo.pageCount} pages
                </p>
              ) : null}
              <p className="text-gray-600 text-xs">ISBN {isbn}</p>
            </div>
            <div className="book-description ml-6">
              <h2 className="text-2xl font-semibold mb-2">Description</h2>
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
