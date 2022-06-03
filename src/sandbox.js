/** @format */
import { fromEvent } from 'rxjs';
import { distinctUntilChanged, map, takeWhile, tap } from 'rxjs/operators';

import { displayLog } from './utils';

export default () => {
	/** start coding */
	const grid = document.getElementById('grid');
	const click$ = fromEvent(grid, 'click').pipe(
		map((val) => [Math.floor(val.offsetX / 50), Math.floor(val.offsetY / 50)]),
		takeWhile(([col, row]) => col != 0),
		tap((val) => console.log(`cell: [${val}]`)),
		// map(([col, row]) => col + row),
		// tap((val) => console.log('sum of col + row is:', val)),
		// distinct() // solo dejara pasar valores que no se hayan emitido antes
		distinctUntilChanged(
			(cell1, cell2) => cell1[0] === cell2[0] && cell1[1] === cell2[1]
		) // Bloquea el evento que sera igual consecutivo
	);

	const subscription = click$.subscribe((data) => displayLog(data));

	/** end coding */
};
