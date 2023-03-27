import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/dist/query';

import { userApi } from 'features/auth/api/user';
import { sidebarReducer } from './sidebarReducer';

export * from './sidebarReducer';

export const setupStore = preloadedState => {
	return configureStore({
		reducer: {
			[userApi.reducerPath]: userApi.reducer,
			sidebarReducer: sidebarReducer,
		},
		middleware: getDefaultMiddleware => getDefaultMiddleware().concat(userApi.middleware),
		preloadedState,
	});
};

export const store = setupStore();
setupListeners(store.dispatch);
