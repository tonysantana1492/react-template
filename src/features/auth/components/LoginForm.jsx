import { useEffect, useState } from 'react';

import { TextField, InputAdornment, IconButton } from '@mui/material';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { EmailOutlined, VisibilityOffOutlined, VisibilityOutlined } from '@mui/icons-material';

import { Button, Notification } from 'components/Elements';
import { useAuth } from 'hooks/useAuth';

const schema = yup.object().shape({
	email: yup.string().email('You must enter a valid email.').required('You must enter a email.'),
	password: yup
		.string()
		.required('Please enter your password.')
		.matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, 'Password too weak.')
		.min(8, 'Should be 4 chars minimum.')
		.max(20, 'Should be 40 chars maximum.'),
});

const defaultValues = {
	email: '',
	password: '',
};

export const LoginForm = ({ onSuccess }) => {
	const [showPassword, setShowPassword] = useState(false);
	const { login, isLoginLoading } = useAuth();

	const { formState, register, handleSubmit, setError, setValue } = useForm({
		mode: 'onChange',
		defaultValues,
		resolver: yupResolver(schema),
	});
	const { isValid, dirtyFields, errors, trigger, reset } = formState;

	const onSubmit = async model => {
		try {
			await login(model);
		} catch (error) {
			if (error?.dataRequest?.status === 'FETCH_ERROR') {
				Notification.error('Server not available');
				return;
			}

			setError('email', {
				message: error.dataRequest.data.message,
			});
		}
	};

	// useEffect(() => {
	// 	setValue('email', 'tonysantana1492@gmail.com', { shouldDirty: true, shouldValidate: true });
	// 	setValue('password', 'Laura920410*', { shouldDirty: true, shouldValidate: true });
	// }, [reset, setValue, trigger]);

	return (
		<form className="flex flex-col justify-center w-full" onSubmit={handleSubmit(onSubmit)}>
			<TextField
				autoFocus
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
							<EmailOutlined className="text-20" color="action" />
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
				className="mb-16"
				autoComplete="password"
				data-cy="password"
				data-testid="password"
				{...register('password', {})}
				InputProps={{
					className: 'pr-2',
					type: showPassword ? 'text' : 'password',
					endAdornment: (
						<InputAdornment position="end">
							<IconButton onClick={() => setShowPassword(!showPassword)}>
								{showPassword ? <VisibilityOutlined /> : <VisibilityOffOutlined />}
							</IconButton>
						</InputAdornment>
					),
				}}
				error={!!errors.password}
				helperText={errors?.password?.message}
			/>
			<Button
				type="submit"
				data-cy="loginBtn"
				data-testid="loginBtn"
				variant="contained"
				color="primary"
				sx={{ marginTop: '20px' }}
				aria-label="LOG IN"
				disabled={dirtyFields.length === 0 || !isValid || isLoginLoading}
				isLoading={isLoginLoading}
				value="legacy"
			>
				Login
			</Button>
		</form>
	);
};
