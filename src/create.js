/** @format */
import { of } from 'rxjs';

import { displayLog } from './utils';

export default () => {
	/** start coding */
	const sourse = of(1, 2, 3, 4, 5, 6);
	const sourse2 = of([1, 2, 3, 4], 'Hello World!', { foo: 'bar' }, () => {
		return 'Hi';
	});
	const subscription = sourse2.subscribe((data) => displayLog(data));
	/** end coding */
};
