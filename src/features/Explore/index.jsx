import React, { useEffect, useState } from 'react';
import styled from './index.module.css';
import serach from '../../assets/icons/search.png';
import Post from '../../components/Post';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts } from '../../redux/slices/post';

const Explore = () => {
	const [searchQuery, setSearchQuery] = useState('');
	const [value, setValue] = useState('');
	const dispatch = useDispatch();
	const { posts } = useSelector((state) => state.posts);

	const isPostsLoading = posts.status == 'loading';

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
						text={obj.text}
						imageUrl={`http://localhost:8080${obj.imageUrl}`}
						user={obj.user}
						avatarUrl={`http://localhost:8080${obj.user.avatarUrl}`}
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
