import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
	return (
		<div>
			<nav>
				<ul>
					<li>
						<Link to="/">Home</Link>
					</li>
					<li>
						<Link to="/explore">Explore</Link>
					</li>
					<li>
						<Link to="/bookmarks">Bookmarks</Link>
					</li>
				</ul>
			</nav>
		</div>
	);
};

export default Header;
