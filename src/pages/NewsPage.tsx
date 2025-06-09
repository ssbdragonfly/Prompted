import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { fetchAINews, NewsArticle, NewsCategory } from '@/services/newsService';
import Metadata from '@/components/Metadata';
import { ExternalLink, Clock, Loader2 } from 'lucide-react';

const NewsPage = () => {
  const [articles, setArticles] = useState<Record<NewsCategory, NewsArticle[]>>({
    all: [],
    openai: [],
    google: [],
    meta: [],
    startups: [],
    research: []
  });
  const [loading, setLoading] = useState<Record<NewsCategory, boolean>>({
    all: true,
    openai: true,
    google: true,
    meta: true,
    startups: true,
    research: true
  });
  const [loadingMore, setLoadingMore] = useState<Record<NewsCategory, boolean>>({
    all: false,
    openai: false,
    google: false,
    meta: false,
    startups: false,
    research: false
  });
  const [activeCategory, setActiveCategory] = useState<NewsCategory>('all');
  const [pages, setPages] = useState<Record<NewsCategory, number>>({
    all: 1,
    openai: 1,
    google: 1,
    meta: 1,
    startups: 1,
    research: 1
  });
  const [hasMore, setHasMore] = useState<Record<NewsCategory, boolean>>({
    all: true,
    openai: true,
    google: true,
    meta: true,
    startups: true,
    research: true
  });
  
  const loadNews = async (category: NewsCategory, reset: boolean = false) => {
    const currentPage = reset ? 1 : pages[category];
    
    if (currentPage === 1) {
      setLoading(prev => ({ ...prev, [category]: true }));
    } else {
      setLoadingMore(prev => ({ ...prev, [category]: true }));
    }
    
    try {
      const result = await fetchAINews(category, currentPage);
      
      setArticles(prev => ({
        ...prev,
        [category]: reset ? result.articles : [...prev[category], ...result.articles]
      }));
      
      setHasMore(prev => ({
        ...prev,
        [category]: result.hasMore
      }));
      
      if (!reset) {
        setPages(prev => ({
          ...prev,
          [category]: prev[category] + 1
        }));
      }
    } catch (error) {
      console.error(`failed o load ${category} news:`, error);
    } finally {
      setLoading(prev => ({ ...prev, [category]: false }));
      setLoadingMore(prev => ({ ...prev, [category]: false }));
    }
  };
  
  useEffect(() => {
    const categories: NewsCategory[] = ['all', 'openai', 'google', 'meta', 'startups', 'research'];
    
    categories.forEach(category => {
      if (articles[category].length === 0) {
        loadNews(category, true);
      }
    });
  }, []);
  
  const handleLoadMore = (category: NewsCategory) => {
    loadNews(category);
  };
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) {
      const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
      if (diffHours === 0) {
        const diffMinutes = Math.floor(diffTime / (1000 * 60));
        return `${diffMinutes} minute${diffMinutes !== 1 ? 's' : ''} ago`;
      }
      return `${diffHours} hour${diffHours !== 1 ? 's' : ''} ago`;
    } else if (diffDays < 7) {
      return `${diffDays} day${diffDays !== 1 ? 's' : ''} ago`;
    } else {
      return date.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric' 
      });
    }
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <Metadata 
        title="AI News - Latest Updates in Artificial Intelligence"
        description="Stay updated with the latest news and developments in artificial intelligence, machine learning, and related technologies."
        keywords="AI news, artificial intelligence, machine learning, technology news, AI updates"
      />
      
      <div className="text-center mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold mb-4">AI News</h1>
        <p className="text-muted-foreground">
          Stay updated with the latest developments in artificial intelligence
        </p>
      </div>
      
      <Tabs defaultValue="all" className="mb-8" onValueChange={(value) => setActiveCategory(value as NewsCategory)}>
        <div className="flex justify-center mb-6 overflow-x-auto pb-2">
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="openai">OpenAI</TabsTrigger>
            <TabsTrigger value="google">Google</TabsTrigger>
            <TabsTrigger value="meta">Meta</TabsTrigger>
            <TabsTrigger value="startups">Startups</TabsTrigger>
            <TabsTrigger value="research">Research</TabsTrigger>
          </TabsList>
        </div>
        
        {(['all', 'openai', 'google', 'meta', 'startups', 'research'] as NewsCategory[]).map((category) => (
          <TabsContent key={category} value={category} className="mt-0">
            <NewsGrid 
              articles={articles[category]} 
              loading={loading[category]} 
              formatDate={formatDate}
              hasMore={hasMore[category]}
              loadingMore={loadingMore[category]}
              onLoadMore={() => handleLoadMore(category)}
            />
          </TabsContent>
        ))}
      </Tabs>
      
      <div className="text-center text-sm text-muted-foreground mt-8">
        <p>Powered by newsapi.ai • Updated every 30 minutes</p>
      </div>
    </div>
  );
};

