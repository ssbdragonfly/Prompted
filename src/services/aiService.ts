interface Message {
  role: string;
  content: string;
}

interface CompletionRequest {
  messages: Message[];
}

interface CompletionResponse {
  choices: {
    message: {
      content: string;
    };
  }[];
}

export const generateAiContent = async (prompt:string): Promise<string> => {
  try {
    const response = await fetch("https://ai.hackclub.com/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messages: [{ role: "user", content: prompt }],
        temperature: Math.random() * 0.3 + 0.7, //meant to put in some sort of randomness to the completion request so that outputs aren't too similar!
      }),
    });

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    const data: CompletionResponse = await response.json();
    return data.choices[0].message.content;
  } 
  
  catch (error) {
    console.error("Error generating AI content:", error);
    throw error;
  }
};

export const generatePrompt = async (difficulty: string = 'medium'):Promise<string> => {
  const styles = [
    'Search Query',
    'Professional and nuanced',
    'Thoughtful reflection',
    'Technical explanation with an analogy',
    'Creative story starter',
    'Thought-provoking opinion question',
    'Detailed how-to instruction',
    'Historical context',
    'Asking for a word definition',
    'Asking for a poem',
    'Asking for a song',
    'Asking for a joke',
  ];

  const randomStyle = styles[Math.floor(Math.random() * styles.length)];
  let complexityLevel, constraintCount, challengeLevel, simpleControl;
  
  switch(difficulty) {
    case 'easy':
      complexityLevel = 'simple and straightforward';
      constraintCount = '1-2';
      challengeLevel = 'relatively easy';
      simpleControl = 'You may have overly simple prompts.';
      break;

    case 'hard':
      complexityLevel = 'complex and nuanced';
      constraintCount = '3-4';
      challengeLevel = 'quite challenging';
      simpleControl = "Avoid overly simple or vague prompts";
      break;

    case 'medium':
    default:
      complexityLevel = 'moderately challenging';
      constraintCount = '2-3';
      challengeLevel = 'moderately difficult';
      simpleControl = 'You may have moderately complex prompts.';
      break;
  }

  const promptForPrompt = `Generate a focused writing prompt for a chatbot that will result in a response of 1-2 paragraphs maximum. The prompt should be ${complexityLevel} but still possible to reverse-engineer from the output.

Using this style: ${randomStyle}

Keep the prompt specific with ${constraintCount} constraints. ${simpleControl}. The goal is to create a prompt that would be ${challengeLevel} for someone to guess after seeing the AI's response.

Examples of good prompts:
- "Write about a cat who secretly works as a jazz musician at night"
- "Explain how cloud computing works by comparing it to a library system"
- "Write a motivational message for astronauts on their first day of training"

You should only respond with the one prompt itself, nothing else.`;

  const generatedPrompt = await generateAiContent(promptForPrompt);
  
  return generatedPrompt;
};
