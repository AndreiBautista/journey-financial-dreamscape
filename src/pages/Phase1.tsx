
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip, Sector } from "recharts";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { InfoIcon } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import TaxOptimization from "@/components/TaxOptimization";
import InsuranceOptimization from "@/components/InsuranceOptimization";

interface BudgetItem {
  id: string;
  category: string;
  amount: number;
  color: string;
  percentage: number;
}

const Phase1 = () => {
  const [track, setTrack] = useState<"aggressive" | "moderate">("aggressive");
  const [netMonthlyIncome, setNetMonthlyIncome] = useState(10725);
  
  const initialBudgetItems: BudgetItem[] = [
    { id: "1", category: "Housing", amount: 2500, color: "#3b82f6", percentage: 25 },
    { id: "2", category: "Transportation", amount: 800, color: "#10b981", percentage: 8 },
    { id: "3", category: "Food", amount: 1000, color: "#f59e0b", percentage: 10 },
    { id: "4", category: "Insurance", amount: 500, color: "#6366f1", percentage: 5 },
    { id: "5", category: "Utilities", amount: 400, color: "#ec4899", percentage: 4 },
    { id: "6", category: "Debt Payments", amount: 1500, color: "#ef4444", percentage: 15 },
    { id: "7", category: "Savings", amount: 1800, color: "#14b8a6", percentage: 18 },
    { id: "8", category: "Entertainment", amount: 500, color: "#8b5cf6", percentage: 5 },
    { id: "9", category: "Other", amount: 1000, color: "#64748b", percentage: 10 },
  ];

  const [budgetItems, setBudgetItems] = useState<BudgetItem[]>(initialBudgetItems);
  const [newCategory, setNewCategory] = useState("");
  const [newAmount, setNewAmount] = useState(0);
  const [activeIndex, setActiveIndex] = useState<number | undefined>(undefined);

  const totalBudget = budgetItems.reduce((sum, item) => sum + item.amount, 0);
  const unallocatedAmount = netMonthlyIncome - totalBudget;

  const updatePercentages = (items: BudgetItem[]) => {
    const total = netMonthlyIncome;
    return items.map(item => ({
      ...item,
      percentage: Math.round((item.amount / total) * 100)
    }));
  };

  const addBudgetItem = () => {
    if (!newCategory || newAmount <= 0) return;
    
    const randomColor = `#${Math.floor(Math.random()*16777215).toString(16)}`;
    const newItem: BudgetItem = {
      id: Date.now().toString(),
      category: newCategory,
      amount: newAmount,
      color: randomColor,
      percentage: 0
    };
    
    const updatedItems = updatePercentages([...budgetItems, newItem]);
    setBudgetItems(updatedItems);
    setNewCategory("");
    setNewAmount(0);
  };

  const updateBudgetItem = (id: string, amount: number) => {
    const updatedItems = budgetItems.map(item => 
      item.id === id ? { ...item, amount } : item
    );
    setBudgetItems(updatePercentages(updatedItems));
  };

  const removeBudgetItem = (id: string) => {
    const updatedItems = budgetItems.filter(item => item.id !== id);
    setBudgetItems(updatePercentages(updatedItems));
  };

  const updateNetMonthlyIncome = (value: number) => {
    setNetMonthlyIncome(value);
  };

  useEffect(() => {
    setBudgetItems(updatePercentages(budgetItems));
  }, [netMonthlyIncome]);

  const onPieEnter = (_: any, index: number) => {
    setActiveIndex(index);
  };

  const onPieLeave = () => {
    setActiveIndex(undefined);
  };

  // Custom active shape for pie chart with label lines
  const renderActiveShape = (props: any) => {
    const RADIAN = Math.PI / 180;
    const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent, value } = props;
    const sin = Math.sin(-RADIAN * midAngle);
    const cos = Math.cos(-RADIAN * midAngle);
    const sx = cx + (outerRadius + 10) * cos;
    const sy = cy + (outerRadius + 10) * sin;
    const mx = cx + (outerRadius + 30) * cos;
    const my = cy + (outerRadius + 30) * sin;
    const ex = mx + (cos >= 0 ? 1 : -1) * 22;
    const ey = my;
    const textAnchor = cos >= 0 ? 'start' : 'end';

    return (
      <g>
        <Sector
          cx={cx}
          cy={cy}
          innerRadius={innerRadius}
          outerRadius={outerRadius}
          startAngle={startAngle}
          endAngle={endAngle}
          fill={fill}
        />
        <Sector
          cx={cx}
          cy={cy}
          startAngle={startAngle}
          endAngle={endAngle}
          innerRadius={outerRadius + 6}
          outerRadius={outerRadius + 10}
          fill={fill}
        />
        <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
        <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
        <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="#333">{payload.category}</text>
        <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill="#999">
          {`$${value.toLocaleString()} (${(percent * 100).toFixed(0)}%)`}
        </text>
      </g>
    );
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold text-blue-600 mb-8">Phase 1: Stabilization (Years 1-2)</h1>
      
      <Tabs defaultValue={track} onValueChange={(value) => setTrack(value as "aggressive" | "moderate")}>
        <TabsList className="grid grid-cols-2 w-full max-w-md mx-auto mb-8">
          <TabsTrigger value="aggressive">Aggressive Track</TabsTrigger>
          <TabsTrigger value="moderate">Moderate Track</TabsTrigger>
        </TabsList>
        
        <TabsContent value="aggressive" className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="shadow-lg hover:shadow-xl transition-all duration-300">
              <CardHeader>
                <CardTitle>Key Objectives</CardTitle>
                <CardDescription>Aggressive stabilization over Years 1-2</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="font-medium text-blue-700">Job Switch</p>
                  <p>Chad switches to Spectrum in Year 1</p>
                </div>
                <div>
                  <p className="font-medium text-blue-700">Assets Reallocation</p>
                  <p>Sell boat ($80K) & truck ($40K) → Buy $15K SUV</p>
                </div>
                <div>
                  <p className="font-medium text-blue-700">Debt Payoff Strategy</p>
                  <ul className="list-disc list-inside ml-4 space-y-1">
                    <li>Furniture loan ($3.5K)</li>
                    <li>Credit Card 3 ($2.5K @ 22%)</li>
                    <li>Credit Card 1 ($9K @ 0%)</li>
                  </ul>
                </div>
                <div>
                  <p className="font-medium text-blue-700">Retirement</p>
                  <p>Katie 401(k): 12% | Chad Roth IRA: $6,500</p>
                </div>
                <div>
                  <p className="font-medium text-blue-700">Funds</p>
                  <ul className="list-disc list-inside ml-4 space-y-1">
                    <li>Emergency Fund: $10K in Year 1</li>
                    <li>529 Plan: $200/month</li>
                    <li>Baby Fund: $300/month</li>
                  </ul>
                </div>
                <div>
                  <p className="font-medium text-blue-700">Loans</p>
                  <p>Student Loan repayment starts Year 2: $159/month for 10 years</p>
                </div>
              </CardContent>
            </Card>
            
            <Card className="shadow-lg hover:shadow-xl transition-all duration-300">
              <CardHeader>
                <CardTitle>Progress Tracking</CardTitle>
                <CardDescription>Key milestones for Aggressive Track</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="font-medium">Emergency Fund</span>
                    <span>$4,000 / $10,000</span>
                  </div>
                  <Progress value={40} className="h-2" />
                </div>
                
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="font-medium">Debt Payoff</span>
                    <span>$5,000 / $15,000</span>
                  </div>
                  <Progress value={33} className="h-2" />
                </div>
                
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="font-medium">Baby Fund</span>
                    <span>$1,800 / $12,500</span>
                  </div>
                  <Progress value={14} className="h-2" />
                </div>
                
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="font-medium">Retirement Contributions</span>
                    <span>$3,250 / $16,100</span>
                  </div>
                  <Progress value={20} className="h-2" />
                </div>
                
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="font-medium">529 College Fund</span>
                    <span>$600 / $2,400</span>
                  </div>
                  <Progress value={25} className="h-2" />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="moderate" className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="shadow-lg hover:shadow-xl transition-all duration-300">
              <CardHeader>
                <CardTitle>Key Objectives</CardTitle>
                <CardDescription>Moderate approach over Years 1-2</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="font-medium text-blue-700">Job Switch</p>
                  <p>Chad delays job switch until Year 2</p>
                </div>
                <div>
                  <p className="font-medium text-blue-700">Assets</p>
                  <p>Truck kept</p>
                </div>
                <div>
                  <p className="font-medium text-blue-700">Debt Payoff</p>
                  <p>Pay furniture loan + part of CC1</p>
                </div>
                <div>
                  <p className="font-medium text-blue-700">Retirement</p>
                  <p>Katie 401(k): 6% | Chad Roth IRA: $3,000</p>
                </div>
                <div>
                  <p className="font-medium text-blue-700">Funds</p>
                  <ul className="list-disc list-inside ml-4 space-y-1">
                    <li>Emergency Fund: $5K in 2 years</li>
                    <li>Baby Fund: $200/month</li>
                    <li>529 Plan: $200/month</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
            
            <Card className="shadow-lg hover:shadow-xl transition-all duration-300">
              <CardHeader>
                <CardTitle>Progress Tracking</CardTitle>
                <CardDescription>Key milestones for Moderate Track</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="font-medium">Emergency Fund</span>
                    <span>$2,000 / $5,000</span>
                  </div>
                  <Progress value={40} className="h-2" />
                </div>
                
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="font-medium">Debt Payoff (Furniture + CC1 part)</span>
                    <span>$3,000 / $7,500</span>
                  </div>
                  <Progress value={40} className="h-2" />
                </div>
                
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="font-medium">Baby Fund</span>
                    <span>$1,200 / $12,500</span>
                  </div>
                  <Progress value={9.6} className="h-2" />
                </div>
                
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="font-medium">Retirement Contributions</span>
                    <span>$1,950 / $7,800</span>
                  </div>
                  <Progress value={25} className="h-2" />
                </div>
                
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="font-medium">529 College Fund</span>
                    <span>$600 / $2,400</span>
                  </div>
                  <Progress value={25} className="h-2" />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      <div className="mt-12">
        <h2 className="text-2xl font-bold text-blue-600 mb-6">Tax Optimization</h2>
        <TaxOptimization />
      </div>

      <div className="mt-12">
        <h2 className="text-2xl font-bold text-blue-600 mb-6">Insurance Optimization</h2>
        <InsuranceOptimization />
      </div>
      
      <div className="mt-12">
        <h2 className="text-2xl font-bold text-blue-600 mb-6">Zero-Based Budget</h2>

        <Card className="shadow-lg hover:shadow-xl transition-all duration-300 mb-8">
          <CardHeader>
            <CardTitle>Net Monthly Income</CardTitle>
            <CardDescription>Enter your total net monthly income</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-end gap-4">
              <div className="grow">
                <Label htmlFor="monthlyIncome">Monthly Income (After Taxes)</Label>
                <Input
                  id="monthlyIncome"
                  type="number"
                  value={netMonthlyIncome}
                  onChange={(e) => updateNetMonthlyIncome(Number(e.target.value))}
                  className="text-lg font-medium"
                />
              </div>
              <div className="text-2xl font-bold text-blue-600">
                ${netMonthlyIncome.toLocaleString()}
              </div>
            </div>
          </CardContent>
        </Card>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card className="shadow-lg hover:shadow-xl transition-all duration-300">
              <CardHeader>
                <CardTitle>Budget Breakdown</CardTitle>
                <CardDescription>Manage your monthly budget categories</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-2">Category</th>
                        <th className="text-right py-2">Amount</th>
                        <th className="text-right py-2">%</th>
                        <th className="text-right py-2">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {budgetItems.map((item) => (
                        <tr key={item.id} className="border-b hover:bg-gray-50">
                          <td className="py-2">
                            <div className="flex items-center">
                              <div 
                                className="w-3 h-3 rounded-full mr-2" 
                                style={{ backgroundColor: item.color }}
                              ></div>
                              {item.category}
                            </div>
                          </td>
                          <td className="text-right py-2">
                            <Input
                              type="number"
                              value={item.amount}
                              onChange={(e) => updateBudgetItem(item.id, Number(e.target.value))}
                              className="max-w-[120px] ml-auto"
                            />
                          </td>
                          <td className="text-right py-2">{item.percentage}%</td>
                          <td className="text-right py-2">
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              onClick={() => removeBudgetItem(item.id)}
                              className="text-red-500 hover:text-red-700 hover:bg-red-50"
                            >
                              Remove
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot>
                      <tr className="border-t font-bold">
                        <td className="py-2">Total Allocated</td>
                        <td className="text-right py-2">${totalBudget.toLocaleString()}</td>
                        <td className="text-right py-2">{Math.round((totalBudget / netMonthlyIncome) * 100)}%</td>
                        <td></td>
                      </tr>
                      <tr className={`font-bold ${unallocatedAmount < 0 ? 'text-red-500' : 'text-green-500'}`}>
                        <td className="py-2">Unallocated</td>
                        <td className="text-right py-2">${unallocatedAmount.toLocaleString()}</td>
                        <td className="text-right py-2">{Math.round((unallocatedAmount / netMonthlyIncome) * 100)}%</td>
                        <td></td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
                
                <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                  <div>
                    <Label htmlFor="category">New Category</Label>
                    <Input
                      id="category"
                      value={newCategory}
                      onChange={(e) => setNewCategory(e.target.value)}
                      placeholder="Category name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="amount">Amount</Label>
                    <Input
                      id="amount"
                      type="number"
                      value={newAmount || ''}
                      onChange={(e) => setNewAmount(Number(e.target.value))}
                      placeholder="0"
                    />
                  </div>
                  <Button onClick={addBudgetItem} className="bg-blue-600 hover:bg-blue-700">
                    Add Category
                  </Button>
                </div>

                {unallocatedAmount < 0 && (
                  <Alert variant="destructive" className="mt-6">
                    <InfoIcon className="h-4 w-4" />
                    <AlertTitle>Budget Overallocated</AlertTitle>
                    <AlertDescription>
                      Your expenses exceed your income by ${Math.abs(unallocatedAmount).toLocaleString()}. 
                      Consider reducing some categories or increasing your income.
                    </AlertDescription>
                  </Alert>
                )}

                {unallocatedAmount > 0 && (
                  <Alert className="mt-6 border-green-500">
                    <InfoIcon className="h-4 w-4 text-green-500" />
                    <AlertTitle className="text-green-600">Unallocated Funds</AlertTitle>
                    <AlertDescription>
                      You have ${unallocatedAmount.toLocaleString()} unallocated. Consider adding to savings, 
                      investments, or debt repayment.
                    </AlertDescription>
                  </Alert>
                )}
              </CardContent>
            </Card>
          </div>
          
          <Card className="shadow-lg hover:shadow-xl transition-all duration-300">
            <CardHeader>
              <CardTitle>Budget Visualization</CardTitle>
              <CardDescription>Monthly spending breakdown</CardDescription>
            </CardHeader>
            <CardContent className="h-[500px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    activeIndex={activeIndex}
                    activeShape={renderActiveShape}
                    data={budgetItems}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={140}
                    fill="#8884d8"
                    dataKey="amount"
                    nameKey="category"
                    onMouseEnter={onPieEnter}
                    onMouseLeave={onPieLeave}
                  >
                    {budgetItems.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        const value = Number(payload[0].value);
                        return (
                          <div className="bg-white border border-gray-200 p-2 rounded-lg shadow-lg">
                            <p className="font-medium">{payload[0].name}</p>
                            <p className="text-blue-600">${value.toLocaleString()}</p>
                            <p className="text-gray-500">{((value / netMonthlyIncome) * 100).toFixed(1)}%</p>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Phase1;
