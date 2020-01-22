// Core Import
import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
//Relative Import
import SearchBox from '../search-box/serch-box.component';
import CustomButton from '../custom-button/custom-button.component';
import CompanyLogo from '../company-logo/company-logo.component';

//Redux import
import {
	selectCurrentUser,
	selectIsUserLoaded
} from '../../redux/user/user.selector';

import { deleteToken } from '../../redux/token/token.actions';
import { deleteUser } from '../../redux/user/user.actions';
//Styles Import
import { ReactComponent as MenuLogo } from '../../assets/SVG/menu.svg';

import './header.styles.scss';

const Header = ({ isUserLoaded, user, deleteToken, deleteUser, history }) => {
	const handleLogout = () => {
		deleteUser();
		deleteToken();
		history.push('/');
	};

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

				{isUserLoaded ? (
					<div className="user-nav">
						<div className="user-nav__user-photo">
							<img
								src={`https://robohash.org/${user.username}?100x100`}
								style={{
									backgroundColor: `${user.photoColor}`
								}}
								alt="user"
							/>
						</div>
						<div className="user-nav__username">
							{`u/${user.username}`}
						</div>
						<CustomButton onClick={handleLogout}>
							{' '}
							LogOut
						</CustomButton>
					</div>
				) : (
					<div className="no-user-nav">
						<Link to="/signup">
							<CustomButton>Sign In</CustomButton>
						</Link>
						<Link to="/login">
							<CustomButton inverted>Log in</CustomButton>
						</Link>
						<MenuLogo className="no-user-nav__logo" />
					</div>
				)}
			</div>
		</header>
	);
};

const mapStateToProps = state => {
	return {
		isUserLoaded: selectIsUserLoaded(state),
		user: selectCurrentUser(state)
	};
};

const mapDispatchToProps = dispatch => {
	return {
		deleteToken: () => dispatch(deleteToken()),
		deleteUser: () => dispatch(deleteUser())
	};
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));
