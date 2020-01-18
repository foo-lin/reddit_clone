//Core imports
import React from 'react';

//Relative Imports
import SingleComment from '../comment-single/comment-single.component';
//Styles
import './comment-list.styles.scss';

const CommentList = ({ comments }) => {
	return (
		<>
			{comments.map(comment => (
				<SingleComment key={comment._id} comment={comment} />
			))}
		</>
	);
};

export default CommentList;
