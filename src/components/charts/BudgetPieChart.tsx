
import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Label, Sector } from "recharts";

export interface BudgetItem {
  name: string;
  value: number;
  color: string;
}

interface BudgetPieChartProps {
  data: BudgetItem[];
  totalAmount: number;
}

export const BudgetPieChart: React.FC<BudgetPieChartProps> = ({ data, totalAmount }) => {
  // Custom active shape for the pie chart with label lines
  const renderLabel = (props: any) => {
    const RADIAN = Math.PI / 180;
    const { cx, cy, midAngle, outerRadius, name, value, percent, fill } = props;
    
    // Line properties
    const sin = Math.sin(-RADIAN * midAngle);
    const cos = Math.cos(-RADIAN * midAngle);
    const lineLength = 35; // Length of the line extending from the pie
    const labelOffset = 15; // Extra space for the label beyond the line
    
    // Start and end points of the line
    const sx = cx + (outerRadius + 5) * cos;
    const sy = cy + (outerRadius + 5) * sin;
    const ex = cx + (outerRadius + lineLength) * cos;
    const ey = cy + (outerRadius + lineLength) * sin;
    
    // Text position
    const tx = ex + (cos >= 0 ? 1 : -1) * labelOffset;
    const ty = ey;
    
    // Text anchor based on which side of the pie we're on
    const textAnchor = cos >= 0 ? 'start' : 'end';
    
    // Format the percentage
    const percentFormatted = (percent * 100).toFixed(0);
    
    // Format the value as currency
    const valueFormatted = value.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    });
    
    return (
      <g>
        {/* Line extending from the pie */}
        <line x1={sx} y1={sy} x2={ex} y2={ey} stroke={fill} strokeWidth={2} />
        
        {/* Dot at the end of the line */}
        <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
        
        {/* Category name */}
        <text 
          x={tx} 
          y={ty} 
          textAnchor={textAnchor} 
          fill={fill} 
          fontSize={12} 
          fontWeight="bold"
          dominantBaseline="middle"
        >
          {name}
        </text>
        
        {/* Value and percentage */}
        <text 
          x={tx} 
          y={ty + 16} 
          textAnchor={textAnchor} 
          fill="#666"
          fontSize={11}
          dominantBaseline="middle"
        >
          {valueFormatted} ({percentFormatted}%)
        </text>
      </g>
    );
  };

  return (
    <div className="w-full h-full chart-container hover:scale-105 transition-transform duration-300">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart className="w-full h-full">
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={70}
            outerRadius={140}
            fill="#8884d8"
            dataKey="value"
            label={renderLabel}
            labelLine={false}
            paddingAngle={2}
            isAnimationActive={true}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} className="hover:opacity-80 transition-opacity" />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};
