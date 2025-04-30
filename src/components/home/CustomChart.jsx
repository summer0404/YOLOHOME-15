import { useState, useEffect } from "react";
import {
  LineChart, Line, XAxis, YAxis, Tooltip,
  ResponsiveContainer, Area, CartesianGrid
} from "recharts";
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
        const recentData = data.length > 7 ? data.slice(-7) : data;
        setChartData(recentData);
      } catch (err) {
        setError(err.message);
        if (err.message.includes('Unauthorized')) {
          navigate('/');
        }
      }
    };
    fetchData();
  }, [navigate]);

  return (
    <div className="bg-white px-[8px] pr-[25px] pt-[20px] h-[360px] rounded-3xl shadow-xl transition-shadow duration-300">
      {error ? (
        <div className="text-red-500 text-center">{error}</div>
      ) : (
        <ResponsiveContainer>
          <LineChart data={chartData} margin={{ top: 20, right: 30, left: 10, bottom: 30 }}>
            <defs>
              <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#FF8855" stopOpacity={0.5} />
                <stop offset="95%" stopColor="#FF8855" stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis
              dataKey="name"
              tick={{ fill: "#444", fontSize: 12 }}
              axisLine={{ stroke: "#ddd" }}
              tickLine={false}
              interval="preserveStartEnd"
              padding={{ left: 10, right: 10 }}
            />
            <YAxis
              tick={{ fill: "#444", fontSize: 12 }}
              axisLine={{ stroke: "#ddd" }}
              tickLine={false}
              domain={["dataMin - 2", "dataMax + 2"]}
              tickCount={5}
              tickFormatter={(value) => `${Math.round(value)}°C`}
            />
            <Tooltip
              contentStyle={{
                background: "#fff",
                border: "1px solid #eee",
                borderRadius: "10px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                padding: "10px 14px",
              }}
              labelStyle={{ fontWeight: "bold", color: "#FF8855" }}
              formatter={(value) => [`${value}°C`, 'Temperature']}
              cursor={{ stroke: "#FF8855", strokeWidth: 2, strokeDasharray: "4 4" }}
            />
            <Area
              type="monotone"
              dataKey="value"
              stroke="#FF8855"
              fillOpacity={1}
              fill="url(#colorValue)"
              animationDuration={1000}
            />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#FF8855"
              strokeWidth={3}
              dot={{ r: 4, stroke: "#fff", strokeWidth: 2, fill: "#FF8855" }}
              activeDot={{
                fill: "#FF8855",
                r: 6,
                stroke: "white",
                strokeWidth: 3,
                filter: "drop-shadow(0 0 3px rgba(255,136,85,0.6))"
              }}
              animationDuration={1000}
            />
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}
