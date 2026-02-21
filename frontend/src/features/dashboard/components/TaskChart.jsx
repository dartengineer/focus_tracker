import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from "recharts";

const TaskChart = ({ tasks }) => {
  const data = [
    { name: "Completed", value: tasks.completed },
    { name: "Pending", value: tasks.pending },
  ];

  const COLORS = ["#4CAF50", "#F44336"];

  return (
    <PieChart width={300} height={250}>
      <Pie
        data={data}
        dataKey="value"
        cx="50%"
        cy="50%"
        outerRadius={80}
        label
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index]} />
        ))}
      </Pie>
      <Tooltip />
      <Legend />
    </PieChart>
  );
};

export default TaskChart;
