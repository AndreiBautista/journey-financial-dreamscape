
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { MilestoneTracker, Milestone } from "@/components/MilestoneTracker";

interface MilestoneCardProps {
  milestones: Milestone[];
  setMilestones: React.Dispatch<React.SetStateAction<Milestone[]>>;
  track: "aggressive" | "moderate";
}

export const MilestoneCard: React.FC<MilestoneCardProps> = ({ 
  milestones, 
  setMilestones,
  track
}) => {
  return (
    <Card className="shadow-lg hover:shadow-xl transition-all duration-300 lg:col-span-2">
      <CardHeader>
        <CardTitle>Milestone Tracking</CardTitle>
        <CardDescription>Dynamically update your key financial milestones</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <MilestoneTracker milestones={milestones} setMilestones={setMilestones} />
        <div className="flex justify-end mt-4">
          <Link to={track === "aggressive" ? "/phase1" : "/phase1"}>
            <Button variant="outline" className="text-blue-600 hover:text-blue-700">
              View Detailed Plan <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};
