// Core Import
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

// Relative Import
import Loading from '../../loading/loading.component';
import CommentList from '../comment-list/comment-list.component';
import {
	fetchCommentsStartAsync,
	fetchCommentStartAsyc
} from '../../../redux/comments/comments.actions';
import {
	selectCurrentComments,
	selectIsFetching,
	selectIsCommentsLoaded
} from '../../../redux/comments/comment.selector';
//Styles
import './comment-container.sytles.scss';

const CommentContainer = ({
	postId,
	fetchCommentsStartAsync,
	fetchCommentStartAsync,
	isFetching,
	isCommentsLoaded,
	comments,
	match
}) => {
	useEffect(() => {
		if (match.params.commentId) {
			fetchCommentStartAsync(match.params.commentId);
		} else {
			fetchCommentsStartAsync(postId);
		}
	}, [match.params.commentId]);

	return (
		<div className="comments-contanier">
			{isFetching || !isCommentsLoaded ? (
				<Loading />
			) : (
				<CommentList comments={comments} parentList={[]} />
			)}
		</div>
	);
};

const mapStateToProps = state => {
	return {
		isFetching: selectIsFetching(state),
		isCommentsLoaded: selectIsCommentsLoaded(state),
		comments: selectCurrentComments(state)
	};
};

const mapDispatchToProps = dispatch => {
	return {
		fetchCommentsStartAsync: postId =>
			dispatch(fetchCommentsStartAsync(postId)),
		fetchCommentStartAsync: commentId =>
			dispatch(fetchCommentStartAsyc(commentId))
	};
};

export default withRouter(
	connect(mapStateToProps, mapDispatchToProps)(CommentContainer)
);
