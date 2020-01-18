//Core imports
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import axios from 'axios';
//Relative import
import PostContainer from '../post-container/post-container.component';
import PostHeader from './post-header/post-header.component';
import Loading from '../loading/loading.component';
import Button from '../custom-button/custom-button.component';
import CommentContainer from './comment-container/comment-contaniner.component';
import { selectPostById } from '../../redux/posts/post.selector';
import { fetchPostsSuccess } from '../../redux/posts/posts.actions';
//Styles
import './comment.styles.scss';

const Comment = ({ match, post, setPost }) => {
	console.log('ddddd', match);
	useEffect(() => {
		async function getPost() {
			const resp = await axios.get(`/post/${match.params.postId}`);
			console.log(resp);
			setPost(resp.data.data.post);
		}
		if (!post) {
			getPost();
		}
	}, []);
	if (!post) return <Loading />;
	return (
		<PostContainer>
			<PostHeader post={post} />
			<Button>Join To Comment</Button>

			<CommentContainer postId={post._id} />
		</PostContainer>
	);
};

const mapStateToProps = (state, ownProps) => {
	return {
		post: selectPostById(ownProps.match.params.postId)(state)
	};
};

const mapDispatchToProps = dispatch => {
	return {
		setPost: post => dispatch(fetchPostsSuccess([post]))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Comment);
