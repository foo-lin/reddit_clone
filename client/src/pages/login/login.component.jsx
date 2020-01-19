// Core Imports
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
//Relative Imports
import FormInput from '../../components/form-input/form-input.component';
import AuthCard from '../../components/auth-card/auth-card.component';
import CustomButton from '../../components/custom-button/custom-button.component';

import {
	selectIsUserFetching,
	selectIsUserLoaded
} from '../../redux/user/user.selector.js';
import { fetchUserStartAsync } from '../../redux/user/user.actions';

//Styles
import './login.style.scss';

const initialState = {
	email: '',
	password: ''
};

const Login = ({ fetchUser, userLoaded, isUserFetching }) => {
	const [userCredentials, setUserCredentials] = useState(initialState);
	const { email, password } = userCredentials;

	const handleChange = evt => {
		const { name, value } = evt.target;
		setUserCredentials({ ...userCredentials, [name]: value });
	};

	const handleSubmit = evt => {
		evt.preventDefault();
		fetchUser(userCredentials);
		setUserCredentials(initialState);
	};

	if (userLoaded) {
		return <Redirect to="/" />;
	}

	return (
		<AuthCard title="Log In">
			<form className="login-form" onSubmit={handleSubmit}>
				<FormInput
					type="text"
					name="email"
					required
					label="Email"
					onChange={handleChange}
					value={email}
				/>
				<div className="login-form__divider"></div>
				<FormInput
					type="password"
					name="password"
					required
					label="Password"
					onChange={handleChange}
					value={password}
				/>

				<div className="login-form__footer">
					<p>
						New to Aeddit? &nbsp;
						<Link to="/signup" className="login__link">
							Sign Up
						</Link>
					</p>
					<CustomButton type="submit" loading={isUserFetching}>
						Log In
					</CustomButton>
				</div>
			</form>
		</AuthCard>
	);
};

const mapStateToProps = state => {
	return {
		userLoaded: selectIsUserLoaded(state),
		isUserFetching: selectIsUserFetching(state)
	};
};

const mapDispatchToProps = dispatch => {
	return {
		fetchUser: userCredentials =>
			dispatch(fetchUserStartAsync(userCredentials))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
