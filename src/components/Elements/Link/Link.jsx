import clsx from 'clsx';
import { Link as RouterLink } from 'react-router-dom';

export const Link = ({ className, children, ...props }) => {
	return (
		<RouterLink
			className={clsx('text-cyan-300 no-underline hover:underline' , className)}
			{...props}
		>
			{children}
		</RouterLink>
	);
};
