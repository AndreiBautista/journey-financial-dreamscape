
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { InfoIcon, ShieldIcon, AlertTriangleIcon } from "lucide-react";

const InsuranceOptimization = () => {
  // Emergency Fund
  const [emergencyFund, setEmergencyFund] = useState(4000);
  const [emergencyFundGoal, setEmergencyFundGoal] = useState(10000);
  
  // Auto Insurance
  const [autoInsuranceType, setAutoInsuranceType] = useState("full");
  const [lowDeductible, setLowDeductible] = useState(true);
  const [currentAutoDeductible, setCurrentAutoDeductible] = useState(500);
  const [currentAutoPremium, setCurrentAutoPremium] = useState(4059);
  const [higherAutoDeductible, setHigherAutoDeductible] = useState(1000);
  const [higherAutoPremium, setHigherAutoPremium] = useState(3,247);
  
  // Home Insurance
  const [currentHomeDeductible, setCurrentHomeDeductible] = useState(1000);
  const [currentHomePremium, setCurrentHomePremium] = useState(3,564);
  const [higherHomeDeductible, setHigherHomeDeductible] = useState(2500);
  const [higherHomePremium, setHigherHomePremium] = useState(2,850);
  
  // Health Insurance
  const [healthDeductible, setHealthDeductible] = useState(3000);
  const [healthPremium, setHealthPremium] = useState(0);
  const [hasHSA, setHasHSA] = useState(false);
  const [hsaContribution, setHsaContribution] = useState(0);
  
  // Life Insurance
  const [katieLifeInsurance, setKatieLifeInsurance] = useState(80000);
  const [chadLifeInsurance, setChadLifeInsurance] = useState();
  const [recommendedLifeInsurance, setRecommendedLifeInsurance] = useState(0);
  
  // Boat Insurance
  const [hasBoatInsurance, setHasBoatInsurance] = useState(false);
  const [boatInsurancePremium, setBoatInsurancePremium] = useState(0);
  const [boatValue, setBoatValue] = useState(80000);
  
  // Umbrella Policy
  const [hasUmbrellaPolicy, setHasUmbrellaPolicy] = useState(false);
  const [umbrellaPremium, setUmbrellaPremium] = useState(0);
  const [umbrellaRecommended, setUmbrellaRecommended] = useState(false);
  
  // Total net worth (simplified calculation)
  const [netWorth, setNetWorth] = useState(50000);
  
  // Calculations and recommendations
  const [readyForHigherDeductibles, setReadyForHigherDeductibles] = useState(false);
  const [annualSavings, setAnnualSavings] = useState(0);
  const [insuranceRecommendations, setInsuranceRecommendations] = useState<string[]>([]);
  
  // Calculate emergency fund percentage
  const emergencyFundPercentage = Math.min(100, (emergencyFund / emergencyFundGoal) * 100);
  
  // Calculate potential auto insurance savings
  const autoSavings = lowDeductible ? (currentAutoPremium - higherAutoPremium) : 0;
  
  // Calculate potential home insurance savings
  const homeSavings = lowDeductible ? (currentHomePremium - higherHomePremium) : 0;
  
  // Calculate total potential savings
  const totalAnnualSavings = autoSavings + homeSavings;
  
  // Update recommended life insurance (5x salary)
  useEffect(() => {
    setRecommendedLifeInsurance(80000 * 5);
  }, []);
  
  // Check if umbrella policy is recommended (net worth > $500K)
  useEffect(() => {
    setUmbrellaRecommended(netWorth > 500000);
    if (netWorth > 500000 && !hasUmbrellaPolicy) {
      setUmbrellaPremium(400); // Estimated annual premium
    }
  }, [netWorth, hasUmbrellaPolicy]);
  
  // Check if ready for higher deductibles
  useEffect(() => {
    setReadyForHigherDeductibles(emergencyFund >= 10000);
    setAnnualSavings(totalAnnualSavings);
  }, [emergencyFund, totalAnnualSavings]);
  
  // Generate insurance recommendations
  useEffect(() => {
    const recommendations = [];
    
    if (!hasBoatInsurance) {
      recommendations.push("Add boat insurance to protect your $80,000 boat investment.");
    }
    
    if (katieLifeInsurance < recommendedLifeInsurance) {
      recommendations.push(`Increase Katie's life insurance from $${katieLifeInsurance.toLocaleString()} to at least $${recommendedLifeInsurance.toLocaleString()} (5x salary).`);
    }
    
    if (readyForHigherDeductibles && lowDeductible) {
      recommendations.push(`Consider raising deductibles to save $${totalAnnualSavings.toLocaleString()} annually.`);
    }
    
    if (umbrellaRecommended && !hasUmbrellaPolicy) {
      recommendations.push("Add umbrella policy for additional liability protection.");
    }
    
    if (!hasHSA && healthDeductible > 1500) {
      recommendations.push("Consider opening an HSA account for tax advantages on medical expenses.");
    }
    
    setInsuranceRecommendations(recommendations);
  }, [
    hasBoatInsurance,
    katieLifeInsurance,
    recommendedLifeInsurance,
    readyForHigherDeductibles,
    lowDeductible,
    totalAnnualSavings,
    umbrellaRecommended,
    hasUmbrellaPolicy,
    hasHSA,
    healthDeductible
  ]);
  
  // Update boat insurance premium
  const calculateBoatInsurance = () => {
    // Basic calculation for boat insurance (typically 1-1.5% of boat value)
    const premium = Math.round(boatValue * 0.0125);
    setBoatInsurancePremium(premium);
    setHasBoatInsurance(true);
  };
  
  // Update umbrella policy
  const addUmbrellaPolicy = () => {
    setHasUmbrellaPolicy(true);
  };
  
  // Optimize insurance coverage
  const optimizeInsurance = () => {
    // Add boat insurance if missing
    if (!hasBoatInsurance) {
      calculateBoatInsurance();
    }
    
    // Increase life insurance if too low
    if (katieLifeInsurance < recommendedLifeInsurance) {
      setKatieLifeInsurance(recommendedLifeInsurance);
    }
    
    // Add umbrella policy if recommended
    if (umbrellaRecommended && !hasUmbrellaPolicy) {
      addUmbrellaPolicy();
    }
    
    // Switch to HSA if eligible
    if (!hasHSA && healthDeductible > 1500) {
      setHasHSA(true);
      setHsaContribution(3850); // Individual HSA contribution limit for 2023
    }
    
    // Raise deductibles if emergency fund allows
    if (readyForHigherDeductibles && lowDeductible) {
      setLowDeductible(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="shadow-lg hover:shadow-xl transition-all duration-300">
          <CardHeader>
            <CardTitle>Emergency Fund Status</CardTitle>
            <CardDescription>Your safety net for higher deductibles</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between mb-1">
              <span className="font-medium">Emergency Fund</span>
              <span>${emergencyFund.toLocaleString()} / ${emergencyFundGoal.toLocaleString()}</span>
            </div>
            <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-blue-500 transition-all duration-500"
                style={{ width: `${emergencyFundPercentage}%` }}
              ></div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div>
                <Label htmlFor="currentFund">Current Amount</Label>
                <Input
                  id="currentFund"
                  type="number"
                  value={emergencyFund}
                  onChange={(e) => setEmergencyFund(Number(e.target.value))}
                />
              </div>
              <div>
                <Label htmlFor="fundGoal">Target Amount</Label>
                <Input
                  id="fundGoal"
                  type="number"
                  value={emergencyFundGoal}
                  onChange={(e) => setEmergencyFundGoal(Number(e.target.value))}
                />
              </div>
            </div>
            
            {readyForHigherDeductibles ? (
              <Alert className="mt-4 bg-green-50 text-green-800 border-green-200">
                <ShieldIcon className="h-4 w-4 text-green-500" />
                <AlertTitle>Ready for Higher Deductibles</AlertTitle>
                <AlertDescription>
                  Your emergency fund is sufficient to support higher insurance deductibles, potentially saving you ${totalAnnualSavings.toLocaleString()} per year.
                </AlertDescription>
              </Alert>
            ) : (
              <Alert className="mt-4">
                <InfoIcon className="h-4 w-4" />
                <AlertTitle>Building Your Safety Net</AlertTitle>
                <AlertDescription>
                  Continue building your emergency fund to ${emergencyFundGoal.toLocaleString()} before raising insurance deductibles.
                </AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>
        
        <Card className="shadow-lg hover:shadow-xl transition-all duration-300">
          <CardHeader>
            <CardTitle>Insurance Recommendations</CardTitle>
            <CardDescription>Opportunities to optimize your coverage</CardDescription>
          </CardHeader>
          <CardContent>
            {insuranceRecommendations.length > 0 ? (
              <ul className="space-y-4">
                {insuranceRecommendations.map((recommendation, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <InfoIcon className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
                    <span>{recommendation}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="flex items-center justify-center h-32 text-gray-500">
                <p>Your insurance coverage is optimized!</p>
              </div>
            )}
            
            <Button 
              onClick={optimizeInsurance}
              className="w-full mt-6 bg-blue-600 hover:bg-blue-700"
            >
              Apply All Recommendations
            </Button>
          </CardContent>
        </Card>
      </div>
      
      <div>
        <Tabs defaultValue="auto" className="w-full">
          <TabsList className="grid grid-cols-5 mb-6">
            <TabsTrigger value="auto">Auto</TabsTrigger>
            <TabsTrigger value="home">Home</TabsTrigger>
            <TabsTrigger value="health">Health</TabsTrigger>
            <TabsTrigger value="life">Life</TabsTrigger>
            <TabsTrigger value="other">Other</TabsTrigger>
          </TabsList>
          
          <TabsContent value="auto">
            <Card>
              <CardHeader>
                <CardTitle>Auto Insurance</CardTitle>
                <CardDescription>Compare low vs. high deductible plans</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="autoType">Coverage Type</Label>
                    <Select 
                      value={autoInsuranceType}
                      onValueChange={setAutoInsuranceType}
                    >
                      <SelectTrigger id="autoType" className="w-[180px]">
                        <SelectValue placeholder="Select coverage" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="full">Full Coverage</SelectItem>
                        <SelectItem value="liability">Liability Only</SelectItem>
                        <SelectItem value="minimum">Minimum Coverage</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Switch
                    id="lowAutoDeductible"
                    checked={lowDeductible}
                    onCheckedChange={setLowDeductible}
                    disabled={!readyForHigherDeductibles}
                  />
                  <Label htmlFor="lowAutoDeductible">
                    {lowDeductible ? "Low Deductible Plan" : "High Deductible Plan"}
                  </Label>
                </div>
                
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="currentDeductible">
                      {lowDeductible ? "Current Deductible" : "Previous Deductible"}
                    </Label>
                    <Input
                      id="currentDeductible"
                      type="number"
                      value={currentAutoDeductible}
                      onChange={(e) => setCurrentAutoDeductible(Number(e.target.value))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="currentPremium">
                      {lowDeductible ? "Current Annual Premium" : "Previous Annual Premium"}
                    </Label>
                    <Input
                      id="currentPremium"
                      type="number"
                      value={currentAutoPremium}
                      onChange={(e) => setCurrentAutoPremium(Number(e.target.value))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="higherDeductible">
                      {lowDeductible ? "Higher Deductible Option" : "Current Deductible"}
                    </Label>
                    <Input
                      id="higherDeductible"
                      type="number"
                      value={higherAutoDeductible}
                      onChange={(e) => setHigherAutoDeductible(Number(e.target.value))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="higherPremium">
                      {lowDeductible ? "Higher Deductible Premium" : "Current Annual Premium"}
                    </Label>
                    <Input
                      id="higherPremium"
                      type="number"
                      value={higherAutoPremium}
                      onChange={(e) => setHigherAutoPremium(Number(e.target.value))}
                    />
                  </div>
                </div>
                
                {lowDeductible && autoSavings > 0 && (
                  <Alert className="bg-blue-50 border-blue-200">
                    <InfoIcon className="h-4 w-4 text-blue-500" />
                    <AlertTitle>Potential Annual Savings</AlertTitle>
                    <AlertDescription>
                      Switching to a higher deductible could save you ${autoSavings.toLocaleString()} per year.
                    </AlertDescription>
                  </Alert>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="home">
            <Card>
              <CardHeader>
                <CardTitle>Home Insurance</CardTitle>
                <CardDescription>Compare low vs. high deductible plans</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="currentHomeDeductible">
                      {lowDeductible ? "Current Deductible" : "Previous Deductible"}
                    </Label>
                    <Input
                      id="currentHomeDeductible"
                      type="number"
                      value={currentHomeDeductible}
                      onChange={(e) => setCurrentHomeDeductible(Number(e.target.value))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="currentHomePremium">
                      {lowDeductible ? "Current Annual Premium" : "Previous Annual Premium"}
                    </Label>
                    <Input
                      id="currentHomePremium"
                      type="number"
                      value={currentHomePremium}
                      onChange={(e) => setCurrentHomePremium(Number(e.target.value))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="higherHomeDeductible">
                      {lowDeductible ? "Higher Deductible Option" : "Current Deductible"}
                    </Label>
                    <Input
                      id="higherHomeDeductible"
                      type="number"
                      value={higherHomeDeductible}
                      onChange={(e) => setHigherHomeDeductible(Number(e.target.value))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="higherHomePremium">
                      {lowDeductible ? "Higher Deductible Premium" : "Current Annual Premium"}
                    </Label>
                    <Input
                      id="higherHomePremium"
                      type="number"
                      value={higherHomePremium}
                      onChange={(e) => setHigherHomePremium(Number(e.target.value))}
                    />
                  </div>
                </div>
                
                {lowDeductible && homeSavings > 0 && (
                  <Alert className="bg-blue-50 border-blue-200">
                    <InfoIcon className="h-4 w-4 text-blue-500" />
                    <AlertTitle>Potential Annual Savings</AlertTitle>
                    <AlertDescription>
                      Switching to a higher deductible could save you ${homeSavings.toLocaleString()} per year.
                    </AlertDescription>
                  </Alert>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="health">
            <Card>
              <CardHeader>
                <CardTitle>Health Insurance</CardTitle>
                <CardDescription>Health coverage & HSA optimization</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="healthDeductible">Annual Deductible</Label>
                    <Input
                      id="healthDeductible"
                      type="number"
                      value={healthDeductible}
                      onChange={(e) => setHealthDeductible(Number(e.target.value))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="healthPremium">Annual Premium</Label>
                    <Input
                      id="healthPremium"
                      type="number"
                      value={healthPremium}
                      onChange={(e) => setHealthPremium(Number(e.target.value))}
                    />
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Switch
                    id="hasHsa"
                    checked={hasHSA}
                    onCheckedChange={setHasHSA}
                  />
                  <Label htmlFor="hasHsa">Health Savings Account (HSA)</Label>
                </div>
                
                {hasHSA && (
                  <div>
                    <Label htmlFor="hsaContribution">Annual HSA Contribution</Label>
                    <Input
                      id="hsaContribution"
                      type="number"
                      value={hsaContribution}
                      onChange={(e) => setHsaContribution(Number(e.target.value))}
                    />
                    <span className="text-xs text-muted-foreground">Max for individual: $3,850 | Family: $7,750</span>
                  </div>
                )}
                
                {healthDeductible > 1500 && !hasHSA && (
                  <Alert>
                    <InfoIcon className="h-4 w-4" />
                    <AlertTitle>HSA Opportunity</AlertTitle>
                    <AlertDescription>
                      Your health plan appears to be HSA-eligible. Consider opening an HSA for tax advantages.
                    </AlertDescription>
                  </Alert>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="life">
            <Card>
              <CardHeader>
                <CardTitle>Life Insurance</CardTitle>
                <CardDescription>Coverage for you and your family</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="katieLife">Katie's Coverage</Label>
                    <Input
                      id="katieLife"
                      type="number"
                      value={katieLifeInsurance}
                      onChange={(e) => setKatieLifeInsurance(Number(e.target.value))}
                    />
                    <span className="text-xs text-muted-foreground">Current: 1x salary via employer</span>
                  </div>
                  <div>
                    <Label htmlFor="chadLife">Chad's Coverage</Label>
                    <Input
                      id="chadLife"
                      type="number"
                      value={chadLifeInsurance}
                      onChange={(e) => setChadLifeInsurance(Number(e.target.value))}
                    />
                  </div>
                </div>
                
                {katieLifeInsurance < recommendedLifeInsurance && (
                  <Alert>
                    <AlertTriangleIcon className="h-4 w-4 text-amber-500" />
                    <AlertTitle>Coverage Gap</AlertTitle>
                    <AlertDescription>
                      Katie's life insurance is below the recommended 5x salary (${recommendedLifeInsurance.toLocaleString()}).
                    </AlertDescription>
                  </Alert>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="other">
            <Card>
              <CardHeader>
                <CardTitle>Other Insurance</CardTitle>
                <CardDescription>Boat insurance & umbrella policy</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4 pb-6 border-b">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Boat Insurance</h3>
                      <p className="text-sm text-muted-foreground">Protect your boat investment</p>
                    </div>
                    <Switch
                      id="boatInsurance"
                      checked={hasBoatInsurance}
                      onCheckedChange={(checked) => {
                        setHasBoatInsurance(checked);
                        if (checked) {
                          calculateBoatInsurance();
                        } else {
                          setBoatInsurancePremium(0);
                        }
                      }}
                    />
                  </div>
                  
                  {hasBoatInsurance ? (
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="boatValue">Boat Value</Label>
                        <Input
                          id="boatValue"
                          type="number"
                          value={boatValue}
                          onChange={(e) => {
                            setBoatValue(Number(e.target.value));
                            setBoatInsurancePremium(Math.round(Number(e.target.value) * 0.0125));
                          }}
                        />
                      </div>
                      <div>
                        <Label htmlFor="boatPremium">Annual Premium</Label>
                        <Input
                          id="boatPremium"
                          type="number"
                          value={boatInsurancePremium}
                          onChange={(e) => setBoatInsurancePremium(Number(e.target.value))}
                        />
                      </div>
                    </div>
                  ) : (
                    <Alert variant="destructive">
                      <AlertTriangleIcon className="h-4 w-4" />
                      <AlertTitle>Uninsured Asset</AlertTitle>
                      <AlertDescription>
                        Your $80,000 boat is currently uninsured. This poses a significant financial risk.
                      </AlertDescription>
                    </Alert>
                  )}
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Umbrella Policy</h3>
                      <p className="text-sm text-muted-foreground">Additional liability protection</p>
                    </div>
                    <Switch
                      id="umbrellaPolicy"
                      checked={hasUmbrellaPolicy}
                      onCheckedChange={setHasUmbrellaPolicy}
                    />
                  </div>
                  
                  {hasUmbrellaPolicy ? (
                    <div>
                      <Label htmlFor="umbrellaPremium">Annual Premium</Label>
                      <Input
                        id="umbrellaPremium"
                        type="number"
                        value={umbrellaPremium}
                        onChange={(e) => setUmbrellaPremium(Number(e.target.value))}
                      />
                    </div>
                  ) : (
                    umbrellaRecommended && (
                      <Alert>
                        <InfoIcon className="h-4 w-4" />
                        <AlertTitle>Consider Umbrella Policy</AlertTitle>
                        <AlertDescription>
                          As your net worth approaches or exceeds $500,000, an umbrella policy provides valuable additional liability protection.
                        </AlertDescription>
                      </Alert>
                    )
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default InsuranceOptimization;
