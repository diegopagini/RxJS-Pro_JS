/** @format */
import { of, range } from 'rxjs';

import { displayLog } from './utils';

export default () => {
	/** start coding */
	const sourse = of(1, 2, 3, 4, 5, 6);
	const sourse2 = of([1, 2, 3, 4], 'Hello World!', { foo: 'bar' }, () => {
		return 'Hi';
	});
	const sourse3 = range(3, 10);
	const subscription = sourse3.subscribe((data) => displayLog(data));
	/** end coding */
};
