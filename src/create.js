/** @format */
import { interval, timer } from 'rxjs';

import { displayLog } from './utils';

export default () => {
	/** start coding */
	const source = interval(500);
	const subscription = source.subscribe((data) => displayLog(data));

	timer(3000).subscribe(() => subscription.unsubscribe());

	const source2 = timer(4000, 100); // primer parametro es el retraso
	const subscription2 = source2.subscribe((data) => displayLog(`2 - ${data}`));

	timer(6000).subscribe(() => subscription2.unsubscribe());

	/** end coding */
};
