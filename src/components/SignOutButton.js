import React from 'react';
import { Auth } from 'aws-amplify';

function SignOutButton() {
  async function signOut() {
    try {
      await Auth.signOut({ global: true });
    } catch (error) {
      console.log('error signing out: ', error);
    }
  }

  return (
    <button
      className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-indigo-700 hover:bg-white"
      onClick={signOut}
    >
      Sign Out
    </button>
  );
}

export default SignOutButton;
