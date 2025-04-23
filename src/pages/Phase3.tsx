import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const Phase3 = () => {
  const [track, setTrack] = useState<"aggressive" | "moderate">("aggressive");

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
