import { useState, useEffect } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Area } from "recharts";
import { getDailyAverages } from "../../utils/api";
import { useNavigate } from "react-router-dom";

export default function CustomChart() {
  const [chartData, setChartData] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      setError(null);
      try {
        const data = await getDailyAverages();
        setChartData(data);
      } catch (err) {
        setError(err.message);
        if (err.message.includes('Unauthorized')) {
          navigate('/'); // Redirect to login if unauthorized
        }
      }
    };
    fetchData();
  }, [navigate]);
  return (
    <div className="bg-white py-[40px] rounded-[25px] shadow-md">
      <ResponsiveContainer width="95%" height={200}>
        <LineChart data={chartData} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
          <defs>
            <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#FF7F50" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#FF7F50" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis
            dataKey="name" // Use "name" from the API response
            tick={{ fill: "#999", angle: -45 }}
            axisLine={false}
            tickLine={false}
            padding={{ left: 20, right: 20 }}
            interval={0}
            dy={10}
          />
          <YAxis
            tick={{ fill: "#999", padding: 0 }}
            axisLine={false}
            tickLine={false}
            hide={false}
            domain={["dataMin - 5", "dataMax + 10"]}
            tickCount={5}
            tickFormatter={(value, index) => (index === 0 ? "" : value)}
          />
          <Tooltip
            contentStyle={{
              background: "white",
              border: "none",
              borderRadius: "10px",
              boxShadow: "0 0 10px rgba(0,0,0,0.1)",
            }}
          />
          <Area
            type="monotone"
            dataKey="value" // Use "value" from the API response
            stroke="#FF7F50"
            fillOpacity={1}
            fill="url(#colorValue)"
          />
          <Line
            type="monotone"
            dataKey="value" // Use "value" from the API response
            stroke="#FF7F50"
            strokeWidth={3}
            dot={false}
            activeDot={{
              fill: "#FF7F50",
              r: 6,
              stroke: "white",
              strokeWidth: 2,
            }}
            animationDuration={2000}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}