import { createSelector } from 'reselect';

const selectSubreddit = state => state.subreddit;

export const selectCurrentSubreddit = createSelector(
	[selectSubreddit],
	subreddit => subreddit.currentSubreddit
);

export const selectCurrentSubredditImgCover = createSelector(
	[selectCurrentSubreddit],
	currentSubreddit => currentSubreddit.imageBackgroundUrl
);

export const selectCurrentSubredditId = createSelector(
	[selectCurrentSubreddit],
	currentSubreddit => currentSubreddit._id
);

export const selectIsSubredditFetching = createSelector(
	[selectSubreddit],
	subreddit => subreddit.isFetching
);

export const selectIsCollectionLoaded = createSelector(
	[selectSubreddit],
	subreddit => !!subreddit.currentSubreddit
);
