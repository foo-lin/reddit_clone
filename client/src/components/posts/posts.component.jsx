//Core imports
import React from 'react';
import { connect } from 'react-redux';

//Relative Imports
import Post from '../post/post.component';

import { selectCurrentPosts } from '../../redux/posts/post.selector.js';

// import './post.styles.scss';

const Posts = ({ posts }) => {
	return (
		<>
			{posts.map(post => (
				<Post key={post._id} post={post} />
			))}
		</>
	);
};

const mapStateToProps = state => {
	return { posts: selectCurrentPosts(state) };
};

export default connect(mapStateToProps)(Posts);
