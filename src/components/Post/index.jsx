import React, { useEffect, useState } from 'react';
import styled from './index.module.css';
import usera from '../../assets/images/user.jpg';
import comment from '../../assets/icons/comment.png';
import heart from '../../assets/icons/heart.png';
import liked from '../../assets/icons/liked.png';
import save from '../../assets/icons/save.png';
import saved from '../../assets/icons/saved.png';
import { PostSkeleton } from './Skeleton';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAuthMe, selectIsAuth, selectIsAuthMe } from '../../redux/slices/auth';
import { saveLike, savePost } from '../../redux/slices/post';
import axios from '../../axios';

const Post = ({ postId, text, avatarUrl, imageUrl, user, createdAt, isFullPost, isLoading }) => {
	if (isLoading) {
		return <PostSkeleton />;
	}
	const dispatch = useDispatch();
	const userData = useSelector(selectIsAuthMe);
	const [isSaved, setIsSaved] = useState(false);
	const [isLiked, setIsLiked] = useState(false);
	const [comentOpen, setComentOpen] = useState(false);
	const [follow, setFollow] = useState();

	const formattedDate = createdAt.replace(/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}).*/, '$1 $2 $3 $4:$5:$6');

	const isAuth = useSelector(selectIsAuth);

	useEffect(() => {
		const saved = localStorage.getItem(`post-${postId}-isSaved`);
		setIsSaved(saved === 'true');
	}, []);

	useEffect(() => {
		const liked = localStorage.getItem(`post-${postId}-isLiked`);
		setIsLiked(liked === 'true');
	}, []);

	const handleSaveClick = async () => {
		dispatch(savePost({ postId, userId: userData._id }))
			.then(() => {
				setIsSaved(!isSaved);
				localStorage.setItem(`post-${postId}-isSaved`, !isSaved);
			})
			.catch((error) => {
				console.error(error);
			});
	};

	const handleLikeClick = async () => {
		dispatch(saveLike({ postId, userId: userData._id }))
			.then(() => {
				setIsLiked(!isLiked);
				localStorage.setItem(`post-${postId}-isLiked`, !isLiked);
			})
			.catch((error) => {
				console.error(error);
			});
	};

	const handleCommentOpen = () => {
		setComentOpen((e) => !e);
	};

	const handleFollow = async (e) => {
		e.preventDefault();
		const userDataId = userData._id;
		const response = axios
			.put(`http://localhost:8080/users/following/${user._id}`, { userDataId })
			.then((response) => {
				console.log(response);
			})
			.catch((error) => {
				console.log(error);
			});
		dispatch(fetchAuthMe(response));
	};

	return (
		<div className={styled.wrapper}>
			<div className={styled.user}>
				{avatarUrl == 'http://localhost:8080undefined' || avatarUrl == 'http://localhost:8080' ? (
					<img className={styled.tweetImg} src={usera} alt="#" />
				) : (
					<img className={styled.tweetImg} src={avatarUrl} alt="#" />
				)}
				<div className={styled.userName}>
					{isFullPost ? (
						title
					) : (
						<form onSubmit={handleFollow}>
							<button type="submit" className={styled.nameBtn}>
								<p className={styled.name}>{user.fullName}</p>
							</button>
						</form>
					)}
					<p className={styled.date}>{formattedDate}</p>
				</div>
			</div>
			<div className={styled.tweet}>
				<p className={styled.tweetText}>{text}</p>
				{imageUrl == 'http://localhost:8080undefined' || imageUrl == 'http://localhost:8080' ? (
					<p></p>
				) : (
					<img className={styled.tweetImg} src={imageUrl} alt="#" />
				)}
			</div>
			{isAuth && (
				<>
					<div className={styled.userActions}>
						<button onClick={handleCommentOpen}>
							<img src={comment} alt="comment" /> <span>Comment</span>
						</button>
						<button onClick={handleLikeClick}>
							<img src={isLiked ? liked : heart} alt="Liked" /> <span>Liked</span>
						</button>
						<button onClick={handleSaveClick}>
							<img src={isSaved ? saved : save} alt="saved" /> <span>Saved</span>
						</button>
					</div>
					<form className={styled.form}>
						{avatarUrl == 'http://localhost:8080undefined' || avatarUrl == 'http://localhost:8080' ? (
							<img className={styled.tweetImg} src={usera} alt="#" />
						) : (
							<img className={styled.tweetImg} src={avatarUrl} alt="#" />
						)}
						<input type="text" placeholder="Tweet your reply" />
					</form>
				</>
			)}

			{comentOpen && (
				<div className={styled.comment}>
					<div className={styled.commentTitle}>
						<img src={usera} alt="#" />
						<div className={styled.commentSection}>
							<p className={styled.commentSectionName}>
								Waqar Bloom <span>24 march at 22:32</span>
							</p>
							<p className={styled.commentSectionText}>
								Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora, veniam!
							</p>
						</div>
					</div>

					<div className={styled.likes}>
						<img src={heart} alt="like" />
						<span>Like</span>
						<p>12k Likes</p>
					</div>
				</div>
			)}
		</div>
	);
};

export default Post;
