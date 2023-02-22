import React from 'react';
import { Route, Routes } from 'react-router-dom';
import PageLayout from '../components/PageLayout';
import BookmarksPage from '../pages/Bookmarks';
import ExplorePage from '../pages/Explore';
import HomePage from '../pages/Home';
import NotFound from '../pages/NotFound';

const PageRoutes = () => {
	return (
		<Routes>
			<Route element={<PageLayout />}>
				<Route index element={<HomePage />} />
				<Route path="/explore" element={<ExplorePage />} />
				<Route path="/bookmarks" element={<BookmarksPage />} />
				<Route path="*" element={<NotFound />} />
			</Route>
		</Routes>
	);
};

export default PageRoutes;
