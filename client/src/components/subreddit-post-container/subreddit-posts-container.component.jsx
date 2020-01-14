//Core Import
import React from 'react';

//Relative Imports
import PostContainer from '../post-container/post-container.component';
import Posts from '../posts/posts.component.jsx';

import { ReactComponent as DownIcon } from '../../assets/SVG/chevron-down.svg';
import { ReactComponent as NewIcon } from '../../assets/SVG/display.svg';
//styles
import './subreddit-post-container.styles.scss';

const SubredditPostsContainer = () => {
	return (
		<>
			<PostContainer>
				<div className="sort-by">
					<div className="">
						<NewIcon className="sort-by__icon" />
					</div>
					<span className="sort-by__field">New</span>
					<div className="">
						<DownIcon className="sort-by__icon sort-by__dropdown-icon"></DownIcon>
					</div>
				</div>
			</PostContainer>
			<Posts />
		</>
	);
};

export default SubredditPostsContainer;
