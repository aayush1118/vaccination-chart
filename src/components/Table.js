export default function StyledTable({ dispatch, currentDate, personInfo }) {
	return (
		<div className='table-grid thin-scroll'>
			<div className='head'>
				<p>Name</p>
				<p>Vaccination Date</p>
				<p>Vaccination Status</p>
			</div>
			{personInfo.map((x, i) => {
				return (
					<div key={i}>
						<p>{x.person_name}</p>

						<p>
							{new Date(x.vaccination_date)
								.toDateString()
								.split(' ')
								.slice(1, 4)
								.join(' ')}
						</p>
						{currentDate < x.vaccination_date ? (
							<p className='pending'>Pending</p>
						) : (
							<p className='vaccinated'>Vaccinated</p>
						)}
					</div>
				);
			})}
		</div>
	);
}
