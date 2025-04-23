
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";

export const PhaseButtons: React.FC = () => {
  return (
    <div className="flex flex-col md:flex-row gap-4 justify-center mt-10">
      <Link to="/phase1">
        <Button className="bg-blue-600 hover:bg-blue-700 shadow-lg hover:shadow-xl transition-all duration-300 w-full md:w-auto">
          Phase 1: Stabilization <ChevronRight className="ml-1 h-4 w-4" />
        </Button>
      </Link>
      
      <Link to="/phase2">
        <Button className="bg-blue-600 hover:bg-blue-700 shadow-lg hover:shadow-xl transition-all duration-300 w-full md:w-auto">
          Phase 2: Family & Growth <ChevronRight className="ml-1 h-4 w-4" />
        </Button>
      </Link>
      
      <Link to="/phase3">
        <Button className="bg-blue-600 hover:bg-blue-700 shadow-lg hover:shadow-xl transition-all duration-300 w-full md:w-auto">
          Phase 3: Lake & Wealth <ChevronRight className="ml-1 h-4 w-4" />
        </Button>
      </Link>
      
      <Link to="/calculator">
        <Button className="bg-blue-600 hover:bg-blue-700 shadow-lg hover:shadow-xl transition-all duration-300 w-full md:w-auto">
          Compound Calculator <ChevronRight className="ml-1 h-4 w-4" />
        </Button>
      </Link>
      
      <Link to="/assumptions">
        <Button className="bg-blue-600 hover:bg-blue-700 shadow-lg hover:shadow-xl transition-all duration-300 w-full md:w-auto">
          Assumptions <ChevronRight className="ml-1 h-4 w-4" />
        </Button>
      </Link>
    </div>
  );
};
