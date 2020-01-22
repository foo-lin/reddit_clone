const sortByDict = {
	new: '-createdAt',
	old: 'createdAt',
	top: '-votes'
};
export const sdf = sortBy => {
	return sortByDict[sortBy];
};

export const updateVotes = (currentPost, payload) => {
	const { postId, vote, voteToAdd } = payload;
	return currentPost.map(post => {
		if (post._id === postId) {
			return {
				...post,
				votes: post.votes + voteToAdd,
				hasVoted: { vote }
			};
		}
		return post;
	});
};
