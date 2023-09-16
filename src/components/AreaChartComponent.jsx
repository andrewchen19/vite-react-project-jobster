import { useLoaderData } from "react-router-dom";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const AreaChartComponent = () => {
  const { monthlyApplications } = useLoaderData();
  // console.log(monthlyApplications);

  return (
    <ResponsiveContainer width="100%" height={300}>
      <AreaChart
        data={monthlyApplications}
        margin={{
          top: 50,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis allowDecimals={false} />
        <Tooltip />
        <Area type="monotone" dataKey="count" stroke="#8884d8" fill="#70acc7" />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default AreaChartComponent;
