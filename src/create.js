/** @format */
import { fromEvent } from 'rxjs';

import { displayLog } from './utils';

export default () => {
	/** start coding */
	const actionBtn = document.getElementById('action-btn');
	const source = fromEvent(actionBtn, 'click');

	source.subscribe((evt) =>
		displayLog(`click event at pos (${evt.x}, ${evt.y})`)
	);

	fromEvent(document, 'mousemove').subscribe((evt) => {
		console.log(evt);
	});

	/** end coding */
};
