import React from 'react';
import styled from './index.module.css';
import user from '../../assets/images/user.jpg';
import tree from '../../assets/images/tree-736885__480.jpg';
import comment from '../../assets/icons/comment.png';
import refresh from '../../assets/icons/refresh.png';
import heart from '../../assets/icons/heart.png';
import save from '../../assets/icons/save.png';
import image from '../../assets/icons/image.png';

const Post = () => {
	return (
		<div className={styled.wrapper}>
			<div className={styled.user}>
				<img src={user} alt="user" />
				<div className={styled.userName}>
					<p className={styled.name}>Peyton Lyons</p>
					<p className={styled.date}>24 August at 20:43</p>
				</div>
			</div>
			<div className={styled.tweet}>
				<p className={styled.tweetText}>
					Lorem ipsum dolor sit amet consectetur, adipisicing elit. Alias, magnam. Optio quas inventore numquam
					provident vel quia expedita pariatur praesentium!
				</p>
				<img className={styled.tweetImg} src={tree} alt="tweetImg" />
			</div>
			<div className={styled.info}>
				<span>449 Comments</span>
				<span>56k Retweets</span>
				<span>234 Saved</span>
			</div>
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
				<button>
					<img src={save} alt="saved" /> <span>Saved</span>
				</button>
			</div>
			<form className={styled.form}>
				<img src={user} alt="" />
				<input type="text" placeholder="Tweet your reply" />
				<button>
					<img src={image} alt="image" />
				</button>
			</form>
			<div className={styled.comment}>
				<div className={styled.commentTitle}>
					<img src={user} alt="#" />
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
