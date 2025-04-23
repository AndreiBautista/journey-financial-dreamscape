
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

const Phase2 = () => {
  const [track, setTrack] = useState<"aggressive" | "moderate">("aggressive");

  // Baby fund growth simulation
  const generateBabyFundData = (monthlyContribution: number, years: number, rate: number = 4.35) => {
    const data = [];
    let balance = 0;
    
    for (let month = 1; month <= years * 12; month++) {
      balance = balance * (1 + rate / 100 / 12) + monthlyContribution;
      
      if (month % 6 === 0) {
        data.push({
          month: month,
          year: (month / 12).toFixed(1),
          balance: Math.round(balance),
          goal: 12500,
        });
      }
    }
    
    return data;
  };

  const aggressiveData = generateBabyFundData(300, 3);
  const moderateData = generateBabyFundData(200, 5);

  // Calculate current progress
  const aggressiveProgress = Math.min(100, (aggressiveData[aggressiveData.length - 1].balance / 12500) * 100);
  const moderateProgress = Math.min(100, (moderateData[moderateData.length - 1].balance / 12500) * 100);

  const babyFundCategories = [
    { name: "Medical (birth + OB)", amount: 6000 },
    { name: "Nursery & gear", amount: 3000 },
    { name: "Diapers/formula/supplies", amount: 2500 },
    { name: "Safety + prep", amount: 1000 },
  ];

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold text-blue-600 mb-8">Phase 2: Family & Growth (Years 3-5)</h1>
      
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
                <CardDescription>Aggressive growth over Years 3-5</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="font-medium text-blue-700">Family Planning</p>
                  <p>Baby born Year 3, fund ready</p>
                </div>
                <div>
                  <p className="font-medium text-blue-700">Insurance Strategy</p>
                  <p>Raise insurance deductibles post-Emergency Fund</p>
                </div>
                <div>
                  <p className="font-medium text-blue-700">Lake Fund</p>
                  <p>Start Lake Fund: $800/month</p>
                </div>
                <div>
                  <p className="font-medium text-blue-700">Baby Fund Strategy</p>
                  <p>$300/mo × 3 yrs → $11,767 (4.35%)</p>
                </div>
              </CardContent>
            </Card>
            
            <Card className="shadow-lg hover:shadow-xl transition-all duration-300">
              <CardHeader>
                <CardTitle>Baby Fund Progress</CardTitle>
                <CardDescription>Aggressive Track: $300/month for 3 years</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="font-medium">Progress to Goal</span>
                    <span>${aggressiveData[aggressiveData.length - 1].balance.toLocaleString()} / $12,500</span>
                  </div>
                  <Progress value={aggressiveProgress} className="h-2" />
                  <p className="text-sm text-gray-500 mt-1">Expected ready date: Year 3</p>
                </div>
                
                <div className="h-80 mt-6">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                      data={aggressiveData}
                      margin={{ top: 20, right: 30, left: 10, bottom: 30 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis 
                        dataKey="year" 
                        label={{ 
                          value: 'Year', 
                          position: 'insideBottomRight', 
                          offset: -10 
                        }}
                      />
                      <YAxis 
                        tickFormatter={(tick) => `$${tick.toLocaleString()}`} 
                        label={{ 
                          value: 'Balance', 
                          angle: -90, 
                          position: 'insideLeft',
                          offset: 10,
                          style: { textAnchor: 'middle' } 
                        }}
                        width={80}
                      />
                      <Tooltip 
                        formatter={(value) => [`$${Number(value).toLocaleString()}`, '']}
                        labelFormatter={(label) => `Year ${label}`}
                        contentStyle={{ backgroundColor: 'white', border: '1px solid #ccc', borderRadius: '4px', padding: '10px' }}
                      />
                      <Legend wrapperStyle={{ paddingTop: 10 }} />
                      <Area 
                        type="monotone" 
                        dataKey="balance" 
                        name="Baby Fund" 
                        stroke="#8884d8" 
                        fill="#8884d8" 
                      />
                      <Area 
                        type="monotone" 
                        dataKey="goal" 
                        name="Goal" 
                        stroke="#82ca9d" 
                        fill="none" 
                        strokeDasharray="5 5"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
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
                <CardDescription>Moderate approach over Years 3-5</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="font-medium text-blue-700">Family Planning</p>
                  <p>Baby born Year 5</p>
                </div>
                <div>
                  <p className="font-medium text-blue-700">Lake Fund</p>
                  <p>Lake Fund: $300/month from Year 4</p>
                </div>
                <div>
                  <p className="font-medium text-blue-700">Baby Fund Strategy</p>
                  <p>$200/mo × 5 yrs → $13,660 (4.35%)</p>
                </div>
              </CardContent>
            </Card>
            
            <Card className="shadow-lg hover:shadow-xl transition-all duration-300">
              <CardHeader>
                <CardTitle>Baby Fund Progress</CardTitle>
                <CardDescription>Moderate Track: $200/month for 5 years</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="font-medium">Progress to Goal</span>
                    <span>${moderateData[moderateData.length - 1].balance.toLocaleString()} / $12,500</span>
                  </div>
                  <Progress value={moderateProgress} className="h-2" />
                  <p className="text-sm text-gray-500 mt-1">Expected ready date: Year 5</p>
                </div>
                
                <div className="h-80 mt-6">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                      data={moderateData}
                      margin={{ top: 20, right: 30, left: 10, bottom: 30 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis 
                        dataKey="year" 
                        label={{ 
                          value: 'Year', 
                          position: 'insideBottomRight', 
                          offset: -10 
                        }}
                      />
                      <YAxis 
                        tickFormatter={(tick) => `$${tick.toLocaleString()}`} 
                        label={{ 
                          value: 'Balance', 
                          angle: -90, 
                          position: 'insideLeft',
                          offset: 10,
                          style: { textAnchor: 'middle' } 
                        }}
                        width={80}
                      />
                      <Tooltip 
                        formatter={(value) => [`$${Number(value).toLocaleString()}`, '']}
                        labelFormatter={(label) => `Year ${label}`}
                        contentStyle={{ backgroundColor: 'white', border: '1px solid #ccc', borderRadius: '4px', padding: '10px' }}
                      />
                      <Legend wrapperStyle={{ paddingTop: 10 }} />
                      <Area 
                        type="monotone" 
                        dataKey="balance" 
                        name="Baby Fund" 
                        stroke="#f59e0b" 
                        fill="#f59e0b" 
                      />
                      <Area 
                        type="monotone" 
                        dataKey="goal" 
                        name="Goal" 
                        stroke="#82ca9d" 
                        fill="none" 
                        strokeDasharray="5 5"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
      
      <div className="mt-12">
        <h2 className="text-2xl font-bold text-blue-600 mb-6">Baby Fund Breakdown</h2>
        
        <Card className="shadow-lg hover:shadow-xl transition-all duration-300">
          <CardHeader>
            <CardTitle>Baby Fund Categories</CardTitle>
            <CardDescription>Estimated costs for baby preparation</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3">Item</th>
                    <th className="text-right py-3">Cost</th>
                    <th className="text-left py-3"> Notes</th>
                  </tr>
                </thead>
                <tbody>
                  {babyFundCategories.map((item, index) => (
                    <tr key={index} className="border-b hover:bg-gray-50">
                      <td className="py-3">{item.name}</td>
                      <td className="text-right py-3">${item.amount.toLocaleString()}</td>
                      <td className="py-3 pl-4 text-gray-600">
                        {item.name === "Medical (birth + OB)" && "Assumes insurance coverage with deductible/copays"}
                        {item.name === "Nursery & gear" && "Includes crib, furniture, stroller, car seat"}
                        {item.name === "Diapers/formula/supplies" && "First year essentials"}
                        {item.name === "Safety + prep" && "Childproofing and preparation items"}
                      </td>
                    </tr>
                  ))}
                  <tr className="font-bold bg-gray-50">
                    <td className="py-3">Total</td>
                    <td className="text-right py-3">$12,500</td>
                    <td className="py-3"></td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-lg mb-2">Aggressive Track Strategy</h3>
                <ul className="list-disc list-inside space-y-1">
                  <li>$300/month contribution for 3 years</li>
                  <li>Invested in HYSA at 4.35% APY</li>
                  <li>Final balance: $11,767</li>
                  <li>Baby planned for Year 3</li>
                  <li>Focus on career growth during this period</li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-semibold text-lg mb-2">Moderate Track Strategy</h3>
                <ul className="list-disc list-inside space-y-1">
                  <li>$200/month contribution for 5 years</li>
                  <li>Invested in HYSA at 4.35% APY</li>
                  <li>Final balance: $13,660</li>
                  <li>Baby planned for Year 5</li>
                  <li>More time for career establishment</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Phase2;
