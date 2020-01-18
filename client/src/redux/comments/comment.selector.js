import { createSelector } from 'reselect';

const selectComments = state => state.comments;

export const selectCurrentComments = createSelector(
	[selectComments],
	comments => comments.currentComments
);

export const selectIsFetching = createSelector(
	[selectComments],
	comments => comments.isFetching
);

export const selectIsCommentsLoaded = createSelector(
	[selectCurrentComments],
	comments => !!comments
);
