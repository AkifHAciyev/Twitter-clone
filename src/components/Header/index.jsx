import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import styled from './index.module.css';
import twitter from '../../assets/icons/twitterLogo.svg';
import user from '../../assets/images/user.jpg';
import userIcon from '../../assets/icons/userIcon.png';
import people from '../../assets/icons/people.png';
import logout from '../../assets/icons/logout.png';
import Button from '@mui/material/Button';

const Header = () => {
	const [dropDown, setDropDown] = useState(false);
	let activeStyle = {
		color: '#2f80ed',
		borderBottom: '3px solid #2f80ed',
		paddingBottom: '21px',
	};

	const isAuth = false;
	const onClickLogout = () => {};

	return (
		<div className={styled.wrapper}>
			<div className={styled.container}>
				<NavLink to="/" className={styled.logo}>
					<img src={twitter} alt="twitter" />
					<p className={styled.logoName}>Twitter</p>
				</NavLink>
				<nav className={styled.nav}>
					<ul className={styled.ul}>
						<li className={styled.li}>
							<NavLink style={({ isActive }) => (isActive ? activeStyle : undefined)} className={styled.link} to="/">
								Home
							</NavLink>
						</li>
						<li className={styled.li}>
							<NavLink
								style={({ isActive }) => (isActive ? activeStyle : undefined)}
								className={styled.link}
								to="/explore"
							>
								Explore
							</NavLink>
						</li>
						<li className={styled.li}>
							<NavLink
								style={({ isActive }) => (isActive ? activeStyle : undefined)}
								className={styled.link}
								to="/bookmarks"
							>
								Bookmarks
							</NavLink>
						</li>
					</ul>
				</nav>
				{isAuth ? (
					<div className={styled.userWrapper} onClick={() => setDropDown(!dropDown)}>
						<div className={styled.user}>
							<div className={styled.userImg}>
								<img src={user} alt="user" />
							</div>
							<p className={styled.userName}>Xanthe Neal</p>
						</div>
						{dropDown && (
							<nav className={styled.usernav}>
								<ul className={styled.userul}>
									<li className={styled.userli}>
										<NavLink className={styled.userlink} to="/my-profile">
											<img src={userIcon} alt="" />
											My Profile
										</NavLink>
									</li>
									<li className={styled.userli}>
										<NavLink className={styled.userlink} to="/explore">
											<img src={people} alt="" />
											Group Chat
										</NavLink>
									</li>
									<li className={styled.userli}>
										<NavLink onClick={onClickLogout} className={styled.userlink} to="/login">
											<img src={logout} alt="" />
											Logout
										</NavLink>
									</li>
								</ul>
							</nav>
						)}
					</div>
				) : (
					<>
						<NavLink to="/login">
							<Button variant="outlined">Log In </Button>
						</NavLink>
						<NavLink to="/register">
							<Button variant="contained">Register</Button>
						</NavLink>
					</>
				)}
			</div>
		</div>
	);
};

export default Header;
