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
import { selectIsAuth, selectIsAuthMe } from '../../redux/slices/auth';
import { commentsAdd, fetchPosts, saveLike, savePost } from '../../redux/slices/post';
import axios from '../../axios';
import { NavLink } from 'react-router-dom';

const Post = ({ comments, postId, text, avatarUrl, imageUrl, user, createdAt, isFullPost, isLoading }) => {
	if (isLoading) {
		return <PostSkeleton />;
	}
	const dispatch = useDispatch();
	const userData = useSelector(selectIsAuthMe);
	const [isSaved, setIsSaved] = useState(false);
	const [isLiked, setIsLiked] = useState(false);
	const [comentOpen, setComentOpen] = useState(false);
	const [commentwriting, setcommentwriting] = useState('');
	const [Comments, setComments] = useState(comments);
	const isAuth = useSelector(selectIsAuth);
	const formattedDate = createdAt.replace(/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}).*/, '$1 $2 $3 $4:$5:$6');

	useEffect(() => {
		const saved = localStorage.getItem(`post-${postId}-isSaved`);
		setIsSaved(saved === 'true');
	}, []);

	useEffect(() => {
		const liked = localStorage.getItem(`post-${postId}-isLiked`);
		setIsLiked(liked === 'true');
	}, []);

	const addComment = async () => {
		const comment = {
			userId: `${userData._id}`,
			username: `${userData.fullName}`,
			postId: `${postId}`,
			comment: `${commentwriting}`,
			avatar: `${userData.avatarUrl}`,
		};
		try {
			const response = await axios.put('/posts/comments/post', comment);
			dispatch(commentsAdd(response));
			setComments(Comments.concat(response));
		} catch (error) {
			console.error(error);
		}
	};

	const handleSaveClick = async () => {
		dispatch(savePost({ postId, userId: userData._id }))
			.then(() => {
				setIsSaved(!isSaved);
				localStorage.setItem(`post-${postId}-isSaved`, !isSaved);
			})
			.catch((error) => {
				console.error(error);
			});
		const { data } = await axios.get('/posts');
		dispatch(fetchPosts(data));
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

	const handleAddComment = async (e) => {
		e.preventDefault();
		addComment();
		setcommentwriting('');
		const { data } = await axios.get('/posts');
		dispatch(fetchPosts(data));
	};

	const handleCommentOpen = () => {
		setComentOpen((e) => !e);
	};

	return (
		<div className={styled.wrapper}>
			<NavLink to={`/profile/${user._id}`}>
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
							<button type="submit" className={styled.nameBtn}>
								<p className={styled.name}>{user.fullName}</p>
							</button>
						)}
						<p className={styled.date}>{formattedDate}</p>
					</div>
				</div>
			</NavLink>

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
							<img src={comment} alt="comment" /> <span>Comment {Comments.length}</span>
						</button>
						<button onClick={handleLikeClick}>
							<img src={isLiked ? liked : heart} alt="Liked" /> <span>Liked</span>
						</button>
						<button onClick={handleSaveClick}>
							<img src={isSaved ? saved : save} alt="saved" /> <span>Saved</span>
						</button>
					</div>
					<form className={styled.form} onSubmit={handleAddComment}>
						{avatarUrl == 'http://localhost:8080undefined' || avatarUrl == 'http://localhost:8080' ? (
							<img className={styled.tweetImg} src={usera} alt="#" />
						) : (
							<img className={styled.tweetImg} src={avatarUrl} alt="#" />
						)}
						<input
							type="text"
							placeholder="Tweet your reply"
							value={commentwriting}
							onChange={(e) => setcommentwriting(e.target.value)}
						/>
						<button className={styled.formBtn} type="submit">
							Post
						</button>
					</form>
				</>
			)}

			{comentOpen &&
				Comments?.map((item) => (
					<div key={item._id} className={styled.comment}>
						<div className={styled.commentTitle}>
							{item.imageUrl ? (
								<img className={styled.tweetImg} src={usera} alt="#" />
							) : (
								<img className={styled.tweetImg} src={`${item.avatar}`} alt="#" />
							)}
							<div className={styled.commentSection}>
								<p className={styled.commentSectionName}>
									{item.username}{' '}
									<span>
										{item?.createdAt
											? item?.createdAt.replace(
													/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}).*/,
													'$1 $2 $3 $4:$5:$6'
											  )
											: null}
									</span>
								</p>
								<p className={styled.commentSectionText}>{item.comment}</p>
							</div>
						</div>
					</div>
				))}
		</div>
	);
};

export default Post;
