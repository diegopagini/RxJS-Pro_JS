/** @format */
import { interval, timer } from 'rxjs';

import { displayLog } from './utils';

export default () => {
	/** start coding */
	const source = interval(500);
	const subscription = source.subscribe((data) => displayLog(data));

	timer(3000).subscribe(() => subscription.unsubscribe());

	/** end coding */
};
