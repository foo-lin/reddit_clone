//Core Import
import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';

//Relative Import
import rootReducer from './root-reducer';

const middleWares = [logger];

const store = createStore(rootReducer, applyMiddleware(...middleWares));

export default store;
