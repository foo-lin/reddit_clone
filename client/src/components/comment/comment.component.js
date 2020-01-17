//Core imports
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
//Relative import
import PostContainer from '../post-container/post-container.component';
import PostHeader from './post-header/post-header.component';
import { selectPostById } from '../../redux/posts/post.selector';
//Styles
import './comment.styles.scss';

const Comment = ({ match, post }) => {
	return (
		<div className="">
			{post && (
				<PostContainer>
					<PostHeader post={post} />
				</PostContainer>
			)}
		</div>
	);
};

const mapStateToProps = (state, ownProps) => {
	console.log(ownProps);
	return {
		post: selectPostById(ownProps.match.params.postId)(state)
	};
};

export default connect(mapStateToProps)(Comment);
