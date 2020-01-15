//Core Import
import React from 'react';
import { connect } from 'react-redux';
//Relative Import
import CustomButton from '../custom-button/custom-button.component';
import { selectCurrentSubreddit } from '../../redux/subreddit/subreddit.selector';
//styles
import './subreddit-details.styles.scss';

const SubredditDetails = ({ currentSubreddit }) => {
	return (
		<div className="subreddit-details">
			<img
				src={currentSubreddit.imageLogoUrl}
				alt="logo"
				className="subreddit-details__img"
			/>

			<div className="subreddit-details__name">
				<div>{currentSubreddit.title}</div>
				<span>{`a/${currentSubreddit.name}`}</span>
			</div>
			<CustomButton>Join</CustomButton>
		</div>
	);
};

const mapStateToProps = state => {
	return {
		currentSubreddit: selectCurrentSubreddit(state)
	};
};

export default connect(mapStateToProps)(SubredditDetails);
