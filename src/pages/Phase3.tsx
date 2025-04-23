import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const Phase3 = () => {
  const [track, setTrack] = useState<"aggressive" | "moderate">("aggressive");
  
  const netWorthData = [
    {
      category: "Retirement",
      aggressive: 251892,
      moderate: 122035,
    },
    {
      category: "529 Plan",
      aggressive: 30561,
      moderate: 30561,
    },
    {
      category: "Baby Fund",
      aggressive: 11767,
      moderate: 13660,
    },
    {
      category: "Lake Fund",
      aggressive: 93464,
      moderate: 29988,
    },
  ];
  
  const totalNetWorth = {
    aggressive: netWorthData.reduce((sum, item) => sum + item.aggressive, 0),
    moderate: netWorthData.reduce((sum, item) => sum + item.moderate, 0),
  };
  
  // Lake Fund projection data
  const generateLakeFundData = (
    startYear: number, 
    monthlyContribution: number, 
    years: number, 
    rate: number = 4.35
  ) => {
    const data = [];
    let balance = 0;
    
    for (let year = 1; year <= 10; year++) {
      if (year >= startYear) {
        for (let month = 1; month <= 12; month++) {
          balance = balance * (1 + rate / 100 / 12) + monthlyContribution;
        }
      }
      
      data.push({
        year: year,
        balance: Math.round(balance),
        active: year >= startYear ? "Yes" : "No",
      });
    }
    
    return data;
  };
  
  const aggressiveLakeFundData = generateLakeFundData(3, 800, 8);
  const moderateLakeFundData = generateLakeFundData(4, 300, 7);
  
  // Retirement projection data
  const generateRetirementData = (annualContribution: number, years: number, rate: number = 8) => {
    const data = [];
    let balance = 0;
    
    for (let year = 1; year <= 10; year++) {
      balance = balance * (1 + rate / 100) + annualContribution;
      
      data.push({
        year: year,
        balance: Math.round(balance),
      });
    }
    
    return data;
  };
  
  const aggressiveRetirementData = generateRetirementData(16100, 10);
  const moderateRetirementData = generateRetirementData(7800, 10);

  // Enhanced tooltip style for better appearance
  const tooltipStyle = {
    backgroundColor: 'white',
    border: '1px solid #ccc',
    borderRadius: '10px',
    padding: '10px',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold text-blue-600 mb-8">Phase 3: Lake Property & Wealth (Years 6-10)</h1>
      
      <Tabs defaultValue={track} onValueChange={(value) => setTrack(value as "aggressive" | "moderate")}>
        <TabsList className="grid grid-cols-2 w-full max-w-md mx-auto mb-8">
          <TabsTrigger value="aggressive">Aggressive Track</TabsTrigger>
          <TabsTrigger value="moderate">Moderate Track</TabsTrigger>
        </TabsList>
        
        <TabsContent value="aggressive" className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
              <CardHeader>
                <CardTitle>Lake Fund Projection</CardTitle>
                <CardDescription>$800/month starting Year 3</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="font-medium">Progress to $100K Goal</span>
                    <span>${aggressiveLakeFundData[9].balance.toLocaleString()} / $100,000</span>
                  </div>
                  <Progress 
                    value={Math.min(100, (aggressiveLakeFundData[9].balance / 100000) * 100)} 
                    className="h-2" 
                  />
                </div>
                
                <div className="h-80 mt-6">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={aggressiveLakeFundData}
                      margin={{ top: 20, right: 20, left: 10, bottom: 30 }}
                      className="animated-chart"
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis 
                        dataKey="year" 
                        label={{ value: 'Year', position: 'insideBottom', offset: -5 }} 
                      />
                      <YAxis 
                        tickFormatter={(tick) => `$${(tick / 1000).toFixed(0)}K`} 
                        width={80}
                      />
                      <Tooltip 
                        formatter={(value) => [`$${Number(value).toLocaleString()}`, '']}
                        labelFormatter={(label) => `Year ${label}`}
                        contentStyle={tooltipStyle}
                      />
                      <Legend wrapperStyle={{ paddingTop: 10 }} />
                      <Bar 
                        dataKey="balance" 
                        name="Lake Fund" 
                        fill="#0ea5e9" 
                        radius={[4, 4, 0, 0]}
                        className="hover:opacity-80 transition-opacity"
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                
                <div className="mt-4">
                  <p className="font-medium">Key Insights:</p>
                  <ul className="list-disc list-inside space-y-1 mt-2">
                    <li>Goal: Lake property down payment</li>
                    <li>Contribution: $800/month ($9,600/year)</li>
                    <li>Growth: 4.35% HYSA</li>
                    <li>Year 10 value: ${aggressiveLakeFundData[9].balance.toLocaleString()}</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
            
            <Card className="shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
              <CardHeader>
                <CardTitle>Retirement Growth</CardTitle>
                <CardDescription>$16,100 annual contribution (8% growth)</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="font-medium">Progress to $250K Milestone</span>
                    <span>${aggressiveRetirementData[9].balance.toLocaleString()} / $250,000</span>
                  </div>
                  <Progress 
                    value={Math.min(100, (aggressiveRetirementData[9].balance / 250000) * 100)} 
                    className="h-2" 
                  />
                </div>
                
                <div className="h-80 mt-6">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={aggressiveRetirementData}
                      margin={{ top: 20, right: 20, left: 10, bottom: 30 }}
                      className="animated-chart"
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis 
                        dataKey="year" 
                        label={{ value: 'Year', position: 'insideBottom', offset: -5 }} 
                      />
                      <YAxis 
                        tickFormatter={(tick) => `$${(tick / 1000).toFixed(0)}K`} 
                        width={80}
                      />
                      <Tooltip 
                        formatter={(value) => [`$${Number(value).toLocaleString()}`, '']}
                        labelFormatter={(label) => `Year ${label}`}
                        contentStyle={tooltipStyle}
                      />
                      <Legend wrapperStyle={{ paddingTop: 10 }} />
                      <Bar 
                        dataKey="balance" 
                        name="Retirement" 
                        fill="#4f46e5" 
                        radius={[4, 4, 0, 0]}
                        className="hover:opacity-80 transition-opacity"
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                
                <div className="mt-4">
                  <p className="font-medium">Key Insights:</p>
                  <ul className="list-disc list-inside space-y-1 mt-2">
                    <li>Katie 401(k): 12% contribution</li>
                    <li>Chad Roth IRA: $6,500/year</li>
                    <li>Total annual contribution: $16,100</li>
                    <li>Growth rate: 8% annually</li>
                    <li>Year 10 value: ${aggressiveRetirementData[9].balance.toLocaleString()}</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="moderate" className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
              <CardHeader>
                <CardTitle>Lake Fund Projection</CardTitle>
                <CardDescription>$300/month starting Year 4</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="font-medium">Progress to $100K Goal</span>
                    <span>${moderateLakeFundData[9].balance.toLocaleString()} / $100,000</span>
                  </div>
                  <Progress 
                    value={Math.min(100, (moderateLakeFundData[9].balance / 100000) * 100)} 
                    className="h-2" 
                  />
                </div>
                
                <div className="h-80 mt-6">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={moderateLakeFundData}
                      margin={{ top: 20, right: 20, left: 10, bottom: 30 }}
                      className="animated-chart"
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis 
                        dataKey="year" 
                        label={{ value: 'Year', position: 'insideBottom', offset: -5 }} 
                      />
                      <YAxis 
                        tickFormatter={(tick) => `$${(tick / 1000).toFixed(0)}K`} 
                        width={80}
                      />
                      <Tooltip 
                        formatter={(value) => [`$${Number(value).toLocaleString()}`, '']}
                        labelFormatter={(label) => `Year ${label}`}
                        contentStyle={tooltipStyle}
                      />
                      <Legend wrapperStyle={{ paddingTop: 10 }} />
                      <Bar 
                        dataKey="balance" 
                        name="Lake Fund" 
                        fill="#0ea5e9" 
                        radius={[4, 4, 0, 0]}
                        className="hover:opacity-80 transition-opacity"
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                
                <div className="mt-4">
                  <p className="font-medium">Key Insights:</p>
                  <ul className="list-disc list-inside space-y-1 mt-2">
                    <li>Goal: Lake property down payment</li>
                    <li>Contribution: $300/month ($3,600/year)</li>
                    <li>Growth: 4.35% HYSA</li>
                    <li>Year 10 value: ${moderateLakeFundData[9].balance.toLocaleString()}</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
            
            <Card className="shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
              <CardHeader>
                <CardTitle>Retirement Growth</CardTitle>
                <CardDescription>$7,800 annual contribution (8% growth)</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="font-medium">Progress to $125K Milestone</span>
                    <span>${moderateRetirementData[9].balance.toLocaleString()} / $125,000</span>
                  </div>
                  <Progress 
                    value={Math.min(100, (moderateRetirementData[9].balance / 125000) * 100)} 
                    className="h-2" 
                  />
                </div>
                
                <div className="h-80 mt-6">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={moderateRetirementData}
                      margin={{ top: 20, right: 20, left: 10, bottom: 30 }}
                      className="animated-chart"
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis 
                        dataKey="year" 
                        label={{ value: 'Year', position: 'insideBottom', offset: -5 }}
                      />
                      <YAxis 
                        tickFormatter={(tick) => `$${(tick / 1000).toFixed(0)}K`} 
                        width={80}
                      />
                      <Tooltip 
                        formatter={(value) => [`$${Number(value).toLocaleString()}`, '']}
                        labelFormatter={(label) => `Year ${label}`}
                        contentStyle={tooltipStyle}
                      />
                      <Legend wrapperStyle={{ paddingTop: 10 }} />
                      <Bar 
                        dataKey="balance" 
                        name="Retirement" 
                        fill="#4f46e5" 
                        radius={[4, 4, 0, 0]}
                        className="hover:opacity-80 transition-opacity"
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                
                <div className="mt-4">
                  <p className="font-medium">Key Insights:</p>
                  <ul className="list-disc list-inside space-y-1 mt-2">
                    <li>Katie 401(k): 6% contribution</li>
                    <li>Chad Roth IRA: $3,000/year</li>
                    <li>Total annual contribution: $7,800</li>
                    <li>Growth rate: 8% annually</li>
                    <li>Year 10 value: ${moderateRetirementData[9].balance.toLocaleString()}</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
      
      <div className="mt-12">
        <h2 className="text-2xl font-bold text-blue-600 mb-6">Net Worth Summary (Year 10)</h2>
        
        <Card className="shadow-lg hover:shadow-xl transition-all duration-300">
          <CardHeader>
            <CardTitle>Net Worth Components</CardTitle>
            <CardDescription>Projected values after 10 years</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="h-96 flex justify-center items-center w-full"> {/* Added w-full to ensure full width */}
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={netWorthData}
                    margin={{ top: 20, right: 20, left: 120, bottom: 5 }}
                    layout="vertical"
                    className="w-full" // Ensure full width of the container
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis 
                      type="number" 
                      tickFormatter={(tick) => `$${(tick / 1000).toFixed(0)}K`} 
                    />
                    <YAxis 
                      dataKey="category" 
                      type="category" 
                      width={110} 
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
    </div>
  );
};

export default Phase3;
