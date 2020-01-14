//Core imports
import React from 'react';

//styles
import './post-container.styles.scss';

const PostContainer = ({ children }) => {
	return <div className="post-container">{children}</div>;
};

export default PostContainer;
