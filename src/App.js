import './styles.css';
import PieChart from './components/PieChart';
import StyledTable from './components/Table';
import Buttons from './components/Buttons';
import React, { useReducer, useState, useEffect } from 'react';
import axios from 'axios';

// fetch the current date using axios and convert it into date object
const fetchDate = async () => {
	try {
		const res = await axios.get('/data/current_date.json');
		let date = res.data.current_date;
		date = date.split('-');
		let newDate = new Date(date[0], date[1] - 1, date[2]);
		return newDate;
	} catch (err) {
		console.error(err);
	}
};
// fetch the list of people using axios
const fetchPeople = async () => {
	try {
		const res = await axios.get('/data/vaccine_dates.json');
		res.data.map(x => {
			let date = x.vaccination_date;
			date = date.split('-');
			let newDate = new Date(date[0], date[1] - 1, date[2]);
			x.vaccination_date = newDate.getTime();
			return x;
		});
		return res.data;
	} catch (err) {
		console.error(err);
	}
};
//set actions constant to avoid typos
export const ACTIONS = {
	SET: 'set',
	INCREMENT: 'increment',
	DECREMENT: 'decrement',
};
//reducer functions for each actions
const reducer = (state, action) => {
	let updatedDate = new Date(state.currentDate);
	switch (action.type) {
		case ACTIONS.SET:
			return { ...state, ...action.payload };

		case ACTIONS.INCREMENT:
			return {
				...state,
				currentDate: updatedDate.setDate(updatedDate.getDate() + 1),
			};

		case ACTIONS.DECREMENT:
			return {
				...state,
				currentDate: updatedDate.setDate(updatedDate.getDate() - 1),
			};

		default:
			return state;
	}
};

export default function App() {
	// load current date from fetched data at mount
	useEffect(() => {
		fetchDate().then(res => {
			dispatch({
				type: ACTIONS.SET,
				payload: { currentDate: res.getTime() },
			});
		});
		fetchPeople().then(res => {
			dispatch({
				type: ACTIONS.SET,
				payload: { personInfo: res },
			});
		});
	}, []);
	const [state, dispatch] = useReducer(reducer, {
		currentDate: '',
		personInfo: [],
		ratio: [],
	});

	useEffect(() => {
		let ratio = state.personInfo.reduce(
			(arr, curr) => {
				if (state.currentDate < curr.vaccination_date) {
					arr[1]++;
				} else {
					arr[0]++;
				}
				return arr;
			},
			[0, 0]
		);
		dispatch({
			type: ACTIONS.SET,
			payload: { ratio },
		});
	}, [state.currentDate, state.personInfo]);

	return (
		<div className='App'>
			<div className='chart'>
				<PieChart data={state.ratio} />
			</div>
			<div className='buttons'>
				<Buttons dispatch={dispatch} currentDate={state.currentDate} />
			</div>
			{/* display the ratio using state */}
			<b style={{ textAlign: 'center' }}>
				{`${state.ratio[0]} out of ${
					state.ratio[0] + state.ratio[1]
				} persons have been vaccinated.`}
			</b>

			<div className='table'>
				<StyledTable
					dispatch={dispatch}
					personInfo={state.personInfo}
					currentDate={state.currentDate}
				/>
			</div>
		</div>
	);
}
