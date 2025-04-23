
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface NetWorthCardProps {
  track: "aggressive" | "moderate";
}

export const NetWorthCard: React.FC<NetWorthCardProps> = ({ track }) => {
  return (
    <Card className="shadow-lg hover:shadow-xl transition-all duration-300">
      <CardHeader className="pb-2">
        <CardTitle>Year 10 Net Worth</CardTitle>
        <CardDescription>Projected net worth</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold">
          ${(track === "aggressive" ? 387684 : 196243).toLocaleString()}
        </div>
        <div className="text-sm text-gray-500 mt-1">
          {track === "aggressive" ? "Aggressive strategy (+97% vs moderate)" : "Moderate strategy"}
        </div>
      </CardContent>
    </Card>
  );
};
