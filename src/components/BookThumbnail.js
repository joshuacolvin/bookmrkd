import React from 'react';

function BookThumbnail({ thumbnail, title }) {
  return (
    <img
      className="shadow-md thumbnail-lg"
      src={thumbnail}
      alt={`${title} cover`}
    />
  );
}

export { BookThumbnail };
