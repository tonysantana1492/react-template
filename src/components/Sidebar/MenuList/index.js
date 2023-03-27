import { Key } from '@mui/icons-material';
import { Typography } from '@mui/material';

import NavGroup from './NavGroup';

const menuItem = {
	items: [
		{
			id: 'dashboard',
			title: 'Dashboard',
			type: 'group',
			children: [
				{
					id: 'default',
					title: 'Dashboard',
					type: 'item',
					url: '/dashboard/default',
					// icon: Dashboard,
				},
			],
		},
        {
            id: 'pages',
            title: 'Pages',
            caption: 'Pages Caption',
            type: 'group',
            children: [
                {
                    id: 'authentication',
                    title: 'Authentication',
                    type: 'collapse',
                    icon: Key,
        
                    children: [
                        {
                            id: 'login3',
                            title: 'Login',
                            type: 'item',
                            url: '/pages/login/login3',
                            target: true
                        },
                        {
                            id: 'register3',
                            title: 'Register',
                            type: 'item',
                            url: '/pages/register/register3',
                            target: true
                        }
                    ]
                }
            ]
        }
	],
};

const MenuList = () => {
	const navItems = menuItem.items.map(item => {
		switch (item.type) {
			case 'group':
				return <NavGroup key={item.id} item={item} className=' text-red' />;
			default:
				return (
					<Typography key={item.id} variant="h6" color="error" align="center">
						Menu Items Error
					</Typography>
				);
		}
	});

	return <>{navItems}</>;
};

export default MenuList;
