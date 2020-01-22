import { PostsActionTypes } from './posts.types';
import { updateVotes } from './posts.utils';

const initialState = {
	currentPosts: [],
	isFetching: false,
	errorMessage: ''
};

const postsReducer = (state = initialState, action) => {
	switch (action.type) {
		case PostsActionTypes.FETCH_POSTS_START:
			return { ...state, isFetching: true };
		case PostsActionTypes.FETCH_POSTS_SUCCESS:
			return {
				...state,
				isFetching: false,
				currentPosts: action.payload
			};
		case PostsActionTypes.FETCH_POSTS_FAILURE:
			return {
				...state,
				isFetching: false,
				errorMessage: action.payload
			};
		case PostsActionTypes.UPDATE_POST_VOTES:
			return {
				...state,
				currentPosts: updateVotes(state.currentPosts, action.payload)
			};

		default:
			return state;
	}
};

export default postsReducer;
