//Core imports
import React from 'react';

//Relative Import
import SubredditImgCover from '../subreddit-img-cover/subreddit-img-cover.component';
import SubredditDetails from '../subreddit-detail/subreddit-details.componet';
import SubredditSidebar from '../subreddit-sidebar/subreddit-side.components';
import SubredditPostContainer from '../subreddit-post-container/subreddit-posts-container.component';
import Container from '../container/contanainer.component';
//Styles
import './subreddit-overview.styles.scss';

const SubredditOverview = ({ match }) => {
	const { subredditSlug } = match.params;
	console.log(subredditSlug);
	return (
		<div>
			<SubredditImgCover />
			<Container>
				<SubredditDetails subredditName="Webdev" />
			</Container>
			<Container>
				<div className="subreddit">
					<div className="subreddit__main">
						<SubredditPostContainer />
					</div>
					<div className="subreddit__sidebar">
						<SubredditSidebar />
					</div>
				</div>
			</Container>
		</div>
	);
};

export default SubredditOverview;
