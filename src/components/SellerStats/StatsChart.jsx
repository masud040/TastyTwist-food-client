import { useQuery } from "@tanstack/react-query";
import {
  Bar,
  BarChart,
  Cell,
  DefaultLegendContent,
  XAxis,
  YAxis,
} from "recharts";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const colors = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "red", "pink"];
export default function StatsChart() {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: sellerStats } = useQuery({
    enabled: !loading && !!user?.email,
    queryKey: ["sellerStats", user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/order-stats/${user?.email}`);
      return data;
    },
  });
  const pieChartData = sellerStats?.map((data) => {
    return { name: data.category, value: data.revenue };
  });

  return (
    <div className="mt-6">
      <BarChart
        width={500}
        height={200}
        data={sellerStats}
        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
      >
        <XAxis dataKey="category" />
        <YAxis />
        <DefaultLegendContent />
        <Bar dataKey="quantity" label={{ position: "top" }}>
          {pieChartData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={colors[index % 6]} />
          ))}
        </Bar>
      </BarChart>
    </div>
  );
}
