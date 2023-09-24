import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';
import { BrowserRouter } from 'react-router-dom';

import { persistor, store } from 'store.js';

import 'css/stylesheet.scss';

import App from 'App';

import { unregister } from './registerServiceWorker';

import 'icons.js';

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
