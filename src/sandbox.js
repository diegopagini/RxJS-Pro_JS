/** @format */
import { fromEvent } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { displayLog } from './utils';


export default () => {
	/** start coding */
	const grid = document.getElementById('grid');
	const click$ = fromEvent(grid, 'click').pipe(
		tap((evt) => console.log(evt)),
		map((val) => [Math.floor(val.offsetX / 50), Math.floor(val.offsetY / 50)])
	);

	const subscription = click$.subscribe((data) => displayLog(data));

	/** end coding */
};
