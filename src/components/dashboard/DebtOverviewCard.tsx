
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";

interface DebtItem {
  name: string;
  amount: number;
  interestRate: string;
}

interface DebtOverviewCardProps {
  totalDebt: number;
  debtData: DebtItem[];
}

export const DebtOverviewCard: React.FC<DebtOverviewCardProps> = ({ totalDebt, debtData }) => {
  return (
    <Card className="shadow-lg hover:shadow-xl transition-all duration-300 h-full flex flex-col">
      <CardHeader>
        <CardTitle>Debt Overview</CardTitle>
        <CardDescription>Total debt: ${totalDebt.toLocaleString()}</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-4">
        <div className="space-y-1 overflow-y-auto scroll-blue max-h-[350px]">
          {debtData.map((debt, index) => (
            <div key={index} className="border-b pb-2 last:border-b-0 last:pb-0">
              <div className="font-medium">{debt.name}</div>
              <div className="flex justify-between text-sm text-gray-500">
                <div>${debt.amount.toLocaleString()}</div>
                <div>{debt.interestRate} interest rate</div>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-end mt-4">
          <Link to="/phase1">
            <Button variant="outline" className="text-blue-600 hover:text-blue-700">
              Debt Management <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};
