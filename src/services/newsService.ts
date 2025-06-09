const NEWS_API_KEY = import.meta.env.VITE_NEWS_API_KEY;
const BASE_URL = 'https://eventregistry.org/api/v1';

export interface NewsArticle {
  source: {
    id: string | null;
    name: string;
  };
  author: string | null;
  title: string;
  description: string | null;
  url: string;
  urlToImage: string | null;
  publishedAt: string;
  content: string | null;
  category?: string;
}

export type NewsCategory = 'all' | 'openai' | 'google' | 'meta' | 'research' | 'startups';

const newsCache: Record<string, { articles: NewsArticle[], timestamp: number, page: number }> = {};
const CACHE_DURATION = 30 * 60 * 1000;

const getCategoryKeywords = (category: NewsCategory): string[] => {
  switch (category) {
    case 'openai':
      return ['OpenAI', 'ChatGPT', 'GPT-4', 'DALL-E', 'Sam Altman'];
    case 'google':
      return ['Google AI', 'Google DeepMind', 'Gemini AI', 'Google Bard', 'PaLM', 'Anthropic Claude'];
    case 'meta':
      return ['Meta AI', 'Facebook AI', 'Llama model', 'Meta artificial intelligence', 'Meta LLM'];
    case 'research':
      return ['AI research', 'machine learning research', 'AI paper', 'AI breakthrough', 'neural network research'];
    case 'startups':
      return ['AI startup', 'AI company', 'AI funding', 'AI venture', 'AI series', 'AI raised'];
    case 'all':
    default:
      return ['artificial intelligence', 'machine learning', 'neural network', 'deep learning', 'language model', 'AI model'];
  }
};

const getMockNewsData = (category: NewsCategory): NewsArticle[] => {
  const allMockData: NewsArticle[] = [];
  if (category === 'all') {
    return allMockData;
  }
  const categoryMap: Record<NewsCategory, string> = {
    'openai': 'OpenAI',
    'google': 'Google',
    'meta': 'Meta',
    'research': 'Research',
    'startups': 'Startups',
    'all': 'General AI'
  };
  return allMockData.filter(article => article.category === categoryMap[category]);
};

const VIOLENT_WORDS = [
  'killing', 'murder', 'murdered', 'murdering', 'shooting', 'shot', 'stabbed', 'stabbing', 'dead', 'death', 'homicide', 'suicide', 'assault', 'abuse', 'abused', 'abusing', 'victim', 'victims', 'blood', 'beaten', 'beating', 'violence', 'violent', 'terror', 'terrorist', 'terrorism', 'execute', 'executed', 'execution', 'slain', 'slaying', 'massacre', 'massacred', 'slaughter', 'slaughtered'
];

function isViolent(text: string | null | undefined): boolean {
  if (!text) return false;
  const lower = text.toLowerCase();
  return VIOLENT_WORDS.some(word => lower.includes(word));
}

export const fetchAINews = async (
  category: NewsCategory = 'all',
  page: number = 1,
  pageSize: number = 12,
  minArticles: number = 9
): Promise<{ articles: NewsArticle[], hasMore: boolean }> => {
  const cacheKey = `${category}_${pageSize}_${page}`;
  const now = Date.now();

  if (newsCache[cacheKey] && now - newsCache[cacheKey].timestamp < CACHE_DURATION) {
    console.info(`[NewsService] Using cached news for ${cacheKey}`);
    return {
      articles: newsCache[cacheKey].articles,
      hasMore: newsCache[cacheKey].articles.length >= pageSize
    };
  }

  try {
    const keywords = getCategoryKeywords(category);

    const params: Record<string, string | string[] | boolean | number> = {
      apiKey: NEWS_API_KEY,
      resultType: 'articles',
      keyword: keywords,
      keywordOper: 'or',
      lang: 'eng',
      articlesSortBy: 'date',
      articlesSortByAsc: false,
      articlesCount: pageSize,
      articlesPage: page,
      includeArticleImage: true,
      includeArticleCategories: true,
    };

    const queryString = Object.entries(params)
      .flatMap(([key, value]) =>
        Array.isArray(value)
          ? value.map(v => `${key}=${encodeURIComponent(v)}`)
          : [`${key}=${encodeURIComponent(value)}`]
      )
      .join('&');

    let articles: NewsArticle[] = [];

    try {
      const response = await fetch(`${BASE_URL}/article/getArticles?${queryString}`);
      if (!response.ok) {
        throw new Error(`NewsAPI.ai error: ${response.status} - ${response.statusText}`);
      }
      const data = await response.json();

      if (data.articles && data.articles.results) {
        articles = data.articles.results.map((article: { source?: { title?: string }; authors?: string[]; title?: string; body?: string; description?: string; url?: string; image?: string; dateTime?: string }) => ({
          source: {
            id: null,
            name: article.source?.title || 'Unknown Source'
          },
          author: Array.isArray(article.authors) ? article.authors.join(', ') : null,
          title: article.title || 'No Title',
          description: article.body || article.description || null,
          url: article.url || '',
          urlToImage: article.image || null,
          publishedAt: article.dateTime || new Date().toISOString(),
          content: article.body || null,
          category: mapToCategory(article, category)
        }));

        articles = articles.filter(article =>
          article.urlToImage &&
          !isViolent(article.title) &&
          !isViolent(article.description) &&
          !isViolent(article.content)
        );
      } else {
        console.warn('[NewsService] No articles found in API response, using mock data.');
        articles = getMockNewsData(category);
      }
    } catch (apiError) {
      console.warn('[NewsService] NewsAPI.ai request failed, using mock data:', apiError);
      articles = getMockNewsData(category);
    }

    if (articles.length < minArticles) {
      const mockArticles = getMockNewsData(category);
      const allArticles = [...articles, ...mockArticles];
      const uniqueUrls = new Set();
      articles = allArticles.filter(article => {
        if (uniqueUrls.has(article.url)) return false;
        uniqueUrls.add(article.url);
        return true;
      }).slice(0, pageSize);
    }

    newsCache[cacheKey] = {
      articles,
      timestamp: now,
      page
    };

    return {
      articles,
      hasMore: articles.length >= pageSize
    };
  } catch (error) {
    console.error('[NewsService] Error fetching AI news:', error);

    const mockArticles = getMockNewsData(category);

    return {
      articles: mockArticles.slice(0, pageSize),
      hasMore: mockArticles.length > pageSize
    };
  }
};

function mapToCategory(article: { title?: string; body?: string; description?: string; }, defaultCategory: NewsCategory): string {
  const text = `${article.title || ''} ${article.body || ''} ${article.description || ''}`.toLowerCase();

  if (text.includes('openai') || text.includes('chatgpt') || text.includes('gpt-4') || text.includes('dall-e') || text.includes('sam altman')) {
    return 'OpenAI';
  } else if (text.includes('google') || text.includes('deepmind') || text.includes('gemini') || text.includes('bard')) {
    return 'Google';
  } else if (text.includes('meta') || text.includes('facebook') || text.includes('llama')) {
    return 'Meta';
  } else if (text.includes('startup') || text.includes('funding') || text.includes('million') || text.includes('venture') || text.includes('raised')) {
    return 'Startups';
  } else if (text.includes('research') || text.includes('study') || text.includes('paper') || text.includes('university')) {
    return 'Research';
  } else {
    const categoryMap: Record<NewsCategory, string> = {
      'openai': 'OpenAI',
      'google': 'Google',
      'meta': 'Meta',
      'research': 'Research',
      'startups': 'Startups',
      'all': 'General AI'
    };
    return categoryMap[defaultCategory] || 'General AI';
  }
}
