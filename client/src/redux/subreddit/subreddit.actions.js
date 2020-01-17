import axios from 'axios';

import { SubredditActionTypes } from './subreddit.types';

export const fetchSubredditStart = () => {
	return {
		type: SubredditActionTypes.FETCH_SUBREDDIT_START
	};
};

export const fetchSubredditSuccess = subreddit => {
	return {
		type: SubredditActionTypes.FETCH_SUBREDDIT_SUCCESS,
		payload: subreddit
	};
};

export const fetchSubredditFailure = errorMsg => {
	return {
		type: SubredditActionTypes.FETCH_SUBREDDIT_FAILURE,
		payload: errorMsg
	};
};

export const fetchSubredditStartAsync = subredditSlug => {
	return async dispatch => {
		dispatch(fetchSubredditStart());
		try {
			const resp = await axios.get(`/subreddit/${subredditSlug}/slug`);
			dispatch(fetchSubredditSuccess(resp.data.data.subreddit));
		} catch (error) {
			dispatch(fetchSubredditFailure(error.message));
		}
	};
};
