import { Suspense } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import { lazyImport } from 'utils/lazyImport';
import { Spinner } from 'components/Elements';
import { MainLayout } from 'components/Layout';

const { Mail } = lazyImport(() => import('features/mail/Mail'), 'Mail');
const { Dashboard } = lazyImport(() => import('features/dashboard/Dashboard'), 'Dashboard');

const App = () => {
	return (
		<MainLayout>
			<Suspense
				fallback={
					<div className="h-full w-full flex items-center justify-center">
						<Spinner size="xl" />
					</div>
				}
			>
				<Outlet />
			</Suspense>
		</MainLayout>
	);
};

export const protectedRoutes = [
	{
		path: '/app',
		element: <App />,
	
		children: [
			{ path: 'mail', element: <Mail /> },
			{ path: '', element: <Dashboard /> },
			{ path: '*', element: <Navigate to="." /> },
		],
	},
	{
		path: '*',
		element: <Navigate to="/app" />,
	},
];
