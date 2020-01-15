import { SubredditActionTypes } from './subreddit.types';

const initialState = {
	currentSubreddit: null
};

const subredditReducer = (state = initialState, action) => {
	switch (action.type) {
		case SubredditActionTypes.SET_CURRENT_SUBREDDIT:
			return {
				...state,
				currentSubreddit: action.payload
			};
		default:
			return state;
	}
};

export default subredditReducer;
