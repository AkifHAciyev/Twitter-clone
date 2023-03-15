import React, { useRef, useState } from 'react';
import axios from '../../../../axios.js';
import styled from './index.module.css';
import user from '../../../../assets/images/user.jpg';
import photo from '../../../../assets/icons/photo.png';
import { selectIsAuthMe } from '../../../../redux/slices/auth.js';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPosts } from '../../../../redux/slices/post';

const TweetBox = () => {
	const [text, setText] = useState('');
	const [imageUrl, setImageUrl] = useState('');
	const inputRef = useRef(null);
	const userData = useSelector(selectIsAuthMe);
	const dispatch = useDispatch();

	const handleChangeFile = async (e) => {
		try {
			const formData = new FormData();
			const file = e.target.files[0];
			formData.append('image', file);
			const { data } = await axios.post('/upload', formData);
			setImageUrl(data.url);
		} catch (err) {
			console.warn(err);
			alert('image is not send');
		}
	};

	const onSubmit = async (e) => {
		e.preventDefault();
		try {
			const fields = {
				text,
				imageUrl,
			};
			const { data } = await axios.post('/posts', fields);
			dispatch(fetchPosts(data));
			setText('');
			setImageUrl('');
		} catch (err) {
			console.warn(err);
			alert('post is not create');
		}
	};

	return (
		<div className={styled.wrapper}>
			<div className={styled.title}>Tweet someting</div>
			<div className={styled.formBox}>
				<form onSubmit={onSubmit} className={styled.form}>
					<div className={styled.formdiv}>
						{!userData.avatarUrl || userData.avatarUrl === '' ? (
							<img className={styled.userImg} src={user} alt="#" />
						) : (
							<img className={styled.userImg} src={`http://localhost:8080${userData.avatarUrl}`} alt="#" />
						)}

						<input ref={inputRef} type="file" onChange={handleChangeFile} hidden />
						<input
							value={text}
							onChange={(e) => setText(e.target.value)}
							className={styled.input}
							type="text"
							placeholder="What's happening?"
						/>
					</div>
					<div className={styled.fromIconsbox}>
						<div className={styled.fromIcons}>
							<img onClick={() => inputRef.current.click()} className={styled.fromIconsImg} src={photo} alt="photo" />
						</div>

						<button type="submit" className={styled.button}>
							Tweet
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default TweetBox;
