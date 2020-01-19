import { UserActionTypes } from './user.types';

const initialState = {
	currentUser: null,
	isFetching: false,
	errorMsg: ''
};

const userReducer = (state = initialState, action) => {
	switch (action.type) {
		case UserActionTypes.FETCH_USER_START:
			return { ...state, isFetching: true };
		case UserActionTypes.FETCH_USER_SUCCESS:
			return { ...state, isFetching: false, currentUser: action.payload };
		case UserActionTypes.FETCH_USER_FAILURE:
			return { ...state, errorMsg: action.payload };
		default:
			return state;
	}
};

export default userReducer;
