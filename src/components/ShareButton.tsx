import React from 'react';
import { Button } from '@/components/ui/button';
import { Share2 } from 'lucide-react';
import { toast } from '@/components/ui/sonner';

interface ShareButtonProps {
  score: number;
  date: string;
}

const ShareButton: React.FC<ShareButtonProps> = ({ score, date }) => {
  const generateShareText = () =>{
    let emoji = '🤔';
    
    if (score > 80){
      emoji = '🌟';
    }
    else if (score > 60){
      emoji = '✨';
    }
    else if (score > 40){
      emoji = '👍';
    }
    else if (score > 20){
      emoji = '🙂';
    }
    
    return (`Prompted Daily Challenge (${date}) ${emoji}\nMy similarity score: ${score}%\nTry it yourself at promptedai.vercel.app/daily`);
  };
  
  const handleShare = async () => {
    const shareText = generateShareText();
    
    if (navigator.share) {
      try{
        await navigator.share({
          title: 'Prompted Daily Challenge',
          text: shareText,
          url: 'https://promptedai.vercel.app/daily'
        });
      } catch (err) {
        console.error('Error sharing:', err);
        copyToClipboard(shareText);
      }
    } else {
      copyToClipboard(shareText);
    }
  };
  
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
      .then(() => toast.success("Result copied to clipboard!"))
      .catch(err => {
        console.error('Failed to copy:', err);
        toast.error("Failed to copy to clipboard");
      });
  };
  
  return (
    <Button 
      onClick={handleShare} 
      variant="outline" 
      size="sm"
      className="flex items-center"
    >
      <Share2 className="mr-2 h-4 w-4" />
      Share Result
    </Button>
  );
};

export default ShareButton;