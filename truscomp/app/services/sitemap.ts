import { MetadataRoute } from 'next';
import { axiosInstance } from '@/lib/api';

interface Service {
  slug: string;
  updatedAt?: string;
}

async function getAllServices(): Promise<Service[]> {
  try {
    const response = await axiosInstance.get('/api/services');
    return response.data.success ? response.data.data : [];
  } catch (error) {
    console.error('Error fetching services for sitemap:', error);
    return [];
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const services = await getAllServices();
  const baseUrl = 'https://truscomp.com';

  const serviceUrls = services.map((service) => ({
    url: `${baseUrl}/services/${service.slug}`,
    lastModified: service.updatedAt ? new Date(service.updatedAt) : new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  return [
    {
      url: `${baseUrl}/services`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    ...serviceUrls,
  ];
}
