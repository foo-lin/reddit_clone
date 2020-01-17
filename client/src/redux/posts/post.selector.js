import { createSelector } from 'reselect';

const selectPosts = state => state.posts;

export const selectCurrentPosts = createSelector(
	[selectPosts],
	posts => posts.currentPosts
);

export const selectIsFectching = createSelector([selectPosts], posts => {
	return posts.isFetching;
});

export const selectPostById = postId => {
	return createSelector([selectCurrentPosts], posts =>
		posts.find(post => post._id === postId)
	);
};

export const selectIsPostsLoaded = createSelector(
	[selectCurrentPosts],
	posts => {
		return !!posts.length;
	}
);
