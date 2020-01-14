//Core Import
import React from 'react';

//Relative Import
import CustomButton from '../custom-button/custom-button.component';
//styles
import './subreddit-details.styles.scss';

const SubredditDetails = ({ imgUrl, subredditName, desc }) => {
	return (
		<div className="subreddit-details">
			<img
				src="https://images.unsplash.com/photo-1494386346843-e12284507169?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=700&q=80"
				alt="sdf"
				className="subreddit-details__img"
			/>

			<div className="subreddit-details__name">
				<div>{subredditName}</div>
				<span>{`a/${subredditName}`}</span>
			</div>
			<CustomButton>Join</CustomButton>
		</div>
	);
};

export default SubredditDetails;
