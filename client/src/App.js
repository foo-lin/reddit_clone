import React, { useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';

import axios from 'axios';
import { connect } from 'react-redux';
import { selectCurrentToken } from './redux/token/token.selector';
import { selectIsUserLoaded } from './redux/user/user.selector';
import { fetctLoggedInUserAsync } from './redux/user/user.actions';

import './App.scss';
import Header from './components/header/header.component';
import SignUp from './pages/sighup/sighup.component';
import Login from './pages/login/login.component.jsx';
import Subreddit from './pages/subreddit/subreddit.component';
import HomePage from './pages/homepage/homepage.component.jsx';

function App({ token, userLoaded, fetctLoggedInUserAsync }) {
	useEffect(() => {
		if (token) {
			axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
		} else {
			axios.defaults.headers.common['Authorization'] = '';
		}
		if (!userLoaded) {
			fetctLoggedInUserAsync();
		}
	}, [token, userLoaded, fetctLoggedInUserAsync]);

	return (
		<div className="App">
			<Header />
			<Switch>
				<Route path="/login" exact component={Login} />
				<Route path="/signup" exact component={SignUp} />
				<Route path="/a" component={Subreddit} />
				<Route path="/" render={() => <HomePage />} />
			</Switch>
		</div>
	);
}

const mapStateToProps = state => {
	return {
		token: selectCurrentToken(state),
		userLoaded: selectIsUserLoaded(state)
	};
};

const mapDispatchToProps = dispatch => {
	return {
		fetctLoggedInUserAsync: () => dispatch(fetctLoggedInUserAsync())
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
