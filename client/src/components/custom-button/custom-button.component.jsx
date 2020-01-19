// Core Import
import React from 'react';

//Relative Import
import Spinner from '../spinner/spinner.component';
//Styles Import
import './custom-button.styles.scss';

const CustomButton = ({ inverted, children, loading, ...otherProps }) => {
	return (
		<button
			className={`custom-button ${inverted && 'inverted'}`}
			disabled={loading}
			{...otherProps}
		>
			{loading ? <Spinner /> : children}
		</button>
	);
};

export default CustomButton;
