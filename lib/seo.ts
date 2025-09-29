import type { Metadata } from "next";

interface SEOParams {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
}

export function generateSEO({
  title,
  description,
  path,
  keywords = [],
}: SEOParams): Metadata {
  const fullUrl = `https://gericomlinksnetworks.co.ke${path}`;
  return {
    title,
    description,
    keywords,
    alternates: { canonical: fullUrl },
    openGraph: {
      title,
      description,
      url: fullUrl,
      siteName: "Gericom Links Networks",
      images: [
        {
          url: "/og-image.png",
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: "en_KE",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/og-image.png"],
    },
  };
}
