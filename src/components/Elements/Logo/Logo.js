import { Typography } from '@mui/material';

export const Logo = () => {

	return (
		<div className='flex items-center flex-row'>
			<img className="logo-icon w-24 h-24" src="assets/logos/firebase.svg" alt="logo" />
			<Typography className="text-16 leading-none mx-12 font-medium logo-text" color="inherit">
				TEMPLATE
			</Typography>
			<div className=' bg-black text-white react-badge flex items-center py-4 px-8 rounded'>
				<img
					className="react-logo"
					src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9Ii0xMS41IC0xMC4yMzE3NCAyMyAyMC40NjM0OCI+CiAgPHRpdGxlPlJlYWN0IExvZ288L3RpdGxlPgogIDxjaXJjbGUgY3g9IjAiIGN5PSIwIiByPSIyLjA1IiBmaWxsPSIjNjFkYWZiIi8+CiAgPGcgc3Ryb2tlPSIjNjFkYWZiIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiPgogICAgPGVsbGlwc2Ugcng9IjExIiByeT0iNC4yIi8+CiAgICA8ZWxsaXBzZSByeD0iMTEiIHJ5PSI0LjIiIHRyYW5zZm9ybT0icm90YXRlKDYwKSIvPgogICAgPGVsbGlwc2Ugcng9IjExIiByeT0iNC4yIiB0cmFuc2Zvcm09InJvdGF0ZSgxMjApIi8+CiAgPC9nPgo8L3N2Zz4K"
					alt="react"
					width="16"
				/>
				<span className="react-text text-12 mx-4">React</span>
			</div>
		</div>
	);
};
