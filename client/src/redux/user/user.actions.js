import axios from 'axios';
import { UserActionTypes } from './user.types';
import { saveToken } from '../token/token.actions';

export const fetchUserStart = () => {
	return {
		type: UserActionTypes.FETCH_USER_START
	};
};

export const fetchUserSuccess = user => {
	return {
		type: UserActionTypes.FETCH_USER_SUCCESS,
		payload: user
	};
};

export const fetchUserFailure = errorMsg => {
	return {
		type: UserActionTypes.FETCH_USER_FAILURE,
		payload: errorMsg
	};
};

export const fetchUserStartAsync = ({ email, password }) => {
	return async dispatch => {
		dispatch(fetchUserStart());
		try {
			const resp = await axios({
				method: 'post',
				url: '/user/login',
				data: {
					email,
					password
				}
			});
			dispatch(fetchUserSuccess(resp.data.data.user));
			dispatch(saveToken(resp.data.data.token));
		} catch (error) {
			dispatch(fetchUserFailure(error.message));
		}
	};
};

export const fetchSignUpUserAsync = ({
	username,
	email,
	password,
	passwordConfirm
}) => {
	return async dispatch => {
		dispatch(fetchUserStart());
		try {
			const resp = await axios({
				method: 'post',
				url: '/user/signup',
				data: {
					email,
					password,
					passwordConfirm,
					username
				}
			});
			dispatch(fetchUserSuccess(resp.data.data.user));
			dispatch(saveToken(resp.data.data.token));
		} catch (error) {
			dispatch(fetchUserFailure(error.message));
		}
	};
};
