import React from 'react';

import { Box, darken, useTheme } from '@mui/material';
import { CardContent, Typography, Card } from '@mui/material';
import { motion } from 'framer-motion';

import { Link } from 'components/Elements';
import { Head } from 'components/Head';
import { MotionLayout } from 'components/Layout';

export const Layout = ({ children, title, linkName, linkUrl, linkAsk }) => {
	const theme = useTheme();

	return (
		<>
			<Head title={title} />
			<Box
				sx={{
					background: `linear-gradient(to right, ${theme.palette.primary.dark} 0%, ${darken(
						theme.palette.primary.dark,
						0.5,
					)} 100%)`,
					color: theme.palette.primary.contrastText,
				}}
				className="h-screen flex flex-col flex-auto items-center justify-center flex-shrink-0 p-16 md:p-24"
			>
				<MotionLayout>
					<Card
						className={'h-full flex flex-col w-full max-w-sm items-center justify-center shadow-0'}
						square
					>
						<CardContent className="h-full flex flex-col items-center justify-center w-full py-10 max-w-320">
							<motion.div
								initial={{ opacity: 0 }}
								animate={{ opacity: 1, transition: { delay: 0.2 } }}
								className="mb-32"
							>
								<div className="h-full flex items-center mb-48">
									<img className="logo-icon w-48" src="assets/logos/firebase.svg" alt="logo" />
									<div className="border-l-1 mr-4 w-1 h-40" />
									<div>
										<Typography className="text-24 font-semibold logo-text" color="inherit">
											TEMPLATE
										</Typography>
										<Typography
											className="text-16 tracking-widest -mt-8 font-700"
											color="textSecondary"
										>
											REACT
										</Typography>
									</div>
								</div>
							</motion.div>
							<div className="w-full">{children}</div>
						</CardContent>

						<div className="flex flex-col items-center justify-center pb-32">
							<div>
								<span className="font-normal mr-8">{linkAsk}</span>
								<Link color="primary" className="font-normal" to={linkUrl}>
									{linkName}
								</Link>
							</div>
							<Link className="font-normal mt-8" to="/">
								Back to Dashboard
							</Link>
						</div>
					</Card>

					<Box
						sx={{
							background: `linear-gradient(to right, ${theme.palette.primary.dark} 0%, ${darken(
								theme.palette.primary.dark,
								0.5,
							)} 100%)`,
							color: theme.palette.primary.contrastText,
						}}
						className="hidden md:flex flex-1 items-center justify-center p-64"
					>
						<div className="max-w-320">
							<motion.div
								initial={{ opacity: 0, y: 40 }}
								animate={{ opacity: 1, y: 0, transition: { delay: 0.2 } }}
							>
								<Typography variant="h3" color="inherit" className="font-semibold leading-tight">
									Welcome <br />
									to <br /> My Proyect React!
								</Typography>
							</motion.div>

							<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { delay: 0.3 } }}>
								<Typography variant="subtitle1" color="inherit" className="mt-32">
									Powerful and professional admin template for Web Applications.
								</Typography>
							</motion.div>
						</div>
					</Box>
				</MotionLayout>
			</Box>
		</>
	);
};
