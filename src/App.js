import React from 'react';
import './App.css';
import { Router } from '@reach/router';
import { AmplifyAuthenticator } from '@aws-amplify/ui-react';
import { AuthState, onAuthUIStateChange } from '@aws-amplify/ui-components';

import BooksList from './pages/BooksList';
import BookPreview from './pages/BookPreview';
import Search from './components/Search';
import BookDetails from './pages/BookDetails';
import Header from './components/Header';

function App() {
  const [authState, setAuthState] = React.useState();
  const [user, setUser] = React.useState();

  React.useEffect(() => {
    return onAuthUIStateChange((nextAuthState, authData) => {
      setAuthState(nextAuthState);
      setUser(authData);
    });
  }, []);

  return authState === AuthState.SignedIn && user ? (
    <div className="flex flex-col h-screen">
      <Header user={user} />

      <div className="flex lg:flex-row sm:justify-between flex-col-reverse">
        <div className="content p-6 pr-0 flex-1 overflow-y-auto">
          <Router>
            <BooksList path="/" />
            <BookPreview path="preview/:isbn" />
            <BookDetails path="books/:bookId" />
          </Router>
        </div>
        <Search />
      </div>
    </div>
  ) : (
    <div className="flex flex-col">
      <Header />
      <div className="flex justify-center items-center p-12">
        <AmplifyAuthenticator />
      </div>
    </div>
  );
}

export default App;
