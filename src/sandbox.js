/** @format */
import { concat, fromEvent } from 'rxjs';
import { endWith, map, mergeMap, tap } from 'rxjs/operators';

import { api } from './api';
import { displayLog } from './utils';

export default () => {
	/** start coding */

	const button = document.getElementById('btn');

	/** get 4 consecutive comments */
	const getComments = () => {
		//get observables from fake REST API.
		const comment1$ = api.getComment(1);
		const comment2$ = api.getComment(2);
		const comment3$ = api.getComment(3);
		const comment4$ = api.getComment(4);

		//subscribe to all the observables to get and display comments
		return concat(comment1$, comment2$, comment3$, comment4$).pipe(
			map(JSON.stringify),
			endWith('--------//--------')
		);
	};

	/** get comments on button click */
	const observable2$ = api.getComment(1).pipe(map(JSON.stringify));

	fromEvent(button, 'click')
		.pipe(
			// map((evt) => observable2$), // emitimos otro observable
			// mergeAll(), // para subscribirce al observable anterior y emitirlo en el primero.
			mergeMap((evt) => getComments()), // Mere map hace lo mismo que map y luego mergeAll
			tap(console.log)
		)
		.subscribe(
			displayLog
			// ❌ subscripciones anidadas
			// const subscription2 = observable2$.subscribe(displayLog);
		);

	/** end coding */
};
