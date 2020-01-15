//Core imports
import React from 'react';
import { connect } from 'react-redux';
//Relative Imports
import SubredditInfoCard from '../subreddit-info-card/subreddit-info-card';
import { formateDate } from '../../utils/dateTime.js';
import { selectCurrentSubreddit } from '../../redux/subreddit/subreddit.selector';
//styles
import './subreddit-sidebar.styles.scss';

const SubredditSidebar = ({ currentSubreddit }) => {
	return (
		<>
			<SubredditInfoCard title="About community">
				<div className="community-details">
					<p className="community-details__desc">
						{currentSubreddit.desc}
					</p>
					<div className="community-details__stats">
						<div className="community-details__stats-users">
							{currentSubreddit.numUsers}
							<span>Memebers</span>
						</div>
						<div className="community-details__stats-online">
							N/A
							<span>Online</span>
						</div>
					</div>
					<div className="community-details__bday">
						{formateDate(currentSubreddit.createdAt)}
					</div>
				</div>
			</SubredditInfoCard>

			<SubredditInfoCard title="Moderators">
				<ul className="modeartors">
					{currentSubreddit.modarators.map(mod => (
						<li key={mod._id}>{`u/${mod.username}`}</li>
					))}
				</ul>
			</SubredditInfoCard>

			<SubredditInfoCard title="About">
				<div className="about">
					<div className="about__desc">This is demo project</div>
				</div>
			</SubredditInfoCard>
		</>
	);
};

const mapStateToProps = state => {
	return {
		currentSubreddit: selectCurrentSubreddit(state)
	};
};

export default connect(mapStateToProps)(SubredditSidebar);
