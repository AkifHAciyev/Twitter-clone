import React from 'react';
import Post from '../../components/Post';
import TweetBox from './components/TweetBox';

const Home = () => {
	return (
		<div>
			<TweetBox />
			<Post />
			<Post />
			<Post />
		</div>
	);
};

export default Home;
