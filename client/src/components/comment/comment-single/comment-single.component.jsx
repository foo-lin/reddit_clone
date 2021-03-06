//core import
import React, { memo } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
//Relative Import
import { ReactComponent as ThreeDotIcon } from '../../../assets/SVG/dots-three-horizontal.svg';
import CommentFooter from '../comment-footer/comment-footer.component';
import CommentList from '../comment-list/comment-list.component';
import Button from '../../custom-button/custom-button.component';
import { getTimeDiff } from '../../../utils/dateTime';
import { fetchCommentStartAsyc } from '../../../redux/comments/comments.actions';
import { selectIsUserLoaded } from '../../../redux/user/user.selector';

//Styles
import './comment-single.styles.scss';

const SingleComment = ({
	comment,
	postId,
	fetchComment,
	parentList,
	match,
	history
}) => {
	const loadComments = () => {
		let url = match.url;
		if (match.params.commentId) {
			url = url.replace(`/${match.params.commentId}`, '');
		}
		history.push(`${url}/${comment._id}`);
	};

	return (
		<div className={`comment ${comment.parent === null && 'root'}`}>
			<div className="comment__user">
				<img
					src={`https://robohash.org/${comment.user.username}?100x100`}
					alt="user"
					style={{
						backgroundColor: `${comment.user.photoColor}`
					}}
					className="comment__user-photo"
				/>
			</div>
			<div className="comment__text">
				<div className="comment__text__header">
					<div className="comment__text__header--user">
						<h4>{comment.user.username}</h4>
						<span> {getTimeDiff(comment.createdAt)}</span>
					</div>
					<div className="comment__icon--container">
						<ThreeDotIcon className="comment__icon" />
					</div>
				</div>
				<div className="comment__text--content">
					{comment.commentText}
				</div>
				<CommentFooter
					numVotes={comment.votes}
					hasUserVoted={
						comment.hasUserVoted
							? comment.hasUserVoted
							: { vote: 0 }
					}
					commentId={comment._id}
					parentList={parentList}
				/>
				{comment.children && (
					<CommentList
						comments={comment.children}
						parentList={[...parentList, comment._id]}
					/>
				)}
				{comment.havechildren && (
					<Button inverted onClick={loadComments}>
						Load More Comments
					</Button>
				)}
			</div>
		</div>
	);
};

const mapDispatchToProps = dispatch => {
	return {
		fetchComment: commentId => dispatch(fetchCommentStartAsyc(commentId))
	};
};

export default memo(
	withRouter(connect(null, mapDispatchToProps)(SingleComment))
);
