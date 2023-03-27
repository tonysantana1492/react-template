import { Drawer as DrawerMUI } from "@mui/material";

export const Drawer = ({ children, open, onClose }) => {
	return (
		<DrawerMUI
			anchor="left"
			variant="temporary"
			open={open}			
			sx={{ backdropFilter: 'blur(4px)' }}
			onClose={onClose}
			ModalProps={{
				keepMounted: true, // Better open performance on mobile.
			}}
		>
			{children}
		</DrawerMUI>
	);
};
