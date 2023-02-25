import React from 'react';
import styled from './index.module.css';
import serach from '../../assets/icons/search.png';
import Post from '../../components/Post';

const Explore = () => {
	return (
		<div className={styled.wrapper}>
			<form className={styled.form}>
				<img src={serach} alt="#" />
				<input type="text" placeholder="Search" />
				<button>Search</button>
			</form>
			<Post />
		</div>
	);
};

export default Explore;
