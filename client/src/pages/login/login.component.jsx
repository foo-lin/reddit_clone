// Core Imports
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

//Relative Imports
import FormInput from '../../components/form-input/form-input.component';
import AuthCard from '../../components/auth-card/auth-card.component';
import CustomButton from '../../components/custom-button/custom-button.component';
//Styles
import './login.style.scss';

const initialState = {
	username: '',
	password: ''
};

const Login = () => {
	const [userCredentials, setUserCredentials] = useState(initialState);
	const { username, password } = userCredentials;

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
		<AuthCard title="Log In">
			<form className="login-form" onSubmit={handleSubmit}>
				<FormInput
					type="text"
					name="username"
					required
					label="User Name"
					onChange={handleChange}
					value={username}
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
					<CustomButton type="submit">Sign Up</CustomButton>
				</div>
			</form>
		</AuthCard>
	);
};

export default Login;
