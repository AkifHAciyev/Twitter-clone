import React, { useEffect, useState } from 'react';
import styled from './index.module.css';
import serach from '../../assets/icons/search.png';
import Post from '../../components/Post';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts } from '../../redux/slices/post';
import { fetchAuthMe } from '../../redux/slices/auth';

const Explore = () => {
	const [searchQuery, setSearchQuery] = useState('');
	const [value, setValue] = useState('');
	const dispatch = useDispatch();
	const { posts } = useSelector((state) => state.posts);

	const isPostsLoading = posts.status == 'loading';

	useEffect(() => {
		dispatch(fetchAuthMe());
	}, []);

	useEffect(() => {
		if (searchQuery.length === 0 || searchQuery.length > 2) dispatch(fetchPosts());
	}, []);

	const handleSubmit = (e) => {
		e.preventDefault();
		setValue(searchQuery);
		setSearchQuery('');
	};

	return (
		<div className={styled.wrapper}>
			<form className={styled.form} onSubmit={handleSubmit}>
				<img src={serach} alt="#" />
				<input
					value={searchQuery}
					onChange={(e) => setSearchQuery(e.target.value)}
					type="text"
					placeholder="Search by user name"
				/>
				<button type="submit">Search</button>
			</form>
			{(isPostsLoading
				? [...Array(5)]
				: [...posts.items]
						.filter((item) => {
							return value.toLowerCase().trim() === '' ? item : item.user.fullName.toLowerCase().trim().includes(value);
						})
						.reverse()
			).map((obj, index) =>
				isPostsLoading ? (
					<Post key={index} isLoading={true} />
				) : (
					<Post
						key={obj._id}
						postId={obj._id}
						text={obj.text}
						imageUrl={`https://twitter-clone-server-bay.vercel.app${obj.imageUrl}`}
						avatarUrl={`https://twitter-clone-server-bay.vercel.app${obj.user.avatarUrl}`}
						user={obj.user}
						createdAt={obj.createdAt}
						comments={obj.comments}
					/>
				)
			)}
		</div>
	);
};

export default Explore;
