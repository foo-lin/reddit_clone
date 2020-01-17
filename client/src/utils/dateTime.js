exports.formateDate = date => {
	const d = new Date(date);

	return `${d.toLocaleString('default', {
		month: 'short'
	})} ${d.getDate()}, ${d.getFullYear()}`;
};

exports.getTimeDiff = date => {
	const d = new Date(date);
	const now = new Date();
	const timeDiff = now.getTime() - d.getTime();
	if (timeDiff < 1000 * 60) {
		return `0s`;
	} else if (timeDiff < 1000 * 60 * 60) {
		return `${Math.floor(timeDiff / (1000 * 60))}m`;
	} else if (timeDiff < 1000 * 60 * 60 * 24) {
		return `${Math.floor(timeDiff / (1000 * 60 * 60))}hr`;
	} else if (timeDiff < 1000 * 60 * 60 * 24 * 365) {
		return `${Math.floor(timeDiff / (1000 * 60 * 60 * 24))}d`;
	}
	return `${Math.floor(timeDiff / (1000 * 60 * 60 * 24 * 365))}yr`;
};
