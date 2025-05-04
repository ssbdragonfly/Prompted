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
        temperature: Math.random() * 0.3 + 0.7,
      }),
    });

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    const data: CompletionResponse = await response.json();
    return data.choices[0].message.content;
  } catch (error) {
    console.error("Error generating AI content:", error);
    throw error;
  }
};

export const generatePrompt = async (): Promise<string> => {
  const styles = [
    'Clever and witty',
    'Professional and nuanced',
    'Thoughtful reflection',
    'Technical explanation with an analogy',
    'Creative story starter',
    'Thought-provoking opinion question',
    'Detailed how-to instruction'
  ];

  const randomStyle = styles[Math.floor(Math.random() * styles.length)];

  const promptForPrompt = `Generate a focused writing prompt for a chatbot that will result in a response of 1-3 paragraphs maximum. The prompt should be moderately challenging but still possible to reverse-engineer from the output.

Using this style: ${randomStyle}

Keep the prompt specific with 2-3 constraints maximum. Avoid overly simple or vague prompts. The goal is to create a prompt that would take someone a few thoughtful moments to guess after seeing the AI's response.

Examples of good prompts:
- "Write about a cat who secretly works as a jazz musician at night"
- "Explain how cloud computing works by comparing it to a library system"
- "Write a motivational message for astronauts on their first day of training"

You should only respond with the one prompt itself, nothing else.`;

  const generatedPrompt = await generateAiContent(promptForPrompt);
  
  return generatedPrompt;
};
