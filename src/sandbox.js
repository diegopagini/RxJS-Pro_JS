/** @format */
import { concat, fromEvent } from 'rxjs';
import { endWith, map } from 'rxjs/operators';

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
		concat(comment1$, comment2$, comment3$, comment4$) // contat para traer todos los observables en orden
			// solo cuando se complete el primer obsevable llamara al siguiente
			// por otro lado forkJoin esperara a que todos se completen y los devolverá en un array.
			.pipe(
				map(({ id, comment }) => `#${id} - ${comment}`),
				endWith('--------//--------')
			)
			.subscribe((data) => {
				displayLog(data);
			});
	};

	/** get comments on button click */
	fromEvent(button, 'click').subscribe(getComments);

	/** end coding */
};
