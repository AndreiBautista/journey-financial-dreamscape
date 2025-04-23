
import React, { useState } from "react";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Trash2, Plus } from "lucide-react";

export interface Milestone {
  id: string;
  name: string;
  current: number;
  target: number;
  year: number;
}

interface Props {
  milestones: Milestone[];
  setMilestones: (ms: Milestone[]) => void;
}

export const MilestoneTracker: React.FC<Props> = ({ milestones, setMilestones }) => {
  const [newName, setNewName] = useState("");
  const [newCurrent, setNewCurrent] = useState<number>(0);
  const [newTarget, setNewTarget] = useState<number>(0);
  const [newYear, setNewYear] = useState<number>(1);

  const addMilestone = () => {
    if (!newName.trim() || !newTarget) return;
    setMilestones([
      ...milestones,
      {
        id: Date.now().toString(),
        name: newName,
        current: newCurrent,
        target: newTarget,
        year: newYear,
      },
    ]);
    setNewName("");
    setNewCurrent(0);
    setNewTarget(0);
    setNewYear(1);
  };

  const updateMilestone = (id: string, field: keyof Milestone, val: any) => {
    setMilestones(
      milestones.map(m =>
        m.id === id ? { ...m, [field]: field === "name" ? val : Number(val) } : m
      )
    );
  };

  const removeMilestone = (id: string) => {
    setMilestones(milestones.filter(m => m.id !== id));
  };

  return (
    <div className="space-y-6">
      {milestones.map((ms) => (
        <div key={ms.id}>
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <Input
              value={ms.name}
              className="max-w-[160px] text-sm"
              onChange={e => updateMilestone(ms.id, "name", e.target.value)}
            />
            <Input
              type="number"
              value={ms.current}
              className="max-w-[100px] text-sm"
              onChange={e => updateMilestone(ms.id, "current", e.target.value)}
            />
            <span className="mx-1">/</span>
            <Input
              type="number"
              value={ms.target}
              className="max-w-[100px] text-sm"
              onChange={e => updateMilestone(ms.id, "target", e.target.value)}
            />
            <span>Year</span>
            <Input
              type="number"
              value={ms.year}
              className="max-w-[70px] text-sm"
              onChange={e => updateMilestone(ms.id, "year", e.target.value)}
            />
            <Button variant="ghost" size="icon" onClick={() => removeMilestone(ms.id)}>
              <Trash2 size={16} className="text-red-400" />
            </Button>
          </div>
          <div className="flex items-center gap-4">
            <Progress
              value={Math.min(100, (ms.current / ms.target) * 100 || 0)}
              className="h-2 flex-1"
            />
            <span className="text-sm text-gray-500 whitespace-nowrap">
              Year {ms.year}
            </span>
          </div>
        </div>
      ))}
      <div className="flex flex-wrap gap-2 items-end mt-4">
        <Input
          value={newName}
          className="max-w-[140px] text-sm"
          onChange={e => setNewName(e.target.value)}
          placeholder="Milestone Name"
        />
        <Input
          type="number"
          value={newCurrent || ""}
          className="max-w-[90px] text-sm"
          onChange={e => setNewCurrent(Number(e.target.value))}
          placeholder="Current"
        />
        <Input
          type="number"
          value={newTarget || ""}
          className="max-w-[90px] text-sm"
          onChange={e => setNewTarget(Number(e.target.value))}
          placeholder="Target"
        />
        <Input
          type="number"
          value={newYear || ""}
          className="max-w-[70px] text-sm"
          onChange={e => setNewYear(Number(e.target.value))}
          placeholder="Year"
        />
        <Button onClick={addMilestone} size="icon" variant="ghost" className="border border-blue-300">
          <Plus size={18} className="text-blue-500" />
        </Button>
      </div>
    </div>
  );
};
