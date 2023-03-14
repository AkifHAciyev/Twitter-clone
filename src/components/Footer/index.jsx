import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from './index.module.css';
import homeButton from '../../assets/icons/home-button.png';
import compass from '../../assets/icons/compass.png';
import saveBlack from '../../assets/icons/saveBlack.png';
import { selectIsAuth } from '../../redux/slices/auth';
import { useSelector } from 'react-redux';

const Footer = () => {
	let activeStyle = {
		color: '#2f80ed',
		borderBottom: '3px solid #2f80ed',
		paddingBottom: '8px',
	};

	const isAuth = useSelector(selectIsAuth);

	return (
		<footer className={styled.footer}>
			<nav className={styled.nav}>
				<ul className={styled.ul}>
					<li className={styled.li}>
						<NavLink style={({ isActive }) => (isActive ? activeStyle : undefined)} className={styled.link} to="/">
							<img className={styled.img} src={homeButton} alt="" />
						</NavLink>
					</li>
					{isAuth && (
						<>
							<li className={styled.li}>
								<NavLink
									style={({ isActive }) => (isActive ? activeStyle : undefined)}
									className={styled.link}
									to="/explore"
								>
									<img className={styled.img} src={compass} alt="" />
								</NavLink>
							</li>
							<li className={styled.li}>
								<NavLink
									style={({ isActive }) => (isActive ? activeStyle : undefined)}
									className={styled.link}
									to="/bookmarks"
								>
									<img className={styled.img} src={saveBlack} alt="" />
								</NavLink>
							</li>
						</>
					)}
				</ul>
			</nav>
		</footer>
	);
};

export default Footer;
