
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useToast } from "@/hooks/use-toast";

const Calculator = () => {
  const { toast } = useToast();
  const [principal, setPrincipal] = useState(10000);
  const [monthlyContribution, setMonthlyContribution] = useState(500);
  const [annualRate, setAnnualRate] = useState(8);
  const [years, setYears] = useState(10);
  const [compoundFrequency, setCompoundFrequency] = useState("monthly");
  const [futureValue, setFutureValue] = useState(0);
  const [totalContributions, setTotalContributions] = useState(0);
  const [interestEarned, setInterestEarned] = useState(0);
  const [chartData, setChartData] = useState<Array<{year: number, value: number, principal: number, interest: number}>>([]);

  const calculateCompoundInterest = () => {
    let p = principal;
    let r = annualRate / 100;
    let t = years;
    let n = compoundFrequency === "monthly" ? 12 : 
            compoundFrequency === "quarterly" ? 4 : 
            compoundFrequency === "semiannually" ? 2 : 1;
    let pmt = monthlyContribution * (compoundFrequency === "monthly" ? 1 : 
              compoundFrequency === "quarterly" ? 3 : 
              compoundFrequency === "semiannually" ? 6 : 12);
    
    let futureVal = 0;
    let totalPrincipal = p;
    let yearlyData = [];
    
    // Create a year by year simulation
    for (let year = 1; year <= t; year++) {
      let yearStart = year === 1 ? p : yearlyData[year-2].value;
      let yearEnd = yearStart;
      
      // Compound n times per year
      for (let period = 0; period < n; period++) {
        yearEnd = yearEnd * (1 + r/n) + pmt;
      }
      
      totalPrincipal += pmt * n;
      
      yearlyData.push({
        year: year,
        value: yearEnd,
        principal: totalPrincipal,
        interest: yearEnd - totalPrincipal
      });
    }
    
    setFutureValue(yearlyData[t-1].value);
    setTotalContributions(totalPrincipal);
    setInterestEarned(yearlyData[t-1].value - totalPrincipal);
    setChartData(yearlyData);

    toast({
      title: "Calculation Complete",
      description: `Your investment of $${principal.toLocaleString()} will grow to $${Math.round(yearlyData[t-1].value).toLocaleString()} in ${t} years.`,
    });
  };

  // Calculate on mount and when inputs change
  useEffect(() => {
    calculateCompoundInterest();
  }, [principal, monthlyContribution, annualRate, years, compoundFrequency]);

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold text-blue-600 mb-8">Compound Interest Calculator</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-1 shadow-lg hover:shadow-xl transition-all duration-300">
          <CardHeader>
            <CardTitle>Investment Details</CardTitle>
            <CardDescription>Adjust your investment parameters</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="principal">Initial Investment</Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                <Input
                  id="principal"
                  type="number"
                  value={principal}
                  onChange={(e) => setPrincipal(Number(e.target.value))}
                  className="pl-8"
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="contribution">Monthly Contribution</Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                <Input
                  id="contribution"
                  type="number"
                  value={monthlyContribution}
                  onChange={(e) => setMonthlyContribution(Number(e.target.value))}
                  className="pl-8"
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="rate">Annual Interest Rate (%)</Label>
              <div className="relative">
                <Input
                  id="rate"
                  type="number"
                  value={annualRate}
                  onChange={(e) => setAnnualRate(Number(e.target.value))}
                  className="pr-8"
                  step="0.1"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">%</span>
              </div>
            </div>
            
            <div>
              <Label htmlFor="years">Investment Period (Years)</Label>
              <Input
                id="years"
                type="number"
                value={years}
                onChange={(e) => setYears(Number(e.target.value))}
                min="1"
                max="50"
              />
            </div>
            
            <div>
              <Label htmlFor="compound">Compound Frequency</Label>
              <Tabs defaultValue="monthly" value={compoundFrequency} onValueChange={setCompoundFrequency}>
                <TabsList className="grid grid-cols-4 w-full">
                  <TabsTrigger value="monthly">Monthly</TabsTrigger>
                  <TabsTrigger value="quarterly">Quarterly</TabsTrigger>
                  <TabsTrigger value="semiannually">Semi-Annual</TabsTrigger>
                  <TabsTrigger value="annually">Annual</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={calculateCompoundInterest} className="w-full bg-blue-600 hover:bg-blue-700">
              Calculate
            </Button>
          </CardFooter>
        </Card>
        
        <Card className="lg:col-span-2 shadow-lg hover:shadow-xl transition-all duration-300">
          <CardHeader>
            <CardTitle>Investment Growth</CardTitle>
            <CardDescription>Watch your money grow over time</CardDescription>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={chartData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" label={{ value: 'Years', position: 'insideBottomRight', offset: -10 }} />
                <YAxis 
                  tickFormatter={(value) => `$${Math.round(value).toLocaleString()}`}
                  label={{ value: '', angle: -90, position: 'insideLeft' }}
                />
                <Tooltip 
                  formatter={(value) => [`$${Math.round(Number(value)).toLocaleString()}`, '']}
                  labelFormatter={(label) => `Year ${label}`}
                />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="value" 
                  name="Total Value" 
                  stroke="#3b82f6" 
                  activeDot={{ r: 8 }} 
                  strokeWidth={2}
                />
                <Line 
                  type="monotone" 
                  dataKey="principal" 
                  name="Total Contributions" 
                  stroke="#10b981" 
                  strokeWidth={2}
                />
                <Line 
                  type="monotone" 
                  dataKey="interest" 
                  name="Interest Earned" 
                  stroke="#f97316" 
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        <Card className="bg-blue-50 border-blue-200 shadow-md hover:shadow-xl transition-all duration-300">
          <CardHeader>
            <CardTitle className="text-center text-blue-700">Future Value</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-center text-blue-600">
              ${Math.round(futureValue).toLocaleString()}
            </p>
          </CardContent>
        </Card>
        
        <Card className="bg-green-50 border-green-200 shadow-md hover:shadow-xl transition-all duration-300">
          <CardHeader>
            <CardTitle className="text-center text-green-700">Total Contributions</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-center text-green-600">
              ${Math.round(totalContributions).toLocaleString()}
            </p>
          </CardContent>
        </Card>
        
        <Card className="bg-orange-50 border-orange-200 shadow-md hover:shadow-xl transition-all duration-300">
          <CardHeader>
            <CardTitle className="text-center text-orange-700">Interest Earned</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-center text-orange-600">
              ${Math.round(interestEarned).toLocaleString()}
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Calculator;
