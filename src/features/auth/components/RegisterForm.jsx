import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { InputAdornment, TextField } from '@mui/material';
import { EmailOutlined, PersonOutline, VpnKeyOutlined } from '@mui/icons-material';

import { Button } from 'components/Elements';
import { useAuth } from 'hooks/useAuth';

const schema = yup.object().shape({
	name: yup
		.string()
		.required('You must enter display name.')
		.min(4, 'Should be 4 chars minimum.')
		.max(40, 'Should be 40 chars maximum.'),
	email: yup.string().email('You must enter a valid email.').required('You must enter a email.'),
	password: yup
		.string()
		.required('Please enter your password.')
		.matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, 'Password too weak.')
		.min(8, 'Should be 4 chars minimum.')
		.max(20, 'Should be 40 chars maximum.')
});

const defaultValues = {
	name: '',
	email: '',
	password: ''
};

export const RegisterForm = ({ onSuccess }) => {
	const { register: registerAuth, isRegisterLoading } = useAuth();

	const { formState, register, handleSubmit, setError } = useForm({
		mode: 'onChange',
		defaultValues,
		resolver: yupResolver(schema),
	});
	const { isValid, dirtyFields, errors } = formState;

	const onSubmit = async model => {
		const newModel = { ...model, role: 'client' };

		try {
			await registerAuth(newModel);
		} catch (error) {
			if (error.dataRequest.status === 'FETCH_ERROR') {
				Notification.error('Server not available');
				return;
			}

			setError('email', {
				message: error.dataRequest.data.message,
			});
		}
	};

	return (
		<form className="flex flex-col justify-center w-full" onSubmit={handleSubmit(onSubmit)}>
			<TextField
				autoFocus
				type="text"
				label="Display name"
				variant="outlined"
				autoComplete="name"
				required
				className="mb-16"
				data-cy="name"
				data-testid="name"
				{...register('name', {
					required: 'This field is required',
				})}
				InputProps={{
					endAdornment: (
						<InputAdornment position="end">
							<PersonOutline />
						</InputAdornment>
					),
				}}
				error={!!errors.name}
				helperText={errors?.name?.message}
			/>

			<TextField
				type="text"
				label="Email"
				variant="outlined"
				required
				autoComplete="email"
				className="mb-16"
				data-cy="email"
				data-testid="email"
				{...register('email', {
					required: 'This field is required',
				})}
				InputProps={{
					endAdornment: (
						<InputAdornment position="end">
							<EmailOutlined />
						</InputAdornment>
					),
				}}
				error={!!errors.email}
				helperText={errors?.email?.message}
			/>

			<TextField
				type="password"
				label="Password"
				variant="outlined"
				required
				autoComplete="new-password"
				className="mb-16"
				data-cy="password"				
				data-testid="password"
				{...register('password', {})}
				InputProps={{
					endAdornment: (
						<InputAdornment position="end">
							<VpnKeyOutlined />
						</InputAdornment>
					),
				}}
				error={!!errors.password}
				helperText={errors?.password?.message}
			/>

			<Button
				type="submit"
				data-cy="registerBtn"
				data-testid="registerBtn"
				variant="contained"
				color="primary"
				sx={{ marginTop: '20px' }}
				aria-label="REGISTER"
				disabled={dirtyFields.length === 0 || !isValid || isRegisterLoading}
				isLoading={isRegisterLoading}
				value="legacy"
			>
				Register
			</Button>
		</form>
	);
};
