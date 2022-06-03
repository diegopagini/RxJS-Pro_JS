/** @format */
import { fromEvent } from 'rxjs';
import { endWith, map, startWith, takeWhile, tap } from 'rxjs/operators';

import { displayLog } from './utils';

export default () => {
	/** start coding */
	const grid = document.getElementById('grid');
	const click$ = fromEvent(grid, 'click').pipe(
		map((val) => [Math.floor(val.offsetX / 50), Math.floor(val.offsetY / 50)]),
		takeWhile(([col, row]) => col != 0),
		tap((val) => console.log(`cell: [${val}]`)),
		startWith('grid dimensions: ', '10x10'), // Lo agrega al comienzo
		endWith('game finished', 'bye!') // Lo agrega al final.
	);

	const subscription = click$.subscribe((data) => displayLog(data));

	/** end coding */
};
