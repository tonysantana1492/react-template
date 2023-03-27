import { Sidebar } from 'components/Sidebar';
import { Navbar } from 'components/Navbar';

export const MainLayout = ({ children }) => {
	return (
		<div className="h-screen flex overflow-hidden bg-gray-100">
			<Sidebar />
			<div className="flex flex-col w-0 flex-1 overflow-hidden">
				<nav>
					<Navbar />
				</nav>
				
				<main className="flex-1 relative overflow-y-auto focus:outline-none">{children}</main>
				<footer>{/* footer */}</footer>
			</div>
		</div>
	);
};
