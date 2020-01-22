//core import
import React, { useState } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
//relative import

import { ReactComponent as ArrowDownIcon } from '../../../assets/SVG/arrow-down.svg';
import { ReactComponent as ArrowUpIcon } from '../../../assets/SVG/arrow-up.svg';
import { ReactComponent as MessageIcon } from '../../../assets/SVG/message.svg';

import { selectIsUserLoaded } from '../../../redux/user/user.selector';
import { updateVote } from '../../../redux/comments/comments.actions';
//styles
import './comment-footer.styles.scss';

const CommmentFooter = ({
	numVotes,
	hasUserVoted,
	userLoaded,
	parentList,
	commentId,
	updateVote
}) => {
	const { vote } = hasUserVoted;
	const [loading, setLoading] = useState(false);

	const upvote = async () => {
		if (userLoaded) {
			let voteToAdd = 0;
			if (vote === 0) {
				voteToAdd = 1;
			} else if (vote === 1) {
				voteToAdd = -1;
			} else if (vote === -1) {
				voteToAdd = 2;
			}
			updateVote(
				[...parentList, commentId],
				vote === 1 ? 0 : 1,
				voteToAdd
			);
			setLoading(true);
			await axios.patch(`/comment/${commentId}/vote/upvote`);
			setLoading(false);
		}
	};
	const downvote = async () => {
		if (userLoaded) {
			let voteToAdd = 0;
			if (vote === 0) {
				voteToAdd = -1;
			} else if (vote === -1) {
				voteToAdd = 1;
			} else if (vote === 1) {
				voteToAdd = -2;
			}
			updateVote(
				[...parentList, commentId],
				vote === -1 ? 0 : -1,
				voteToAdd
			);
			setLoading(true);
			await axios.patch(`/comment/${commentId}/vote/downvote`);
			setLoading(false);
		}
	};

	return (
		<div className="comment-footer">
			<ArrowUpIcon
				className={`comment-footer__icon ${
					vote === 1 ? 'upvoted' : ''
				} ${loading ? 'loading-up' : ''}`}
				onClick={upvote}
			/>
			<span>{numVotes}</span>
			<ArrowDownIcon
				className={`comment-footer__icon ${
					vote === -1 ? 'downvoted' : ''
				} ${loading ? 'loading-down' : ''} `}
				onClick={downvote}
			/>
			<MessageIcon className="comment-footer__icon" />
		</div>
	);
};

const mapStateToProps = state => {
	return {
		userLoaded: selectIsUserLoaded(state)
	};
};

const mapDispatchToProps = dispatch => {
	return {
		updateVote: (commentList, vote, voteToAdd) =>
			dispatch(updateVote(commentList, vote, voteToAdd))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(CommmentFooter);
