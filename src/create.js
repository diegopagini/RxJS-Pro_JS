/** @format */
import { interval, zip } from 'rxjs';

import { displayLog } from './utils';


export default () => {
	/** start coding */

	const src1 = interval(300);
	const src2 = 'Hello World!';
	zip(src1, src2).subscribe((x) => displayLog(x[1]));

	/** end coding */
};
