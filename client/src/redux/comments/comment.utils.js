export const listToMap = list => {
	const obj = {};
	list.forEach(li => {
		obj[li._id] = li;
		if (li.children && li.children.length > 0) {
			obj[li._id].children = listToMap(li.children);
		}
	});
	return obj;
};

export const updateVotes = (currentState, payload) => {
	console.log(payload);
	const { commentArr, vote, voteToAdd } = payload;
	let commentToUpdate = currentState[commentArr[0]];
	for (let i = 1; i < commentArr.length; i++) {
		commentToUpdate = commentToUpdate.children[commentArr[i]];
	}
	commentToUpdate.hasUserVoted = { vote };
	commentToUpdate.votes = commentToUpdate.votes + voteToAdd;
	return { ...currentState };
};
