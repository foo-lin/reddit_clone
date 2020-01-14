//Core import
import React from 'react';
import { Route } from 'react-router-dom';
// Relative Import
import SubredditOverview from '../../components/subreddit-overview/subreddit-overview.compoent';
//Styles

const Subreddit = props => {
	const { match } = props;

	return (
		<>
			<Route
				exact
				path={`${match.path}/:subredditSlug`}
				component={SubredditOverview}
			/>
		</>
	);
};

export default Subreddit;
