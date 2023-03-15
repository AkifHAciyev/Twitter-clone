import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Post from '../../components/Post';
import { fetchAuthMe, selectIsAuthMe } from '../../redux/slices/auth';
import { fetchPosts } from '../../redux/slices/post';

const Bookmarks = () => {
	const dispatch = useDispatch();
	const { posts } = useSelector((state) => state.posts);
	const userData = useSelector(selectIsAuthMe);
	const savedPostIds = userData.savedPosts;
	const isPostsLoading = posts.status == 'loading';

	useEffect(() => {
		dispatch(fetchAuthMe());
	}, []);

	useEffect(() => {
		dispatch(fetchPosts());
	}, [savedPostIds]);

	const filteredPosts = savedPostIds
		? savedPostIds
				.map((postId) => {
					return posts.items.find((post) => post._id === postId);
				})
				.filter((post) => post != null)
		: [];

	return (
		<div>
			{(isPostsLoading ? [...Array(5)] : [...filteredPosts].reverse()).map((obj, index) =>
				isPostsLoading ? (
					<Post key={index} isLoading={true} />
				) : (
					<Post
						key={obj._id}
						postId={obj._id}
						text={obj.text}
						imageUrl={`https://goldfish-app-dv7j2.ondigitalocean.app${obj.imageUrl}`}
						avatarUrl={`https://goldfish-app-dv7j2.ondigitalocean.app${obj.user.avatarUrl}`}
						user={obj.user}
						createdAt={obj.createdAt}
						comments={obj.comments}
					/>
				)
			)}
		</div>
	);
};

export default Bookmarks;
