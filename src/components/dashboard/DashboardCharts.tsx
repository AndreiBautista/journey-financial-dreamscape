
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BudgetPieChart } from "@/components/charts/BudgetPieChart";
import { NetWorthChart } from "@/components/charts/NetWorthChart";

interface DashboardChartsProps {
  netWorthProjection: Array<{
    year: number;
    aggressive: number;
    moderate: number;
  }>;
  track: "aggressive" | "moderate";
  budgetItems: Array<{
    id: string;
    category: string;
    amount: number;
    color: string;
    percentage: number;
  }>;
  totalMonthlyIncome: number;
}

export const DashboardCharts: React.FC<DashboardChartsProps> = ({ 
  netWorthProjection, 
  track, 
  budgetItems, 
  totalMonthlyIncome 
}) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
      <Card className="shadow-lg hover:shadow-xl transition-all duration-300">
        <CardHeader>
          <CardTitle>Net Worth Projection</CardTitle>
          <CardDescription>10-year forecast based on selected strategy</CardDescription>
        </CardHeader>
        <CardContent className="h-96">
          <NetWorthChart data={netWorthProjection} track={track} />
        </CardContent>
      </Card>
      
      <Card className="shadow-lg hover:shadow-xl transition-all duration-300">
        <CardHeader>
          <CardTitle>Budget Breakdown</CardTitle>
          <CardDescription>Monthly expenses distribution</CardDescription>
        </CardHeader>
        <CardContent className="h-96">
          <BudgetPieChart data={budgetItems.map(({
            category,
            amount,
            color
          }) => ({
            name: category,
            value: amount,
            color
          }))} totalAmount={totalMonthlyIncome} />
          <div className="mt-6 text-gray-800 text-sm">
            <div className="flex justify-between items-center">
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
