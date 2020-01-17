import { SubredditActionTypes } from './subreddit.types';

const initialState = {
	currentSubreddit: null,
	isFetching: false,
	errorMessage: ''
};

const subredditReducer = (state = initialState, action) => {
	switch (action.type) {
		case SubredditActionTypes.FETCH_SUBREDDIT_START:
			return { ...state, isFetching: true };

		case SubredditActionTypes.FETCH_SUBREDDIT_SUCCESS:
			return {
				...state,
				isFetching: false,
				currentSubreddit: action.payload
			};

		case SubredditActionTypes.FETCH_SUBREDDIT_FAILURE:
			return {
				...state,
				isFetching: false,
				errorMessage: action.payload
			};

		default:
			return state;
	}
};

export default subredditReducer;
