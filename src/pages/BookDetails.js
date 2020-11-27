import React, { useEffect, useState, useCallback } from 'react';
import { API, graphqlOperation } from 'aws-amplify';
import { getBook } from '../graphql/queries';
import {
  createRecommendation,
  deleteBook,
  deleteRecommendation,
  updateBook,
  updateRecommendation,
} from '../graphql/mutations';
import { Dialog } from '@reach/dialog';
import { navigate } from '@reach/router';
import { FaPlusCircle, FaEllipsisV } from 'react-icons/fa';
import { Menu, MenuList, MenuButton, MenuItem } from '@reach/menu-button';
import RecommendationForm from '../components/RecommendationForm';
import '@reach/menu-button/styles.css';
import '@reach/dialog/styles.css';
import { BookInfo } from '../components/BookInfo';
import { BookThumbnail } from '../components/BookThumbnail';
import { BookStatus } from '../components/BookStatus';

function BookDetails({ bookId }) {
  const [book, setBook] = useState();
  const [error, setError] = useState(null);
  const [selectedRecommendation, setSelectedRecommendation] = useState(null);
  const [showDialog, setShowDialog] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [
    showConfirmDeleteBookDialog,
    setShowConfirmDeleteBookDialog,
  ] = useState(false);
  const open = () => setShowDialog(true);
  const close = () => setShowDialog(false);
  const openConfirmDialog = () => setShowConfirmDialog(true);
  const closeConfirmDialog = () => {
    setShowConfirmDialog(false);
    setSelectedRecommendation(null);
  };

  const getBookDetails = useCallback(async () => {
    const { data } = await API.graphql(
      graphqlOperation(getBook, { id: bookId })
    );
    setBook(data.getBook);
  }, [bookId]);

  useEffect(() => {
    getBookDetails();
  }, [bookId, getBookDetails]);

  async function handleSubmit(event) {
    event.preventDefault();
    const { recommendedBy, url, notes } = event.target.elements;

    if (!recommendedBy.value) {
      return;
    }

    const recommendation = {
      recommendedBy: recommendedBy.value,
      url: url.value,
      notes: notes.value,
      bookID: bookId,
    };

    setError(null);

    if (selectedRecommendation) {
      recommendation.id = selectedRecommendation.id;

      API.graphql(
        graphqlOperation(updateRecommendation, { input: recommendation })
      )
        .then(() => {
          getBookDetails();
          close();
        })
        .catch(({ errors }) => {
          const { message } = errors[0];
          setError(message);
        });
    } else {
      API.graphql(
        graphqlOperation(createRecommendation, { input: recommendation })
      )
        .then(() => {
          getBookDetails();
          close();
        })
        .catch(({ errors }) => {
          const { message } = errors[0];
          setError(message);
        });
    }
  }

  async function removeRecommendation() {
    API.graphql(
      graphqlOperation(deleteRecommendation, {
        input: { id: selectedRecommendation.id },
      })
    )
      .then(() => {
        setSelectedRecommendation(null);
        closeConfirmDialog();
        getBookDetails();
      })
      .catch(({ errors }) => {
        const { message } = errors[0];
        setError(message);
      });
  }

  function editRecommendation(recommendation) {
    setSelectedRecommendation(recommendation);
    open();
  }

  function onDeleteRecommendation(recommendation) {
    setSelectedRecommendation(recommendation);
    openConfirmDialog();
  }

  async function onDeleteBook() {
    const { data } = await API.graphql(
      graphqlOperation(deleteBook, { input: { id: bookId } })
    );

    if (data.deleteBook.recommendations.items.length) {
      data.deleteBook.recommendations.items.map(async (recommendation) => {
        await API.graphql(
          graphqlOperation(deleteRecommendation, {
            input: { id: recommendation.id },
          })
        );
      });
    }

    navigate('/');
  }

  async function handleStatusChange(event) {
    event.preventDefault();
    const {
      id,
      title,
      authors,
      categories,
      isbn,
      pageCount,
      publisher,
      thumbnail,
      createdAt,
      description,
    } = book;
    const updatedBook = {
      id,
      title,
      authors,
      categories,
      isbn,
      pageCount,
      publisher,
      thumbnail,
      createdAt,
      description,
      status: event.target.value,
    };

    const { data } = await API.graphql(
      graphqlOperation(updateBook, { input: updatedBook })
    );
    setBook(data.updateBook);
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
        <div className="flex flex-col sm:flex-row">
          <div className="flex flex-row sm:flex-col book-details">
            <BookThumbnail thumbnail={book.thumbnail} title={book.title} />
            <div className="flex flex-col ml-6 sm:ml-0">
              <div className="sm:mt-6">
                <BookStatus
                  status={book.status}
                  handleStatusChange={handleStatusChange}
                />
              </div>
              <div className="mt-6">
                <BookInfo book={book} />
              </div>
            </div>
          </div>
          <div className="flex flex-col justify-between flex-auto sm:ml-6 mr-6 mt-6 sm:mt-0">
            <div>
              <div className="flex justify-between items-center">
                <h2 className="text-4xl font-extrabold">{book.title}</h2>
                <Menu>
                  <MenuButton className="mr-4">
                    <FaEllipsisV />
                  </MenuButton>
                  <MenuList>
                    <MenuItem
                      onSelect={() => setShowConfirmDeleteBookDialog(true)}
                    >
                      Delete
                    </MenuItem>
                  </MenuList>
                </Menu>
              </div>
              {book.authors && (
                <h3 className="text-indigo-700">{book.authors.join(', ')}</h3>
              )}
            </div>
            <div className="flex flex-col sm:flex-row">
              {book.recommendations && book.recommendations.items && (
                <div
                  className="mt-6 p-2 bg-indigo-800 items-center text-indigo-100 leading-none rounded-full inline-flex"
                  role="alert"
                >
                  <span className="flex rounded-full bg-indigo-500 uppercase px-2 py-1 text-xs font-bold mr-3">
                    {book.recommendations.items.length}
                  </span>
                  <span className="font-semibold mr-2 text-left flex-auto">
                    {book.recommendations.items.length > 1
                      ? `recommendations`
                      : `recommendation`}
                  </span>
                </div>
              )}
              <button
                className="mt-6 sm:ml-2 bg-indigo-500 hover:bg-indigo-800 text-white font-bold py-2 px-4 rounded-full"
                onClick={open}
              >
                <span className="flex items-center justify-between">
                  Add Recommendation <FaPlusCircle className="ml-2" />
                </span>
              </button>
            </div>
            <div className="flex flex-col flex-auto mt-6">
              {book.recommendations &&
                book.recommendations.items &&
                book.recommendations.items.map((recommendation) => (
                  <div
                    key={recommendation.id}
                    className="bg-gray-200 p-4 flex flex-col rounded-md my-2"
                  >
                    <div className="flex justify-between">
                      <span className="text-xs text-gray-600 mb-2">
                        {new Date(
                          recommendation.createdAt
                        ).toLocaleDateString()}
                      </span>
                      <Menu>
                        <MenuButton className="text-gray-600">
                          <FaEllipsisV />
                        </MenuButton>
                        <MenuList>
                          <MenuItem
                            onSelect={() => editRecommendation(recommendation)}
                          >
                            Edit
                          </MenuItem>
                          <MenuItem
                            onSelect={() =>
                              onDeleteRecommendation(recommendation)
                            }
                          >
                            Delete
                          </MenuItem>
                        </MenuList>
                      </Menu>
                    </div>
                    <div>
                      <label className="uppercase tracking-wide text-gray-600 text-xs font-bold mr-2">
                        Recommended By:
                      </label>
                      {recommendation.url ? (
                        <a
                          className="font-semibold text-indigo-600"
                          href={recommendation.url}
                        >
                          {recommendation.recommendedBy}
                        </a>
                      ) : (
                        <span className="font-semibold text-gray-700">
                          {recommendation.recommendedBy}
                        </span>
                      )}
                    </div>
                    {recommendation.notes && (
                      <p className="text-gray-700 text-base">
                        {recommendation.notes}
                      </p>
                    )}
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}
      <Dialog
        isOpen={showDialog}
        onDismiss={close}
        aria-label="Recommendation Modal"
      >
        <RecommendationForm
          handleSubmit={handleSubmit}
          onCancel={close}
          recommendation={selectedRecommendation}
        />
      </Dialog>
      <Dialog
        isOpen={showConfirmDialog}
        onDismiss={closeConfirmDialog}
        aria-label="Recommendation Modal"
      >
        <div>Are you sure you want to delete this recommendation?</div>
        <div className="flex justify-end">
          <button
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mr-2"
            onClick={removeRecommendation}
          >
            Delete
          </button>
          <button
            className="bg-transparent hover:bg-gray-500 text-gray-700 font-semibold py-2 px-4 border border-gray-700 hover:border-transparent rounded"
            onClick={closeConfirmDialog}
          >
            Cancel
          </button>
        </div>
      </Dialog>
      <Dialog
        isOpen={showConfirmDeleteBookDialog}
        onDismiss={() => setShowConfirmDeleteBookDialog(false)}
        aria-label="Confirm Delete Book Modal"
      >
        <div>Are you sure you want to delete this book?</div>
        <div className="flex justify-end">
          <button
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mr-2"
            onClick={onDeleteBook}
          >
            Delete
          </button>
          <button
            className="bg-transparent hover:bg-gray-500 text-gray-700 font-semibold py-2 px-4 border border-gray-700 hover:border-transparent rounded"
            onClick={() => setShowConfirmDeleteBookDialog(false)}
          >
            Cancel
          </button>
        </div>
      </Dialog>
    </div>
  );
}

export default BookDetails;
