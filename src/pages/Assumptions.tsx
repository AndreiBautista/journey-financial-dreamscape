
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const Assumptions = () => {
  const sections = [
    {
      title: "💼 Income Assumptions",
      content: [
        ["Person", "Current Salary", "Assumed Annual Raise", "Notes"],
        ["Katie", "$80,000", "3% per year", "Steady career growth in corporate field"],
        ["Chad", "$73,265 (Spectrum)", "4% per year", "Commission-based; slight upside variability"],
        ["Combined by Year 10", "~$210,000", "", ""]
      ]
    },
    {
      title: "📈 Investment Assumptions",
      content: [
        ["Account Type", "Return (Annual)", "Notes"],
        ["401(k)", "8%", "Historical S&P 500 average return (long-term)"],
        ["Roth IRA", "8%", "Same as above"],
        ["HYSA", "4.35%", "Based on ZynloBank and similar"],
        ["Boat/Luxury Assets", "-1%/yr", "Depreciation applied to boat/truck"],
        ["Lake Home", "3-4%/yr", "National average for lakefront appreciation"]
      ]
    },
    {
      title: "🏠 Mortgage Assumptions",
      content: [
        ["Factor", "Value"],
        ["Mortgage Term", "30 years (28 remaining)"],
        ["Interest Rate", "~3.25% (assumed due to “low rate”)"],
        ["Property Appreciation", "3%/year"],
        ["Home Equity Growth", "Increases due to rising property value + principal paydown"]
      ]
    },
    {
      title: "💳 Debt Assumptions",
      content: [
        ["Debt Type", "APR", "Notes"],
        ["CC1 (Home Reno)", "0% for 6 more months, then 24%", ""],
        ["CC2 (Full)", "9% estimated", ""],
        ["CC3 (Travel Card)", "22%, $95 annual fee", ""],
        ["Furniture Loan", "0% for 3 months, then 18% for 5 years", ""],
        ["Truck Loan", "6.0%, 4 years left", ""],
        ["Jeep Loan", "4.0%, 3 years left", ""],
        ["Boat Loan", "8.0%, 9 years remaining", ""],
        ["Student Loan", "5.0%, 10-year term", ""],
        ["Debt Strategy", "-", "Start with Avalanche, then switch to Snowball if burnout risk rises"]
      ]
    },
    {
      title: "🧾 Tax & Contribution Assumptions",
      content: [
        ["Category", "Value", "Notes"],
        ["Federal Filing", "Married Filing Jointly", "2025 brackets"],
        ["Kentucky State Tax", "4.00%", "Flat"],
        ["Standard Deduction", "$29,600", "2025 standard"],
        ["Katie 401(k) Growth", "From 4% → 10%", "Ramp up over 4 years"],
        ["Chad Roth IRA", "Begin $3,000 → $6,500", "Increase over 3 years"],
        ["529 Plan Contributions", "$200/mo ($2,400/yr)", "Gradually increase"],
        ["Emergency Fund Target", "$10K/$5K", "Aggressive/Moderate"],
      ]
    },
    {
      title: "👶 Child Planning Assumptions",
      content: [
        ["Factor", "Value", "Notes"],
        ["Children Planned", "2–3 kids", "1st in Year 3/5"],
        ["Medical Costs (each)", "$6,000–8,000", "Birth/OB/deductible/baby gear"],
        ["Child Cost Per Year", "$12,000/year/kid", "Conservative childcare, food, insurance"],
        ["Additional Life Insurance", "Katie: 5× salary, Chad: $250K", "Update as children are born"],
      ]
    },
    {
      title: "📈 Inflation & Economic Growth Assumptions",
      content: [
        ["Category", "Annual Rate"],
        ["General Inflation", "3.0%"],
        ["Salary Growth", "3–4% (real)"],
        ["Housing Appreciation", "3–4%"],
        ["Expense Growth", "2.5%"],
        ["Tax Bracket Growth", "Static (2025 law)"]
      ]
    },
    {
      title: "🎯 Additional Milestone Modeling Assumptions",
      content: [
        ["Milestone", "Target", "Notes"],
        ["Baby Fund", "$12,500", "For first child (medical, nursery, diapers, etc.)"],
        ["Lake Fund", "$60K+ down payment", "Target by Year 10"],
        ["Emergency Fund", "$10K (Aggressive)", "Fully funded by end of Year 1"],
        ["Debt Free (except mortgage)", "Year 5/7", "Aggressive/Moderate target"],
        ["Retirement $100K", "Year 6/8", "Aggressive/Moderate"],
        ["Net Worth Target", "$400K+ by Year 10", "Inc. home equity, retirement, 529, lake fund"]
      ]
    }
  ];

  return (
    <div className="container mx-auto py-8 px-4">
      <h2 className="text-3xl font-bold text-blue-600 mb-8">Financial Assumptions</h2>
      <div className="grid gap-8">
        {sections.map((section, idx) => (
          <Card key={idx} className="shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] card-hover rounded-lg">
            <CardHeader>
              <CardTitle className="text-xl">{section.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr>
                      {section.content[0].map((header, i) => (
                        <th key={i} className="text-left py-2 px-4 bg-gray-50">{header}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {section.content.slice(1).map((row, i) => (
                      <tr key={i} className="border-b hover:bg-blue-50/30">
                        {row.map((cell, j) => (
                          <td key={j} className="py-2 px-4">{cell}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Assumptions;
