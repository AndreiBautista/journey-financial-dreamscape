
import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

interface NetWorthProjectionItem {
  year: number;
  aggressive: number;
  moderate: number;
}

interface NetWorthChartProps {
  data: NetWorthProjectionItem[];
  track: "aggressive" | "moderate";
}

export const NetWorthChart: React.FC<NetWorthChartProps> = ({ data, track }) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        data={data}
        margin={{ top: 20, right: 30, left: 10, bottom: 30 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis 
          dataKey="year" 
          label={{ 
            value: 'Year', 
            position: 'insideBottomRight', 
            offset: -10 
          }} 
        />
        <YAxis 
          tickFormatter={(value) => `$${(value / 1000).toFixed(0)}K`}
          width={80}
        />
        <Tooltip 
          formatter={(value) => [`$${Number(value).toLocaleString()}`, '']}
          labelFormatter={(label) => `Year ${label}`}
          contentStyle={{ 
            backgroundColor: 'white', 
            border: '1px solid #ccc', 
            borderRadius: '10px', 
            padding: '10px',
            boxShadow: '0 4px 8px rgba(0,0,0,0.1)' 
          }}
        />
        <Legend verticalAlign="bottom" height={36} />
        <Line 
          type="monotone" 
          dataKey="aggressive" 
          name="Aggressive Track" 
          stroke="#0ea5e9" 
          activeDot={{ r: 8 }} 
          strokeWidth={track === "aggressive" ? 3 : 1}
          opacity={track === "aggressive" ? 1 : 0.5}
          className="transition-all duration-300"
        />
        <Line 
          type="monotone" 
          dataKey="moderate" 
          name="Moderate Track" 
          stroke="#f59e0b" 
          activeDot={{ r: 8 }}
          strokeWidth={track === "moderate" ? 3 : 1}
          opacity={track === "moderate" ? 1 : 0.5}
          className="transition-all duration-300"
        />
      </LineChart>
    </ResponsiveContainer>
  );
};
