import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/dashboard/', '/api/', '/login', '/reset-password'],
      },
    ],
    sitemap: [
      'https://truscomp.com/sitemap.xml',
      'https://truscomp.com/services/sitemap.xml',
    ],
  };
}
