import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

import { AppThemeProvider } from 'theme';
import { AuthProvider } from 'hooks';
import { NotificationProvider } from 'components/Elements';
import { setupStore } from 'store';

// export function setupApiStore(api, extraReducers) {

// 	const getStore = () =>
// 		configureStore({
// 			reducer: combineReducers({
// 				[api.reducerPath]: api.reducer,
// 				...extraReducers,
// 			}),
// 			middleware: getDefaultMiddleware => getDefaultMiddleware().concat(api.middleware),
// 		});

// 	const initialStore = getStore();
// 	const refObj = {
// 		api,
// 		store: initialStore,
// 	};
// 	const store = getStore();
// 	refObj.store = store;

// 	return refObj;
// }

export const renderWithProviders = (
	ui,
	{ preloadedState = {}, store = setupStore(preloadedState), ...renderOptions } = {},
) => {
	const Wrapper = ({ children }) => {
		return (
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
		);
	}

	return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}

export const setupScreen = element => ({
	userEvent: userEvent.setup(),
	...renderWithProviders(element),
});

export { userEvent, render, screen };