interface NewsGridProps {
  articles: NewsArticle[];
  loading: boolean;
  formatDate: (date: string) => string;
  hasMore: boolean;
  loadingMore: boolean;
  onLoadMore: () => void;
}

const NewsGrid: React.FC<NewsGridProps> = ({ 
  articles, 
  loading, 
  formatDate,
  hasMore,
  loadingMore,
  onLoadMore
}) => {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array(9).fill(0).map((_, i) => (
          <NewsCardSkeleton key={i} />
        ))}
      </div>
    );
  }
  
  if (articles.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">No articles found. Try another category or check back later.</p>
      </div>
    );
  }
  
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((article, index) => (
          <NewsCard key={`${article.url}-${index}`} article={article} formatDate={formatDate} />
        ))}
      </div>
      
      {hasMore && (
        <div className="flex justify-center mt-8">
          <Button 
            onClick={onLoadMore} 
            disabled={loadingMore}
            className="px-8"
          >
            {loadingMore ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Loading...
              </>
            ) : (
              'Load More'
            )}
          </Button>
        </div>
      )}
    </>
  );
};

const NewsCardSkeleton = () => (
  <Card className="overflow-hidden">
    <Skeleton className="h-48 w-full" />
    <div className="p-4">
      <Skeleton className="h-6 w-3/4 mb-2" />
      <Skeleton className="h-4 w-full mb-1" />
      <Skeleton className="h-4 w-5/6" />
    </div>
  </Card>
);

interface NewsCardProps {
  article: NewsArticle;
  formatDate: (date: string) => string;
}

const NewsCard: React.FC<NewsCardProps> = ({ article, formatDate }) => {
  return (
    <Card className="overflow-hidden flex flex-col h-full hover:shadow-lg transition-shadow">
      <div className="relative h-48 bg-muted">
        <img 
          src={article.urlToImage || 'https://via.placeholder.com/300x200?text=AI+News'} 
          alt={article.title} 
          className="w-full h-full object-cover"
          onError={(e) => {
            (e.target as HTMLImageElement).src = 'https://via.placeholder.com/300x200?text=AI+News';
          }}
        />
        {article.category && (
          <Badge className="absolute top-2 right-2">
            {article.category}
          </Badge>
        )}
      </div>
      
      <div className="p-4 flex-1 flex flex-col">
        <h3 className="font-bold mb-2 line-clamp-2">{article.title}</h3>
        
        <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
          {article.description || "No description available"}
        </p>
        
        <div className="mt-auto flex justify-between items-center text-xs text-muted-foreground">
          <div className="flex items-center">
            <Clock className="h-3 w-3 mr-1" />
            <span>{formatDate(article.publishedAt)}</span>
          </div>
          
          <a 
            href={article.url} 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center hover:text-primary transition-colors"
          >
            Read more
            <ExternalLink className="h-3 w-3 ml-1" />
          </a>
        </div>
      </div>
    </Card>
  );
};

export default NewsPage;