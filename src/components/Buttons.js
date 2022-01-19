// import { useState } from 'react';
import { ACTIONS } from '../App';

export default function ({ currentDate, dispatch }) {
	// const [selectedButton, setSelectedButton] = useState(null);

	return (
		<>
			<button onClick={() => dispatch({ type: ACTIONS.INCREMENT })}>
				+
			</button>
			<p> {new Date(currentDate).toDateString()} </p>
			<button onClick={() => dispatch({ type: ACTIONS.DECREMENT })}>
				-
			</button>
		</>
	);
}
