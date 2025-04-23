
import React, { useState, useEffect, useCallback } from "react";
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
  const [chartDimensions, setChartDimensions] = useState({ width: 0, height: 0 });
  const [activeIndex, setActiveIndex] = useState<number | undefined>(undefined);
  
  useEffect(() => {
    const updateDimensions = () => {
      const container = document.querySelector('.chart-container');
      if (container) {
        const { width, height } = container.getBoundingClientRect();
        setChartDimensions({ width, height });
      }
    };

    // Initial update
    updateDimensions();
    
    // Update on resize
    window.addEventListener('resize', updateDimensions);
    
    // Observe container size changes with ResizeObserver if supported
    const container = document.querySelector('.chart-container');
    if (container && window.ResizeObserver) {
      const resizeObserver = new ResizeObserver(updateDimensions);
      resizeObserver.observe(container);
      return () => {
        resizeObserver.disconnect();
        window.removeEventListener('resize', updateDimensions);
      };
    }
    
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  // Calculate dynamic dimensions based on container size
  const calculateDimensions = useCallback(() => {
    const minDimension = Math.min(chartDimensions.width, chartDimensions.height);
    return {
      innerRadius: minDimension * 0.15,
      outerRadius: minDimension * 0.3,
      lineLength: minDimension * 0.08,
      labelOffset: minDimension * 0.03,
    };
  }, [chartDimensions]);

  // Handle pie chart hover interactions
  const onPieEnter = (_: any, index: number) => {
    setActiveIndex(index);
  };
  
  const onPieLeave = () => {
    setActiveIndex(undefined);
  };

  // Custom active shape for the pie chart with label lines
  const renderLabel = (props: any) => {
    const RADIAN = Math.PI / 180;
    const { cx, cy, midAngle, name, value, percent, fill } = props;
    const dims = calculateDimensions();
    
    // Line properties
    const sin = Math.sin(-RADIAN * midAngle);
    const cos = Math.cos(-RADIAN * midAngle);
    
    // Start and end points of the line
    const sx = cx + (dims.outerRadius + 5) * cos;
    const sy = cy + (dims.outerRadius + 5) * sin;
    const ex = cx + (dims.outerRadius + dims.lineLength) * cos;
    const ey = cy + (dims.outerRadius + dims.lineLength) * sin;
    
    // Text position
    const tx = ex + (cos >= 0 ? 1 : -1) * dims.labelOffset;
    const ty = ey;
    
    // Text anchor based on which side of the pie we're on
    const textAnchor = cos >= 0 ? 'start' : 'end';
    
    // Format the percentage and value
    const percentFormatted = (percent * 100).toFixed(0);
    const valueFormatted = value.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    });
    
    // Calculate font sizes based on container dimensions
    const nameFontSize = Math.max(chartDimensions.width * 0.02, 10);
    const valueFontSize = Math.max(chartDimensions.width * 0.015, 9);
    
    return (
      <g>
        <line x1={sx} y1={sy} x2={ex} y2={ey} stroke={fill} strokeWidth={2} />
        <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
        <text 
          x={tx} 
          y={ty} 
          textAnchor={textAnchor} 
          fill={fill} 
          fontSize={nameFontSize}
          fontWeight="bold"
          dominantBaseline="middle"
        >
          {name}
        </text>
        <text 
          x={tx} 
          y={ty + nameFontSize + 2} 
          textAnchor={textAnchor} 
          fill="#666"
          fontSize={valueFontSize}
          dominantBaseline="middle"
        >
          {valueFormatted} ({percentFormatted}%)
        </text>
      </g>
    );
  };
  
  // Custom active shape for highlighting
  const renderActiveShape = (props: any) => {
    const RADIAN = Math.PI / 180;
    const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill } = props;
    
    return (
      <g>
        <Sector
          cx={cx}
          cy={cy}
          innerRadius={innerRadius}
          outerRadius={outerRadius + 6}
          startAngle={startAngle}
          endAngle={endAngle}
          fill={fill}
          opacity={0.9}
        />
      </g>
    );
  };

  const dims = calculateDimensions();

  return (
    <div className="w-full h-full chart-container">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={dims.innerRadius}
            outerRadius={dims.outerRadius}
            fill="#8884d8"
            dataKey="value"
            label={renderLabel}
            labelLine={false}
            paddingAngle={2}
            isAnimationActive={true}
            activeIndex={activeIndex}
            activeShape={renderActiveShape}
            onMouseEnter={onPieEnter}
            onMouseLeave={onPieLeave}
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
