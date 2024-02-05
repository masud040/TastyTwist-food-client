import {
  Bar,
  BarChart,
  Cell,
  DefaultLegendContent,
  XAxis,
  YAxis,
} from "recharts";
const colors = ["#0088FE", "purple", "#00C49F", "#FF8042", "red", "pink"];
export default function StatsBarChart({ chartInfo }) {
  const barChartData = chartInfo?.map((data) => {
    return { name: data.category, value: data.revenue };
  });

  return (
    <div className="mt-6">
      <BarChart
        width={500}
        height={200}
        data={chartInfo}
        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
      >
        <XAxis dataKey="category" />
        <YAxis />
        <DefaultLegendContent />
        <Bar dataKey="quantity" label={{ position: "top" }}>
          {barChartData?.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={colors[index % 6]} />
          ))}
        </Bar>
      </BarChart>
    </div>
  );
}
