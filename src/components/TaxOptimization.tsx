import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { InfoIcon } from "lucide-react";

const TaxOptimization = () => {
  // Income values
  const [katieIncome, setKatieIncome] = useState(80000);
  const [chadIncome, setChadIncome] = useState(73265);
  const totalIncome = katieIncome + chadIncome;

  // Retirement contributions
  const [katieContribPct, setKatieContribPct] = useState(4);
  const [chadRothContrib, setChadRothContrib] = useState(3000);
  const katieContribAmount = Math.round(katieIncome * (katieContribPct / 100));

  // Add new state for 401(k) comparison
  const [traditional401kResult, setTraditional401kResult] = useState(0);
  const [roth401kResult, setRoth401kResult] = useState(0);
  const [traditional401kTax, setTraditional401kTax] = useState(0);

  // Tax deductions
  const [standardDeduction, setStandardDeduction] = useState(29600);
  const [additionalDeductions, setAdditionalDeductions] = useState(0);
  const [useHSA, setUseHSA] = useState(false);
  const [hsaContribution, setHsaContribution] = useState(3850);
  const [studentLoanInterest, setStudentLoanInterest] = useState(0);
  const [charitableContributions, setCharitableContributions] = useState(0);
  const [educatorExpenses, setEducatorExpenses] = useState(0);

  // Kentucky state tax rate
  const [kyTaxRate, setKyTaxRate] = useState(4.00);

  // Calculated values
  const [taxableIncome, setTaxableIncome] = useState(0);
  const [federalTax, setFederalTax] = useState(0);
  const [stateTax, setStateTax] = useState(0);
  const [totalTax, setTotalTax] = useState(0);
  const [netIncome, setNetIncome] = useState(0);
  const [monthlyIncome, setMonthlyIncome] = useState(0);
  
  // Calculate tax brackets (2023 rates for married filing jointly)
  const calculateFederalTax = (taxable: number) => {
    if (taxable <= 0) return 0;
    
    let tax = 0;
    
    if (taxable > 0) {
      if (taxable <= 22000) {
        tax += taxable * 0.10;
      } else {
        tax += 22000 * 0.10;
        
        if (taxable <= 89450) {
          tax += (taxable - 22000) * 0.12;
        } else {
          tax += (89450 - 22000) * 0.12;
          
          if (taxable <= 190750) {
            tax += (taxable - 89450) * 0.22;
          } else {
            tax += (190750 - 89450) * 0.22;
            
            if (taxable <= 364200) {
              tax += (taxable - 190750) * 0.24;
            } else {
              tax += (364200 - 190750) * 0.24;
              
              if (taxable <= 462500) {
                tax += (taxable - 364200) * 0.32;
              } else {
                tax += (462500 - 364200) * 0.32;
                
                if (taxable <= 693750) {
                  tax += (taxable - 462500) * 0.35;
                } else {
                  tax += (693750 - 462500) * 0.35;
                  tax += (taxable - 693750) * 0.37;
                }
              }
            }
          }
        }
      }
    }
    
    return Math.round(tax);
  };

  // Update all calculations when inputs change
  useEffect(() => {
    // Calculate total deductions
    const totalDeductions = standardDeduction + 
                           (useHSA ? hsaContribution : 0) + 
                           studentLoanInterest +
                           charitableContributions + 
                           educatorExpenses +
                           additionalDeductions + 
                           katieContribAmount;
    
    // Calculate taxable income
    const calculatedTaxableIncome = Math.max(0, totalIncome - totalDeductions);
    setTaxableIncome(calculatedTaxableIncome);
    
    // Calculate federal tax
    const calculatedFederalTax = calculateFederalTax(calculatedTaxableIncome);
    setFederalTax(calculatedFederalTax);
    
    // Calculate state tax
    const calculatedStateTax = Math.round(calculatedTaxableIncome * (kyTaxRate / 100));
    setStateTax(calculatedStateTax);
    
    // Calculate total tax and net income
    const calculatedTotalTax = calculatedFederalTax + calculatedStateTax;
    setTotalTax(calculatedTotalTax);
    
    const calculatedNetIncome = totalIncome - calculatedTotalTax - katieContribAmount - chadRothContrib;
    setNetIncome(calculatedNetIncome);
    
    // Calculate monthly income
    setMonthlyIncome(Math.round(calculatedNetIncome / 12));
  }, [
    katieIncome, 
    chadIncome, 
    katieContribPct, 
    chadRothContrib, 
    standardDeduction, 
    additionalDeductions, 
    useHSA, 
    hsaContribution, 
    studentLoanInterest, 
    charitableContributions, 
    educatorExpenses, 
    kyTaxRate,
    totalIncome
  ]);

  const optimizeTaxes = () => {
    // Recommend HSA if not using it
    if (!useHSA) {
      setUseHSA(true);
    }
    
    // Recommend increasing 401(k) contribution if below optimal levels
    if (katieContribPct < 12) {
      setKatieContribPct(12);
    }
    
    // Recommend maxing out Roth IRA contribution
    if (chadRothContrib < 6500) {
      setChadRothContrib(6500);
    }
  };

  // Add new state for Roth vs Traditional comparison
  const [contributionAmount, setContributionAmount] = useState(6000);
  const [yearsToRetirement, setYearsToRetirement] = useState(30);
  const [expectedReturnRate, setExpectedReturnRate] = useState(8);
  const [currentTaxRate, setCurrentTaxRate] = useState(22);
  const [retirementTaxRate, setRetirementTaxRate] = useState(12);

  // Calculate 401(k) comparison
  useEffect(() => {
    const monthlyContribution = katieContribAmount / 12;
    const monthlyRate = expectedReturnRate / 100 / 12;
    const totalMonths = yearsToRetirement * 12;

    // Calculate future value using compound interest formula
    const futureValue = monthlyContribution * (Math.pow(1 + monthlyRate, totalMonths) - 1) / monthlyRate;

    // Traditional 401(k) (pre-tax contribution, taxed at withdrawal)
    const traditional401kFutureValue = futureValue;
    const traditional401kTaxAmount = traditional401kFutureValue * (retirementTaxRate / 100);
    const traditional401kAfterTax = traditional401kFutureValue - traditional401kTaxAmount;

    // Roth 401(k) (post-tax contribution, tax-free withdrawal)
    const rothContributionAfterTax = katieContribAmount * (1 - (currentTaxRate / 100));
    const rothMonthlyContribution = rothContributionAfterTax / 12;
    const rothFutureValue = rothMonthlyContribution * (Math.pow(1 + monthlyRate, totalMonths) - 1) / monthlyRate;

    setTraditional401kResult(Math.round(traditional401kAfterTax));
    setRoth401kResult(Math.round(rothFutureValue));
    setTraditional401kTax(Math.round(traditional401kTaxAmount));
  }, [katieContribAmount, expectedReturnRate, yearsToRetirement, currentTaxRate, retirementTaxRate]);

  // Create data for 401(k) comparison chart
  const get401kComparisonData = () => [
    {
      name: 'Traditional 401(k)',
      value: traditional401kResult,
      tax: traditional401kTax,
      color: '#3b82f6'
    },
    {
      name: 'Roth 401(k)',
      value: roth401kResult,
      color: '#10b981'
    }
  ];

  // Function to determine recommendation
  const getRecommendation = () => {
    if (currentTaxRate < retirementTaxRate) {
      return "Based on your tax rates, a Roth option might be better since you're currently in a lower tax bracket than expected in retirement.";
    } else if (currentTaxRate > retirementTaxRate) {
      return "Based on your tax rates, a Traditional option might be better since you're currently in a higher tax bracket than expected in retirement.";
    }
    return "With equal tax rates, both options provide similar benefits. Consider your personal circumstances and future tax expectations.";
  };

  const calculateRothVsTraditional = () => {
    const monthlyContribution = contributionAmount / 12;
    const monthlyRate = expectedReturnRate / 100 / 12;
    const totalMonths = yearsToRetirement * 12;

    // Calculate future value using compound interest formula
    const futureValue = monthlyContribution * (Math.pow(1 + monthlyRate, totalMonths) - 1) / monthlyRate;

    // Traditional IRA (pre-tax contribution, taxed at withdrawal)
    const traditionalAfterTax = futureValue * (1 - (retirementTaxRate / 100));

    // Roth IRA (post-tax contribution, tax-free withdrawal)
    const rothContributionAfterTax = contributionAmount * (1 - (currentTaxRate / 100));
    const rothMonthlyContribution = rothContributionAfterTax / 12;
    const rothFutureValue = rothMonthlyContribution * (Math.pow(1 + monthlyRate, totalMonths) - 1) / monthlyRate;

    return [
      {
        name: 'Traditional IRA',
        value: Math.round(traditionalAfterTax),
        color: '#3b82f6'
      },
      {
        name: 'Roth IRA',
        value: Math.round(rothFutureValue),
        color: '#10b981'
      }
    ];
  };

  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index, name }: any) => {
    if (percent < 0.05) return null;
    
    const RADIAN = Math.PI / 180;
    const radius = outerRadius * 1.8;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
    
    return (
      <text 
        x={x} 
        y={y} 
        fill="#666"
        textAnchor={x > cx ? 'start' : 'end'} 
        dominantBaseline="central"
        fontSize={12}
      >
        {`${name}: ${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2">
        <Card className="shadow-lg hover:shadow-xl transition-all duration-300">
          <CardHeader>
            <CardTitle>Income & Tax Inputs</CardTitle>
            <CardDescription>Adjust your income, deductions, and tax variables</CardDescription>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="income">
                <AccordionTrigger className="text-blue-600 font-medium">Income Sources</AccordionTrigger>
                <AccordionContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <Label htmlFor="katieIncome">Katie's Annual Salary</Label>
                      <Input
                        id="katieIncome"
                        type="number"
                        value={katieIncome}
                        onChange={(e) => setKatieIncome(Number(e.target.value))}
                      />
                    </div>
                    <div>
                      <Label htmlFor="chadIncome">Chad's Annual Salary</Label>
                      <Input
                        id="chadIncome"
                        type="number"
                        value={chadIncome}
                        onChange={(e) => setChadIncome(Number(e.target.value))}
                      />
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="retirement">
                <AccordionTrigger className="text-blue-600 font-medium">Retirement Contributions</AccordionTrigger>
                <AccordionContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <Label htmlFor="katieContrib">Katie's 401(k) Contribution ({katieContribPct}%)</Label>
                      <div className="flex items-center mt-2">
                        <Slider 
                          id="katieContrib"
                          value={[katieContribPct]} 
                          min={0} 
                          max={20} 
                          step={1}
                          onValueChange={(value) => setKatieContribPct(value[0])}
                          className="flex-1 mr-4"
                        />
                        <span className="text-sm font-medium">${katieContribAmount}</span>
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="chadRoth">Chad's Roth IRA Contribution</Label>
                      <Input
                        id="chadRoth"
                        type="number"
                        value={chadRothContrib}
                        max={6500}
                        onChange={(e) => setChadRothContrib(Number(e.target.value))}
                      />
                      <span className="text-xs text-muted-foreground">Max contribution: $6,500</span>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="deductions">
                <AccordionTrigger className="text-blue-600 font-medium">Tax Deductions</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-6">
                    <div>
                      <Label htmlFor="standardDeduction">Standard Deduction</Label>
                      <Input
                        id="standardDeduction"
                        type="number"
                        value={standardDeduction}
                        onChange={(e) => setStandardDeduction(Number(e.target.value))}
                      />
                      <span className="text-xs text-muted-foreground">Default for married filing jointly: $29,600</span>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Switch
                        id="hsa"
                        checked={useHSA}
                        onCheckedChange={setUseHSA}
                      />
                      <Label htmlFor="hsa">Use Health Savings Account (HSA)</Label>
                    </div>

                    {useHSA && (
                      <div>
                        <Label htmlFor="hsaContribution">HSA Contribution</Label>
                        <Input
                          id="hsaContribution"
                          type="number"
                          value={hsaContribution}
                          onChange={(e) => setHsaContribution(Number(e.target.value))}
                        />
                        <span className="text-xs text-muted-foreground">Max for individual: $3,850 | Family: $7,750</span>
                      </div>
                    )}

                    <div>
                      <Label htmlFor="studentLoanInterest">Student Loan Interest</Label>
                      <Input
                        id="studentLoanInterest"
                        type="number"
                        value={studentLoanInterest}
                        onChange={(e) => setStudentLoanInterest(Number(e.target.value))}
                      />
                      <span className="text-xs text-muted-foreground">Max deduction: $2,500</span>
                    </div>

                    <div>
                      <Label htmlFor="charitableContributions">Charitable Contributions</Label>
                      <Input
                        id="charitableContributions"
                        type="number"
                        value={charitableContributions}
                        onChange={(e) => setCharitableContributions(Number(e.target.value))}
                      />
                    </div>

                    <div>
                      <Label htmlFor="educatorExpenses">Educator Expenses</Label>
                      <Input
                        id="educatorExpenses"
                        type="number"
                        value={educatorExpenses}
                        onChange={(e) => setEducatorExpenses(Number(e.target.value))}
                      />
                      <span className="text-xs text-muted-foreground">Max deduction: $300 per educator</span>
                    </div>

                    <div>
                      <Label htmlFor="additionalDeductions">Additional Deductions</Label>
                      <Input
                        id="additionalDeductions"
                        type="number"
                        value={additionalDeductions}
                        onChange={(e) => setAdditionalDeductions(Number(e.target.value))}
                      />
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="state">
                <AccordionTrigger className="text-blue-600 font-medium">State Tax Settings</AccordionTrigger>
                <AccordionContent>
                  <div className="mb-6">
                    <Label htmlFor="kyTaxRate">Kentucky State Tax Rate (%)</Label>
                    <Input
                      id="kyTaxRate"
                      type="number"
                      value={kyTaxRate}
                      onChange={(e) => setKyTaxRate(Number(e.target.value))}
                      step={0.1}
                    />
                    <span className="text-xs text-muted-foreground">Current Kentucky flat tax rate: 4.5%</span>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            <div className="mt-6">
              <Button 
                onClick={optimizeTaxes}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white"
              >
                Optimize Tax Strategy
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="shadow-lg hover:shadow-xl transition-all duration-300">
        <CardHeader>
          <CardTitle>Tax Calculation Results</CardTitle>
          <CardDescription>Based on your inputs</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <p className="text-sm text-muted-foreground">Total Income</p>
            <p className="text-2xl font-bold">${totalIncome.toLocaleString()}</p>
          </div>

          <div>
            <p className="text-sm text-muted-foreground">Taxable Income</p>
            <p className="text-2xl font-bold">${taxableIncome.toLocaleString()}</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Federal Tax</p>
              <p className="text-lg font-semibold">${federalTax.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">State Tax</p>
              <p className="text-lg font-semibold">${stateTax.toLocaleString()}</p>
            </div>
          </div>

          <div>
            <p className="text-sm text-muted-foreground">Total Tax</p>
            <p className="text-xl font-bold">${totalTax.toLocaleString()}</p>
            <p className="text-xs text-muted-foreground">Effective Tax Rate: {((totalTax / totalIncome) * 100).toFixed(1)}%</p>
          </div>

          <div className="pt-4 border-t border-gray-200">
            <p className="text-sm text-muted-foreground">Net Annual Income</p>
            <p className="text-2xl font-bold text-blue-600">${netIncome.toLocaleString()}</p>
          </div>

          <div>
            <p className="text-sm text-muted-foreground">Net Monthly Income</p>
            <p className="text-2xl font-bold text-blue-600">${monthlyIncome.toLocaleString()}</p>
          </div>
        </CardContent>
      </Card>

      <div className="lg:col-span-3">
        <Card className="shadow-lg hover:shadow-xl transition-all duration-300">
          <CardHeader>
            <CardTitle>Roth vs Traditional IRA Comparison</CardTitle>
            <CardDescription>Compare the long-term impact of Roth vs Traditional IRA contributions</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <Label htmlFor="contribution">Annual Contribution ($)</Label>
                <Input
                  id="contribution"
                  type="number"
                  value={contributionAmount}
                  onChange={(e) => setContributionAmount(Number(e.target.value))}
                  max={6500}
                />
                <span className="text-xs text-muted-foreground">Max: $6,500 (2023)</span>
              </div>
              <div>
                <Label htmlFor="years">Years to Retirement</Label>
                <Input
                  id="years"
                  type="number"
                  value={yearsToRetirement}
                  onChange={(e) => setYearsToRetirement(Number(e.target.value))}
                />
              </div>
              <div>
                <Label htmlFor="return">Expected Return Rate (%)</Label>
                <Input
                  id="return"
                  type="number"
                  value={expectedReturnRate}
                  onChange={(e) => setExpectedReturnRate(Number(e.target.value))}
                />
              </div>
              <div>
                <Label htmlFor="retirementTax">Expected Retirement Tax Rate (%)</Label>
                <Input
                  id="retirementTax"
                  type="number"
                  value={retirementTaxRate}
                  onChange={(e) => setRetirementTaxRate(Number(e.target.value))}
                />
              </div>
            </div>

            <div className="h-[500px] mt-8">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={calculateRothVsTraditional()}
                  margin={{
                    top: 20,
                    right: 60,
                    left: 150,
                    bottom: 50
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis 
                    tickFormatter={(value) => `$${(value / 1000).toFixed(0)}K`}
                    label={{ 
                      value: 'Account Value at Retirement', 
                      angle: -90, 
                      position: 'insideLeft',
                      offset: -130,
                      style: { textAnchor: 'middle' }
                    }}
                  />
                  <Tooltip 
                    formatter={(value: any) => [`$${Number(value).toLocaleString()}`, 'Value at Retirement']}
                  />
                  <Legend />
                  <Bar dataKey="value" fill="#3b82f6" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="lg:col-span-3">
        <Card className="shadow-lg hover:shadow-xl transition-all duration-300">
          <CardHeader>
            <CardTitle>401(k) Traditional vs Roth Comparison</CardTitle>
            <CardDescription>Compare the long-term impact of Traditional vs Roth 401(k) contributions based on Katie's current contribution</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="h-[500px] mt-8">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={get401kComparisonData()}
                  margin={{
                    top: 20,
                    right: 60,
                    left: 150,
                    bottom: 50
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis 
                    tickFormatter={(value) => `$${(value / 1000).toFixed(0)}K`}
                    label={{ 
                      value: 'Account Value at Retirement', 
                      angle: -90, 
                      position: 'insideLeft',
                      offset: -130,
                      style: { textAnchor: 'middle' }
                    }}
                  />
                  <Tooltip 
                    formatter={(value: any, name: any) => {
                      if (name === "tax") return [`$${Number(value).toLocaleString()}`, "Tax at Withdrawal"];
                      return [`$${Number(value).toLocaleString()}`, "After-Tax Value"];
                    }}
                  />
                  <Legend />
                  <Bar dataKey="value" fill="#3b82f6" name="After-Tax Value" />
                  <Bar dataKey="tax" fill="#ef4444" name="Tax at Withdrawal" stackId="tax" />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <Alert>
              <InfoIcon className="h-4 w-4" />
              <AlertTitle>Recommendation</AlertTitle>
              <AlertDescription>
                {getRecommendation()}
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TaxOptimization;
