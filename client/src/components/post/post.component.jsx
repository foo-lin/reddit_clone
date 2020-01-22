//Core Import
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
//Relative Import
import PostContainer from '../post-container/post-container.component';
import PostFooter from './post-footer/post-footer.component';
import { ReactComponent as DotIcon } from '../../assets/SVG/dot-single.svg';
import { getTimeDiff } from '../../utils/dateTime';
import { splitNewLine } from '../../utils/spitNewLine';
//Styles
import './post.styles.scss';

const Post = ({ post, match }) => {
	const {
		subreddit: { name },
		title,
		numComments,
		user: { username },
		votes,
		imgLink,
		createdAt,
		_id,
		hasVoted
	} = post;
	const [imgOpen, setImgOpen] = useState(false);
	let url = match.url.replace(/\/?(new|old|top)?$/, '');
	url = `${url}/comment/${_id}`;
	return (
		<PostContainer>
			<div className="post">
				<div className="post__heading">
					<h4>{`a/${name}`}</h4>
					<div className="post__icon-container">
						<DotIcon className="post__icon" />
					</div>
					<span>{getTimeDiff(createdAt)}</span>
					<div className="post__icon-container">
						<DotIcon className="post__icon" />
					</div>
					<span>{`u/${username}`}</span>
					<div className="post__icon-container">
						<DotIcon className="post__icon" />
					</div>
				</div>

				<div className="post__sec">
					{imgLink && (
						<img
							src={imgLink}
							alt="sdf"
							className="post__sec__img"
							onClick={() => {
								setImgOpen(!imgOpen);
							}}
						/>
					)}
					<div className="post__sec__title">
						<Link to={url}>
							{splitNewLine(title).map((t, num) => (
								<p key={num}>{t}</p>
							))}
						</Link>
					</div>
				</div>
				{imgOpen && (
					<div>
						<img src={imgLink} alt="" className="post__img" />
					</div>
				)}
				<PostFooter
					numComments={numComments}
					votes={votes}
					postId={_id}
					hasVoted={hasVoted ? hasVoted : { vote: 0 }}
				/>
			</div>
		</PostContainer>
	);
};

export default withRouter(React.memo(Post));
