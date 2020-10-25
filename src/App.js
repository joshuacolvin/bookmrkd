import React from 'react';
import './App.css';
import { Router, Link } from '@reach/router';
import { withAuthenticator } from '@aws-amplify/ui-react';
import BooksList from './pages/BooksList';
import BookPreview from './pages/BookPreview';
import Search from './components/Search';
import BookDetails from './pages/BookDetails';

function App() {
  return (
    <div className="flex flex-col h-screen">
      <header className="bg-indigo-800 p-4 sticky">
        <Link to="/">
          <h1 className="text-white text-2xl font-extrabold">Bookmrkd</h1>
        </Link>
      </header>
      <div className="flex flex-row justify-between">
        <div className="content p-6 flex-1 overflow-y-auto">
          <Router>
            <BooksList path="/" />
            <BookPreview path="preview/:isbn" />
            <BookDetails path="books/:bookId" />
          </Router>
        </div>
        <Search />
      </div>
    </div>
  );
}

export default withAuthenticator(App);
