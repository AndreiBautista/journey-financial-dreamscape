
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface IncomeCardProps {
  income: {
    katie: number;
    chad: number;
    total: number;
  };
}

export const IncomeCard: React.FC<IncomeCardProps> = ({ income }) => {
  return (
    <Card className="shadow-lg hover:shadow-xl transition-all duration-300">
      <CardHeader className="pb-2">
        <CardTitle>Total Income</CardTitle>
        <CardDescription>Combined annual income</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold">${income.total.toLocaleString()}</div>
        <div className="text-sm text-gray-500 mt-1">
          Katie: ${income.katie.toLocaleString()} | Chad: ${income.chad.toLocaleString()}
        </div>
      </CardContent>
    </Card>
  );
};
