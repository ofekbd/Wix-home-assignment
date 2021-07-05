import * as React from 'react';
import './App.scss';
import {createApiClient} from './api';
import { TicketsComponent } from './components/Tickets';

export type AppState = {
}


export const api = createApiClient();


export class App extends React.PureComponent<{}, AppState> {

	render() {
		return (
			<main>
				<h1>Tickets List</h1>
				<TicketsComponent/>
			</main>
		);
	}
}

export default App;