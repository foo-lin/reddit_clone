//Core imports
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

//Relative Import
import SubredditImgCover from '../subreddit-img-cover/subreddit-img-cover.component';
import SubredditDetails from '../subreddit-detail/subreddit-details.componet';
import SubredditSidebar from '../subreddit-sidebar/subreddit-side.components';
import SubredditPostContainer from '../subreddit-post-container/subreddit-posts-container.component';
import Container from '../container/contanainer.component';
import LoadingIcon from '../loading/loading.component';

//redux
import { fetchSubredditStartAsync } from '../../redux/subreddit/subreddit.actions';
import {
	selectCurrentSubreddit,
	selectIsSubredditFetching
} from '../../redux/subreddit/subreddit.selector';

//Styles
import './subreddit-overview.styles.scss';

const SubredditOverview = ({
	match,
	currentSubreddit,
	isSubredditFetching,
	fetchSubredditStartAsync
}) => {
	const { subredditSlug } = match.params;
	console.log('sdf', isSubredditFetching);
	useEffect(() => {
		fetchSubredditStartAsync(subredditSlug);
	}, [subredditSlug]);

	if (isSubredditFetching || !currentSubreddit) return <LoadingIcon />;

	return (
		<div>
			<SubredditImgCover />
			<Container>
				<SubredditDetails />
			</Container>
			<Container>
				<div className="subreddit">
					<div className="subreddit__main">
						{/* <SubredditPostContainer /> */}
						{/* <LoadingIcon /> */}
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
		isSubredditFetching: selectIsSubredditFetching(state)
	};
};

const mapDispatchToProps = dispatch => {
	return {
		fetchSubredditStartAsync: subredditSlug =>
			dispatch(fetchSubredditStartAsync(subredditSlug))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(SubredditOverview);
