import React from 'react';
import { Route, Routes } from 'react-router-dom';
import PageLayout from '../components/PageLayout';
import BookmarksPage from '../pages/Bookmarks';
import ExplorePage from '../pages/Explore';
import HomePage from '../pages/Home';
import LoginPage from '../pages/Login';
import MyProfilePage from '../pages/MyProfile';
import NotFound from '../pages/NotFound';

const PageRoutes = () => {
	return (
		<Routes>
			<Route element={<PageLayout />}>
				<Route index element={<HomePage />} />
				<Route path="/explore" element={<ExplorePage />} />
				<Route path="/bookmarks" element={<BookmarksPage />} />
				<Route path="/my-profile" element={<MyProfilePage />} />
				<Route path="*" element={<NotFound />} />
			</Route>
			<Route path="/login" element={<LoginPage />} />
		</Routes>
	);
};

export default PageRoutes;
