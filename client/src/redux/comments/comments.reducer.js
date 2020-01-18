import { CommentsActionTypes } from './comments.types';

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
				currentComments: action.payload
			};
		case CommentsActionTypes.FETCH_COMMENTS_FAILURE:
			return {
				...state,
				isFetching: false,
				errorMessage: action.payload
			};
		default:
			return state;
	}
};

export default postsReducer;
