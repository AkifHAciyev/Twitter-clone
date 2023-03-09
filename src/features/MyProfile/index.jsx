import React, { useEffect, useRef, useState } from 'react';
import styled from './index.module.css';
import Post from '../../components/Post';
import cover from '../../assets/images/cover.png';
import user from '../../assets/images/user.jpg';
import addUser from '../../assets/icons/add-user.png';
import pen from '../../assets/icons/pen.png';
import FollowModal from './compinents/FollowModal';
import { fetchPosts } from '../../redux/slices/post';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsAuthMe } from '../../redux/slices/auth';
import axios from '../../axios';

const MyProfile = () => {
	const [open, setOpen] = useState(false);
	const [avatarUrl, setAvatarUrl] = useState('');
	const [coverUrl, setCoverUrl] = useState('');
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);
	const dispatch = useDispatch();
	const { posts } = useSelector((state) => state.posts);
	const userData = useSelector(selectIsAuthMe);
	const inputRef = useRef(null);

	const handleChangeFile = async (e) => {
		try {
			const formData = new FormData();
			const file = e.target.files[0];
			formData.append('image', file);
			const { data } = await axios.post('/upload', formData);
			setAvatarUrl(data.url);
			setCoverUrl(data.url);
		} catch (err) {
			console.warn(err);
			console.log('image is not send');
		}
	};

	const updateUserCoverUrl = async () => {
		try {
			const response = await axios.put(`/users/${userData._id}/coverUrl`, {
				coverUrl: coverUrl,
			});

			return response.data;
		} catch (error) {
			console.error(error);
			throw error;
		}
	};

	const updateUserAvatarUrl = async () => {
		try {
			const response = await axios.put(`/users/${userData._id}/avatarUrl`, {
				avatarUrl: avatarUrl,
			});

			return response.data;
		} catch (error) {
			console.error(error);
			throw error;
		}
	};

	const isPostsLoading = posts.status == 'loading';

	useEffect(() => {
		dispatch(fetchPosts());
	}, []);
	return (
		<div className={styled.wrapper}>
			<img
				className={styled.userAvo}
				src={
					userData.coverUrl === undefined || 'http://localhost:8080'
						? cover
						: `http://localhost:8080${userData.coverUrl}`
				}
				alt="#"
				onClick={() => inputRef.current.click()}
			/>
			<form>
				<img className={styled.pen} src={pen} alt="pen" />
				<input ref={inputRef} type="file" onChange={handleChangeFile} hidden />
				<button onClick={updateUserCoverUrl} className={styled.penBtn} type="submit"></button>
			</form>

			<div className={styled.userInfo}>
				<form>
					<img className={styled.penAvatar} src={pen} alt="pen" />
					<img
						className={styled.userInfoImg}
						src={
							userData.avatarUrl === undefined && 'http://localhost:8080'
								? user
								: `http://localhost:8080${userData.avatarUrl}`
						}
						alt="#"
						onClick={() => inputRef.current.click()}
					/>
					<input ref={inputRef} type="file" onChange={handleChangeFile} hidden />
					<button onClick={updateUserAvatarUrl} className={styled.penAvatarBtn} type="submit"></button>
				</form>
				<div className={styled.center}>
					<div>
						<p className={styled.name}>{userData.fullName}</p>
						<p className={styled.follor}>
							<span>2,434 </span>Following
						</p>
						<p className={styled.follor}>
							<span>5,434 </span>Followers
						</p>
					</div>
					<p className={styled.text}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iure, iusto.</p>
				</div>
				<div>
					<button onClick={handleOpen}>
						<img src={addUser} alt="#" />
						Follow
					</button>
					{open && <FollowModal handleClose={handleClose} />}
				</div>
			</div>
			{(isPostsLoading ? [...Array(5)] : [...posts.items].reverse()).map((obj, index) =>
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

export default MyProfile;
