import { CommentsActionTypes } from './comments.types';
import axios from 'axios';

export const fetchCommentsStart = () => {
	return {
		type: CommentsActionTypes.FETCH_COMMENTS_START
	};
};

export const fetchCommentsSuccess = comments => {
	return {
		type: CommentsActionTypes.FETCH_COMMENTS_SUCCESS,
		payload: comments
	};
};

export const fetchCommentsFailure = errorMsg => {
	return {
		type: CommentsActionTypes.FETCH_COMMENTS_FAILURE,
		payload: errorMsg
	};
};

export const fetchCommentsStartAsync = postId => {
	return async dispatch => {
		dispatch(fetchCommentsStart());
		try {
			const resp = await axios.get(`/post/${postId}/comment`);
			dispatch(fetchCommentsSuccess(resp.data.data.comments));
		} catch (error) {
			dispatch(fetchCommentsFailure(error.message));
		}
	};
};

export const fetchCommentStartAsyc = commentId => {
	return async dispatch => {
		dispatch(fetchCommentsStart());
		try {
			const resp = await axios.get(`/comment/${commentId}`);

			dispatch(fetchCommentsSuccess([resp.data.data.comment]));
		} catch (error) {
			dispatch(fetchCommentsFailure(error.message));
		}
	};
};
