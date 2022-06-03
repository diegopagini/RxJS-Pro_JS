/** @format */
import { fromEvent } from 'rxjs';
import { map, takeWhile } from 'rxjs/operators';

import { displayLog } from './utils';

export default () => {
	/** start coding */
	const grid = document.getElementById('grid');
	const click$ = fromEvent(grid, 'click').pipe(
		map((val) => [Math.floor(val.offsetX / 50), Math.floor(val.offsetY / 50)]),
		// first((val) => val[0] >= 3)
		// take(4)
		takeWhile(([col, row]) => col >= 3)
	);

	const subscription = click$.subscribe((data) => displayLog(data));

	/** end coding */
};
