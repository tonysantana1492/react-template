import { userEvent, screen, setupScreen } from 'test/testUtils';
import { Login } from 'features/auth/routes/Login';
import { rest, server } from 'test/mocks/server';

const formDataOk = {
	email: 'test@test.com',
	password: 'Prueba*123',
};

const formDataWrong = {
	email: 'test.com',
	password: 'Prueba',
};

jest.spyOn(window.localStorage.__proto__, 'setItem');
window.localStorage.__proto__.setItem = jest.fn();

describe('<LoginPage />', () => {
	test('should render OK', async () => {
		setupScreen(<Login />);
		expect(await screen.findByText(/Don't have an account?/i)).toBeInTheDocument();
	});

	test('displays email validation errors', async () => {
		setupScreen(<Login />);
		const email = screen.getByLabelText(/email/i);

		await userEvent.type(email, formDataWrong.email);
		expect(await screen.findByText(/You must enter a valid email./i)).toBeInTheDocument();

		await userEvent.clear(email);
		expect(await screen.findByText(/You must enter a email/i)).toBeInTheDocument();
	});

	test('displays password validation errors', async () => {
		const { userEvent } = setupScreen(<Login />);
		const password = screen.getByLabelText(/Password/i);

		await userEvent.type(password, formDataWrong.password);
		expect(await screen.findByText(/Password too weak/i)).toBeInTheDocument();

		await userEvent.clear(password);

		expect(await screen.findByText(/Please enter your password./i)).toBeInTheDocument();
	});

	test('button disabled', async () => {
		setupScreen(<Login />);

		const buttonSubmit = screen.getByTestId('loginBtn');
		expect(buttonSubmit).toHaveAttribute('disabled');
	});

	test('form ok, button login enable?', async () => {
		const { userEvent } = setupScreen(<Login />);

		const buttonSubmit = screen.getByTestId('loginBtn');
		const email = screen.getByLabelText(/email/i);
		const password = screen.getByLabelText(/Password/i);

		await userEvent.type(email, formDataOk.email);
		await userEvent.type(password, formDataOk.password);

		expect(buttonSubmit).not.toHaveAttribute('disabled');
	});
});

describe('<LoginPage/> with call api mock', () => {
	test('submits a form with invalid credentials', async () => {
		server.use(
			rest.post(`*`, (_, res, ctx) =>
				res(ctx.status(400), ctx.json({ statusCode: 400, message: 'Wrong credentials provided' })),
			),
		);
		const { userEvent } = setupScreen(<Login />);

		const buttonSubmit = screen.getByTestId('loginBtn');
		const email = screen.getByLabelText(/email/i);
		const password = screen.getByLabelText(/Password/i);

		await userEvent.type(email, formDataOk.email);
		await userEvent.type(password, formDataOk.password);

		expect(buttonSubmit).not.toHaveAttribute('disabled');

		await userEvent.click(buttonSubmit);

		expect(await screen.findByText(/Wrong credentials provided/i)).toBeInTheDocument();
	});

});
