import { createStore, applyMiddleware } from 'redux';
import reducers from './reducers/index';
import { thunk } from 'redux-thunk';
import logger from 'redux-logger';

const middlewareEnhancer = applyMiddleware(thunk, logger);

export const store = createStore(reducers, middlewareEnhancer);

