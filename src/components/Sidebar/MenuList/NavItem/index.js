import { forwardRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { useTheme } from '@mui/material';
import { Avatar, Chip, ListItemButton, ListItemIcon, ListItemText, Typography } from '@mui/material';
import { FiberManualRecord } from '@mui/icons-material';
import { menuOpen } from 'store';

const NavItem = ({ item, level }) => {
	const theme = useTheme();
	const customization = useSelector(state => state.customizationReducer);
	const dispatch = useDispatch();

	const Icon = item.icon;
	const itemIcon = item?.icon ? (
		<Icon />
	) : (
		<FiberManualRecord
			sx={{
				color: 'transparent',
			}}
		/>
	);

	let itemTarget = '_self';
	if (item.target) {
		itemTarget = '_blank';
	}

	let listItemProps = {
		component: forwardRef((props, ref) => <Link ref={ref} {...props} to={item.url} target={itemTarget} />),
	};
	if (item?.external) {
		listItemProps = { component: 'a', href: item.url, target: itemTarget };
	}

	useEffect(() => {
		const currentIndex = document.location.pathname
			.toString()
			.split('/')
			.findIndex(id => id === item.id);
		if (currentIndex > -1) {
			dispatch(menuOpen(item.id));
		}
		// eslint-disable-next-line
	}, []);

	return (
		<ListItemButton
			component="div"
			id="nested-list-subheader"
			{...listItemProps}
			disabled={item.disabled}
			selected={customization.isOpen.findIndex(id => id === item.id) > -1}
			onClick={() => {}}
		>
			<ListItemIcon>{itemIcon}</ListItemIcon>
			<ListItemText
				primary={<Typography color="primary">{item.title}</Typography>}
				secondary={
					item.caption && (
						<Typography variant="caption" color="secondary">
							{item.caption}
						</Typography>
					)
				}
			/>
			{item.chip && (
				<Chip
					color={item.chip.color}
					variant={item.chip.variant}
					size={item.chip.size}
					label={item.chip.label}
					avatar={item.chip.avatar && <Avatar>{item.chip.avatar}</Avatar>}
				/>
			)}
		</ListItemButton>
	);
};

export default NavItem;
