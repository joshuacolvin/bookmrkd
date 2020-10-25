import React, { useState } from 'react';
import { FaTimesCircle } from 'react-icons/fa';
import SearchResultCard from './SearchResultCard';

function Search() {
  const [searchResults, setSearchResults] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  function fetchBooks() {
    if (!searchTerm) {
      return;
    }

    fetch(
      `https://www.googleapis.com/books/v1/volumes?q=${searchTerm}&maxResults=12`
    )
      .then((response) => response.json())
      .then(
        ({ items }) => {
          setSearchResults(items);
        },
        (error) => console.error(error)
      );
  }

  function handleSubmit(event) {
    event.preventDefault();
    fetchBooks();
  }

  function handleSearchTerm(event) {
    setSearchTerm(event.target.value);
  }

  function onClear() {
    setSearchTerm('');
    setSearchResults(null);
  }

  return (
    <div className="search overflow-y-scroll  h-screen sticky top-0 p-6 pt-16">
      <form onSubmit={handleSubmit}>
        <div>
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="searchTerm"
          >
            Search for a book
          </label>
          <div className="relative flex w-full flex-wrap items-stretch mb-3">
            <input
              type="text"
              id="searchTerm"
              autoComplete="off"
              value={searchTerm}
              onChange={handleSearchTerm}
              className="px-3 py-2 relative bg-gray-200 rounded text-sm shadow outline-none focus:outline-none focus:shadow-outline w-full pr-10"
            />
            {searchTerm && (
              <span className="z-10 h-full leading-snug font-normal text-center text-gray-800 absolute bg-transparent rounded text-base items-center justify-center w-8 right-0 pr-3 py-3">
                <FaTimesCircle className="text-gray-700" onClick={onClear} />
              </span>
            )}
          </div>
        </div>
      </form>

      {searchResults &&
        searchResults.map(({ id, volumeInfo }) => (
          <React.Fragment key={id}>
            {volumeInfo.industryIdentifiers ? (
              <SearchResultCard book={volumeInfo} id={id} />
            ) : null}
          </React.Fragment>
        ))}
    </div>
  );
}

export default Search;
