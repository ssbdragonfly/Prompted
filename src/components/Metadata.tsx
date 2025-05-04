import { Helmet } from 'react-helmet-async';

interface MetadataProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
  author?: string;
  twitterHandle?: string;
}

const defaultMetadata = {
  title: 'Prompted - Understanding AI one prompt at a time',
  description: 'Can you guess what prompt was used to generate the AI text? Test your skills and learn about AI prompting.',
  keywords: 'AI, prompts, game, artificial intelligence, learning',
  image: '/image.jpg',
  url: 'https://promptedai.vercel.app', //switch later (have no idea if ill get this domain)
  type: 'website',
  author: 'Shaurya Bisht',
};

const Metadata = ({
  title = defaultMetadata.title,
  description = defaultMetadata.description,
  keywords = defaultMetadata.keywords,
  image = defaultMetadata.image,
  url = defaultMetadata.url,
  type = defaultMetadata.type,
  author = defaultMetadata.author,
}: MetadataProps) => {
  const fullTitle = title !== defaultMetadata.title ? `${title} | Prompted` : title;
  const fullImageUrl = image.startsWith('http') ? image : `${url}${image}`;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content={author} />
      <link rel="canonical" href={url} />

      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={fullImageUrl} />
    </Helmet>
  );
};

export default Metadata;
