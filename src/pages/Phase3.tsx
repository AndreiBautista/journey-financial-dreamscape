
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from "recharts";

const Phase3 = () => {
  const [track, setTrack] = useState<"aggressive" | "moderate">("aggressive");

  // Lake Fund data (yearly progress)
  const lakeFundData = [
    { year: 'Year 3', aggressive: 10800, moderate: 0 },
    { year: 'Year 4', aggressive: 22320, moderate: 3800 },
    { year: 'Year 5', aggressive: 34622, moderate: 8008 },
    { year: 'Year 6', aggressive: 47763, moderate: 12452 },
    { year: 'Year 7', aggressive: 61805, moderate: 17145 },
    { year: 'Year 8', aggressive: 76817, moderate: 22102 },
    { year: 'Year 9', aggressive: 92870, moderate: 27338 },
    { year: 'Year 10', aggressive: 93464, moderate: 29988 },
  ];

  const netWorthData = [
    { category: "Retirement", aggressive: 251892, moderate: 122035 },
    { category: "529 Plan", aggressive: 30561, moderate: 30561 },
    { category: "Baby Fund", aggressive: 11767, moderate: 13660 },
    { category: "Lake Fund", aggressive: 93464, moderate: 29988 },
  ];

  const totalNetWorth = {
    aggressive: netWorthData.reduce((sum, item) => sum + item.aggressive, 0),
    moderate: netWorthData.reduce((sum, item) => sum + item.moderate, 0),
  };

  const tooltipStyle = {
    backgroundColor: 'white',
    border: '1px solid #ccc',
    borderRadius: '10px',
    padding: '10px',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <h2 className="text-2xl font-bold text-blue-600 mb-6">Lake Fund Growth (Years 3-10)</h2>
      
      <Card className="shadow-lg hover:shadow-xl transition-all duration-300 mb-8">
        <CardHeader>
          <CardTitle>Lake Fund Growth</CardTitle>
          <CardDescription>Progress from initial investment to Year 10</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex justify-center items-center w-full">
            <div className="h-96 w-full max-w-4xl">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={lakeFundData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 30 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="year" />
                  <YAxis 
                    tickFormatter={(tick) => `$${(tick / 1000).toFixed(0)}K`}
                    label={{ value: 'Balance ($)', angle: -90, position: 'insideLeft' }}
                  />
                  <Tooltip 
                    formatter={(value) => [`$${Number(value).toLocaleString()}`, '']}
                    contentStyle={tooltipStyle}
                  />
                  <Legend />
                  <Bar 
                    dataKey="aggressive" 
                    name="Aggressive Track" 
                    fill="#0ea5e9" 
                  />
                  <Bar 
                    dataKey="moderate" 
                    name="Moderate Track" 
                    fill="#f59e0b" 
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-blue-600">Aggressive Track Strategy</h3>
              <ul className="list-disc list-inside space-y-1">
                <li>$800/month contribution starting Year 3</li>
                <li>Invested in diversified portfolio</li>
                <li>Higher growth rate: 7.2% annual return</li>
                <li>Final balance: $93,464</li>
              </ul>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-orange-500">Moderate Track Strategy</h3>
              <ul className="list-disc list-inside space-y-1">
                <li>$300/month contribution starting Year 4</li>
                <li>More conservative investments</li>
                <li>Moderate growth rate: 5.3% annual return</li>
                <li>Final balance: $29,988</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      <h2 className="text-2xl font-bold text-blue-600 mb-6">Net Worth Summary (Year 10)</h2>
      <Card className="shadow-lg hover:shadow-xl transition-all duration-300">
        <CardHeader>
          <CardTitle>Net Worth Components</CardTitle>
          <CardDescription>Projected values after 10 years</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="h-96 flex justify-center items-center w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={netWorthData}
                  margin={{ top: 20, right: 20, left: 40, bottom: 5 }}
                  layout="vertical"
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    type="number" 
                    tickFormatter={(tick) => `$${(tick / 1000).toFixed(0)}K`} 
                  />
                  <YAxis 
                    dataKey="category" 
                    type="category" 
                    width={100} 
                  />
                  <Tooltip 
                    formatter={(value) => [`$${Number(value).toLocaleString()}`, '']}
                    wrapperStyle={{ zIndex: 100 }}
                    contentStyle={{ backgroundColor: 'white', border: '1px solid #ccc', borderRadius: '4px', padding: '10px' }}
                  />
                  <Legend wrapperStyle={{ paddingTop: 10 }} />
                  <Bar 
                    dataKey="aggressive" 
                    name="Aggressive Track" 
                    fill="#0ea5e9" 
                    radius={[0, 4, 4, 0]}
                  />
                  <Bar 
                    dataKey="moderate" 
                    name="Moderate Track" 
                    fill="#f59e0b" 
                    radius={[0, 4, 4, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-blue-600 mb-4">Aggressive Track</h3>
                <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                  {netWorthData.map((item, index) => (
                    <React.Fragment key={index}>
                      <div className="font-medium">{item.category}</div>
                      <div className="text-right">${item.aggressive.toLocaleString()}</div>
                    </React.Fragment>
                  ))}
                  <div className="col-span-2 border-t border-gray-200 mt-2 pt-2"></div>
                  <div className="font-bold">Total Net Worth</div>
                  <div className="text-right font-bold">${totalNetWorth.aggressive.toLocaleString()}</div>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-orange-500 mb-4">Moderate Track</h3>
                <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                  {netWorthData.map((item, index) => (
                    <React.Fragment key={index}>
                      <div className="font-medium">{item.category}</div>
                      <div className="text-right">${item.moderate.toLocaleString()}</div>
                    </React.Fragment>
                  ))}
                  <div className="col-span-2 border-t border-gray-200 mt-2 pt-2"></div>
                  <div className="font-bold">Total Net Worth</div>
                  <div className="text-right font-bold">${totalNetWorth.moderate.toLocaleString()}</div>
                </div>
              </div>
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
                <p className="font-medium text-blue-700">Net Worth Difference</p>
                <p className="text-lg font-bold">${(totalNetWorth.aggressive - totalNetWorth.moderate).toLocaleString()}</p>
                <p className="text-sm text-gray-600 mt-1">
                  The aggressive track results in a {Math.round((totalNetWorth.aggressive / totalNetWorth.moderate - 1) * 100)}% higher net worth after 10 years.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Phase3;
