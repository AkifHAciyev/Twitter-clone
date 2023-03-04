import React, { useEffect } from 'react';
import styled from './index.module.css';
import serach from '../../assets/icons/search.png';
import Post from '../../components/Post';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts } from '../../redux/slices/post';

const Explore = () => {
	const dispatch = useDispatch();
	const { posts } = useSelector((state) => state.posts);

	const isPostsLoading = posts.status == 'loading';

	useEffect(() => {
		dispatch(fetchPosts());
	}, []);
	return (
		<div className={styled.wrapper}>
			<form className={styled.form}>
				<img src={serach} alt="#" />
				<input type="text" placeholder="Search" />
				<button>Search</button>
			</form>
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

export default Explore;
