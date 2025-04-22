
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
    // ... Additional sections follow same pattern
  ];

  return (
    <div className="container mx-auto py-8 px-4">
      <h2 className="text-3xl font-bold text-blue-600 mb-8">Financial Assumptions</h2>
      
      <div className="grid gap-8">
        {sections.map((section, idx) => (
          <Card key={idx} className="shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] card-hover">
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
