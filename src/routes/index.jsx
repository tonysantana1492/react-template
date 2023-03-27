import { useRoutes } from 'react-router-dom';

import { useAuth } from 'hooks/useAuth';
// import Dashboard from 'features/dashboard/Dashboard';
import { protectedRoutes } from './protected';
import { publicRoutes } from './public';
import { Spinner } from 'components/Elements';

export const AppRoutes = () => {
	const {user, waitAuthCheck} = useAuth();

	// const commonRoutes = [{ path: '/', element: <Dashboard /> }];

	const routes = user ? protectedRoutes : publicRoutes;

	// const element = useRoutes([...routes, ...commonRoutes]);
	const element = useRoutes([...routes]);

	if(waitAuthCheck) return <Spinner />;

	return <>{element}</>;
};
