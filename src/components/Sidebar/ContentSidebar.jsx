import { useEffect, useState } from 'react';

import { Dashboard, Drafts, Send } from '@mui/icons-material';
import { Chip, List, ListItemButton, ListItemIcon, ListItemText, ListSubheader } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import { useSidebar } from 'hooks';

export const NAVIGATION = [
	{
		id: 'application',
		type: ListSubheader,
		text: 'APPLICATION',
	},
	{
		id: 'dashboard',
		type: ListItemButton,
		icon: Dashboard,
		text: 'Dashboard',
		url: '/app',
	},
	{
		id: 'mail',
		type: ListItemButton,
		icon: Send,
		text: 'Sent mail',
		url: '/app/mail',
	},
	{
		id: 'drafts',
		type: ListItemButton,
		icon: Drafts,
		text: 'Drafts',
		chip: {
			text: 25,
			color: 'green',
			avatar: 'Tony'
		},
		url: '/mail',
	},
];

export const ContentSidebar = () => {
	const { close } = useSidebar();
	const navigate = useNavigate();

	const navigateTo = url => {
		close();
		navigate(url);
	};

	const [selectedIndex, setSelectedIndex] = useState(1);

	const handleListItemClick = (event, index) => {
		setSelectedIndex(index);
	};

	useEffect(() => {
		const pathId = document.location.pathname.toString().split('/').at(-1);

		const NAVIGATIONIndex = NAVIGATION.findIndex(({ id }) => id === pathId);

		if (NAVIGATIONIndex > -1) {
			setSelectedIndex(NAVIGATIONIndex);
		}
		// eslint-disable-next-line
	}, []);

	return (
		<List component="nav" aria-labelledby="nested-list-subheader" className="NAVIGATION whitespace-nowrap px-8">
			{NAVIGATION.map((item, index) => {
				if (item.type.render.name === 'ListSubheader') {
					return (
						<item.type key={item.text} component="div" id="nested-list-subheader">
							{item.text}
						</item.type>
					);
				}

				return (
					<item.type
						key={item.text}
						selected={selectedIndex === index}
						onClick={event => {
							handleListItemClick(event, index);
							navigateTo(item.url);
						}}
					>
						<ListItemIcon>
							<item.icon />
						</ListItemIcon>
						<ListItemText secondary={item.text} />
						{item.chip && (
							<Chip
								sx={{color: 'white', backgroundColor: item.chip.color}}
								variant="filled"
								size="small"
								label={item.chip.text}
								// avatar={item.chip.avatar && <Avatar>{item.chip.avatar}</Avatar>}
							/>
						)}
					</item.type>
				);
			})}
		</List>
	);
};
