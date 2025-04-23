
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface MonthlyIncomeCardProps {
  taxData: {
    monthlyIncome: number;
    federalTax: number;
    stateTax: number;
  };
}

export const MonthlyIncomeCard: React.FC<MonthlyIncomeCardProps> = ({ taxData }) => {
  return (
    <Card className="shadow-lg hover:shadow-xl transition-all duration-300">
      <CardHeader className="pb-2">
        <CardTitle>Net Monthly Income</CardTitle>
        <CardDescription>After taxes and deductions</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold">${taxData.monthlyIncome.toLocaleString()}</div>
        <div className="text-sm text-gray-500 mt-1">
          Federal Tax: ${taxData.federalTax.toLocaleString()} | KY Tax: ${taxData.stateTax.toLocaleString()}
        </div>
      </CardContent>
    </Card>
  );
};
