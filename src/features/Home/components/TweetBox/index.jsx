import React from 'react';
import styled from './index.module.css';
import user from '../../../../assets/images/user.jpg';
import photo from '../../../../assets/icons/photo.png';
import globe from '../../../../assets/icons/globe.png';

const TweetBox = () => {
	return (
		<div className={styled.wrapper}>
			<div className={styled.title}>Tweet someting</div>
			<div className={styled.formBox}>
				<form className={styled.form}>
					<div className={styled.formdiv}>
						<img className={styled.userImg} src={user} alt="user" />
						<input className={styled.input} type="text" placeholder="What's happening?" />
					</div>

					<div className={styled.fromIconsbox}>
						<div className={styled.fromIcons}>
							<img className={styled.fromIconsImg} src={photo} alt="photo" />
							<img className={styled.fromIconsImg} src={globe} alt="globe" />
							<p className={styled.formIconsText}>Who can reply?</p>
						</div>

						<button className={styled.button}>Tweet</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default TweetBox;
