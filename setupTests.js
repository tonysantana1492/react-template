import '@testing-library/jest-dom';
import { userApi } from 'features/auth/api/user';
import { setupStore } from 'test/testUtils';
import { server } from './src/test/mocks/server';

const store = setupStore({});

// Establish API mocking before all tests
beforeAll(() => {
	server.listen();
});

// Reset any request handlers that we may add during the test
afterEach(() => {
	server.resetHandlers();
	//  This is the solution to clear RTK query cache after each test
	store.dispatch.apply(userApi.util.resetApiState());
});

// Clean up after the tests are finished
afterAll(() => server.close());
