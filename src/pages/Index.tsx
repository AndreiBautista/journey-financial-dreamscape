import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Sector } from "recharts";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { BudgetPieChart } from "@/components/charts/BudgetPieChart";
import { NetWorthChart } from "@/components/charts/NetWorthChart";
import { MilestoneTracker, Milestone } from "@/components/MilestoneTracker";
const Index = () => {
  const [track, setTrack] = useState<"aggressive" | "moderate">("aggressive");
  const incomeData = {
    katie: 80000,
    chad: 73265,
    total: 153265
  };
  const taxData = {
    standardDeduction: 29600,
    taxableIncome: incomeData.total - 29600,
    federalTax: 17117,
    stateTax: 5421,
    netIncome: 124527,
    monthlyIncome: 10377
  };
  const budgetData = [{
    name: "Housing",
    value: 2500,
    color: "#3b82f6"
  }, {
    name: "Transportation",
    value: 800,
    color: "#10b981"
  }, {
    name: "Food",
    value: 1000,
    color: "#f59e0b"
  }, {
    name: "Insurance",
    value: 500,
    color: "#6366f1"
  }, {
    name: "Utilities",
    value: 400,
    color: "#ec4899"
  }, {
    name: "Debt Payments",
    value: 1500,
    color: "#ef4444"
  }, {
    name: "Savings",
    value: 1800,
    color: "#14b8a6"
  }, {
    name: "Entertainment",
    value: 500,
    color: "#8b5cf6"
  }, {
    name: "Other",
    value: 1000,
    color: "#64748b"
  }];
  const totalMonthlyIncome = taxData.monthlyIncome;
  const budgetItems = budgetData.map((d, i) => ({
    id: String(i + 1),
    category: d.name,
    amount: d.value,
    color: d.color,
    percentage: Math.round(d.value / totalMonthlyIncome * 100)
  }));
  const [milestones, setMilestones] = useState<Milestone[]>([{
    id: "1",
    name: "Emergency Fund",
    current: 4000,
    target: track === "aggressive" ? 10000 : 5000,
    year: track === "aggressive" ? 1 : 2
  }, {
    id: "2",
    name: "Debt Free",
    current: 5000,
    target: 15000,
    year: track === "aggressive" ? 2 : 3
  }, {
    id: "3",
    name: "Baby Fund",
    current: track === "aggressive" ? 1800 : 1200,
    target: 12500,
    year: track === "aggressive" ? 3 : 5
  }, {
    id: "4",
    name: "Lake Fund",
    current: 0,
    target: 100000,
    year: 10
  }, {
    id: "5",
    name: "Retirement $100K",
    current: 0,
    target: 100000,
    year: track === "aggressive" ? 7 : 9
  }]);
  const netWorthProjection = [{
    year: 1,
    aggressive: 5000,
    moderate: 2500
  }, {
    year: 2,
    aggressive: 22000,
    moderate: 12000
  }, {
    year: 3,
    aggressive: 48000,
    moderate: 25000
  }, {
    year: 4,
    aggressive: 82000,
    moderate: 42000
  }, {
    year: 5,
    aggressive: 125000,
    moderate: 65000
  }, {
    year: 6,
    aggressive: 175000,
    moderate: 90000
  }, {
    year: 7,
    aggressive: 232000,
    moderate: 120000
  }, {
    year: 8,
    aggressive: 295000,
    moderate: 150000
  }, {
    year: 9,
    aggressive: 340000,
    moderate: 170000
  }, {
    year: 10,
    aggressive: 387684,
    moderate: 196243
  }];
  const totalDebt = [{
    name: "Credit Card 1",
    amount: 9000,
    interestRate: "0% (6 mo left)"
  }, {
    name: "Credit Card 2",
    amount: 4000,
    interestRate: "Low"
  }, {
    name: "Credit Card 3",
    amount: 3000,
    interestRate: "High"
  }, {
    name: "Furniture Loan",
    amount: 3500,
    interestRate: "0% (3 mo left)"
  }, {
    name: "Truck Loan",
    amount: 25000,
    interestRate: "6%"
  }, {
    name: "Jeep Loan",
    amount: 14000,
    interestRate: "4%"
  }, {
    name: "Boat Loan",
    amount: 65000,
    interestRate: "8%"
  }, {
    name: "Mortgage",
    amount: 405000,
    interestRate: "Low"
  }, {
    name: "Student Loans",
    amount: 15000,
    interestRate: "Average"
  }].reduce((sum, debt) => sum + debt.amount, 0);
  const debtData = [{
    name: "Credit Card 1",
    amount: 9000,
    interestRate: "0% (6 mo left)"
  }, {
    name: "Credit Card 2",
    amount: 4000,
    interestRate: "Low"
  }, {
    name: "Credit Card 3",
    amount: 3000,
    interestRate: "High"
  }, {
    name: "Furniture Loan",
    amount: 3500,
    interestRate: "0% (3 mo left)"
  }, {
    name: "Truck Loan",
    amount: 25000,
    interestRate: "6%"
  }, {
    name: "Jeep Loan",
    amount: 14000,
    interestRate: "4%"
  }, {
    name: "Boat Loan",
    amount: 65000,
    interestRate: "8%"
  }, {
    name: "Mortgage",
    amount: 405000,
    interestRate: "Low"
  }, {
    name: "Student Loans",
    amount: 15000,
    interestRate: "Average"
  }];
  return <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold text-blue-600 mb-2">Chad & Katie's Financial Journey</h1>
      <p className="text-gray-600 mb-8">Interactive financial planning and tracking dashboard</p>
      
      <Tabs defaultValue={track} onValueChange={value => setTrack(value as "aggressive" | "moderate")}>
        <TabsList className="grid grid-cols-2 w-full max-w-md mx-auto mb-8">
          <TabsTrigger value="aggressive">Aggressive Track</TabsTrigger>
          <TabsTrigger value="moderate">Moderate Track</TabsTrigger>
        </TabsList>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="shadow-lg hover:shadow-xl transition-all duration-300">
            <CardHeader className="pb-2">
              <CardTitle>Total Income</CardTitle>
              <CardDescription>Combined annual income</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">${incomeData.total.toLocaleString()}</div>
              <div className="text-sm text-gray-500 mt-1">
                Katie: ${incomeData.katie.toLocaleString()} | Chad: ${incomeData.chad.toLocaleString()}
              </div>
            </CardContent>
          </Card>
          
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
          
          <Card className="shadow-lg hover:shadow-xl transition-all duration-300">
            <CardHeader className="pb-2">
              <CardTitle>Year 10 Net Worth</CardTitle>
              <CardDescription>Projected net worth</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">
                ${(track === "aggressive" ? 387684 : 196243).toLocaleString()}
              </div>
              <div className="text-sm text-gray-500 mt-1">
                {track === "aggressive" ? "Aggressive strategy (+97% vs moderate)" : "Moderate strategy"}
              </div>
            </CardContent>
          </Card>
        </div>
        
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
                <div className="flex justify-between items-center mb-1">
                  <span className="font-semibold">Net Monthly Income</span>
                  <span className="font-mono">${totalMonthlyIncome.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-semibold">Total Allocated</span>
                  <span className="font-mono">
                    ${budgetItems.reduce((sum, i) => sum + i.amount, 0).toLocaleString()} 
                    {" "}({Math.round(budgetItems.reduce((sum, i) => sum + i.amount, 0) / totalMonthlyIncome * 100)}%)
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <Card className="shadow-lg hover:shadow-xl transition-all duration-300 lg:col-span-2">
            <CardHeader>
              <CardTitle>Milestone Tracking</CardTitle>
              <CardDescription>Dynamically update your key financial milestones</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <MilestoneTracker milestones={milestones} setMilestones={setMilestones} />
              <div className="flex justify-end mt-4">
                <Link to={track === "aggressive" ? "/phase1" : "/phase1"}>
                  <Button variant="outline" className="text-blue-600 hover:text-blue-700">
                    View Detailed Plan <ChevronRight className="ml-1 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
          
          <Card className="shadow-lg hover:shadow-xl transition-all duration-300 h-full flex flex-col">
            <CardHeader>
              <CardTitle>Debt Overview</CardTitle>
              <CardDescription>Total debt: ${totalDebt.toLocaleString()}</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 p-6 pt-0">
              <div className="space-y-4 overflow-y-auto scroll-blue" style={{
              maxHeight: 350
            }}>
                {debtData.map((debt, index) => <div key={index} className="border-b pb-3 last:border-b-0 last:pb-0">
                    <div className="flex justify-between">
                      <span className="font-medium">{debt.name}</span>
                      <span>${debt.amount.toLocaleString()}</span>
                    </div>
                    <div className="text-sm text-gray-500 mt-1">
                      {debt.interestRate} interest rate
                    </div>
                  </div>)}
              </div>
              <div className="flex justify-end mt-4 my-0">
                <Link to="/phase1">
                  <Button variant="outline" className="text-blue-600 hover:text-blue-700">
                    Debt Management <ChevronRight className="ml-1 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </Tabs>
      
      <div className="flex flex-col md:flex-row gap-4 justify-center mt-10">
        <Link to="/phase1">
          <Button className="bg-blue-600 hover:bg-blue-700 shadow-lg hover:shadow-xl transition-all duration-300 w-full md:w-auto">
            Phase 1: Stabilization <ChevronRight className="ml-1 h-4 w-4" />
          </Button>
        </Link>
        
        <Link to="/phase2">
          <Button className="bg-blue-600 hover:bg-blue-700 shadow-lg hover:shadow-xl transition-all duration-300 w-full md:w-auto">
            Phase 2: Family & Growth <ChevronRight className="ml-1 h-4 w-4" />
          </Button>
        </Link>
        
        <Link to="/phase3">
          <Button className="bg-blue-600 hover:bg-blue-700 shadow-lg hover:shadow-xl transition-all duration-300 w-full md:w-auto">
            Phase 3: Lake & Wealth <ChevronRight className="ml-1 h-4 w-4" />
          </Button>
        </Link>
        
        <Link to="/calculator">
          <Button className="bg-blue-600 hover:bg-blue-700 shadow-lg hover:shadow-xl transition-all duration-300 w-full md:w-auto">
            Compound Calculator <ChevronRight className="ml-1 h-4 w-4" />
          </Button>
        </Link>
        
        <Link to="/assumptions">
          <Button className="bg-blue-600 hover:bg-blue-700 shadow-lg hover:shadow-xl transition-all duration-300 w-full md:w-auto">
            Assumptions <ChevronRight className="ml-1 h-4 w-4" />
          </Button>
        </Link>
      </div>
      <style>{`
        .scroll-blue::-webkit-scrollbar {
          width: 8px;
          background: #e0eaff;
        }
        .scroll-blue::-webkit-scrollbar-thumb {
          background: #3b82f6;
          border-radius: 8px;
        }
        .scroll-blue {
          scrollbar-width: thin;
          scrollbar-color: #3b82f6 #e0eaff;
        }
      `}</style>
    </div>;
};
export default Index;