import React, { useEffect, useState, useCallback } from 'react';
import { a, API, graphqlOperation } from 'aws-amplify';
import { getBook } from '../graphql/queries';
import {
  createRecommendation,
  deleteBook,
  deleteRecommendation,
  updateRecommendation,
} from '../graphql/mutations';
import { Dialog } from '@reach/dialog';
import { navigate } from '@reach/router';
import { FaPlusCircle, FaEllipsisV } from 'react-icons/fa';
import { Menu, MenuList, MenuButton, MenuItem } from '@reach/menu-button';
import RecommendationForm from '../components/RecommendationForm';
import '@reach/menu-button/styles.css';
import '@reach/dialog/styles.css';

function BookDetails({ bookId }) {
  const [book, setBook] = useState();
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
  const openConfirmDeleteBookDialog = () =>
    setShowConfirmDeleteBookDialog(true);
  const closeConfirmDeleteBookDialog = () =>
    setShowConfirmDeleteBookDialog(false);

  const getBookDetails = useCallback(async () => {
    console.log('getBookDetails');
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

    if (selectedRecommendation) {
      recommendation.id = selectedRecommendation.id;

      await API.graphql(
        graphqlOperation(updateRecommendation, { input: recommendation })
      );
    } else {
      await API.graphql(
        graphqlOperation(createRecommendation, { input: recommendation })
      );
    }

    getBookDetails();
    close();
  }

  async function removeRecommendation() {
    await API.graphql(
      graphqlOperation(deleteRecommendation, {
        input: { id: selectedRecommendation.id },
      })
    );
    setSelectedRecommendation(null);
    closeConfirmDialog();
    getBookDetails();
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
    await API.graphql(graphqlOperation(deleteBook, { input: { id: bookId } }));
    navigate(`/`);
  }

  return (
    <div>
      {book && (
        <div className="flex flex-col">
          <div className="flex p-12 pb-0 book-img-container">
            <img
              className="shadow-md thumbnail-lg"
              src={book.thumbnail}
              alt={`${book.title} cover`}
            />
            <div className="ml-6 flex flex-col justify-between flex-auto">
              <div>
                <div className="flex justify-between items-center">
                  <h2 className="text-4xl font-extrabold">{book.title}</h2>
                  <Menu>
                    <MenuButton>
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
              <div className="flex">
                {book.recommendations && book.recommendations.items && (
                  <div
                    className="mt-2 p-2 bg-indigo-800 items-center text-indigo-100 leading-none lg:rounded-full flex lg:inline-flex"
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
                  className="mt-2 ml-2 bg-indigo-500 hover:bg-indigo-800 text-white font-bold py-2 px-4 rounded-full"
                  onClick={open}
                >
                  <span className="flex items-center">
                    Add <FaPlusCircle className="ml-2" />
                  </span>
                </button>
              </div>
            </div>
          </div>
          <div className="flex p-12 pt-6">
            <div className="book-details mt-2">
              {book.categories && (
                <p className="text-gray-600 text-xs">
                  {book.categories.join(', ')}
                </p>
              )}
              <p className="text-gray-600 text-xs">{book.publisher}</p>

              <p className="text-gray-600 text-xs">{book.pageCount} pages</p>

              <p className="text-gray-600 text-xs">ISBN {book.isbn}</p>
            </div>
            <div className="flex flex-col flex-auto">
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
        onDismiss={closeConfirmDeleteBookDialog}
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
            onClick={closeConfirmDeleteBookDialog}
          >
            Cancel
          </button>
        </div>
      </Dialog>
    </div>
  );
}

export default BookDetails;
