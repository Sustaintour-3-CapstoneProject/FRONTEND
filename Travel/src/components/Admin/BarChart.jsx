import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import axiosInstance from '../../api/axiosInstance'; // Adjust the import path accordingly

const SingleBarChart = () => {
  const [chartOptions, setChartOptions] = useState({
    chart: {
      type: 'bar',
      height: 300,
      toolbar: {
        show: false,
      },
      zoom: {
        enabled: false,
      },
    },
    series: [
      {
        name: 'User ',
        data: [], // Start with empty data
      },
    ],
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '16px',
        borderRadius: 0,
      },
    },
    legend: {
      show: false,
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 8,
      colors: ['transparent'],
    },
    xaxis: {
      categories: [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
      ],
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      crosshairs: {
        show: false,
      },
      labels: {
        style: {
          colors: '#9ca3af',
          fontSize: '13px',
          fontFamily: 'Inter, ui-sans-serif',
          fontWeight: 400,
        },
        offsetX: -2,
        formatter: (title) => title.slice(0, 3),
      },
    },
    yaxis: {
      labels: {
        align: 'left',
        minWidth: 0,
        maxWidth: 140,
        style: {
          colors: '#9ca3af',
          fontSize: '13px',
          fontFamily: 'Inter, ui-sans-serif',
          fontWeight: 400,
        },
        formatter: (value) => (value >= 1000 ? `${value / 1000}k` : value),
      },
    },
    tooltip: {
      shared: true,
      intersect: false,
      y: {
        formatter: (value) => value,
      },
    },
  });

  const fetchData = async () => {
    try {
      const response = await axiosInstance.get('/dashboard/graphic');
      console.log('API Response:', response.data); // Log the response data

      // Extract the data object
      const apiData = response.data.data; // This is the object with month keys

      // Create an array for the months in order
      const months = [
        'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 
        'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
      ];

      // Map the months to their corresponding values from the API response
      const data = months.map(month => apiData[month] || 0); // Default to 0 if month not found

      setChartOptions((prevOptions) => ({
        ...prevOptions,
        series: [
          {
            name: 'User  ',
            data: data, // Set the fetched data
          },
        ],
      }));
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <ReactApexChart options={chartOptions} series={chartOptions.series} type="bar" height={300} />
    </div>
  );
};

export default SingleBarChart;