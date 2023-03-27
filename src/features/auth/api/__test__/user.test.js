import { setupStore } from 'store';
import { usersMocks } from 'test/mocks/usersMocks';
import { userApi } from '../user';

describe('getAllUsers', () => {	

	test('successful response', async () => {
		
		const store = setupStore({});

		const action = await store.dispatch(userApi.endpoints.getAllUsers.initiate(undefined));
		const { status, data, isSuccess } = action;
		expect(status).toBe('fulfilled');
		expect(isSuccess).toBe(true);
		expect(data).toStrictEqual(usersMocks);
	});

	// test('login', async () => {
	// 	const server = setupServer(
	// 		rest.post(`${userURL}login`, (_, res, ctx) => res(ctx.status(200), ctx.json(usersMocks))),
	// 	);
	// 	server.listen();
	// 	server.resetHandlers();

	// 	const storeRef = setupApiStore(userApi);

	// 	const action = await storeRef.store.dispatch(userApi.endpoints.registerUser.initiate({ email: 'tony' }));

	// 	const { isLoading } = action;
	// 	expect(status).toBe('fulfilled');
	// 	expect(isSuccess).toBe(true);
	// 	expect(data).toStrictEqual(usersMocks);
	// });

	// test('unsuccessful response', () => {
	// 	const server = setupServer(
	// 		rest.get(`${userURL}users`, (_, res, ctx) =>
	// 			res(ctx.status(400), ctx.json({ statusCode: 400, message: 'Wrong credentials provided' })),
	// 		),
	// 	);
	// 	server.listen();
	// 	server.resetHandlers();

	// 	const storeRef = setupApiStore(userApi);

	// 	return storeRef.store.dispatch(userApi.endpoints.getAllUsers.initiate(undefined)).then(action => {
	// 		const {
	// 			status,
	// 			error = { error: { data: { statusCode: 400, message: 'Wrong credentials provided' }, status: 400 } },
	// 			isSuccess,
	// 		} = action;
	// 		expect(status).toBe('fulfilled');
	// 		expect(isSuccess).toBe(true);
	// 		expect(error).toBe('Error: Internal Server Error');
	// 	});
	// });
});

// describe("CreateGame", () => {
//   test("request is correct", () => {
//     const storeRef = setupApiStore(diplomacyService, { auth: authReducer });
//     const testToken = "test-123";
//     storeRef.store.dispatch(authActions.login(testToken));
//     fetchMock.mockResponse(JSON.stringify({}));
//     return storeRef.store
//       .dispatch<any>(diplomacyService.endpoints.createGame.initiate(newGame))
//       .then(() => {
//         expect(fetchMock).toBeCalledTimes(1);
//         const request = fetchMock.mock.calls[0][0] as Request;
//         const { method, headers, url } = request;

//         void request.json().then((data) => {
//           expect(data).toStrictEqual(newGame);
//         });

//         const accept = headers.get(Headers.Accept);
//         const authorization = headers.get(Headers.Authorization);

//         expect(method).toBe("POST");
//         expect(url).toBe(`${serviceURL}Game`);
//         expect(accept).toBe("application/json");
//         expect(authorization).toBe(`Bearer ${testToken}`);
//       });
//   });
//   test("successful response", () => {
//     const storeRef = setupApiStore(diplomacyService, { auth: authReducer });
//     const testToken = "test-123";
//     storeRef.store.dispatch(authActions.login(testToken));
//     fetchMock.mockResponse(JSON.stringify(game));

//     return storeRef.store
//       .dispatch<any>(diplomacyService.endpoints.createGame.initiate(newGame))
//       .then((action: any) => {
//         const { data } = action;
//         expect(data).toStrictEqual(game);
//       });
//   });
//   test("unsuccessful response", () => {
//     const storeRef = setupApiStore(diplomacyService, { auth: authReducer });
//     fetchMock.mockReject(new Error("Internal Server Error"));

//     return storeRef.store
//       .dispatch<any>(
//         diplomacyService.endpoints.listVariants.initiate(undefined)
//       )
//       .then((action: any) => {
//         const {
//           status,
//           error: { error },
//           isError,
//         } = action;
//         expect(status).toBe("rejected");
//         expect(isError).toBe(true);
//         expect(error).toBe("Error: Internal Server Error");
//       });
//   });
// });
