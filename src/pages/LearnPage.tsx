import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Metadata from '@/components/Metadata';
import { BookOpen, Code, Lightbulb, Sparkles } from 'lucide-react';
import PromptBookSection from '@/components/PromptBookSection';

const LearnPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <Metadata 
        title="Learn About AI - Artificial Intelligence Basics"
        description="Learn about artificial intelligence, machine learning, and how AI systems work. Explore key concepts and applications."
        keywords="AI learning, artificial intelligence basics, machine learning, AI concepts"
      />
      
      <div className="text-center mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold mb-4">Learn About AI</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Explore the fundamentals of artificial intelligence and how it's changing our world
        </p>
      </div>
      
      <Tabs defaultValue="basics" className="mb-8">
        <div className="flex justify-center mb-6">
          <TabsList>
            <TabsTrigger value="basics">AI Basics</TabsTrigger>
            <TabsTrigger value="concepts">Key Concepts</TabsTrigger>
            <TabsTrigger value="applications">Applications</TabsTrigger>
            <TabsTrigger value="promptbook">Prompt Book</TabsTrigger>
            <TabsTrigger value="resources">Resources</TabsTrigger>
          </TabsList>
        </div>
        
        <TabsContent value="basics" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>What is Artificial Intelligence?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4">
                  Artificial Intelligence (AI) refers to computer systems designed to perform tasks that typically require human intelligence. These include learning, reasoning, problem-solving, perception, and language understanding.
                </p>
                <p>
                  Modern AI systems use machine learning algorithms that improve automatically through experience. They analyze vast amounts of data to identify patterns and make predictions or decisions without being explicitly programmed for specific tasks.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Types of AI</CardTitle>
              </CardHeader>
              <CardContent>
                <h3 className="font-bold mb-2">Narrow AI (Weak AI)</h3>
                <p className="mb-4">
                  Designed for a specific task, like voice assistants or image recognition. This is the type of AI we interact with daily.
                </p>
                
                <h3 className="font-bold mb-2">General AI (Strong AI)</h3>
                <p className="mb-4">
                  A theoretical form of AI with human-like intelligence across a wide range of tasks. This doesn't exist yet.
                </p>
                
                <h3 className="font-bold mb-2">Superintelligent AI</h3>
                <p>
                  A hypothetical AI that surpasses human intelligence in virtually all domains. This remains in the realm of science fiction.
                </p>
              </CardContent>
            </Card>
            
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Brief History of AI</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <h3 className="font-bold mb-2">Early Days (1950s-1970s)</h3>
                    <p>
                      The term "Artificial Intelligence" was coined in 1956. Early research focused on symbolic approaches, problem-solving, and simple games. The field experienced cycles of enthusiasm followed by "AI winters" when progress slowed.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="font-bold mb-2">Machine Learning Era (1980s-2000s)</h3>
                    <p>
                      Focus shifted from rule-based systems to statistical models and machine learning. Neural networks gained attention but were limited by computing power and data availability.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="font-bold mb-2">Deep Learning Revolution (2010s-Present)</h3>
                    <p>
                      Advances in computing power, big data, and algorithmic improvements led to breakthroughs in deep learning. AI systems achieved human-level performance in specific tasks like image recognition and language processing.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="concepts" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ConceptCard 
              title="Machine Learning"
              icon={<Sparkles className="h-6 w-6" />}
              description="The ability of AI systems to learn from data without being explicitly programmed. Machine learning algorithms identify patterns and make predictions based on examples."
              examples={["Supervised Learning: Training with labeled data", "Unsupervised Learning: Finding patterns in unlabeled data", "Reinforcement Learning: Learning through trial and error"]}
            />
            
            <ConceptCard 
              title="Neural Networks"
              icon={<Code className="h-6 w-6" />}
              description="Computing systems inspired by the human brain's structure. They consist of interconnected nodes (neurons) that process and transmit information."
              examples={["Deep Learning: Neural networks with many layers", "Convolutional Neural Networks (CNNs): Used for image processing", "Recurrent Neural Networks (RNNs): Process sequential data"]}
            />
            
            <ConceptCard 
              title="Natural Language Processing"
              icon={<BookOpen className="h-6 w-6" />}
              description="The ability of computers to understand, interpret, and generate human language in a valuable way."
              examples={["Sentiment Analysis: Determining emotions in text", "Machine Translation: Converting text between languages", "Question Answering: Providing responses to natural language queries"]}
            />
            
            <ConceptCard 
              title="Computer Vision"
              icon={<Lightbulb className="h-6 w-6" />}
              description="The field of AI that enables computers to derive meaningful information from digital images, videos, and other visual inputs."
              examples={["Object Detection: Identifying objects in images", "Facial Recognition: Identifying individuals from facial features", "Image Generation: Creating new images from descriptions"]}
            />
          </div>
        </TabsContent>
        
        <TabsContent value="applications" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <ApplicationCard 
              title="Healthcare"
              examples={[
                "Disease diagnosis from medical images",
                "Drug discovery and development",
                "Personalized treatment recommendations",
                "Health monitoring through wearable devices"
              ]}
            />
            
            <ApplicationCard 
              title="Finance"
              examples={[
                "Fraud detection and prevention",
                "Algorithmic trading",
                "Credit scoring and risk assessment",
                "Customer service chatbots"
              ]}
            />
            
            <ApplicationCard 
              title="Transportation"
              examples={[
                "Self-driving vehicles",
                "Traffic prediction and management",
                "Route optimization",
                "Predictive maintenance"
              ]}
            />
            
            <ApplicationCard 
              title="Entertainment"
              examples={[
                "Content recommendation systems",
                "Video game AI opponents",
                "Music and art generation",
                "Virtual reality experiences"
              ]}
            />
            
            <ApplicationCard 
              title="Education"
              examples={[
                "Personalized learning platforms",
                "Automated grading systems",
                "Intelligent tutoring systems",
                "Educational content creation"
              ]}
            />
            
            <ApplicationCard 
              title="Environment"
              examples={[
                "Climate modeling and prediction",
                "Wildlife conservation monitoring",
                "Energy optimization",
                "Disaster response coordination"
              ]}
            />
          </div>
        </TabsContent>

        <TabsContent value="promptbook" className="mt-0">
          <PromptBookSection />
        </TabsContent>

        <TabsContent value="resources" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Online Courses</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li>
                    <a href="https://www.coursera.org/learn/ai-for-everyone" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">
                      AI For Everyone (Coursera)
                    </a>
                    <p className="text-sm text-muted-foreground">
                      A non-technical course designed to help you understand AI technologies.
                    </p>
                  </li>
                  <li>
                    <a href="https://www.elementsofai.com/" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">
                      Elements of AI
                    </a>
                    <p className="text-sm text-muted-foreground">
                      Free online course that introduces AI concepts without requiring programming skills.
                    </p>
                  </li>
                  <li>
                    <a href="https://www.fast.ai/" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">
                      Fast.ai
                    </a>
                    <p className="text-sm text-muted-foreground">
                      Practical deep learning for coders with a top-down approach.
                    </p>
                  </li>
                </ul>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Books</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li>
                    <p className="font-medium">AI Superpowers by Kai-Fu Lee</p>
                    <p className="text-sm text-muted-foreground">
                      Explores the global AI race between China and the United States.
                    </p>
                  </li>
                  <li>
                    <p className="font-medium">Life 3.0 by Max Tegmark</p>
                    <p className="text-sm text-muted-foreground">
                      Examines how AI might affect crime, war, justice, jobs, society, and our sense of being human.
                    </p>
                  </li>
                  <li>
                    <p className="font-medium">The Hundred-Page Machine Learning Book by Andriy Burkov</p>
                    <p className="text-sm text-muted-foreground">
                      A concise overview of machine learning fundamentals.
                    </p>
                  </li>
                </ul>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Websites and Blogs</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li>
                    <a href="https://distill.pub/" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">
                      Distill.pub
                    </a>
                    <p className="text-sm text-muted-foreground">
                      Clear explanations of machine learning concepts with interactive visualizations.
                    </p>
                  </li>
                  <li>
                    <a href="https://www.deeplearning.ai/" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">
                      DeepLearning.AI
                    </a>
                    <p className="text-sm text-muted-foreground">
                      Educational resources founded by Andrew Ng to help spread AI knowledge.
                    </p>
                  </li>
                  <li>
                    <a href="https://ai.googleblog.com/" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">
                      Google AI Blog
                    </a>
                    <p className="text-sm text-muted-foreground">
                      Updates on Google's AI research and applications.
                    </p>
                  </li>
                </ul>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Communities</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li>
                    <a href="https://www.reddit.com/r/MachineLearning/" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">
                      r/MachineLearning
                    </a>
                    <p className="text-sm text-muted-foreground">
                      Reddit community for machine learning discussions.
                    </p>
                  </li>
                  <li>
                    <a href="https://huggingface.co/spaces" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">
                      Hugging Face Spaces
                    </a>
                    <p className="text-sm text-muted-foreground">
                      Community-created machine learning demos and applications.
                    </p>
                  </li>
                  <li>
                    <a href="https://paperswithcode.com/" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">
                      Papers with Code
                    </a>
                    <p className="text-sm text-muted-foreground">
                      Free resource of machine learning papers with code implementations.
                    </p>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

interface ConceptCardProps {
  title: string;
  icon: React.ReactNode;
  description: string;
  examples: string[];
}

const ConceptCard: React.FC<ConceptCardProps> = ({ title, icon, description, examples }) => {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center space-x-2">
          <div className="p-2 rounded-full bg-primary/10">
            {icon}
          </div>
          <CardTitle>{title}</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <p className="mb-4">{description}</p>
        <h4 className="font-semibold mb-2">Examples:</h4>
        <ul className="list-disc pl-5 space-y-1">
          {examples.map((example, index) => (
            <li key={index} className="text-sm">{example}</li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

interface ApplicationCardProps {
  title: string;
  examples: string[];
}

const ApplicationCard: React.FC<ApplicationCardProps> = ({ title, examples }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="list-disc pl-5 space-y-1">
          {examples.map((example, index) => (
            <li key={index}>{example}</li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

export default LearnPage;