
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { UserLevel } from '@/types';
import { Gamepad2, Brain, Target, CheckCircle } from 'lucide-react';
import SecurityQuiz from './SecurityQuiz';
import TrueFalseGame  from './TrueFalseGame';
import { DragDropGame } from './DragDropGame';

interface GameZoneProps {
  userLevel: UserLevel;
}

export const GameZone: React.FC<GameZoneProps> = ({ userLevel }) => {
  const [activeGame, setActiveGame] = useState<string | null>(null);

  const games = [
    {
      id: 'quiz',
      title: 'Security Quiz',
      description: 'Test your cybersecurity knowledge with multiple-choice questions',
      icon: Brain,
      color: 'bg-blue-100 text-blue-700'
    },
    {
      id: 'drag-drop',
      title: 'Drag & Drop',
      description: 'Match security concepts with their correct definitions',
      icon: Target,
      color: 'bg-green-100 text-green-700'
    },
    {
      id: 'true-false',
      title: 'True or False',
      description: 'Quick-fire true/false questions about cybersecurity',
      icon: CheckCircle,
      color: 'bg-purple-100 text-purple-700'
    }
  ];

  if (userLevel === 'top') {
    return (
      <div className="text-center py-12">
        <Gamepad2 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">Games Not Available</h3>
        <p className="text-gray-600">
          Games are designed for Entry and Mid-level users to reinforce learning.
        </p>
      </div>
    );
  }

  // Show the active game
  if (activeGame === 'quiz') {
    return <SecurityQuiz onClose={() => setActiveGame(null)} />;
  }

  if (activeGame === 'true-false') {
    return <TrueFalseGame onClose={() => setActiveGame(null)} />;
  }

  if (activeGame === 'drag-drop') {
    return <DragDropGame onClose={() => setActiveGame(null)} />;
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Game Zone</h2>
        <p className="text-gray-600">
          Learn cybersecurity through interactive games and challenges!
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {games.map((game) => {
          const IconComponent = game.icon;
          
          return (
            <Card key={game.id} className="card-hover cursor-pointer">
              <CardHeader className="text-center">
                <div className={`w-16 h-16 rounded-full ${game.color} flex items-center justify-center mx-auto mb-4`}>
                  <IconComponent className="h-8 w-8" />
                </div>
                <CardTitle className="text-xl">{game.title}</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-600 mb-6">{game.description}</p>
                <Button 
                  className="w-full gradient-bg hover:opacity-90"
                  onClick={() => setActiveGame(game.id)}
                >
                  Play Now
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};
