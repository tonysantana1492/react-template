import { createTheme, StyledEngineProvider } from '@mui/material/styles';
import { red } from '@mui/material/colors';
import { CssBaseline, ThemeProvider } from '@mui/material';

import { fuseDark, skyBlue } from './colors';

const lightText = {
	primary: 'rgb(17, 24, 39)',
	secondary: 'rgb(107, 114, 128)',
	disabled: 'rgb(149, 156, 169)',
};

const rootElement = () => document.getElementById('root');

const theme = createTheme({
	palette: {
		type: 'light',
		text: lightText,
		common: {
			black: 'rgb(17, 24, 39)',
			white: 'rgb(255, 255, 255)',
		},
		primary: fuseDark,
		secondary: {
			light: skyBlue[100],
			main: skyBlue[500],
			dark: skyBlue[900],
		},
		background: {
			paper: '#FFFFFF',
			default: '#f6f7f9',
		},
		error: red,
		test: {
			main: 'red',
		},
	},
	status: {
		danger: 'orange',
	},
	typography: {
		fontFamily: ['Poppins', 'Roboto', '"Helvetica"', 'Arial', 'sans-serif'].join(','),
		fontWeightLight: 300,
		fontWeightRegular: 400,
		fontWeightMedium: 500,
		useNextVariants: true,
		suppressDeprecationWarnings: true,
		htmlFontSize: 10,
		fontSize: 13,
		body1: {
			fontSize: '1.3rem',
		},
		body2: {
			fontSize: '1.3rem',
		},
	},

	components: {
		MuiButton: {
			styleOverrides: {
				root: {
					textTransform: 'none',
					borderRadius: '18px',
					color: 'white',
				},
				sizeSmall: {
					borderRadius: '15px',
				},
				sizeLarge: {
					borderRadius: '21px',
				},
				contained: {
					boxShadow: 'none',
					'&:hover, &:focus': {
						boxShadow: 'none',
					},
				},
			},
			variants: [
				{
					props: { variant: 'no', color: 'primary' },
					style: {
						'& > *': {
							color: skyBlue[500],
							backgroundColor: fuseDark[500],
						},
						'&:hover, &:focus': {
							backgroundColor: 'black',
						},
						'&:disabled': {
							color: 'black',
							backgroundColor: 'gray',
						},
					},
				},
			],
		},

		MuiTab: {
			styleOverrides: {
				root: {
					textTransform: 'none',
				},
			},
		},
		
		MuiDialog: {
			styleOverrides: {
				paper: {
					borderRadius: 16,
				},
			},
		},
		MuiPaper: {
			styleOverrides: {
				rounded: {
					borderRadius: 16,
				},
			},
		},
		MuiDrawer: {
			defaultProps: {
				container: rootElement,
			},
		},
		MuiSwipeableDrawer: {
			defaultProps: {
				container: rootElement,
			},
		},
		MuiPopover: {
			styleOverrides: {
				paper: {
					borderRadius: 8,
				},
			},
		},
		MuiFilledInput: {
			styleOverrides: {
				root: {
					borderRadius: 4,
					'&:before, &:after': {
						display: 'none',
					},
				},
			},
		},
	},
});

export const AppThemeProvider = ({ children }) => {
	return (
		<StyledEngineProvider>
			<ThemeProvider theme={theme}>
				<CssBaseline />
				{children}
			</ThemeProvider>
		</StyledEngineProvider>
	);
};
