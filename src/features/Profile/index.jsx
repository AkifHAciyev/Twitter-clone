import React, { useEffect, useState } from 'react';
import styled from './index.module.css';
import Post from '../../components/Post';
import cover from '../../assets/images/cover.png';
import user from '../../assets/images/user.jpg';
import axios from '../../axios';
import addUser from '../../assets/icons/add-user.png';
import unFollow from '../../assets/icons/unFollow.png';

import { fetchPosts } from '../../redux/slices/post';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAuthMe, selectIsAuthMe } from '../../redux/slices/auth';
import { useParams } from 'react-router-dom';

const Profile = () => {
	const [userInfo, setUserInfo] = useState([]);
	const dispatch = useDispatch();
	const { posts } = useSelector((state) => state.posts);
	const userData = useSelector(selectIsAuthMe);
	const params = useParams();

	useEffect(() => {
		axios
			.get('/users/' + params.id)
			.then((res) => {
				setUserInfo(res.data);
			})
			.catch((error) => {
				console.error(error);
			});
	}, [params.id]);

	useEffect(() => {
		dispatch(fetchPosts());
	}, [dispatch]);

	useEffect(() => {
		dispatch(fetchAuthMe());
	}, [dispatch]);

	const handleFollow = async (e, userId) => {
		e.preventDefault();
		const userDataId = userData._id;
		const response = await axios.put(`http://localhost:8080/users/following/${userId}`, { userDataId });
		dispatch(fetchAuthMe(response.data));
	};

	const handleUnFollow = async (e, userId) => {
		e.preventDefault();
		const userDataId = userData._id;
		const response = await axios.put(`http://localhost:8080/users/unfollowing/${userId}`, { userDataId });
		dispatch(fetchAuthMe(response.data));
	};

	const isPostsLoading = posts.status == 'loading';

	return (
		<div className={styled.wrapper}>
			<img
				className={styled.userAvo}
				src={
					!userInfo.coverUrl || userInfo.coverUrl == 'http://localhost:8080'
						? cover
						: `http://localhost:8080${userInfo.coverUrl}`
				}
				alt="#"
			/>

			<div className={styled.userInfo}>
				<img
					className={styled.userInfoImg}
					src={
						!userInfo.avatarUrl || userInfo.avatarUrl == 'http://localhost:8080'
							? user
							: `http://localhost:8080${userInfo.avatarUrl}`
					}
					alt="#"
				/>
				<div className={styled.center}>
					<div>
						<p className={styled.name}>{userInfo.fullName}</p>
						<p className={styled.follor}>
							<span>{userInfo?.Following?.length} </span>Following
						</p>
						<p className={styled.follor}>
							<span>{userInfo?.Followers?.length} </span>Followers
						</p>
						{userData?.Following?.includes(userInfo._id) ? (
							<button onClick={(e) => handleUnFollow(e, userInfo._id)} className={styled.button}>
								<img className={styled.follorIcon} src={unFollow} alt="#" />
								Un Follow
							</button>
						) : (
							<button onClick={(e) => handleFollow(e, userInfo._id)} className={styled.button}>
								<img className={styled.follorIcon} src={addUser} alt="#" />
								Follow
							</button>
						)}
					</div>
					{userData.bio ? <p className={styled.text}></p> : null}
				</div>
			</div>
			{(isPostsLoading
				? [...Array(5)]
				: [...posts.items].filter((post) => post.user._id === userInfo._id).reverse()
			).map((obj, index) =>
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
