//core import
import React from 'react';

//relative import

import { ReactComponent as ArrowDownIcon } from '../../../assets/SVG/arrow-down.svg';
import { ReactComponent as ArrowUpIcon } from '../../../assets/SVG/arrow-up.svg';
import { ReactComponent as MessageIcon } from '../../../assets/SVG/message.svg';

//styles
import './comment-footer.styles.scss';

const CommmentfFooter = () => {
	return (
		<div className="comment-footer">
			<ArrowUpIcon className="comment-footer__icon" />
			<span>2</span>
			<ArrowDownIcon className="comment-footer__icon" />
			<MessageIcon className="comment-footer__icon" />
		</div>
	);
};

export default CommmentfFooter;
