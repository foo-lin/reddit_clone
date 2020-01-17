import axios from 'axios';

import { PostsActionTypes } from './posts.types';
import { sdf } from './posts.utils';

export const fetchPostsStart = () => {
	return {
		type: PostsActionTypes.FETCH_POSTS_START
	};
};

export const fetchPostsSuccess = posts => {
	return {
		type: PostsActionTypes.FETCH_POSTS_SUCCESS,
		payload: posts
	};
};

export const fetchPostsFailure = errorMsg => {
	return {
		type: PostsActionTypes.FETCH_POSTS_FAILURE,
		payload: errorMsg
	};
};

export const fetchPostsStartAsync = (subredditId, sortBy) => {
	return async dispatch => {
		dispatch(fetchPostsStart());
		try {
			const resp = await axios.get(
				`/subreddit/${subredditId}/posts/?sort=${sdf(sortBy)}`
			);
			dispatch(fetchPostsSuccess(resp.data.data.post));
		} catch (error) {
			dispatch(fetchPostsFailure(error.message));
		}
	};
};
