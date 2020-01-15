import { SubredditActionTypes } from './subreddit.types';

export const setCurrentSubreddit = subreddit => {
	return {
		type: SubredditActionTypes.SET_CURRENT_SUBREDDIT,
		payload: subreddit
	};
};
