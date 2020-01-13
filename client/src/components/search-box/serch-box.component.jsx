// Core Import
import React from 'react';

//Relative Import

import { ReactComponent as SearchLogo } from '../../assets/SVG/search.svg';

//Styles Import
import './search-box.styles.scss';

const SearchBox = () => {
	return (
		<form className="search">
			<input
				type="text"
				className="search__input"
				placeHolder="Search reddit"
			/>
			<button className="search__button">
				<SearchLogo className="search__icon" />
			</button>
		</form>
	);
};

export default SearchBox;
