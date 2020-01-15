//Core Import
import React from 'react';
import { connect } from 'react-redux';

//relative imports
import { selectCurrentSubredditImgCover } from '../../redux/subreddit/subreddit.selector';

//Styles
import './subredditImgCover.styles.scss';

const SubredditImgCover = ({ imageBackgroundUrl }) => {
	if (imageBackgroundUrl) {
		return <img src={imageBackgroundUrl} alt="" className="imgCover" />;
	}
	return <div className="backgroundDiv"></div>;
};

const mapStateToProps = state => ({
	imageBackgroundUrl: selectCurrentSubredditImgCover(state)
});

export default connect(mapStateToProps)(SubredditImgCover);
