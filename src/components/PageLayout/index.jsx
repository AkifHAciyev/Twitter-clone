import Header from '../Header';
import { Outlet } from 'react-router';
import Footer from '../Footer';

function PageLayout() {
	return (
		<>
			<Header />
			<div className="wrapper">
				<Outlet />
			</div>
			<Footer />
		</>
	);
}
export default PageLayout;
