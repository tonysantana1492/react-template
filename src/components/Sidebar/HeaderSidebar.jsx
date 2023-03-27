import { AppBar, Avatar, Typography } from '@mui/material';
import { useAuth } from 'hooks';

export const HeaderSidebar = () => {
	const { user } = useAuth();
	return (
		<AppBar
			position="static"
			color="primary"
			className="user relative flex flex-col items-center justify-center pt-24 pb-64 mb-32 z-0 shadow-0"
		>
			<Typography className="username text-18 whitespace-nowrap font-semibold mb-4" color="inherit">
				{user.name}
			</Typography>
			<Typography className="email text-13 opacity-50 whitespace-nowrap font-medium" color="inherit">
				{user.email}
			</Typography>
			<div className="flex items-center justify-center absolute bottom-0 -mb-36">
				{user.photoURL ? (
					<Avatar
						sx={{
							background: 'white',
							bottom: 0,
							'& > img': {
								borderRadius: '50%',
							},
						}}
						className="'avatar w-80 h-80 p-6 box-content'"
						alt="user photo"
						src={user.photoURL}
					/>
				) : (
					<Avatar
						sx={{
							background: 'white',
							bottom: 0,
							'& > div': {
								borderRadius: '50%',
							},
						}}
						className="'avatar w-80 h-80 p-6 box-content'"
					>
						<div
							className="bg-red w-full h-full text-white flex justify-center items-center"
						>
							{user.name[0]}
						</div>
					</Avatar>
				)}
			</div>
		</AppBar>
	);
};
