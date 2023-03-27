import { useState } from 'react';

import { Link } from 'react-router-dom';
import { Avatar, Button, ListItemIcon, ListItemText, MenuItem, Popover, Typography } from '@mui/material';
import { AccountCircleOutlined, ExitToApp, LooksOutlined, MailOutlined, PersonAddOutlined } from '@mui/icons-material';

import { useAuth } from 'hooks';

export const UserMenu = () => {
	const {user, logout } = useAuth();

	const [userMenu, setUserMenu] = useState(null);

	const userMenuClick = event => {
		setUserMenu(event.currentTarget);
	};

	const userMenuClose = () => {
		setUserMenu(null);
	};

	return (
		<>
			<Button className="min-h-40 min-w-40 px-0 md:px-16 py-0 md:py-6" onClick={userMenuClick}>
				<div className="hidden md:flex flex-col mx-4 items-end">
					<Typography className="font-semibold flex text-gray-900">{user.name.split(' ')[0]}</Typography>
					<Typography className="text-11 font-medium capitalize text-gray-600">
						{user.role.toString()}
						{(!user.role || (Array.isArray(user.role) && user.role.length === 0)) && 'Guest'}
					</Typography>
				</div>

				{user.photoURL ? (
					<Avatar className="md:mx-4" alt="user photo" src={user.photoURL} />
				) : (
					<Avatar className="md:mx-4 ">{user.name[0]}</Avatar>
				)}
			</Button>

			<Popover
				open={Boolean(userMenu)}
				anchorEl={userMenu}
				onClose={userMenuClose}
				anchorOrigin={{
					vertical: 'bottom',
					horizontal: 'center',
				}}
				transformOrigin={{
					vertical: 'top',
					horizontal: 'center',
				}}
				classes={{
					paper: 'py-8',
				}}
			>
				{!user.role || user.role.length === 0 ? (
					<>
						<MenuItem component={Link} to="/auth/login" role="button">
							<ListItemIcon className="min-w-40">
								<LooksOutlined />
							</ListItemIcon>
							<ListItemText primary="Login" />
						</MenuItem>
						<MenuItem component={Link} to="/auth/register" role="button">
							<ListItemIcon className="min-w-40">
								<PersonAddOutlined />
							</ListItemIcon>
							<ListItemText primary="Register" />
						</MenuItem>
					</>
				) : (
					<>
						<MenuItem component={Link} to="/pages/profile" onClick={userMenuClose} role="button">
							<ListItemIcon className="min-w-40">
								<AccountCircleOutlined />
							</ListItemIcon>
							<ListItemText primary="My Profile" />
						</MenuItem>
						<MenuItem component={Link} to="/apps/mail" onClick={userMenuClose} role="button">
							<ListItemIcon className="min-w-40">
								<MailOutlined />
							</ListItemIcon>
							<ListItemText primary="Inbox" />
						</MenuItem>
						<MenuItem onClick={() => logout()}>
							<ListItemIcon className="min-w-40">
								<ExitToApp />
							</ListItemIcon>
							<ListItemText primary="Logout" />
						</MenuItem>
					</>
				)}
			</Popover>
		</>
	);
};
