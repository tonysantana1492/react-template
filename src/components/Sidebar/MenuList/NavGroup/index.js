import { List, Typography } from '@mui/material';

import NavItem from '../NavItem';
import NavCollapse from '../NavCollapse';
import { Box } from '@mui/system';

const NavGroup = ({ item }) => {
	
	const items = item.children?.map(menu => {
		switch (menu.type) {
			case 'collapse':
				return <NavCollapse key={menu.id} menu={menu} level={1} />;
			case 'item':
				return <NavItem key={menu.id} item={menu} level={1} />;
			default:
				return (
					<Typography key={menu.id} variant="h6" color="error" align="center">
						Menu Items Error
					</Typography>
				);
		}
	});

	return (
		<>
			<List
				component="nav" aria-labelledby="nested-list-subheader" className="navigation whitespace-nowrap px-8"
				subheader={
					item.title && (
						<Typography variant="caption" color="primary">
							{item.title}
							{item.caption && (
								<Typography variant="caption" color="primary">
									{item.caption}
								</Typography>
							)}
						</Typography>
					)
				}
			>
				{items}
			</List>

			<Box sx={{ mt: 0.25, mb: 1.25 }}></Box>
		</>
	);
};

export default NavGroup;
