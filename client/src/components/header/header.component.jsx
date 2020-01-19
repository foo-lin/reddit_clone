// Core Import
import React from 'react';
import { Link } from 'react-router-dom';
//Relative Import
import SearchBox from '../search-box/serch-box.component';
import CustomButton from '../custom-button/custom-button.component';
import CompanyLogo from '../company-logo/company-logo.component';
//Styles Import
import { ReactComponent as MenuLogo } from '../../assets/SVG/menu.svg';

import './header.styles.scss';

const Header = () => {
	return (
		<header className="nav-header">
			<div className="nav-header__container">
				<div className="logo">
					<Link to="/">
						<CompanyLogo />
					</Link>
					<span className="logo__name">
						Aedd<span>i</span>t
					</span>
				</div>

				<SearchBox />

				<div className="user-nav">
					<Link to="/signup">
						<CustomButton>Sign In</CustomButton>
					</Link>
					<Link to="/login">
						<CustomButton inverted>Log in</CustomButton>
					</Link>
					<MenuLogo className="user-nav__logo" />
				</div>
			</div>
		</header>
	);
};

const mapStateToProps = state => {
	return { isUserLoaded: '', user: '' };
};

export default Header;
