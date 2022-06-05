/** @format */
import { combineLatest, fromEvent } from 'rxjs';
import { debounceTime, map, withLatestFrom } from 'rxjs/operators';

import { displayLog } from './utils';

export default () => {
	/** start coding */

	/** get the form element */
	const form = document.getElementById('form');

	/** get observables from each form element */
	const formName$ = fromEvent(form.name, 'input').pipe(
		debounceTime(400),
		map((evt) => evt.target.value)
	);
	const formEmail$ = fromEvent(form.email, 'input').pipe(
		debounceTime(400),
		map((evt) => evt.target.value)
	);
	const formNumber$ = fromEvent(form.phone, 'input').pipe(
		debounceTime(400),
		map((evt) => evt.target.value)
	);
	const submitButton$ = fromEvent(form.btn, 'click');

	const formData$ = combineLatest([formName$, formEmail$, formNumber$]); // emitira el ultimo valor de cada observable.

	const formData2$ = submitButton$.pipe(
		withLatestFrom(formName$, formEmail$, formNumber$), // Solo emitirá el ultimo valor.
		map((data) => {
			const [click, ...formData] = data;
			return formData;
		})
	);

	formData2$.subscribe(displayLog);

	/** end coding */
};
