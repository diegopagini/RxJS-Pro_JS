/** @format */
import { fromEvent } from 'rxjs';
import { catchError, concatMap, map, scan, tap } from 'rxjs/operators';

import { api } from './api';
import { displayLog } from './utils';

export default () => {
	/** start coding */

	const button = document.getElementById('btn');

	/** get comments on button click */
	fromEvent(button, 'click')
		.pipe(
			scan((acc, evt) => acc + 1, 0),
			concatMap((id) =>
				api.getComment(id).pipe(
					catchError((err, src$) => {
						console.log('catch!');
						return src$; // El segundo parámetro del catchError devuelve el primer obsevable.
					})
				)
			),
			map(JSON.stringify),
			tap(console.log)
		)
		.subscribe(displayLog);

	/** end coding */
};
