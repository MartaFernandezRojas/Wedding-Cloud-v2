import {
    createStore,
    applyMiddleware
  } from 'redux';
  import {
    composeWithDevTools
  } from 'redux-devtools-extension';
  import {
    createLogger
  } from 'redux-logger';
  import reduxThunk from 'redux-thunk';
  import {
    allReducers
  } from '@Models';
  
  // Logger config
  const logger = createLogger({
    collapsed: true
  });
  
  // Creating middleware woth compose, logger and thunk
  const middleware = composeWithDevTools(applyMiddleware(logger, reduxThunk));
  
  // Creating and exporting the Store
  const store = createStore(allReducers, {}, middleware);
  
  export const Store = store;