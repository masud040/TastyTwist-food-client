import { Bar, BarChart, Cell, DefaultLegendContent, XAxis } from "recharts";
const colors = ["#0088FE", "purple", "#00C49F", "#FF8042", "red", "pink"];
export default function StatsBarChart({ chartInfo }) {
  return (
    <div>
      <BarChart
        width={500}
        height={300}
        data={chartInfo}
        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
      >
        <XAxis dataKey="category" />

        <DefaultLegendContent />
        <Bar dataKey="quantity" label={{ position: "top" }}>
          {chartInfo?.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={colors[index % 6]} />
          ))}
        </Bar>
      </BarChart>
    </div>
  );
}
