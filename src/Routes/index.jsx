import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import PageLayout from '../components/PageLayout';
import BookmarksPage from '../pages/Bookmarks';
import ExplorePage from '../pages/Explore';
import HomePage from '../pages/Home';
import LoginPage from '../pages/Login';
import MyProfilePage from '../pages/MyProfile';
import NotFound from '../pages/NotFound';
import ProfilePage from '../pages/Profile';
import RegistrationPage from '../pages/Registration';
import { fetchAuthMe } from '../redux/slices/auth';

const PageRoutes = () => {
	const dispath = useDispatch();

	useEffect(() => {
		dispath(fetchAuthMe());
	}, []);

	return (
		<Routes>
			<Route element={<PageLayout />}>
				<Route index element={<HomePage />} />
				<Route path="/explore" element={<ExplorePage />} />
				<Route path="/bookmarks" element={<BookmarksPage />} />
				<Route path="/my-profile" element={<MyProfilePage />} />
				<Route path="*" element={<NotFound />} />
				<Route path="/login" element={<LoginPage />} />
				<Route path="/register" element={<RegistrationPage />} />
				<Route path="/profile" element={<ProfilePage />} />
			</Route>
		</Routes>
	);
};

export default PageRoutes;
