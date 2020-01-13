// Core import
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
// Relaive Import
import FormInput from '../../components/form-input/form-input.component';
import AuthCard from '../../components/auth-card/auth-card.component';
import CustomButton from '../../components/custom-button/custom-button.component';
// Styles
import './signup.style.scss';

const initialState = {
	username: '',
	email: '',
	password: '',
	passwordConfirm: ''
};

const SignUp = () => {
	const [userCredentials, setUserCredentials] = useState(initialState);
	const { username, email, password, passwordConfirm } = userCredentials;

	const handleChange = evt => {
		const { name, value } = evt.target;
		setUserCredentials({ ...userCredentials, [name]: value });
	};

	const handleSubmit = evt => {
		evt.preventDefault();
		console.log(userCredentials);
		setUserCredentials(initialState);
	};

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
						New to Aeddit? &nbsp;
						<Link to="/login" className="login__link">
							Sign Up
						</Link>
					</p>
					<CustomButton type="submit">Sign Up</CustomButton>
				</div>
			</form>
		</AuthCard>
	);
};
export default SignUp;
