//Core imports
import React, { useState, useEffect } from 'react';
import axios from 'axios';
//Relative Import
import SubredditImgCover from '../subreddit-img-cover/subreddit-img-cover.component';
import SubredditDetails from '../subreddit-detail/subreddit-details.componet';
import SubredditSidebar from '../subreddit-sidebar/subreddit-side.components';
import SubredditPostContainer from '../subreddit-post-container/subreddit-posts-container.component';
import Container from '../container/contanainer.component';

import LoadingIcon from '../loading/loading.component';

//Styles
// import axios from 'axios';
import './subreddit-overview.styles.scss';

const SubredditOverview = ({ match }) => {
	const { subredditSlug } = match.params;

	const [subreddit, setSubreddit] = useState(null);

	useEffect(() => {
		const getSubreddit = async () => {
			const resp = await axios.get(
				`http://localhost:5000/api/v1/subreddit/${subredditSlug}/slug`
			);
			console.log(resp.data.data.subreddit);
			setSubreddit(resp.data.data.subreddit);
		};
		getSubreddit();
	}, [subredditSlug]);

	if (!subreddit) return <LoadingIcon />;

	return (
		<div>
			<SubredditImgCover
				imageBackgroundUrl={subreddit.imageBackgroundUrl}
			/>
			<Container>
				<SubredditDetails
					name={subreddit.name}
					title={subreddit.title}
					imageLogoUrl={subreddit.imageLogoUrl}
				/>
			</Container>
			<Container>
				<div className="subreddit">
					<div className="subreddit__main">
						<SubredditPostContainer />
					</div>
					<div className="subreddit__sidebar">
						<SubredditSidebar
							modarators={subreddit.modarators}
							createdAt={subreddit.createdAt}
							desc={subreddit.desc}
							numUsers={subreddit.numUsers}
						/>
					</div>
				</div>
			</Container>
		</div>
	);
};

export default SubredditOverview;
