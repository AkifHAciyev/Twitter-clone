import Header from '../Header';
import { Outlet } from 'react-router';

function PageLayout() {
	return (
		<>
			<Header />
			<div className="wrapper">
				<Outlet />
			</div>
		</>
	);
}
export default PageLayout;
