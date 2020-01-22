//Core Import
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
//Relative Import
import CustomButton from '../custom-button/custom-button.component';
import { selectCurrentSubreddit } from '../../redux/subreddit/subreddit.selector';
import { selectIsUserLoaded } from '../../redux/user/user.selector';
//styles
import './subreddit-details.styles.scss';

const SubredditDetails = ({ currentSubreddit, userLoaded }) => {
	const [subscribe, setSubscribe] = useState(false);
	const [loading, setLoading] = useState(false);
	useEffect(() => {
		async function getIsUserSub() {
			setLoading(true);
			const resp = await axios.get(
				`/subreddit/${currentSubreddit._id}/subscribe/is`
			);
			setLoading(false);
			setSubscribe(resp.data.data.isSub);
		}

		if (userLoaded) {
			getIsUserSub();
		}
	}, [currentSubreddit._id, userLoaded]);

	const sub = async () => {
		setLoading(true);
		try {
			await axios.post(`/subreddit/${currentSubreddit._id}/subscribe`);
			setSubscribe(true);
		} catch (error) {
		} finally {
			setLoading(false);
		}
	};
	const unSub = async () => {
		setLoading(true);
		try {
			await axios.delete(`/subreddit/${currentSubreddit._id}/subscribe`);
			setSubscribe(false);
		} catch (error) {
		} finally {
			setLoading(false);
		}
	};

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
			{subscribe ? (
				<CustomButton onClick={unSub} loading={loading}>
					Joined
				</CustomButton>
			) : (
				<CustomButton onClick={sub} loading={loading}>
					Join Community
				</CustomButton>
			)}
		</div>
	);
};

const mapStateToProps = state => {
	return {
		currentSubreddit: selectCurrentSubreddit(state),
		userLoaded: selectIsUserLoaded(state)
	};
};

export default connect(mapStateToProps)(SubredditDetails);
