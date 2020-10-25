import React, { useEffect, useState } from 'react';
import { API, graphqlOperation } from 'aws-amplify';
import { listBooks } from '../graphql/queries';
import { Link } from '@reach/router';

function BooksList() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    async function getBooks() {
      const {
        data: {
          listBooks: { items },
        },
      } = await API.graphql(graphqlOperation(listBooks));
      setBooks(items);
    }

    getBooks();
  }, []);

  return (
    <div>
      <h2 className="font-extrabold text-2xl">My Books</h2>
      <div className="flex flex-wrap">
        {books &&
          books.map((book) => (
            <Link className="m-4" to={`books/${book.id}`} key={book.id}>
              <img
                className="shadow-md thumbnail-lg hover:shadow-2xl transform hover:scale-105"
                src={book.thumbnail}
                alt={`${book.title} cover`}
              />
            </Link>
          ))}
      </div>
    </div>
  );
}

export default BooksList;
