//Core imports
import React from 'react';

//Relative Import
import CompanyLogo from '../../components/company-logo/company-logo.component';
//Styles
import './auth-card.style.scss';

const AuthCard = ({ children, title }) => {
	return (
		<div className="authcard">
			<div className="pic"></div>
			<div className="form">
				<div className="company__info">
					<CompanyLogo />
					<h2 className="form__header">{title}</h2>
				</div>
				{children}
			</div>
		</div>
	);
};

export default AuthCard;
