//Core Import
import React from 'react';

//Relative Import
import PostContainer from '../post-container/post-container.component';
import PostFooter from './post-footer/post-footer.component';
import { ReactComponent as DotIcon } from '../../assets/SVG/dot-single.svg';
//Styles
import './post.styles.scss';

const Post = ({
	subredditName,
	time,
	user,
	imgUrl,
	postTitle,
	numComments,
	upVotes
}) => {
	return (
		<PostContainer>
			<div className="post">
				<div className="post__heading">
					<h4>{`a/${subredditName}`}</h4>
					<div className="post__icon-container">
						<DotIcon className="post__icon" />
					</div>
					<span>{time}</span>
					<div className="post__icon-container">
						<DotIcon className="post__icon" />
					</div>
					<span>{`u/${user}`}</span>
					<div className="post__icon-container">
						<DotIcon className="post__icon" />
					</div>
				</div>

				<div className="post__sec">
					{imgUrl && (
						<img
							src="https://images.unsplash.com/photo-1494386346843-e12284507169?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=700&q=80"
							alt="sdf"
							className="post__sec__img"
						/>
					)}
					<div className="post__sec__title">{postTitle}</div>
				</div>

				<PostFooter />
			</div>
		</PostContainer>
	);
};

export default Post;
