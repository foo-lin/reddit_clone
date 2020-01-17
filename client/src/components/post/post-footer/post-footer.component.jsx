//Core Imports
import React from 'react';

// Relative imports
import { ReactComponent as DotIcon } from '../../../assets/SVG/dot-single.svg';
import { ReactComponent as ArrowDownIcon } from '../../../assets/SVG/arrow-down.svg';
import { ReactComponent as ArrowUpIcon } from '../../../assets/SVG/arrow-up.svg';
import { ReactComponent as ThreeDotIcon } from '../../../assets/SVG/dots-three-horizontal.svg';
import { ReactComponent as CommentIcon } from '../../../assets/SVG/bubble.svg';
import { ReactComponent as ShareIcon } from '../../../assets/SVG/redo2.svg';

//Styles
import './post-footer.styles.scss';

const PostFooter = ({ numComments, votes }) => {
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
						<ArrowUpIcon className="post-footer__icon" />
					</div>
					<div className="post-footer__num-comments">
						{votes ? (
							votes
						) : (
							<DotIcon className="post-footer__icon" />
						)}
					</div>
					<div className="post-footer__downvote">
						<div className="post-footer__downvote">
							<ArrowDownIcon className="post-footer__icon" />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default PostFooter;
