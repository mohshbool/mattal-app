import {applyMiddleware, compose, createStore, Store} from 'redux';
import Thunk from 'redux-thunk';
import persistedReducer from './Reducer/index';

export const store = createStore(
  persistedReducer,
  compose(
    applyMiddleware(Thunk),
    typeof window.__REDUX_DEVTOOLS_EXTENSION__ !== 'undefined'
      ? window.__REDUX_DEVTOOLS_EXTENSION__()
      : (f) => f,
  ),
) as Store;
