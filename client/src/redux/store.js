//Core Import
import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
//Relative Import
import rootReducer from './root-reducer';

const middleWares = [logger, thunk];

const store = createStore(rootReducer, applyMiddleware(...middleWares));

export default store;
