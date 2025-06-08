import { generateAiContent } from './aiService';

const getPromptsList = (): string[] => {
  try{
    const envPrompts = process.env.NEXT_PUBLIC_DAILY_PROMPTS;

    if(envPrompts){
      return JSON.parse(envPrompts);
    }
  }
  catch (error) {
    console.error("error parsing", error);
  }
  
  return [
    "Write a short poem about the changing seasons using only weather-related metaphors"
  ];
};

const CACHE_PREFIX = 'dailyChallenge_v6_';
const dailyPrompts = getPromptsList();

const getCurrentDateEST = (): Date => {
  const now = new Date();
  const estOffset = -4;
  const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
  return new Date(utc + (3600000 * estOffset));
};

const getTodayDateString = (): string => {
  const date = getCurrentDateEST();
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
};

const getDailyPrompt = (): string => {
  const date = getCurrentDateEST();
  const dayOfMonth = date.getDate() - 1;
  
  const selectionMethod = process.env.NEXT_PUBLIC_PROMPT_SELECTION_METHOD || 'sequential';
  
  if(selectionMethod === 'random'){
    const randomIndex = Math.floor(Math.random() * dailyPrompts.length);
    return dailyPrompts[randomIndex];
  } else {
    return dailyPrompts[dayOfMonth % dailyPrompts.length];
  }
};

export const getDailyChallenge = async (): Promise<{ prompt: string, content: string, date: string }> => {
  const today = getTodayDateString();
  const prompt = getDailyPrompt();
  
  const cacheKey = `${CACHE_PREFIX}content_${today}`;
  let content = localStorage.getItem(cacheKey);
  
  if (!content) {
    try {
      content = await generateAiContent(prompt);
      localStorage.setItem(cacheKey, content);
    } catch (error) {
      console.error("Error generating daily challenge:", error);
      content = "Today's AI content could not be generated. Please try refreshing the page.";
    }
  }
  
  return{
    date: today,
    prompt,
    content: content || ""
  };
};

export const hasCompletedDailyChallenge = (): boolean => {
  const lastCompletedDate = localStorage.getItem(`${CACHE_PREFIX}lastCompleted`);
  return lastCompletedDate === getTodayDateString();
};

export const saveDailyChallengeResult = (similarity: number): void => {
  const today = getTodayDateString();
  localStorage.setItem(`${CACHE_PREFIX}lastCompleted`, today);
  localStorage.setItem(`${CACHE_PREFIX}result_${today}`, similarity.toString());
};

export const getDailyChallengeResult = (date: string = getTodayDateString()): number | null => {
  const result = localStorage.getItem(`${CACHE_PREFIX}result_${date}`);
  return result ? parseInt(result, 10) : null;
};

export const generateShareText = (similarity: number): string => {
  const date = getTodayDateString();
  let emoji = '🤔';
  
  if (similarity > 80) emoji = '🌟';
  else if (similarity > 60) emoji = '✨';
  else if (similarity > 40) emoji = '👍';
  else if (similarity > 20) emoji = '🙂';
  
  return `Prompted Daily Challenge (${date}) ${emoji}\nMy similarity score: ${similarity}%\nTry it yourself at promptedai.vercel.app/daily`;
};
