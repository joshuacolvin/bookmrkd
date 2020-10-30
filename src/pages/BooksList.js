import React, { useEffect, useState } from 'react';
import { API, graphqlOperation } from 'aws-amplify';
import { Link } from '@reach/router';
import { listBooksAndRecommendations } from '../graphql/custom-queries';

function BooksList() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    async function getBooks() {
      const {
        data: {
          listBooks: { items },
        },
      } = await API.graphql(graphqlOperation(listBooksAndRecommendations));
      setBooks(items);
    }

    getBooks();
  }, []);

  return (
    <div>
      <h2 className="font-extrabold text-2xl">My Books</h2>
      <div className="flex flex-wrap">
        {books.length ? (
          books.map((book) => (
            <Link
              className="m-4 relative"
              to={`books/${book.id}`}
              key={book.id}
            >
              <img
                className="shadow-md thumbnail-lg hover:shadow-2xl transform hover:scale-105"
                src={book.thumbnail}
                alt={`${book.title} cover`}
              />
              {book.recommendations && book.recommendations.items && (
                <div class="badge absolute shadow-xl bg-indigo-700 font-bold text-white text-xs rounded-full h-6 w-6 flex items-center justify-center">
                  {book.recommendations.items.length}
                </div>
              )}
            </Link>
          ))
        ) : (
          <div className="mt-2 text-gray-700">
            Add some books by using the search
          </div>
        )}
      </div>
    </div>
  );
}

export default BooksList;
