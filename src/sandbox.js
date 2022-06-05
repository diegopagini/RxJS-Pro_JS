/** @format */
import { fromEvent } from 'rxjs';
import { map, scan, switchMap, tap } from 'rxjs/operators';

import { api } from './api';
import { displayLog } from './utils';

export default () => {
	/** start coding */

	const button = document.getElementById('btn');

	/** get comments on button click */
	fromEvent(button, 'click')
		.pipe(
			scan((acc, evt) => acc + 1, 0), // como reduce
			switchMap((id) => api.getComment(id)), // llamo a otro obs con el valor del primero aplanandolo
			map(JSON.stringify), // convierto a string
			tap(console.log) // muestro por consola
		)
		.subscribe(displayLog);
};
