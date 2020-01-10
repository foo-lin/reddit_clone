class APIFeatures {
	constructor(query, queryStr) {
		this.query = query;
		this.queryStr = queryStr;
	}

	filter() {
		const qureyObj = { ...this.queryStr };
		const excluededField = ['page', 'sort', 'limit', 'fields'];
		excluededField.forEach(el => {
			delete qureyObj[el];
		});

		const queryStr = JSON.stringify(qureyObj).replace(
			/\b(gte|gt|lte|lt)\b/g,
			match => `$${match}`
		);

		this.query = this.query.find(JSON.parse(queryStr));
		return this;
	}

	sort() {
		//Sorting;
		if (this.queryStr.sort) {
			const sortBy = this.queryStr.sort.split(',').join(' ');
			this.query = this.query.sort(sortBy);
		} else {
			this.query = this.query.sort('-createdAt');
		}
		return this;
	}

	limitFields() {
		//Limiting
		if (this.queryStr.fields) {
			const fields = this.queryStr.fields.split(',').join(' ');
			this.query = this.query.select(fields);
		} else {
			this.query = this.query.select('-__v');
		}
		return this;
	}

	paginations() {
		// Pagination
		const page = this.queryStr.page * 1 || 1;
		const limit = this.queryStr.limit * 1 || 100;
		const skip = (page - 1) * limit;
		this.query = this.query.skip(skip).limit(limit);
		return this;
	}
}

module.exports = APIFeatures;
