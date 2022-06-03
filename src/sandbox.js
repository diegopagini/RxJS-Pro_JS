/** @format */
import { BehaviorSubject, fromEvent } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { updateDisplay } from './utils';

export default () => {
	/** start coding */

	const progressBar = document.getElementById('progress-bar');
	const docElement = document.documentElement;

	//function to update progress bar width on view
	const updateProgressBar = (percentage) => {
		progressBar.style.width = `${percentage}%`;
	};

	//observable that returns scroll (from top) on scroll events
	const scroll$ = fromEvent(document, 'scroll').pipe(
		map(() => docElement.scrollTop),
		tap((evt) => console.log('[scroll]: ', evt))
	);

	//observable that returns the amount of page scroll progress
	const scrollProgress$ = scroll$.pipe(
		map((evt) => {
			const docHeight = docElement.scrollHeight - docElement.clientHeight;
			return (evt / docHeight) * 100;
		})
		// share() sin share se convierte en un cold observable
	);

	const scrollProgressHot$ = new BehaviorSubject(0); // Ahora Subject gestiona todas las subscripciones. Actuando como una única instancia.

	scrollProgress$.subscribe(scrollProgressHot$);

	//subscribe to scroll progress to paint a progress bar
	const subscription = scrollProgressHot$.subscribe(updateProgressBar);

	//subscribe to display scroll progress percentage
	const subscription2 = scrollProgressHot$.subscribe((val) =>
		updateDisplay(`${Math.floor(val)} %`)
	);

	console.log('Scroll initial state: ', scrollProgressHot$.value);

	/** end coding */
};
