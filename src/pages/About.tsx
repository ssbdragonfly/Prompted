import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import Metadata from '@/components/Metadata';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const About = () => {  
  const [resourcesExpanded, setResourcesExpanded] = useState(false);

  return (
    <div className="space-y-6 sm:space-y-8 w-full px-4 sm:px-0 sm:max-w-3xl mx-auto">
      <Metadata 
        title="Conversations with Machines"
        description="Understanding AI, one prompt at a time. Learn why AI literacy matters and how to develop your prompt engineering skills."
        keywords="AI literacy, prompt engineering, artificial intelligence, manifesto, AI education"
      />
      
      <div className="text-center">
        <h1 className="text-3xl sm:text-4xl font-bold mb-2">Conversations with Machines</h1>
        <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300">Thoughts on AI Literacy</p>
      </div>
      
      <Card className="p-4 sm:p-8 bg-card border shadow-lg">
        <div className="prose prose-sm sm:prose-base prose-neutral max-w-none">
          <h2 className="text-xl sm:text-2xl font-bold mb-4 border-b pb-2">Why AI Literacy Matters</h2>
          
          <p className="mb-4">
            AI is increasingly becoming part of our daily lives: in our devices, our homes, and throughout society. 
            As these systems become more integrated into our world, the ability to effectively communicate with and understand AI 
            is becoming an important skill for navigating our digital landscape.
          </p>
          
          <p className="mb-4">
            <strong>prompted</strong> is an agreggated set of resources and a game designed to help you think about AI literacy.
          </p>
          
          <h3 className="text-lg sm:text-xl font-bold mt-6 mb-3">Beyond Prompt Engineering</h3>
          
          <p className="mb-4">
            While learning to craft effective prompts certainly helps get better AI outputs, I believe the implications extend further:
          </p>
          
          <ul className="list-disc pl-5 mb-4 space-y-2">
            <li>
              <strong>Environmental Consideration:</strong> More efficient prompting can reduce computational 
              resources used, potentially lessening the environmental impact of our AI interactions.
            </li>
            <li>
              <strong>Equitable Access:</strong> When fewer tokens achieve better results, 
              AI becomes more accessible to those with limited resources or bandwidth.
            </li>
            <li>
              <strong>Human-AI Partnership:</strong> Clear communication with AI systems helps them 
              better serve human needs rather than creating friction in our workflows.
            </li>
            <li>
              <strong>Critical Thinking:</strong> Understanding how AI interprets language encourages us to 
              evaluate AI-generated content more thoughtfully and consider the ethical dimensions of these technologies.
            </li>
          </ul>
          
          <h3 className="text-lg sm:text-xl font-bold mt-6 mb-3">The Art of Prompting</h3>
          
          <p className="mb-4">
            Prompting sits somewhere between programming and conversation, it's a new form of communication 
            with its own patterns and principles. It combines precision with creativity, structure with exploration.
          </p>
          
          <p className="mb-4">
            Playing <strong>prompted</strong> is just one small way to develop an intuition for this emerging form of expression. 
            Through play, we can begin to see the connections between human intention and machine output.
          </p>
          
          <h3 className="text-lg sm:text-xl font-bold mt-6 mb-3">A Personal Exploration</h3>
          
          <p className="mb-4">
          <strong>prompted</strong> isn't meant to be definitive or comprehensive, it's simply my contribution to an ongoing conversation 
            about how we interact with AI systems. For me, it's a starting point for thinking about the language we use with machines 
            and how that shapes what we receive in return.
          </p>
          
          <p className="italic border-l-4 pl-4 py-2 bg-secondary/50 text-sm sm:text-base">
            "The limits of my language mean the limits of my world."
            <br />— Ludwig Wittgenstein
          </p>
          
          <p className="mt-6">
            As AI becomes more integrated into our lives, I believe developing our vocabulary and understanding of these systems 
            helps us maintain agency in our increasingly digital world.
          </p>
          <p className="mt-6 mb-4">
            I plan to make more software to encourage us to think more deeply about our relationship with these increasingly prevalent technologies and literacy around them. Thanks to <a href="https://hackclub.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Hack Club</a> for making this possible with free tokens!          </p>
          
          <p className="mb-4">
          ~ <a href="https://github.com/ssbdragonfly" className="text-blue-600 hover:text-blue-800" target="_blank" rel="noopener noreferrer">shaurya</a>
          </p>
          <div className="mt-8 border-t pt-4">
            <Button 
              variant="ghost" 
              className="flex items-center w-full justify-between p-0 h-auto"
              onClick={() => setResourcesExpanded(!resourcesExpanded)}
            >
              <h3 className="text-lg sm:text-xl font-bold">Resources to Learn More</h3>
              {resourcesExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </Button>
            
            {resourcesExpanded && (
              <div className="mt-4 animate-in fade-in duration-300">
                <p className="mb-4">
                  If you're interested in learning more about AI and developing your prompt engineering skills, 
                  here are some resources I've found valuable:
                </p>
                
                <ul className="list-disc pl-5 mb-6 space-y-3">
                  <li>
                    <a 
                      href="https://learnprompting.org/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline font-medium break-words"
                    >
                      Learn Prompting
                    </a>
                    <span className="block text-sm mt-1">
                      A comprehensive, free course on prompt engineering techniques with practical examples.
                    </span>
                  </li>
                  <li>
                    <a 
                      href="https://stanford-cs324.github.io/winter2022/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline font-medium break-words"
                    >
                      Stanford CS324: Large Language Models
                    </a>
                    <span className="block text-sm mt-1">
                      Academic course materials explaining how large language models work under the hood.
                    </span>
                  </li>
                  <li>
                    <a 
                      href="https://www.deeplearning.ai/short-courses/chatgpt-prompt-engineering-for-developers/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline font-medium break-words"
                    >
                      DeepLearning.AI: Prompt Engineering for Developers
                    </a>
                    <span className="block text-sm mt-1">
                      A short course by Andrew Ng and OpenAI on prompt engineering principles for developers.
                    </span>
                  </li>
                  <li>
                    <a 
                      href="https://www.anthropic.com/research" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline font-medium break-words"
                    >
                      Anthropic AI Research
                    </a>
                    <span className="block text-sm mt-1">
                      Research papers on AI alignment, interpretability, and safety from Anthropic.
                    </span>
                  </li>
                  <li>
                    <a 
                      href="https://arxiv.org/abs/1706.03741" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline font-medium break-words"
                    >
                      Training Language Models to Follow Instructions
                    </a>
                    <span className="block text-sm mt-1">
                      The original research paper on RLHF (Reinforcement Learning from Human Feedback).
                    </span>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
};