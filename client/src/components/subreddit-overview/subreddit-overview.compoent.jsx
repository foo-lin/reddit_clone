//Core imports
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
//Relative Import
import SubredditImgCover from '../subreddit-img-cover/subreddit-img-cover.component';
import SubredditDetails from '../subreddit-detail/subreddit-details.componet';
import SubredditSidebar from '../subreddit-sidebar/subreddit-side.components';
import SubredditPostContainer from '../subreddit-post-container/subreddit-posts-container.component';
import Container from '../container/contanainer.component';
import LoadingIcon from '../loading/loading.component';
import Comment from '../comment/comment.component';

//redux
import { fetchSubredditStartAsync } from '../../redux/subreddit/subreddit.actions';
import {
	selectCurrentSubreddit,
	selectIsSubredditFetching,
	selectIsCollectionLoaded
} from '../../redux/subreddit/subreddit.selector';

//Styles
import './subreddit-overview.styles.scss';
// import Post from '../post/post.component';

const SubredditOverview = ({
	match,
	currentSubreddit,
	isSubredditFetching,
	fetchSubredditStartAsync,
	selectIsCollectionLoaded
}) => {
	const { subredditSlug } = match.params;
	useEffect(() => {
		fetchSubredditStartAsync(subredditSlug);
	}, [subredditSlug]);

	if (!selectIsCollectionLoaded) return <LoadingIcon />;

	return (
		<div>
			<SubredditImgCover />
			<Container>
				<SubredditDetails />
			</Container>
			<Container>
				<div className="subreddit">
					<div className="subreddit__main">
						<Switch>
							<Route
								exact
								path={`${match.url}/:sortBy?`}
								component={SubredditPostContainer}
							/>

							<Route
								path={`${match.url}/comment/:postId`}
								component={Comment}
							/>
						</Switch>
						{/* <SubredditPostContainer /> */}
					</div>
					<div className="subreddit__sidebar">
						<SubredditSidebar
							modarators={currentSubreddit.modarators}
							createdAt={currentSubreddit.createdAt}
							desc={currentSubreddit.desc}
							numUsers={currentSubreddit.numUsers}
						/>
					</div>
				</div>
			</Container>
		</div>
	);
};

const mapStateToProps = state => {
	return {
		currentSubreddit: selectCurrentSubreddit(state),
		isSubredditFetching: selectIsSubredditFetching(state),
		selectIsCollectionLoaded: selectIsCollectionLoaded(state)
	};
};

const mapDispatchToProps = dispatch => {
	return {
		fetchSubredditStartAsync: subredditSlug =>
			dispatch(fetchSubredditStartAsync(subredditSlug))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(SubredditOverview);
