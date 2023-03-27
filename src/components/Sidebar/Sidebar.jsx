import { AppBar, IconButton } from '@mui/material';
import { MenuOpenOutlined } from '@mui/icons-material';

import { useSidebar } from 'hooks';
import { Logo } from '../Elements/Logo';
import { Drawer } from '../Elements/Drawer';
import { HeaderSidebar } from './HeaderSidebar';
import { ContentSidebar } from '.';

export const Sidebar = () => {
	const { isOpen, close, open } = useSidebar();

	return (
		<Drawer open={isOpen} onClose={close} onOpen={open}>
			<div className="flex flex-col h-full overflow-hidden text-white bg-white">
				<AppBar
					color="primary"
					position="static"
					className="flex flex-row items-center flex-shrink h-48 md:h-64 min-h-48 md:min-h-64 px-12 shadow-0"
				>
					<div className="flex flex-1 mx-8">
						<Logo />
					</div>

					<IconButton className="w-40 h-40 p-0" onClick={close}>
						<MenuOpenOutlined className="text-white" />
					</IconButton>
				</AppBar>
				<HeaderSidebar />
				<ContentSidebar />
			</div>
		</Drawer>
	);
};
