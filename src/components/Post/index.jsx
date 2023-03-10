import React, { useEffect, useState } from 'react';
import styled from './index.module.css';
import usera from '../../assets/images/user.jpg';
import comment from '../../assets/icons/comment.png';
import refresh from '../../assets/icons/refresh.png';
import heart from '../../assets/icons/heart.png';
import save from '../../assets/icons/save.png';
import image from '../../assets/icons/image.png';
import { PostSkeleton } from './Skeleton';
import { useSelector } from 'react-redux';
import { selectIsAuth, selectIsAuthMe } from '../../redux/slices/auth';
import axios from '../../axios';

const Post = ({ postId, text, avatarUrl, imageUrl, user, createdAt, isFullPost, isLoading }) => {
	if (isLoading) {
		return <PostSkeleton />;
	}
	const [isSaved, setIsSaved] = useState(false);
	const userData = useSelector(selectIsAuthMe);

	const handleSaveClick = async () => {
		try {
			await axios.post(`/users/${userData._id}/save-post/${postId}`);
			await axios.put(`/posts/${postId}`, { isSaved: !isSaved });
			setIsSaved(!isSaved);
		} catch (error) {
			console.error(error);
		}
	};

	const formattedDate = createdAt.replace(/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}).*/, '$1 $2 $3 $4:$5:$6');

	const isAuth = useSelector(selectIsAuth);

	return (
		<div className={styled.wrapper}>
			<div className={styled.user}>
				<img src={avatarUrl.length > 21 ? avatarUrl : usera} alt="user" />
				<div className={styled.userName}>
					{isFullPost ? title : <p className={styled.name}>{user.fullName}</p>}
					<p className={styled.date}>{formattedDate}</p>
				</div>
			</div>
			<div className={styled.tweet}>
				<p className={styled.tweetText}>{text}</p>
				{imageUrl == ('http://localhost:8080undefined' || 'http://localhost:8080') ? (
					<p></p>
				) : (
					<img className={styled.tweetImg} src={imageUrl} alt={imageUrl.slice(30, 45)} />
				)}
			</div>
			{isAuth && (
				<>
					<div className={styled.userActions}>
						<button>
							<img src={comment} alt="comment" /> <span>Comment</span>
						</button>
						<button>
							<img src={refresh} alt="Retweeted" /> <span>Retweeted</span>
						</button>
						<button>
							<img src={heart} alt="Liked" /> <span>Liked</span>
						</button>
						<button onClick={handleSaveClick}>
							<img src={save} alt="saved" /> <span>Saved</span>
						</button>
					</div>
					<form className={styled.form}>
						<img src={usera} alt="" />
						<input type="text" placeholder="Tweet your reply" />
						<button>
							<img src={image} alt="image" />
						</button>
					</form>
				</>
			)}

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
		</div>
	);
};

export default Post;
