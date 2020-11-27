import React from 'react';

function BookInfo({ book }) {
  return (
    <div className="book-info">
      {book.categories && (
        <p className="text-gray-600 text-xs">{book.categories.join(', ')}</p>
      )}
      <p className="text-gray-600 text-xs">{book.publisher}</p>
      <p className="text-gray-600 text-xs">{book.pageCount} pages</p>
      <p className="text-gray-600 text-xs">ISBN {book.isbn}</p>
    </div>
  );
}

export { BookInfo };
