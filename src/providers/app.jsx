import { Suspense } from 'react';

import { ErrorBoundary } from 'react-error-boundary';
import { HelmetProvider } from 'react-helmet-async';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import { AppThemeProvider } from 'theme';
import { store } from 'store';
import { Spinner, NotificationProvider } from 'components/Elements';
import { AuthProvider } from 'hooks/useAuth';

const ErrorFallback = () => {
	return (
		<div className="w-screen h-screen flex flex-col justify-center items-center" role="alert">
			<h2 className="text-lg font-semibold">Ooops, something went wrong :( </h2>
			<button
				className="bg-blue text-white p-8 rounded-full border-0 hover:cursor-pointer  "
				onClick={() => window.location.assign(window.location.origin)}
			>
				<span className=" text-18 p-20">Refresh</span>
			</button>
		</div>
	);
};

export const AppProvider = ({ children }) => {
	return (
		<Suspense
			fallback={
				<div className="flex items-center justify-center w-screen h-screen">
					<Spinner size="xl" />
				</div>
			}
		>
			<ErrorBoundary FallbackComponent={ErrorFallback}>
				<HelmetProvider>
					<Provider store={store}>
						<NotificationProvider />
						<AuthProvider>
							<AppThemeProvider>
								<BrowserRouter>{children}</BrowserRouter>
							</AppThemeProvider>
						</AuthProvider>
					</Provider>
				</HelmetProvider>
			</ErrorBoundary>
		</Suspense>
	);
};
