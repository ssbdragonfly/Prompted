import React from 'react';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

export type Difficulty = 'easy' | 'medium' | 'hard';

interface DifficultySelectorProps {
  difficulty: Difficulty;
  setDifficulty: (difficulty: Difficulty) => void;
}

const DifficultySelector: React.FC<DifficultySelectorProps> = ({ 
  difficulty, 
  setDifficulty 
}) => {
  return (
    <div className="mb-6">
      <h3 className="text-sm font-medium mb-3">Select Difficulty:</h3>
      <RadioGroup 
        value={difficulty} 
        onValueChange={(value) => setDifficulty(value as Difficulty)}
        className="flex space-x-2"
      >
        <div className="flex items-center space-x-1">
          <RadioGroupItem value="easy" id="easy" />
          <Label htmlFor="easy" className="cursor-pointer">Easy</Label>
        </div>
        
        <div className="flex items-center space-x-1">
          <RadioGroupItem value="medium" id="medium" />
          <Label htmlFor="medium" className="cursor-pointer">Medium</Label>
        </div>
        
        <div className="flex items-center space-x-1">
          <RadioGroupItem value="hard" id="hard" />
          <Label htmlFor="hard" className="cursor-pointer">Hard</Label>
        </div>
      </RadioGroup>
    </div>
  );
};

export default DifficultySelector;