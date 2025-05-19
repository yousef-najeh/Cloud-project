import React from 'react';
import { withAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

function App({ signOut, user }) {
  return (
    <div>
      <h1>مرحبًا {user.username} 👋</h1>
      <button onClick={signOut}>تسجيل الخروج</button>
    </div>
  );
}

export default withAuthenticator(App);
