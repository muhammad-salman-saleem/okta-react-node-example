import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Security } from '@okta/okta-react';

import App from './App';
import * as serviceWorker from './serviceWorker';

const oktaConfig = {
  issuer: `${process.env.REACT_APP_OKTA_ORG_URL}/oauth2/default`,
  redirect_uri: `http://localhost:3000/login/callback`,
  client_id: process.env.REACT_APP_OKTA_CLIENT_ID,
  scopes: ['openid', 'profile', 'email'],
  // audience:"0oagwpfpjkU4wK2Jq5d7"
};

ReactDOM.render(
  <BrowserRouter>
    <Security {...oktaConfig}>
      <App />
    </Security>
  </BrowserRouter>,
  document.getElementById('root'),
);

serviceWorker.unregister();

if (module.hot) module.hot.accept();
