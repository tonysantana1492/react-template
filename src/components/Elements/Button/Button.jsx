import { Button as ButtonMaterial, CircularProgress } from '@mui/material';

export const Button = ({
	type = 'button',
	variant = 'primary',
	size = 'md',
	isLoading = false,
	startIcon,
	endIcon,
	data_cy = '',
	data_testid = '',
  	displayName = 'Button',
	color = 'primary',
	sx = { marginTop: '0px' },
	aria_label = '',
	disabled = false,
	value = 'legacy',
	...props
}) => {

	return (
		<ButtonMaterial
			type= { type }
			data-cy={ data_cy }
			data-testid= {data_testid }
			variant={ variant }
			color= { color }
			sx={ sx }
			aria-label={ aria_label }
			disabled={ disabled }
			value= { value }
      {...props}
		>
			{isLoading ? <CircularProgress size={24} /> : props.children}
		</ButtonMaterial>
	);
};

