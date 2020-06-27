import React from 'react';
import s from './Spinner.module.scss';

const Spinner = () => (
	<div className={s['spinner-container']}>
		<div className={s['lds-ripple']}>
			<div></div>
			<div></div>
		</div>
	</div>
);

export default Spinner;
