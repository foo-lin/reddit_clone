exports.formateDate = date => {
	const d = new Date(date);
	return `${d.toLocaleString('default', {
		month: 'short'
	})} ${d.getDate()}, ${d.getFullYear()}`;
};
