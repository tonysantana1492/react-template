import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
	isOpen: false
};

const sidebarSlice = createSlice({
	name: 'sidebar',
	initialState,
	reducers: {
		open: (state, action) => {
			state.isOpen = true;
		},
		close: (state, action) => {
			state.isOpen = false;
		},	
		toggle: (state, action) => {
			state.isOpen = !state.isOpen;
		}	
	},
});

export const { open, close, toggle } = sidebarSlice.actions;

export const sidebarReducer = sidebarSlice.reducer;