import { Pie } from 'react-chartjs-2';

const PieChart = ({ data }) => {
	/* 
    data: An Array of two numbers 
    [no. of people vaccinated, no. of people not vaccinated]
  */
	const options = {
		labels: ['Vaccinated', 'Not Vaccinated'],
		datasets: [
			{
				label: 'My First Dataset',
				data: data,
				backgroundColor: ['rgb(44, 178, 231)', 'rgb(54, 117, 235)'],
				hoverOffset: 4,
			},
		],
		height: '40%',
	};
	return <Pie data={options} />;
};

export default PieChart;
