const sortByDict = {
	new: '-createdAt',
	old: 'createdAt',
	top: '-votes'
};
export const sdf = sortBy => {
	return sortByDict[sortBy];
};
