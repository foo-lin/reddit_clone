//Core Import
import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import { persistStore } from 'redux-persist';
import thunk from 'redux-thunk';
//Relative Import
import rootReducer from './root-reducer';

const middleWares = [thunk, logger];

export const store = createStore(rootReducer, applyMiddleware(...middleWares));

export const persistor = persistStore(store);

// export default { store, persistor };
