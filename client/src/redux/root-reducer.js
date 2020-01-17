//core imports
import { combineReducers } from 'redux';

//Relative Imports
import subredditReducer from './subreddit/subreddit.reducer';
import postsReducer from './posts/posts.reducer';

export default combineReducers({
	subreddit: subredditReducer,
	posts: postsReducer
});
