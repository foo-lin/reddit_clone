//Core imports
import React from 'react';

//Relative Imports
import SingleComment from '../comment-single/comment-single.component';
//Styles
import './comment-list.styles.scss';

const CommentList = ({ comments, postId, parentList }) => {
	let commentArray = Object.values(comments);
	return (
		<>
			{commentArray.map(comment => (
				<SingleComment
					key={comment._id}
					comment={comment}
					parentList={parentList}
				/>
			))}
		</>
	);
};

export default CommentList;
