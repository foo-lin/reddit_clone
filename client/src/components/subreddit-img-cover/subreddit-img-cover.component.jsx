//Core Import
import React from 'react';

//Styles
import './subredditImgCover.styles.scss';

const SubredditImgCover = ({ imageBackgroundUrl }) => {
	if (imageBackgroundUrl) {
		return <img src={imageBackgroundUrl} alt="" className="imgCover" />;
	}
	return <div className="backgroundDiv"></div>;
};
export default SubredditImgCover;
