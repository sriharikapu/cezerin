import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import { BrowserRouter } from 'react-router-dom';
import { initOnClient } from 'theme';
import { DappRequirements } from 'react-dapp-requirements';
import clientSettings from './settings';
import reducers from '../shared/reducers';
import * as analytics from '../shared/analytics';
import App from '../shared/app';
import api from './api';
import Contracts from './contrat-service';

const initialState = window.__APP_STATE__;
const themeText = window.__APP_TEXT__;

initOnClient({
	themeSettings: initialState.app.themeSettings,
	text: themeText,
	language: clientSettings.language,
	api
});

const store = createStore(
	reducers,
	initialState,
	applyMiddleware(thunkMiddleware)
);

const onNetworkReceived = networkId => {
	console.log('Network', networkId);
	Contracts.setNetwork(networkId);
};

ReactDOM.hydrate(
	<Provider store={store}>
		<DappRequirements
			supportedNetworks={Contracts.getSupportedNetworks()}
			onNetworkIdReceived={onNetworkReceived}
		>
			<BrowserRouter>
				<App />
			</BrowserRouter>
		</DappRequirements>
	</Provider>,
	document.getElementById('app')
);

analytics.onPageLoad({ state: initialState });

if ('serviceWorker' in navigator) {
	window.addEventListener('load', () => {
		navigator.serviceWorker
			.register('/sw.js')
			.then(registration => {
				console.log('SW registered.', registration);
			})
			.catch(registrationError => {
				console.log('SW registration failed: ', registrationError);
			});
	});
}
