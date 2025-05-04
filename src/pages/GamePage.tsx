import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { generateAiContent, generatePrompt } from '../services/aiService';
import { toast } from '@/components/ui/sonner';
import Metadata from '@/components/Metadata';
import { Difficulty } from '@/components/DifficultySelector';
import { useNavigate } from 'react-router-dom';

const GamePage = () => {
  const [loading, setLoading] = useState(true);
  const [aiContent, setAiContent] = useState<string>("");
  const [actualPrompt, setActualPrompt] = useState<string>("");
  const [userGuess, setUserGuess] = useState<string>("");
  const [revealed, setRevealed] = useState(false);
  const [similarity, setSimilarity] = useState<number|null>(null);
  const [difficulty, setDifficulty] = useState<Difficulty>('medium');
  const navigate = useNavigate();

  const loadOneChallenge = React.useCallback(async () => {
    try {
      setLoading(true);
      setRevealed(false);
      setUserGuess("");
      setSimilarity(null);
      
      const prompt = await generatePrompt(difficulty);
      setActualPrompt(prompt);
      
      const content = await generateAiContent(prompt);
      setAiContent(content);
      
      setLoading(false);
    } 
    catch(error) {
      console.error("(If this is repeated contact me), failed to load challenge:", error);
      toast.error("Failed to load challenge. Please try again.");
      setLoading(false);
    }
  }, [difficulty]);

  useEffect(() => {
    const savedDifficulty = localStorage.getItem('gameDifficulty') as Difficulty;
    
    if (savedDifficulty) {
      setDifficulty(savedDifficulty);
    }
    
    loadOneChallenge();
  }, [loadOneChallenge]);
  
  const calculateSimilarity = (str1: string, str2: string): number => {
    //text normalization and preprocessing
    const normalize = (text: string) => {
      return text.toLowerCase()
        .replace(/[^\\w\\s]/g, '')
        .replace(/\\s+/g, ' ')
        .trim();
    };
    
    const normalizedStr1 = normalize(str1);
    const normalizedStr2 = normalize(str2);
    
    //tokenization
    const tokenize = (text: string) => {
      return text.split(/\\s+/).filter(Boolean);
    };
    
    const tokens1 = tokenize(normalizedStr1);
    const tokens2 = tokenize(normalizedStr2);
    
    //word frequency analysis with BM25 weighting
    const createFreqMap = (tokens: string[]) => {
      const freqMap: Record<string, number> = {};
      tokens.forEach(token => {
        freqMap[token] = (freqMap[token] || 0) + 1;
      });
      return freqMap;
    };
    
    const freqMap1 = createFreqMap(tokens1);
    const freqMap2 = createFreqMap(tokens2);
    const allWords = new Set([...Object.keys(freqMap1), ...Object.keys(freqMap2)]);
    
    //BM25 parameters
    const k1 = 1.2;
    const b = 0.75;
    const avgDocLength = (tokens1.length + tokens2.length)/2;
    let bm25Similarity = 0;
    let magnitude1 = 0;
    let magnitude2 = 0;
    
    allWords.forEach(word => {
      //idf
      const docCount = (word in freqMap1 ? 1 : 0) + (word in freqMap2 ? 1 : 0);
      const idf = Math.log(1 + (2 - docCount + 0.5) / (docCount + 0.5));
      
      //bm25 weights
      const tf1 = freqMap1[word] || 0;
      const tf2 = freqMap2[word] || 0;
      
      const weight1 = idf * ((tf1 * (k1 + 1)) / (tf1 + k1 * (1 - b + b * (tokens1.length / avgDocLength))));
      const weight2 = idf * ((tf2 * (k1 + 1)) / (tf2 + k1 * (1 - b + b * (tokens2.length / avgDocLength))));
      
      bm25Similarity += weight1 * weight2;
      magnitude1 += weight1 * weight1;
      magnitude2 += weight2 * weight2;
    });
    
    //normalize
    const normalizedBM25 = magnitude1 > 0 && magnitude2 > 0 
      ? Math.max(0, bm25Similarity / (Math.sqrt(magnitude1) * Math.sqrt(magnitude2)))
      : 0;
    
    //jaccard similarity with word stemming
    const stem = (word: string): string => {
      //stemming algorithm
      return word
        .replace(/ies$/, 'y')
        .replace(/es$/, '')
        .replace(/s$/, '')
        .replace(/ing$/, '')
        .replace(/ed$/, '')
        .replace(/ly$/, '')
        .replace(/ment$/, '')
        .replace(/ness$/, '')
        .replace(/tion$/, 't')
        .replace(/ize$/, 'ize')
        .replace(/ise$/, 'ize')
        .replace(/ful$/, '')
        .replace(/able$/, '')
        .replace(/ible$/, '')
        .replace(/al$/, '')
        .replace(/ial$/, '')
        .replace(/ive$/, '')
        .replace(/ic$/, '')
        .replace(/ical$/, 'ic');
    };
    
    const stemmedTokens1 = tokens1.map(stem);
    const stemmedTokens2 = tokens2.map(stem);
    const stemmedSet1 = new Set(stemmedTokens1);
    const stemmedSet2 = new Set(stemmedTokens2);
    const intersection = new Set([...stemmedSet1].filter(word => stemmedSet2.has(word)));
    const union = new Set([...stemmedSet1, ...stemmedSet2]);
    const jaccardSimilarity = union.size > 0 ? intersection.size/union.size : 0;
    
    //n-gram analysis
    const extractNgrams = (tokens: string[], size: number) => {
      const ngrams = [];
      for (let i = 0; i <= tokens.length - size; i++) {
        ngrams.push(tokens.slice(i, i + size).join(' '));
      }
      return new Set(ngrams);
    };
    
    const ngramSimilarities = [];
    const maxNgramSize = Math.min(5, Math.floor(Math.min(tokens1.length, tokens2.length) / 2));
    for (let n = 1; n <= maxNgramSize; n++) {
      const ngrams1 = extractNgrams(tokens1, n);
      const ngrams2 = extractNgrams(tokens2, n);
      const ngramIntersection = new Set([...ngrams1].filter(ng => ngrams2.has(ng)));
      const ngramUnion = new Set([...ngrams1, ...ngrams2]);
      const similarity = ngramUnion.size > 0 ? ngramIntersection.size/ ngramUnion.size : 0;
      ngramSimilarities.push(similarity);
    }
    
    //weight n-grams
    let weightedNgramSimilarity = 0;
    let totalWeight = 0;
    
    ngramSimilarities.forEach((sim, idx) => {
      const weight = (idx + 1)* 2;
      weightedNgramSimilarity += sim * weight;
      totalWeight += weight;
    });
    
    const ngramSimilarity = totalWeight > 0 ? weightedNgramSimilarity / totalWeight : 0;
    const damerauLevenshteinDistance = (a: string, b: string): number => {
      const matrix: number[][] = Array(b.length + 1).fill(null).map(() => Array(a.length + 1).fill(0));
      
      for (let i = 0; i <= b.length; i++) matrix[i][0] = i;
      for (let j = 0; j <= a.length; j++) matrix[0][j] = j;
      
      for (let i = 1; i <= b.length; i++) {
        for (let j = 1; j <= a.length; j++) {
          const cost = a[j - 1] === b[i - 1] ? 0 : 1;
          
          matrix[i][j] = Math.min(
            matrix[i - 1][j] + 1,
            matrix[i][j - 1] + 1,
            matrix[i - 1][j - 1] + cost
          );
          
          if (i > 1 && j > 1 && a[j - 1] === b[i - 2] && a[j - 2] === b[i - 1]) {
            matrix[i][j] = Math.min(matrix[i][j], matrix[i - 2][j - 2] + cost);
          }
        }
      }
      
      return matrix[b.length][a.length];
    };
    
    const wordEditDistance = damerauLevenshteinDistance(tokens1.join(' '), tokens2.join(' '));
    const maxWordLength = Math.max(tokens1.length, tokens2.length);
    const editDistanceSimilarity = maxWordLength > 0 ? 
      Math.max(0, Math.min(1, 1 - (wordEditDistance / maxWordLength))) : 1;

    const calculatePositionalSimilarity = (tokens1: string[], tokens2: string[]): number => {
      const commonWords = [...new Set(tokens1)].filter(word => tokens2.includes(word));
      if (commonWords.length === 0){
        return 0;
      }
      
      let positionDiffSum = 0;
      let maxPossibleDiff = 0;
      commonWords.forEach(word => {
        const positions1 = tokens1.map((t, i) => t === word ? i : -1).filter(p => p !== -1);
        const positions2 = tokens2.map((t, i) => t === word ? i : -1).filter(p => p !== -1);
        
        const normalizedPos1 = positions1.map(p => p / tokens1.length);
        const normalizedPos2 = positions2.map(p => p / tokens2.length);
        
        let minDiffSum = Number.MAX_VALUE;
        
        for (let offset = 0; offset < normalizedPos2.length; offset++) {
          let diffSum = 0;
          let count = 0;

          for (let i = 0; i < normalizedPos1.length; i++) {
            const j = (i + offset) % normalizedPos2.length;
            diffSum += Math.abs(normalizedPos1[i] - normalizedPos2[j]);
            count++;

          }
          
          minDiffSum = Math.min(minDiffSum, diffSum / count);
        }
        
        positionDiffSum += minDiffSum;
        maxPossibleDiff += 1;
      });
      
      return maxPossibleDiff > 0 ? 
        Math.max(0, Math.min(1, 1 - (positionDiffSum / maxPossibleDiff))) : 0;
    };
    
    const positionalSimilarity = calculatePositionalSimilarity(tokens1, tokens2);
    const lengthRatio = Math.min(tokens1.length, tokens2.length) / Math.max(tokens1.length, tokens2.length);
    
    const getPosTags = (tokens: string[]): string[] => {
      return tokens.map(token => {
        if (/^(the|a|an|this|that|these|those)$/i.test(token)) return 'DET';
        if (/^(in|on|at|by|with|from|to|for)$/i.test(token)) return 'PREP';
        if (/^(and|or|but|so|yet|however|therefore)$/i.test(token)) return 'CONJ';
        if (/^(is|am|are|was|were|be|being|been|have|has|had)$/i.test(token)) return 'AUX';
        if (/^(i|you|he|she|it|we|they|me|him|her|us|them)$/i.test(token)) return 'PRON';
        if (/^[A-Z][a-z]*$/.test(token)) return 'PROP';
        if (/[0-9]/.test(token)) return 'NUM';
        if (/ly$/.test(token)) return 'ADV';
        if (/[aeiou]ble$|ful$|ous$|ive$|ic$|al$/.test(token)) return 'ADJ';
        if (/[aeiou][td]e?$|[^aeiou]e$/.test(token)) return 'VERB';
        return 'NOUN';
      });
    };
    
    const posTags1 = getPosTags(tokens1);
    const posTags2 = getPosTags(tokens2);
    const lcs = (seq1: string[], seq2: string[]): number => {
      const m = seq1.length;
      const n = seq2.length;
      const dp: number[][] = Array(m + 1).fill(null).map(() => Array(n + 1).fill(0));
      
      for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
          if (seq1[i - 1] === seq2[j - 1]) {
            dp[i][j] = dp[i - 1][j - 1] + 1;
          } else {
            dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
          }
        }
      }
      
      return dp[m][n];
    };
    
    const lcsLength = lcs(posTags1, posTags2);
    const structureSimilarity = Math.max(posTags1.length, posTags2.length) > 0? lcsLength / Math.max(posTags1.length, posTags2.length): 0;
    const combinedSimilarity = (
      normalizedBM25 * 0.25 +
      jaccardSimilarity * 0.15 +
      ngramSimilarity * 0.20 +
      editDistanceSimilarity * 0.15 +
      positionalSimilarity * 0.10 +
      lengthRatio * 0.05 +
      structureSimilarity * 0.10
    ) * 100;

    const curvedSimilarity = Math.pow(combinedSimilarity/ 100, 0.9) * 100;
    return Math.max(0, Math.min(100, Math.round(curvedSimilarity)));
  };
  
  const handleSubmitGuess = () => {
    if (!userGuess.trim()) {
      toast.error("Please enter a guess!");

      return;
    }
    
    setRevealed(true);
    
    const similarityScore = calculateSimilarity(actualPrompt, userGuess);
    setSimilarity(similarityScore);
    
    if (similarityScore > 70) {
      toast.success("Outstanding! Your guess was very close to the actual prompt :)!");
    } 

    else if (similarityScore > 40) {
      toast.success("Good guess! You got some of it right.");
    } 

    else if (similarityScore > 20) {
      toast("Not bad! You're on the right track.");
    } 

    else {
      toast("Your guess was quite different from the actual prompt :(. Try again!");
    }
  };

  const handleChangeDifficulty = () => {
    navigate('/');
  };
  
  return (
    <div className="flex flex-col items-center space-y-6 sm:space-y-8">
      <Metadata 
        title="What Was The Prompt? - AI Prompt Guessing Game"
        description="Test your AI knowledge by guessing the prompts used to generate AI text. Learn about prompt engineering through play."
        keywords="AI game, prompt engineering, artificial intelligence, prompt guessing, AI literacy"
      />
      
      <div className="text-center w-full px-4 sm:px-0 sm:max-w-2xl">
        <h1 className="text-3xl sm:text-4xl font-bold mb-2 sm:mb-4">What Was The Prompt?</h1>
        <p className="text-base sm:text-lg mb-2">
          Can you guess what prompt was used to generate the AI text below?
        </p>
        <div className="flex justify-center items-center mb-4">
          <span className="text-sm font-medium px-3 py-1 bg-secondary rounded-full">
            Difficulty: {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
          </span>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={handleChangeDifficulty}
            className="ml-2 text-xs"
          >
            Change
          </Button>
        </div>
      </div>
      
      <Card className="w-full mx-4 sm:mx-0 sm:max-w-2xl p-4 sm:p-6 bg-card border shadow-lg">
        <h2 className="text-lg sm:text-xl font-semibold mb-3">AI Generated Content:</h2>
        {loading ? (
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-11/12" />
            <Skeleton className="h-4 w-10/12" />
            <Skeleton className="h-4 w-9/12" />
          </div>
        ) : (
          <div className="bg-secondary p-3 sm:p-4 rounded-md mb-4 whitespace-pre-wrap text-sm sm:text-base">
            {aiContent}
          </div>
        )}
      </Card>
      
      <div className="w-full px-4 sm:px-0 sm:max-w-2xl">
        <div className="mb-4">
          <label htmlFor="promptGuess" className="block text-sm font-medium mb-2">
            Your Prompt Guess:
          </label>
          <Input
            id="promptGuess"
            placeholder="Type what you think the prompt was..."
            value={userGuess}
            onChange={(e) => setUserGuess(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && userGuess.trim() && !revealed && !loading) {
                handleSubmitGuess();
              }
            }}
            className="w-full"
            disabled={revealed || loading}
          />
        </div>
        
        {revealed? (
          <div className="mb-6 space-y-4">
            {similarity !== null && (
              <div className="text-center py-2">
                <span className="font-semibold text-lg">
                  Similarity: {similarity}%
                </span>
              </div>
            )}
            <h3 className="font-semibold mb-2">Actual Prompt:</h3>
            <div className="bg-primary text-primary-foreground p-3 rounded-md prompt-text text-sm sm:text-base">
              "{actualPrompt}"
            </div>
          </div>
        ) : null}
        
        <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-3 sm:space-y-0">
          {!revealed ? (
            <Button 
              onClick={handleSubmitGuess} 
              disabled={loading || !userGuess.trim()}
              className="w-full sm:flex-1"
            >
              Submit Guess
            </Button>
          ):null}
          
          <Button 
            onClick={loadOneChallenge} 
            variant={revealed ? "default" : "outline"}
            disabled={loading}
            className={`w-full ${revealed ? "sm:flex-1" : ""}`}
          >
            {revealed ? "Next Challenge" : "Skip"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default GamePage;