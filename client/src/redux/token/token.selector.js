import { createSelector } from 'reselect';

const selectToken = state => state.token;

export const selectCurrentToken = createSelector([selectToken], token => {
	return token.currentToken;
});
