/** @format */
import { fromEvent } from 'rxjs';
import { debounceTime, map } from 'rxjs/operators';

import { displayLog } from './utils';

export default () => {
	/** start coding */

	const inputBox = document.getElementById('input-box');
	const inputSrc$ = fromEvent(inputBox, 'input').pipe(
		debounceTime(300), // si dejo de escribir durante 300 ms emitirá.
		map((event) => event.target.value)
	);

	inputSrc$.subscribe(displayLog);

	/** end coding */
};
