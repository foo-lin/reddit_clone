// Core import
import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
// Relaive Import
import FormInput from '../../components/form-input/form-input.component';
import AuthCard from '../../components/auth-card/auth-card.component';
import CustomButton from '../../components/custom-button/custom-button.component';

import {
	selectIsUserFetching,
	selectIsUserLoaded
} from '../../redux/user/user.selector.js';
import { fetchSignUpUserAsync } from '../../redux/user/user.actions';

// Styles
import './signup.style.scss';

const initialState = {
	username: '',
	email: '',
	password: '',
	passwordConfirm: ''
};

const SignUp = ({ userLoaded, isUserFetching, signupUser }) => {
	const [userCredentials, setUserCredentials] = useState(initialState);
	const { username, email, password, passwordConfirm } = userCredentials;

	const handleChange = evt => {
		const { name, value } = evt.target;
		setUserCredentials({ ...userCredentials, [name]: value });
	};

	const handleSubmit = evt => {
		evt.preventDefault();
		signupUser(userCredentials);
		setUserCredentials(initialState);
	};

	if (userLoaded) return <Redirect to="/" />;

	return (
		<AuthCard title="Sign Up">
			<form className="signup-form" onSubmit={handleSubmit}>
				<FormInput
					type="text"
					name="username"
					required
					label="User Name"
					onChange={handleChange}
					value={username}
				/>
				<FormInput
					type="email"
					name="email"
					required
					label="Email"
					onChange={handleChange}
					value={email}
				/>
				<FormInput
					type="password"
					name="password"
					required
					label="Password"
					onChange={handleChange}
					value={password}
				/>
				<FormInput
					type="password"
					name="passwordConfirm"
					required
					label="Password Confirm"
					onChange={handleChange}
					value={passwordConfirm}
				/>
				<div className="signup-form__footer">
					<p>
						Already have an account? &nbsp;
						<Link to="/login" className="login__link">
							Login
						</Link>
					</p>
					<CustomButton type="submit" loading={isUserFetching}>
						Sign Up
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
		signupUser: userCredentials =>
			dispatch(fetchSignUpUserAsync(userCredentials))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
