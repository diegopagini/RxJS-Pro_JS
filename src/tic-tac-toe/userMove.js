/** @format */
import { fromEvent } from 'rxjs';
import { map } from 'rxjs/operators';

import { canvas, CELL_SIZE } from './draw';

const click$ = fromEvent(canvas, 'click').pipe(
	map((val) => {
		({
			x: Math.floor(val.offsetX / CELL_SIZE),
			y: Math.floor(val.offsetY / CELL_SIZE),
		});
	})
);

export const userMove$ = click$.pipe();
