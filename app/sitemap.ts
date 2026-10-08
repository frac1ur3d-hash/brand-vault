import { MetadataRoute } from 'next';
import statesData from '@/data/states.json';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://brandvault.app';
  const currentDate = new Date();

  // Root and compliance pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/privacy-policy`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.5,
    },
  ];

  // Dynamic 50 states LLC pages
  const statePages: MetadataRoute.Sitemap = statesData.map((state) => ({
    url: `${baseUrl}/llc-search/${state.slug}`,
    lastModified: currentDate,
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  return [...staticPages, ...statePages];
}
