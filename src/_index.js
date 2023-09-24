import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';
import { BrowserRouter } from 'react-router-dom';
import FetchMock from 'react-fetch-mock'; // eslint-disable-line

import { persistor, store } from 'store.js';

import 'css/stylesheet.scss';

import App from 'App';

import { unregister } from './registerServiceWorker';

import 'icons.js';

/* BEGIN FAKE API */
window.fetch = new FetchMock(require('./__mocks__'), {
  delay: 1000,
  exclude: [
    'http://localhost:3000/sample.pdf'
  ],
  fetch: window.fetch.bind(window)
}).fetch;
/* END FAKE API */

console.log('foo');

ReactDOM.render((
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </PersistGate>
  </Provider>
), document.getElementById('root'));

unregister();
