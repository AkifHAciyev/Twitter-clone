import React, { useState } from 'react';
import styled from './index.module.css';
import Post from '../../components/Post';
import lable from '../../assets/images/lable.jpg';
import user from '../../assets/images/user.jpg';
import addUser from '../../assets/icons/add-user.png';
import FollowModal from './compinents/FollowModal';

const MyProfile = () => {
	const [open, setOpen] = useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	return (
		<div className={styled.wrapper}>
			<img className={styled.userAvo} src={lable} alt="#" />
			<div className={styled.userInfo}>
				<img className={styled.userInfoImg} src={user} alt="#" />
				<div className={styled.center}>
					<div>
						<p className={styled.name}>Daniel Jensen</p>
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
			<Post />
		</div>
	);
};

export default MyProfile;
