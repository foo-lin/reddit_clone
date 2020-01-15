//Core Import
import React from 'react';

//Relative Import
import CustomButton from '../custom-button/custom-button.component';
//styles
import './subreddit-details.styles.scss';

const SubredditDetails = ({ imageLogoUrl, name, title, desc }) => {
	return (
		<div className="subreddit-details">
			<img
				src={imageLogoUrl}
				alt="logo"
				className="subreddit-details__img"
			/>

			<div className="subreddit-details__name">
				<div>{title}</div>
				<span>{`a/${name}`}</span>
			</div>
			<CustomButton>Join</CustomButton>
		</div>
	);
};

export default SubredditDetails;
