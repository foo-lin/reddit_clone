//Core Import
import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
//Relative Imports
import PostContainer from '../post-container/post-container.component';
import Posts from '../posts/posts.component.jsx';
import Loading from '../loading/loading.component';

import { fetchPostsStartAsync } from '../../redux/posts/posts.actions.js';
import { selectCurrentSubredditId } from '../../redux/subreddit/subreddit.selector.js';
import {
	selectIsFectching,
	selectIsPostsLoaded
} from '../../redux/posts/post.selector.js';

// import { ReactComponent as DownIcon } from '../../assets/SVG/chevron-down.svg';
// import { ReactComimport { connect } from 'tls';
// ponent as NewIcon } from '../../assets/SVG/display.svg';
//styles
import './subreddit-post-container.styles.scss';

const SubredditPostsContainer = ({
	match,
	history,
	fetchPostsStartAsync,
	subredditId,
	isFetching,
	isPostsLoaded
}) => {
	const [sortBy, setSortBy] = useState(match.params.sortBy || 'new');
	useEffect(() => {
		fetchPostsStartAsync('5e1daf03e0e55722e3f7cf93', sortBy);
	}, [match.params.sortBy]);

	const handleChange = evt => {
		evt.preventDefault();
		setSortBy(evt.target.value);
		let url = match.url;
		if (match.params.sortBy) {
			url = url.replace(match.params.sortBy, evt.target.value);
		} else {
			url = `${url}/${evt.target.value}`;
		}
		history.push(url);
	};

	if (!isPostsLoaded || isFetching) return <Loading />;
	return (
		<>
			<PostContainer>
				{/* <div className="sort-by">
					<div className="">
						<NewIcon className="sort-by__icon" />
					</div>
					<span className="sort-by__field">New</span>
					<div className="">
						<DownIcon className="sort-by__icon sort-by__dropdown-icon"></DownIcon>
					</div>
				</div> */}
				<select value={sortBy} onChange={handleChange}>
					<option name="new" id="sdf">
						new
					</option>
					<option name="old" id="sdf">
						old
					</option>
					<option name="top" id="sdf">
						top
					</option>
				</select>
			</PostContainer>
			<Posts />
		</>
	);
};

const mapStateToProps = state => {
	return {
		subredditId: selectCurrentSubredditId(state),
		isFetching: selectIsFectching(state),
		isPostsLoaded: selectIsPostsLoaded(state)
	};
};

const mapDispatchToProps = dispatch => {
	return {
		fetchPostsStartAsync: (subredditId, sortBy) =>
			dispatch(fetchPostsStartAsync(subredditId, sortBy))
	};
};

export default withRouter(
	connect(mapStateToProps, mapDispatchToProps)(SubredditPostsContainer)
);
