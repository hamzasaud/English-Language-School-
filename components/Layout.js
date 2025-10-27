import Head from 'next/head';
import { useRouter } from 'next/router';
import Header from './Header';
import Footer from './Footer';
import { getContent } from '../lib/content';
import { useLanguage } from '../lib/LanguageContext';

export default function Layout({ children, title, description, keywords }) {
  const router = useRouter();
  const { currentLocale } = useLanguage();
  const content = getContent(currentLocale);

  const pageTitle = title 
    ? `${title} | ${content.site.title}`
    : content.site.title;

  const pageDescription = description || content.site.metaDescription;
  const pageKeywords = keywords || content.site.keywords;

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta name="keywords" content={pageKeywords} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="index, follow" />
        <meta name="language" content={currentLocale === 'id' ? 'Indonesian' : 'English'} />
        
        {/* Open Graph */}
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${content.site.url}${router.asPath}`} />
        <meta property="og:locale" content={currentLocale === 'id' ? 'id_ID' : 'en_US'} />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />
        
        {/* Simple favicon */}
        <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🎓</text></svg>" />
        
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "EducationalOrganization",
              "name": "English School Indonesia",
              "description": content.site.metaDescription,
              "url": content.site.url,
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Jakarta",
                "addressCountry": "ID"
              },
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": content.settings.phone,
                "contactType": "customer service",
                "email": content.settings.contactEmail
              },
              "sameAs": [
                content.settings.socialMedia.facebook,
                content.settings.socialMedia.instagram,
                content.settings.socialMedia.youtube
              ]
            })
          }}
        />
      </Head>
      
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </div>
    </>
  );
}
