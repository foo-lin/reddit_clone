//Core imports
import React from 'react';

//Relative Imports
import SubredditInfoCard from '../subreddit-info-card/subreddit-info-card';
import { formateDate } from '../../utils/dateTime.js';
//styles
import './subreddit-sidebar.styles.scss';

const SubredditSidebar = ({ modarators, desc, numUsers, createdAt }) => {
	return (
		<>
			<SubredditInfoCard title="About community">
				<div className="community-details">
					<p className="community-details__desc">{desc}</p>
					<div className="community-details__stats">
						<div className="community-details__stats-users">
							{numUsers}
							<span>Memebers</span>
						</div>
						<div className="community-details__stats-online">
							N/A
							<span>Online</span>
						</div>
					</div>
					<div className="community-details__bday">
						{formateDate(createdAt)}
					</div>
				</div>
			</SubredditInfoCard>

			<SubredditInfoCard title="Moderators">
				<ul className="modeartors">
					{modarators.map(mod => (
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

export default SubredditSidebar;
