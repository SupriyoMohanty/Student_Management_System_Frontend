import React from 'react';
import { PieChart } from '@mui/x-charts/PieChart';

const PieChartComponent = ({ students }) => {
  const totalMaths = students.reduce((total, student) => total + student.maths, 0);
  const totalScience = students.reduce((total, student) => total + student.science, 0);
  const totalSocialScience = students.reduce((total, student) => total + student.social_science, 0);

  const totalMarks = students.reduce(
    (total, student) => total + student.maths + student.science + student.social_science,
    0
  );

  const percentageMaths = ((totalMaths / totalMarks) * 100).toFixed(0);
  const percentageScience = ((totalScience / totalMarks) * 100).toFixed(0);
  const percentageSocialScience = ((totalSocialScience / totalMarks) * 100).toFixed(0);

  const data = [
    { id: 0, value: parseFloat(percentageMaths), label: "Maths",  },
    { id:1, value: parseFloat(percentageScience), label: "Science" },
    { id:2, value: parseFloat(percentageSocialScience), label: "Social_Science" },
  ];


  return (
    <PieChart
      series={[
        {
          outerRadius: 90,
          data,
          highlightScope: { faded: 'global', highlighted: 'item' },
          faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
        },
      ]}
      width={500}
      height={200}
    />
  );
};

export default PieChartComponent;
