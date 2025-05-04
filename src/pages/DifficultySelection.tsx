import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { useNavigate } from 'react-router-dom';
import Metadata from '@/components/Metadata';
import { Difficulty } from '@/components/DifficultySelector';

const DifficultySelection = () => {
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty>('medium');
  const navigate = useNavigate();

  const handleStartGame = () => {
    localStorage.setItem('gameDifficulty', selectedDifficulty);

    navigate('/play');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] space-y-8">
      <Metadata 
        title="Select Difficulty - What Was The Prompt?"
        description="Choose your difficulty level for the AI prompt guessing game"
        keywords="AI game, prompt engineering, difficulty selection"
      />
      
      <div className="text-center w-full px-4 sm:px-0 sm:max-w-md">
        <h1 className="text-3xl sm:text-4xl font-bold mb-4">What Was The Prompt?</h1>
        <p className="text-base sm:text-lg mb-2">
          Test your AI knowledge by guessing the prompts used to generate AI text.
        </p>
      </div>
      
      <Card className="w-full mx-4 sm:mx-0 sm:max-w-md p-6 bg-card border shadow-lg">
        <h2 className="text-xl font-semibold mb-6 text-center">Select Difficulty</h2>
        
        <RadioGroup 
          value={selectedDifficulty} 
          onValueChange={(value) => setSelectedDifficulty(value as Difficulty)}
          className="space-y-4 mb-8"
        >
          <div className="flex items-center space-x-3 p-3 rounded-md border border-border hover:bg-accent cursor-pointer">
            <RadioGroupItem value="easy" id="difficulty-easy" />
            <div className="flex-1">
              <Label htmlFor="difficulty-easy" className="text-base font-medium cursor-pointer">Easy</Label>
              <p className="text-sm text-muted-foreground mt-1">
                Simple prompts with straightforward instructions. Perfect for beginners.
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3 p-3 rounded-md border border-border hover:bg-accent cursor-pointer">
            <RadioGroupItem value="medium" id="difficulty-medium" />
            <div className="flex-1">
              <Label htmlFor="difficulty-medium" className="text-base font-medium cursor-pointer">Medium</Label>
              <p className="text-sm text-muted-foreground mt-1">
                Moderately complex prompts with a few constraints. The standard challenge.
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3 p-3 rounded-md border border-border hover:bg-accent cursor-pointer">
            <RadioGroupItem value="hard" id="difficulty-hard" />
            <div className="flex-1">
              <Label htmlFor="difficulty-hard" className="text-base font-medium cursor-pointer">Hard</Label>
              <p className="text-sm text-muted-foreground mt-1">
                Complex prompts with multiple constraints. For experienced prompt engineers.
              </p>
            </div>
          </div>
        </RadioGroup>
        
        <Button 
          onClick={handleStartGame}
          className="w-full py-6 text-lg"
        >
          Start Game
        </Button>
      </Card>
    </div>
  );
};

export default DifficultySelection;