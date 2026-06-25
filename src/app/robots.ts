import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://zobitech.vercel.app'; // Replace with actual domain

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/private/', '/admin/'],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
