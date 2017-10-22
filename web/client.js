import React from 'react';
import { browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { render } from 'react-dom';
import thunkMiddleware from 'redux-thunk';
import App from './components/app';
import playersReducer from './reducers/players';
import createRoutes from './routes';

const initialState = JSON.parse(document.documentElement.dataset.props);
const routes = createRoutes(browserHistory);
const store = createStore(playersReducer, initialState, applyMiddleware(thunkMiddleware));

render (
  <Provider store={store}>
    <App>
      { routes }
    </App>
  </Provider>,
  document.getElementById('content')
);

if('serviceWorker' in navigator) {
  navigator.serviceWorker.register('./service-worker.js')
  .then(() => {
    console.log('Service worker registered');
  })
  .catch(error => {
    console.log('Service worker registration failed', error)
  });
}

