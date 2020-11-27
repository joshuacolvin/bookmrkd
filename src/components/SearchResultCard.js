import React from 'react';
import { Link } from '@reach/router';
import { FaChevronRight } from 'react-icons/fa';

function SearchResultCard({ id, book }) {
  return (
    <Link to={`preview/${book.industryIdentifiers[0].identifier}`}>
      <div className="bg-gray-200">
        <div className="flex p-5" key={id}>
          <img
            className="thumbnail shadow-md"
            src={
              book.imageLinks
                ? book.imageLinks.thumbnail
                : `https://via.placeholder.com/80x120`
            }
            alt={`${book.title} cover`}
          />
          <div className="flex flex-col flex-1 ml-4">
            <h2 className="font-bold font-lg">{book.title}</h2>
            {book.authors && (
              <p className="text-gray-500">{book.authors.join(', ')}</p>
            )}
            {book.categories && (
              <p className="text-gray-500 text-xs">
                {book.categories.join(', ')}
              </p>
            )}
            {book.id}
          </div>
          <div className="flex flex-column items-center text-gray-500">
            <FaChevronRight size="1.5em" />
          </div>
        </div>
      </div>
    </Link>
  );
}

export default SearchResultCard;
