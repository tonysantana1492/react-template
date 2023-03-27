import { Helmet } from 'react-helmet-async';

export const Head = ({ title = '', description = '', imageFullUrl = '' }) => {
	return (
		<Helmet title={title ? `${title} | Template React` : undefined} defaultTitle="App">
			<meta name="description" content={description} />
			<meta name="og:title" content={title} />
			<meta name="og:description" content={description} />
			{imageFullUrl && <meta name="og:image" content={imageFullUrl} />}
		</Helmet>
	);
};
