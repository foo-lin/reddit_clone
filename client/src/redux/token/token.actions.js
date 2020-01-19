import { tokenActionTypes } from './token.types';

export const saveToken = token => {
	return {
		type: tokenActionTypes.SAVE_TOKEN,
		payload: token
	};
};

export const deleteToken = () => {
	return {
		type: tokenActionTypes.DELETE_TOKEN
	};
};
