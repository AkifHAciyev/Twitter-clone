import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Post from '../../components/Post';
import { selectIsAuth } from '../../redux/slices/auth';
import { fetchPosts } from '../../redux/slices/post';
import TweetBox from './components/TweetBox';

const Home = () => {
	const dispatch = useDispatch();
	const { posts } = useSelector((state) => state.posts);
	const isAuth = useSelector(selectIsAuth);
	const isPostsLoading = posts.status == 'loading';

	useEffect(() => {
		dispatch(fetchPosts());
	}, []);
	return (
		<div>
			{isAuth && <TweetBox />}
			{(isPostsLoading ? [...Array(5)] : [...posts.items].reverse()).map((obj, index) =>
				isPostsLoading ? (
					<Post key={index} isLoading={true} />
				) : (
					<Post
						key={obj._id}
						postId={obj._id}
						text={obj.text}
						imageUrl={`http://localhost:8080${obj.imageUrl}`}
						avatarUrl={`http://localhost:8080${obj.user.avatarUrl}`}
						user={obj.user}
						createdAt={obj.createdAt}
					/>
				)
			)}
		</div>
	);
};

export default Home;
