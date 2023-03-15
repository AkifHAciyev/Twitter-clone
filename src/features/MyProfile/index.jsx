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
import { fetchAuthMe, selectIsAuthMe } from '../../redux/slices/auth';
import axios from '../../axios';

const MyProfile = () => {
	const [open, setOpen] = useState(false);
	const [avatarUrl, setAvatarUrl] = useState('');
	const [coverUrl, setCoverUrl] = useState('');
	const [bio, setBio] = useState('');
	const [openBio, setOpenBio] = useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);
	const dispatch = useDispatch();
	const { posts } = useSelector((state) => state.posts);
	const userData = useSelector(selectIsAuthMe);
	const inputRefAvo = useRef(null);
	const inputRefCover = useRef(null);

	useEffect(() => {
		dispatch(fetchPosts());
	}, [dispatch]);

	useEffect(() => {
		dispatch(fetchAuthMe());
	}, [dispatch]);

	const handleChangeFileAvo = async (e) => {
		try {
			const formData = new FormData();
			const file = e.target.files[0];
			formData.append('image', file);
			const { data } = await axios.post('/upload', formData);
			setAvatarUrl(data.url);
		} catch (err) {
			console.warn(err);
			console.log('image is not send');
		}
	};

	const handleChangeFileCover = async (e) => {
		try {
			const formData = new FormData();
			const file = e.target.files[0];
			formData.append('image', file);
			const { data } = await axios.post('/upload', formData);
			console.log(data.url);
			setCoverUrl(data.url);
		} catch (err) {
			console.warn(err);
			console.log('image is not send');
		}
	};

	const updateUserCoverUrl = async (e) => {
		e.preventDefault();
		try {
			const response = await axios.put(`/users/${userData._id}/coverUrl`, {
				coverUrl: coverUrl,
			});
			dispatch(fetchAuthMe(response));
			dispatch(fetchPosts(response));
			return response.data;
		} catch (error) {
			console.error(error);
			throw error;
		}
	};

	const updateUserAvatarUrl = async (e) => {
		e.preventDefault();
		try {
			const response = await axios.put(`/users/${userData._id}/avatarUrl`, {
				avatarUrl: avatarUrl,
			});
			dispatch(fetchPosts(response));
			dispatch(fetchAuthMe(response));
			return response.data;
		} catch (error) {
			console.error(error);
			throw error;
		}
	};

	const onSubmit = async (e) => {
		e.preventDefault();
		try {
			const fields = {
				bio: bio,
			};
			const { data } = await axios.put(`/users/${userData._id}/bio`, fields);
			dispatch(fetchAuthMe(data));
			setBio('');
		} catch (err) {
			console.warn(err);
			alert('bio is not create');
		}
	};

	const isPostsLoading = posts.status == 'loading';

	return (
		<div className={styled.wrapper}>
			<img
				className={styled.userAvo}
				src={
					!userData.coverUrl || userData.coverUrl == 'https://goldfish-app-dv7j2.ondigitalocean.app'
						? cover
						: `https://goldfish-app-dv7j2.ondigitalocean.app${userData.coverUrl}`
				}
				alt="#"
				onClick={() => inputRefCover.current.click()}
			/>
			<form onSubmit={updateUserCoverUrl}>
				<img className={styled.pen} src={pen} alt="pen" />
				<input ref={inputRefCover} type="file" onChange={handleChangeFileCover} hidden />
				<button className={styled.penBtn} type="submit"></button>
			</form>

			<div className={styled.userInfo}>
				<form onSubmit={updateUserAvatarUrl}>
					<img className={styled.penAvatar} src={pen} alt="pen" />
					<img
						className={styled.userInfoImg}
						src={
							!userData.avatarUrl || userData.avatarUrl == 'https://goldfish-app-dv7j2.ondigitalocean.app'
								? user
								: `https://goldfish-app-dv7j2.ondigitalocean.app${userData.avatarUrl}`
						}
						alt="#"
						onClick={() => inputRefAvo.current.click()}
					/>
					<input ref={inputRefAvo} type="file" onChange={handleChangeFileAvo} hidden />
					<button className={styled.penAvatarBtn} type="submit"></button>
				</form>
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
					<div className={styled.biowrapper}>
						{openBio && (
							<form className={styled.bioForm} onSubmit={onSubmit}>
								<input type="text" placeholder="Add your bio" value={bio} onChange={(e) => setBio(e.target.value)} />
								<button type="submit">Add bio</button>
							</form>
						)}
					</div>
					<div>
						{userData.bio ? <p className={styled.text}>{userData.bio}</p> : null}
						<button onClick={() => setOpenBio((e) => !e)}>Edit bio</button>
					</div>
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

export default MyProfile;
