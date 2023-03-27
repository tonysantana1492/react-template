import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { open as openSidebar, close as closeSidebar, toggle as toggleSidebar } from 'store';

export const useSidebar = () => {
	const { isOpen } = useSelector(state => state.sidebarReducer);
	const dispatch = useDispatch();

	const open = useCallback(() => dispatch(openSidebar()), [dispatch]);
	const close = useCallback(() => dispatch(closeSidebar()), [dispatch]);
	const toggle = useCallback(() => dispatch(toggleSidebar()), [dispatch]);

	return { isOpen, open, close, toggle };
};
