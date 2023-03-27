import { screen, setupScreen } from 'test/testUtils';
import { server, rest } from 'test/mocks/server';
import { Register } from 'features/auth/routes/Register';

const formDataOk = {
	name: 'Jhon Dove',
	email: 'test@test.com',
	password: 'Prueba*123',
};

const formDataWrong = {
	shortName: 'To',
	longName: 'Tfdfdfdfffffffffffffffffffffffffdfdfdfffffffffffffo',
	email: 'test.com',
	password: 'Prueba',
};

describe('<RegisterPage />', () => {
	test('should render OK', async () => {
		setupScreen(<Register />);
		expect(screen.getByText(/Already have an account?/i)).toBeInTheDocument();
	});

	test('displays username validation errors', async () => {
		const { userEvent } = setupScreen(<Register />);

		const displayname = screen.getByLabelText(/display name/i);

		await userEvent.type(displayname, formDataWrong.shortName);
		expect(await screen.findByText(/Should be 4 chars minimum./i)).toBeInTheDocument();

		await userEvent.type(displayname, formDataWrong.longName);
		expect(await screen.findByText(/Should be 40 chars maximum./i)).toBeInTheDocument();

		await userEvent.clear(displayname);
		expect(await screen.findByText(/You must enter display name./i)).toBeInTheDocument();
	});

	test('displays email validation errors', async () => {
		const { userEvent } = setupScreen(<Register />);

		const email = screen.getByLabelText(/email/i);

		await userEvent.type(email, formDataWrong.email);
		expect(await screen.findByText(/You must enter a valid email./i)).toBeInTheDocument();

		await userEvent.clear(email);
		expect(await screen.findByText(/You must enter a email./i)).toBeInTheDocument();
	});

	test('displays password validation errors', async () => {
		const { userEvent } = setupScreen(<Register />);

		const password = screen.getByLabelText(/Password/i);

		await userEvent.type(password, formDataWrong.password);
		expect(await screen.findByText(/Password too weak./i)).toBeInTheDocument();

		await userEvent.clear(password);

		expect(await screen.findByText(/Please enter your password./i)).toBeInTheDocument();
	});

	test('button disabled', async () => {
		setupScreen(<Register />);

		const buttonSubmit = screen.getByTestId('registerBtn');
		expect(buttonSubmit).toHaveAttribute('disabled');
	});

	test('form ok, button login enable?', async () => {
		const { userEvent } = setupScreen(<Register />);

		const buttonSubmit = screen.getByTestId('registerBtn');
		const displayname = screen.getByLabelText(/display name/i);
		const email = screen.getByLabelText(/email/i);
		const password = screen.getByLabelText(/Password/i);

		await userEvent.type(displayname, formDataOk.name);
		await userEvent.type(email, formDataOk.email);
		await userEvent.type(password, formDataOk.password);

		expect(buttonSubmit).not.toHaveAttribute('disabled');
	});
});

describe('<Register/> with call api mock', () => {
	test('submits a form with invalid credentials', async () => {
		server.use(
			rest.post(`*`, (_, res, ctx) =>
				res(ctx.status(400), ctx.json({ statusCode: 400, message: 'Username already exists' })),
			),
		);
		const { userEvent } = setupScreen(<Register />);

		const buttonSubmit = screen.getByTestId('registerBtn');
		const displayname = screen.getByLabelText(/display name/i);
		const email = screen.getByLabelText(/email/i);
		const password = screen.getByLabelText(/password/i);

		await userEvent.type(displayname, formDataOk.name);
		await userEvent.type(email, formDataOk.email);
		await userEvent.type(password, formDataOk.password);

		expect(buttonSubmit).not.toHaveAttribute('disabled');
		await userEvent.click(buttonSubmit);

		expect(await screen.findByText(/Username already exists/i)).toBeInTheDocument();
	});

});
