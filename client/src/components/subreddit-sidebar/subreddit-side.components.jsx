//Core imports
import React from 'react';

//Relative Imports
import SubredditInfoCard from '../subreddit-info-card/subreddit-info-card';
//styles
import './subreddit-sidebar.styles.scss';

const SubredditSidebar = () => {
	return (
		<>
			<SubredditInfoCard title="About community">
				<div className="community-details">
					<p className="community-details__desc">
						Lorem, ipsum dolor sit amet consectetur adipisicing
						elit. Amet nulla quidem quas nisi porro velit?
					</p>
					<div className="community-details__stats">
						<div className="community-details__stats-users">
							2000
							<span>Memebers</span>
						</div>
						<div className="community-details__stats-online">
							2000
							<span>Online</span>
						</div>
					</div>
					<div className="community-details__bday">
						Created Jan 24 2011
					</div>
				</div>
			</SubredditInfoCard>

			<SubredditInfoCard title="Moderators">
				<ul className="modeartors">
					<li>one</li>
					<li>one</li>
					<li>one</li>
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
