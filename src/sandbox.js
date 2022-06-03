/** @format */
import { fromEvent } from 'rxjs';
import { map, takeLast, takeWhile, tap } from 'rxjs/operators';

import { displayLog } from './utils';

export default () => {
	/** start coding */
	const grid = document.getElementById('grid');
	const click$ = fromEvent(grid, 'click').pipe(
		map((val) => [Math.floor(val.offsetX / 50), Math.floor(val.offsetY / 50)]),
		takeWhile(([col, row]) => col > 3),
		tap((val) => console.log(`valid in takeWhile: ${val}`)),
		takeLast(3)
	);

	const subscription = click$.subscribe((data) => displayLog(data));

	/** end coding */
};
