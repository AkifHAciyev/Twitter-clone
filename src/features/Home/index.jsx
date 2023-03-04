import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Post from '../../components/Post';
import { fetchPosts } from '../../redux/slices/post';
import TweetBox from './components/TweetBox';

const Home = () => {
	const dispatch = useDispatch();
	const { posts } = useSelector((state) => state.posts);

	const isPostsLoading = posts.status == 'loading';

	useEffect(() => {
		dispatch(fetchPosts());
	}, []);
	return (
		<div>
			<TweetBox />
			{(isPostsLoading ? [...Array(5)] : posts.items).map((obj, index) =>
				isPostsLoading ? (
					<Post key={index} isLoading={true} />
				) : (
					<Post
						key={obj._id}
						text={obj.text}
						imageUrl={obj.imageUrl}
						user={obj.user}
						createdAt={obj.createdAt}
						comentCount={obj.comentCount}
						retweetsCount={obj.retweetsCount}
						savedCount={obj.savedCount}
					/>
				)
			)}
		</div>
	);
};

export default Home;
