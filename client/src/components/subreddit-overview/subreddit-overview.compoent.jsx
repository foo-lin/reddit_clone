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

import { setCurrentSubreddit } from '../../redux/subreddit/subreddit.actions';

//Styles
import './subreddit-overview.styles.scss';

const SubredditOverview = ({
	match,
	currentSubreddit,
	setCurrentSubreddit
}) => {
	const { subredditSlug } = match.params;

	useEffect(() => {
		const getSubreddit = async () => {
			const resp = await axios.get(
				`http://localhost:5000/api/v1/subreddit/${subredditSlug}/slug`
			);
			setCurrentSubreddit({ ...resp.data.data.subreddit });
		};
		getSubreddit();
	}, [subredditSlug]);

	if (!currentSubreddit) return <LoadingIcon />;

	return (
		<div>
			<SubredditImgCover
				imageBackgroundUrl={currentSubreddit.imageBackgroundUrl}
			/>
			<Container>
				<SubredditDetails
					name={currentSubreddit.name}
					title={currentSubreddit.title}
					imageLogoUrl={currentSubreddit.imageLogoUrl}
				/>
			</Container>
			<Container>
				<div className="subreddit">
					<div className="subreddit__main">
						<SubredditPostContainer />
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
		currentSubreddit: state.subreddit.currentSubreddit
	};
};

const mapDispatchToProps = dispatch => {
	return {
		setCurrentSubreddit: subreddit =>
			dispatch(setCurrentSubreddit(subreddit))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(SubredditOverview);
