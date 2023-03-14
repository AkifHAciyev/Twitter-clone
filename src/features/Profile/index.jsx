import React, { useEffect } from 'react';
import styled from './index.module.css';
import Post from '../../components/Post';
import cover from '../../assets/images/cover.png';
import user from '../../assets/images/user.jpg';

import { fetchPosts } from '../../redux/slices/post';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAuthMe, selectIsAuthMe } from '../../redux/slices/auth';

const Profile = () => {
	const dispatch = useDispatch();
	const { posts } = useSelector((state) => state.posts);
	const userData = useSelector(selectIsAuthMe);

	useEffect(() => {
		dispatch(fetchPosts());
	}, [dispatch]);

	useEffect(() => {
		dispatch(fetchAuthMe());
	}, [dispatch]);

	const isPostsLoading = posts.status == 'loading';

	return (
		<div className={styled.wrapper}>
			<img
				className={styled.userAvo}
				src={
					!userData.coverUrl || userData.coverUrl == 'http://localhost:8080'
						? cover
						: `http://localhost:8080${userData.coverUrl}`
				}
				alt="#"
			/>

			<div className={styled.userInfo}>
				<img
					className={styled.userInfoImg}
					src={
						!userData.avatarUrl || userData.avatarUrl == 'http://localhost:8080'
							? user
							: `http://localhost:8080${userData.avatarUrl}`
					}
					alt="#"
				/>
				<div className={styled.center}>
					<div>
						<p className={styled.name}>{userData.fullName}</p>
						<p className={styled.follor}>
							<span>{userData?.Following?.length} </span>Following
						</p>
						<p className={styled.follor}>
							<span>{userData?.Followers?.length} </span>Followers
						</p>
					</div>
					{userData.bio ? <p className={styled.text}></p> : null}
				</div>
			</div>
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
						comments={obj.comments}
					/>
				)
			)}
		</div>
	);
};

export default Profile;
