//core imports
import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

//Relative Imports
import subredditReducer from './subreddit/subreddit.reducer';
import postsReducer from './posts/posts.reducer';
import commmetsReducer from './comments/comments.reducer';
import userReducer from './user/user.reducer';
import tokenReducer from './token/token.reducer';

const persistConfig = {
	key: 'root',
	storage,
	whitelist: ['token']
};

const rootReducer = combineReducers({
	subreddit: subredditReducer,
	posts: postsReducer,
	comments: commmetsReducer,
	user: userReducer,
	token: tokenReducer
});

export default persistReducer(persistConfig, rootReducer);
