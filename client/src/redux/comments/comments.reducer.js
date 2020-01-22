import { CommentsActionTypes } from './comments.types';
import { listToMap, updateVotes } from './comment.utils';

const initialState = {
	currentComments: null,
	isFetching: false,
	errorMessage: ''
};

const postsReducer = (state = initialState, action) => {
	switch (action.type) {
		case CommentsActionTypes.FETCH_COMMENTS_START:
			return { ...state, isFetching: true };
		case CommentsActionTypes.FETCH_COMMENTS_SUCCESS:
			return {
				...state,
				isFetching: false,
				currentComments: listToMap(action.payload)
			};
		case CommentsActionTypes.FETCH_COMMENTS_FAILURE:
			return {
				...state,
				isFetching: false,
				errorMessage: action.payload
			};
		case CommentsActionTypes.UPDATE_VOTES:
			return {
				...state,
				currentComments: updateVotes(
					state.currentComments,
					action.payload
				)
			};
		default:
			return state;
	}
};

export default postsReducer;
