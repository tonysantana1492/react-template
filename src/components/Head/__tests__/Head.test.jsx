import { waitFor } from '@testing-library/react';
import { renderWithProviders } from 'test/testUtils';
import { Head } from '../Head';

test('should add proper page title and meta description', async () => {
	const title = 'Hello World';
	const titleSuffix = ' | Template React';
	const description = 'This is a description';

	renderWithProviders(<Head title={title} description={description} />);

	await waitFor(() => expect(document.title).toEqual(title + titleSuffix));
});
