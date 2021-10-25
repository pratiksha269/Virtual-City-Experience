import React from 'react';
import ReactDOM from 'react-dom';

// Components
import App from './App';

// Web vitals
import reportWebVitals from './others/reportWebVitals';

// Stylesheets
import './assets/scss/main.scss';

ReactDOM.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>,
	document.getElementById('root')
);

reportWebVitals();
