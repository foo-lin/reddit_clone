//Core Imports
import React from 'react';

//Styles
import './subreddit-info-card.styles.scss';

const SubredditInfoCard = ({ title, children }) => {
	return (
		<div className="subreddit-info-card">
			<div className="subreddit-info-card__title">{title}</div>
			<div className="subreddit-info-card__children">{children}</div>
		</div>
	);
};

export default SubredditInfoCard;
