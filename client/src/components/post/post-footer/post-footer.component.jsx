//Core Imports
import React, { useState } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
// Relative imports

import { selectIsUserLoaded } from '../../../redux/user/user.selector';
import { updatePostVotes } from '../../../redux/posts/posts.actions.js';

import { ReactComponent as DotIcon } from '../../../assets/SVG/dot-single.svg';
import { ReactComponent as ArrowDownIcon } from '../../../assets/SVG/arrow-down.svg';
import { ReactComponent as ArrowUpIcon } from '../../../assets/SVG/arrow-up.svg';
import { ReactComponent as ThreeDotIcon } from '../../../assets/SVG/dots-three-horizontal.svg';
import { ReactComponent as CommentIcon } from '../../../assets/SVG/bubble.svg';
import { ReactComponent as ShareIcon } from '../../../assets/SVG/redo2.svg';

//Styles
import './post-footer.styles.scss';

const PostFooter = ({
	numComments,
	votes,
	postId,
	hasVoted,
	userLoaded,
	updatePostVotes
}) => {
	const { vote } = hasVoted;
	const [isFetching, setIsFetching] = useState(false);
	const downVote = async () => {
		if (userLoaded) {
			let voteToAdd = 0;
			if (vote === 0) {
				voteToAdd = -1;
			} else if (vote === -1) {
				voteToAdd = 1;
			} else if (vote === 1) {
				voteToAdd = -2;
			}
			updatePostVotes(postId, vote === -1 ? 0 : -1, voteToAdd);
			setIsFetching(true);
			await axios.patch(`/post/${postId}/vote/downvote`);
			setIsFetching(false);
		}
	};

	const upVote = async () => {
		if (userLoaded) {
			let voteToAdd = 0;
			if (vote === 0) {
				voteToAdd = 1;
			} else if (vote === 1) {
				voteToAdd = -1;
			} else if (vote === -1) {
				voteToAdd = 2;
			}
			updatePostVotes(postId, vote === 1 ? 0 : 1, voteToAdd);
			setIsFetching(true);
			await axios.patch(`/post/${postId}/vote/upvote`);
			setIsFetching(false);
		}
	};

	return (
		<div className="post-footer">
			<div className="post-footer__start">
				<div className="post-footer__share">
					<ShareIcon className="post-footer__icon" />
					<span>Share</span>
				</div>
				<div className="post-footer__comment">
					<CommentIcon className="post-footer__icon" />
					<span>{numComments ? numComments : 'Comments'}</span>
				</div>
			</div>
			<div className="post-footer__end">
				<div className="post-footer__links">
					<ThreeDotIcon className="post-footer__icon post-footer__icon--links" />
				</div>
				<div className="post-footer__votes">
					<div className="post-footer__upvote">
						<ArrowUpIcon
							onClick={upVote}
							className={`post-footer__icon ${isFetching &&
								'isFeching'} ${vote === 1 && 'upvoted'}  `}
						/>
					</div>
					<div className="post-footer__num-comments">
						{votes ? (
							votes
						) : (
							<DotIcon className="post-footer__icon" />
						)}
					</div>
					{/* <div className="post-footer__num-comments">{votes}</div> */}
					<div className="post-footer__downvote">
						<div className="post-footer__downvote">
							<ArrowDownIcon
								onClick={downVote}
								className={`post-footer__icon ${vote === -1 &&
									'downvoted'} ${isFetching && 'isFeching'}`}
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

const mapStateToProps = state => {
	return {
		userLoaded: selectIsUserLoaded(state)
	};
};

const mapDisptchToProps = dispatch => {
	return {
		updatePostVotes: (postId, vote, voteToAdd) =>
			dispatch(updatePostVotes(postId, vote, voteToAdd))
	};
};

export default connect(mapStateToProps, mapDisptchToProps)(PostFooter);
