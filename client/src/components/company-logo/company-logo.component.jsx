// Core Imports
import React from 'react';

// Relative Imports
import { ReactComponent as RedditLogo } from '../../assets/SVG/reddit.svg';

//Styles
import './company-logo.style.scss';

const CompanyLogo = () => {
	return (
		<div className="company-logo__container">
			<RedditLogo className="company-logo__icon" />
		</div>
	);
};

export default CompanyLogo;
