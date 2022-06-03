/** @format */
import { fromEvent } from 'rxjs';
import { filter, map } from 'rxjs/operators';

import { displayLog } from './utils';

export default () => {
	/** start coding */
	const grid = document.getElementById('grid');
	const click$ = fromEvent(grid, 'click');

	const subscription = click$
		.pipe(
			map((val) => [
				Math.floor(val.offsetX / 50),
				Math.floor(val.offsetY / 50),
			]),
			filter((val) => (val[0] + val[1]) % 2 != 0)
		)
		.subscribe((data) => displayLog(data));

	/** end coding */
};
