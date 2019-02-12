import {
    combineReducers
  } from 'redux';
  import {
    rootReducer
  } from './root.reducer';

  
  
  // Combining all reducers and exporting them
  export const allReducers = combineReducers({
    rootReducer,
  });