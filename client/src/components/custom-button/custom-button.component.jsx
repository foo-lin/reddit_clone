// Core Import
import React from 'react';

//Relative Import

//Styles Import
import './custom-button.styles.scss';

const CustomButton = ({ inverted, children, ...otherProps }) => {
	return (
		<button
			className={`custom-button ${inverted && 'inverted'}`}
			{...otherProps}
		>
			{children}
		</button>
	);
};

export default CustomButton;
