import { tokenActionTypes } from './token.types';

const initialState = {
	currentToken: null
};

const tokenReducer = (state = initialState, action) => {
	switch (action.type) {
		case tokenActionTypes.SAVE_TOKEN:
			return { ...state, currentToken: action.payload };
		case tokenActionTypes.DELETE_TOKEN:
			return { ...state, currentToken: null };
		default:
			return state;
	}
};

export default tokenReducer;
