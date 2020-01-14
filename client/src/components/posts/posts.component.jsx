//Core imports
import React from 'react';

//Relative Imports
import Post from '../post/post.component';

// import './post.styles.scss';

const Posts = () => {
	return (
		<>
			<Post subredditName="WTF" time="2m" user="zinZinBa" postTitle="lorem sdf sdf sdf sdf dsfsdf sdf sdf sdfsdf sdf sdfsdf sdf sdf sdf sdf sdfsdf" imgUrl="sdf" />
			<Post subredditName="WTF" time="2m" user="zinZinBa" postTitle="lorem sdf sdf sdf sdf dsfsdf sdf sdf sdfsdf sdf sdfsdf sdf sdf sdf sdf sdfsdf" imgUrl="sdf" />
			<Post subredditName="WTF" time="2m" user="zinZinBa" postTitle="lorem sdf sdf sdf sdf dsfsdf sdf sdf sdfsdf sdf sdfsdf sdf sdf sdf sdf sdfsdf" imgUrl="sdf" />
		</>
	);
};

export default Posts;
