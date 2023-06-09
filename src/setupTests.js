// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';
import { userApi } from 'features/auth/api/user';
import { setupStore } from 'store';
import { server } from 'test/mocks/server';

const store = setupStore({});

// Establish API mocking before all tests
beforeAll(() => {
	server.listen();
});

// Reset any request handlers that we may add during the test
afterEach(() => {
	server.resetHandlers();
	//  This is the solution to clear RTK query cache after each test
	store.dispatch(userApi.util.resetApiState());
});

afterAll(() => server.close());
