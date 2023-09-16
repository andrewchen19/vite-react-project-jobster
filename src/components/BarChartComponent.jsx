import { useLoaderData } from "react-router-dom";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const BarChartComponent = () => {
  const { monthlyApplications } = useLoaderData();
  //  console.log(monthlyApplications);

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart
        data={monthlyApplications}
        margin={{
          top: 50,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis allowDecimals={false} />
        <Tooltip />
        <Bar dataKey="count" fill="#70acc7" barSize={50} />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default BarChartComponent;
