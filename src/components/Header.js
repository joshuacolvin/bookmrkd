import React from 'react';
import { Link } from '@reach/router';
import SignOutButton from './SignOutButton';

function Header({ user }) {
  return (
    <nav className="flex items-center justify-between flex-wrap bg-indigo-800 p-6">
      <div className="flex items-center flex-shrink-0 text-white mr-6">
        <Link to="/">
          <span className="font-semibold text-xl tracking-tight">Bookmrkd</span>
        </Link>
      </div>
      {user && (
        <div>
          <span className="text-white font-semibold mr-4">
            Welcome, {user.username}
          </span>
          <SignOutButton />
        </div>
      )}
    </nav>
  );
}

export default Header;
