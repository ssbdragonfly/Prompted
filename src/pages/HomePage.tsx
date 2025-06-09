import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import Metadata from '@/components/Metadata';
import { Brain, Calendar, Newspaper, Gamepad2, BookOpen, ArrowRight } from 'lucide-react';

const HomePage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <Metadata 
        title="prompted - Be Prompted to Learn About AI"
        description="Explore AI through an interactive game, resources, and news. Take up your responsibility to understand the technology shaping our future."
        keywords="AI literacy, prompt engineering, artificial intelligence, AI games, AI news"
      />
      
      <div className="text-center mb-12">
        <h1 className="text-4xl sm:text-5xl font-bold mb-4">prompted</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          In a world increasingly driven by AI, literacy is no longer optional, it's <strong>your</strong> responsibility.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        <FeatureCard 
          title="Play the Prompt Game" 
          description="Test your AI knowledge by guessing the prompts used to generate AI text. Choose your difficulty level."
          icon={<Gamepad2 className="h-8 w-8" />}
          linkTo="/play"
          linkText="Start Playing"
        />
        
        <FeatureCard 
          title="Daily Challenge" 
          description="Try the daily prompt challenge that resets every day. Compare your score with others."
          icon={<Calendar className="h-8 w-8" />}
          linkTo="/daily"
          linkText="Today's Challenge"
          highlight={true}
        />
        
        <FeatureCard 
          title="Prompt Book" 
          description="Learn effective prompting techniques and strategies to get better results from AI systems."
          icon={<BookOpen className="h-8 w-8" />}
          linkTo="/prompt-book"
          linkText="Read Prompt Book"
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        <FeatureCard 
          title="AI News" 
          description="Stay updated with the latest developments in artificial intelligence from major companies and research."
          icon={<Newspaper className="h-8 w-8" />}
          linkTo="/news"
          linkText="Read News"
        />
        
        <FeatureCard 
          title="Learn About AI" 
          description="Explore the fundamentals of artificial intelligence and how it's changing our world."
          icon={<Brain className="h-8 w-8" />}
          linkTo="/learn"
          linkText="Start Learning"
        />
      </div>
      
      <div className="bg-muted rounded-lg p-6 mb-12">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="mb-6 md:mb-0 md:mr-6">
            <h2 className="text-2xl font-bold mb-2">Why AI Literacy Matters</h2>
            <p className="text-muted-foreground mb-4">
              As AI systems become more integrated into our daily lives, understanding how they work and how to interact with them effectively is becoming an essential skill.
            </p>
            <p className="text-muted-foreground">
              <span className="font-semibold">prompted</span> challenges you to think critically about AI and develop the literacy needed to navigate an AI-powered world.
            </p>
          </div>
          <div className="flex-shrink-0">
            <Brain className="h-24 w-24 text-primary opacity-80" />
          </div>
        </div>
      </div>
      
      <div className="border-t pt-8 mt-12">
        <p className="text-center text-sm text-muted-foreground">
          "The limits of my language mean the limits of my world." — Ludwig Wittgenstein
        </p>
      </div>
    </div>
  );
};
interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  linkTo: string;
  linkText: string;
  highlight?: boolean;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ 
  title, 
  description, 
  icon, 
  linkTo, 
  linkText,
  highlight = false 
}) => {
  return (
    <Card className={`h-full flex flex-col ${highlight ? 'border-primary' : ''}`}>
      <CardHeader>
        <div className={`p-2 rounded-full w-fit ${highlight ? 'bg-primary/10' : 'bg-muted'}`}>
          {icon}
        </div>
        <CardTitle className="mt-4">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardFooter className="mt-auto pt-4">
        <Link to={linkTo} className="w-full">
          <Button variant={highlight ? "default" : "outline"} className="w-full">
            {linkText}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default HomePage;