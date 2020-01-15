//Core import
import React from 'react';

//Relative Imports
import { ReactComponent as RedditLogo } from '../../assets/SVG/reddit.svg';

//Styles
import './loading.styles.scss';

const LoadingIcon = () => {
	return (
		<div className="loading__container">
			<RedditLogo className="loading__icon" />
		</div>
	);
};
export default LoadingIcon;
