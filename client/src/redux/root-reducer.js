//core imports
import { combineReducers } from 'redux';

//Relative Imports
import subredditReducer from './subreddit/subreddit.reducer';
import postsReducer from './posts/posts.reducer';
import commmetsReducer from './comments/comments.reducer';

export default combineReducers({
	subreddit: subredditReducer,
	posts: postsReducer,
	comments: commmetsReducer
});
