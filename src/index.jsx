import './styles/tailwind.css';

import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';
import reportWebVitals from './reportWebVitals';
import * as serviceWorker from './serviceWorker';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>,
);

reportWebVitals();

// If you want your app to work offline and load faster, you can change
// unregister() to register() below
serviceWorker.unregister();
