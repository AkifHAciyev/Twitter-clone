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
import RegistrationPage from '../pages/Registration';
import { fetchAuthMe, selectIsAuth } from '../redux/slices/auth';

const PageRoutes = () => {
	const dispath = useDispatch();
	const isAuth = useSelector(selectIsAuth);

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
			</Route>
		</Routes>
	);
};

export default PageRoutes;
