import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import axiosInstance from "../../api/axiosInstance";

const BarChart = () => {
  const [data, setData] = useState({
    categories: [],
    values: [],
  });

  // Fetch data from backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get("/dashboard/count-data");

        // Log the response to check the structure
        console.log("API Response:", response.data);

        // Extract data from destinationCategories
        if (response.data && response.data.data && response.data.data.destinationCategories) {
          const destinationCategories = response.data.data.destinationCategories;

          const categories = Object.keys(destinationCategories);
          const values = Object.values(destinationCategories);

          setData({ categories, values });
        } else {
          console.error("Unexpected data format:", response.data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const options = {
    chart: {
      type: "bar",
      height: 150,
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        horizontal: true,
        columnWidth: "80%",
        borderRadius: 4,
        distributed: true, // Allows individual colors for each bar
      },
    },
    dataLabels: {
      enabled: false, // Hide the data labels to avoid clutter
    },
    xaxis: {
      categories: data.categories, // Dynamic categories from API
      labels: {
        style: {
          fontFamily: "Inter, sans-serif",
          fontSize: "12px",
          cssClass: "text-xs font-normal fill-gray-500 dark:fill-gray-400",
        },
      },
    },
    yaxis: {
      labels: {
        style: {
          fontFamily: "Inter, sans-serif",
          fontSize: "12px",
          cssClass: "text-xs font-normal fill-gray-500 dark:fill-gray-400",
        },
      },
    },
    grid: {
      show: true,
      strokeDashArray: 4,
      padding: {
        left: 2,
        right: 2,
      },
    },
    fill: {
      opacity: 1,
    },
    legend: {
      show: false,
    },
    tooltip: {
      enabled: true, // Enable the tooltip
      y: {
        formatter: (val) => `Count: ${val}`, // Customize the tooltip to show count
      },
    },
    colors: ["#075985", "#0EA5E9", "#BAE6FD"], // Colors for each bar
  };

  const series = [
    {
      name: "Destination Count",
      data: data.values, // Dynamic values from API
    },
  ];

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      {/* Title */}
      <h2 className="text-lg font-semibold mb-4">Destination Category</h2>

      {/* Variable Names and Data in a Flexbox Row */}
      <div className="flex justify-items-start mb-4 space-x-10">
        {data.categories.map((category, index) => (
          <div className="text-center mx-2" key={index}>
            <p className="text-sm font-bold">{category}</p>
            <p className="text-sm font-bold">{data.values[index]}</p>
          </div>
        ))}
      </div>

      {/* Chart */}
      <Chart options={options} series={series} type="bar" height={150} />
    </div>
  );
};

export default BarChart;
