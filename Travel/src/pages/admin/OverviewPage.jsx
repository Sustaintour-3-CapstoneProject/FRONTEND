import { useEffect, useState } from "react";
import axiosInstance from "../../api/axiosInstance";
import Card from "../../components/Admin/Card";
import SingleBarChart from "../../components/Admin/BarChart";
import HorizontalBarChart from "../../components/Admin/HorizontalBarChart";
import { HiUser, HiMap, HiPlay } from "react-icons/hi";
import { Spinner } from "flowbite-react";

const OverviewPage = () => {
  const [stats, setStats] = useState({
    totalUser: 0,
    totalDestination: 0,
    totalContent: 0,
  });
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get("/dashboard/count-data");
      console.log("Response data:", response.data);

      const { destination, user, videoContent } = response.data.data;

      setStats({
        totalUser: user || 0,
        totalDestination: destination || 0,
        totalContent: videoContent || 0,
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      {loading ? (
        <div className="flex justify-center items-center my-5">
          <Spinner size="lg" aria-label="Loading data..." />
        </div>
      ) : (
        <>
          <div className="flex flex-col md:flex-row w-full gap-5 my-5">
            <Card
              title="Total User"
              totalData={stats.totalUser}
              icon={<HiUser className="text-2xl" />}
              className="flex-grow"
            />
            <Card
              title="Total Destination"
              totalData={stats.totalDestination}
              icon={<HiMap className="text-2xl" />}
              className="flex-grow"
            />
            <Card
              title="Total Content"
              totalData={stats.totalContent}
              icon={<HiPlay className="text-2xl" />}
              className="flex-grow"
            />
          </div>
          <div className="App">
            <h1 className="font-bold text-xl">Overall User</h1>
            <SingleBarChart />
          </div>
          <div className="App">
            <HorizontalBarChart />
          </div>
        </>
      )}
    </div>
  );
};

export default OverviewPage;
