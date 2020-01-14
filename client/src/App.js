import React from 'react';
import { Switch, Route } from 'react-router-dom';

import './App.scss';
import Header from './components/header/header.component';
import SignUp from './pages/sighup/sighup.component';
import Login from './pages/login/login.component.jsx';
import Subreddit from './pages/subreddit/subreddit.component';
import HomePage from './pages/homepage/homepage.component.jsx';
function App() {
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

export default App;
