import { AppBar, Toolbar, Box, IconButton } from '@mui/material';
import { MenuOpenOutlined } from '@mui/icons-material';

import { Logo } from '../Elements/Logo';
import { UserMenu } from './UserMenu';
import { useSidebar } from 'hooks';

export const Navbar = () => {
	const { open } = useSidebar();

	return (
		<AppBar
			sx={{
				display: 'flex',
				position: 'relative',
				boxShadow:
					'var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow)',
			}}
			color="default"
			style={{ backgroundColor: 'white' }}
			position="static"
		>
			<Toolbar>
				<IconButton onClick={open}>
					<MenuOpenOutlined />
				</IconButton>
				<Box flex={1} />
				<Logo />
				<Box flex={1} />
				<UserMenu />
			</Toolbar>
		</AppBar>
	);
};
