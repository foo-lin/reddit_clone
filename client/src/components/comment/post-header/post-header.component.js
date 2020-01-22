//Core imports
import React from 'react';

//Relative imports
import PostFooter from '../../post/post-footer/post-footer.component';
import { splitNewLine } from '../../../utils/spitNewLine';
import './comment-header.styles.scss';

const CommentHeader = ({ post }) => {
	return (
		<div className="comment-header">
			<div className="comment-header__title">
				{splitNewLine(post.title).map((pt, i) => (
					<p key={i}>{pt}</p>
				))}
			</div>
			<p className="comment-header__user">{`u/${post.user.username}`}</p>
			<div className="comment-header__text">
				{splitNewLine(post.postText).map((pt, i) => (
					<p key={i}>{pt}</p>
				))}
			</div>
			<PostFooter
				numComments={post.numComments}
				votes={post.votes}
				postId={post._id}
				hasVoted={post.hasVoted ? post.hasVoted : { vote: 0 }}
			/>
		</div>
	);
};

export default CommentHeader;
