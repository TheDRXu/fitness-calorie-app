import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Chart.js Bar Chart',
    },
  },
};

const userId = localStorage.getItem("user_id");
const response = await fetch(
	`http://localhost:5000/users/total-calories/${userId}/7/2023-12-22`
);
const userData = await response.json();
const caloriesArray = userData.map((item) => item.entries.map((entry) => entry.totalCalories));
const dateArray = userData.map((item) => item.entries.map((entry) => entry.date));

const accumulatedData = dateArray
  .flat()
  .reduce((acc, date, index) => {
    // Check for existing entry with same date
    const existingEntry = acc.find((entry) => entry.date === date);
    if (existingEntry) {
      // If found, update the existing entry's totalCalories
      existingEntry.totalCalories += caloriesArray.flat()[index];
    } else {
      // Otherwise, create a new entry
      acc.push({ date, totalCalories: caloriesArray.flat()[index] });
    }
    return acc;
  }, []);
const totalCaloriesArray = accumulatedData.map((entry) => entry.totalCalories);
const dateArray2 = accumulatedData.map((entry) => {
	const formattedDate = entry.date.slice(5, 10); // Extract month and day
	return formattedDate;
});

const reversedTotalCalories = totalCaloriesArray.reverse();

const reversedDateArray2 = dateArray2.reverse();
  
console.log(accumulatedData);


const labels = dateArray2;

const data = {
  labels,
  datasets: [
    {
      label: 'Dataset 1',
      data: reversedTotalCalories,
      backgroundColor: [
		'rgb(255, 99, 132)',
		'rgb(54, 162, 235)',
		'rgb(255, 205, 86)'
	  ],
    },

  ],
};

function App() {
  return <Bar options={options} data={data} />;
}

export default App;
