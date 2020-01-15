//core imports
import { combineReducers } from 'redux';

//Relative Imports
import subredditReducer from './subreddit/subreddit.reducer';

export default combineReducers({
	subreddit: subredditReducer
});
