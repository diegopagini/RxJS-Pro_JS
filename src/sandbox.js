/** @format */
import { fromEvent } from 'rxjs';
import { map, reduce, takeWhile, tap } from 'rxjs/operators';

import { displayLog } from './utils';

export default () => {
	/** start coding */
	const grid = document.getElementById('grid');
	const click$ = fromEvent(grid, 'click').pipe(
		map((val) => [Math.floor(val.offsetX / 50), Math.floor(val.offsetY / 50)]),
		takeWhile(([col, row]) => col != 0),
		tap((val) => console.log(`cell: [${val}]`)),
		reduce(
			(acc, current) => {
				return {
					clicks: acc.clicks + 1,
					cells: [...acc.cells, current],
				};
			},
			{ clicks: 0, cells: [] }
		)
	);

	const subscription = click$.subscribe((data) =>
		displayLog(`${data.clicks} clicks: ${JSON.stringify(data.cells)}`)
	);

	/** end coding */
};
