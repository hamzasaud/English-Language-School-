import Link from 'next/link';
import { useRouter } from 'next/router';
import { Phone, Mail, MapPin, Facebook, Instagram, Youtube } from 'lucide-react';
import { getContent, getLocalizedText, getWhatsAppUrl } from '../lib/content';

export default function Footer() {
  const router = useRouter();
  const { locale = 'id' } = router;
  const content = getContent(locale);

  const currentYear = new Date().getFullYear();

  const footerLinks = [
    {
      title: content.navigation[locale].courses,
      links: content.courses.map(course => ({
        name: getLocalizedText(course.title, locale),
        href: `/courses/${course.slug}`
      }))
    },
    {
      title: locale === 'id' ? 'Informasi' : 'Information',
      links: [
        { name: content.navigation[locale].about, href: '/about' },
        { name: content.navigation[locale].pricing, href: '/pricing' },
        { name: content.navigation[locale].testimonials, href: '/testimonials' },
        { name: locale === 'id' ? 'Syarat & Ketentuan' : 'Terms & Conditions', href: '/terms' },
        { name: locale === 'id' ? 'Kebijakan Privasi' : 'Privacy Policy', href: '/privacy' }
      ]
    }
  ];

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center mb-4">
              <img
                className="h-8 w-auto"
                src={content.site.logo}
                alt="English School Indonesia"
                onError={(e) => {
                  e.target.src = '/images/logo-placeholder.png';
                }}
              />
              <span className="ml-2 text-xl font-bold">
                English School Indonesia
              </span>
            </div>
            <p className="text-gray-300 mb-6 max-w-md">
              {locale === 'id' 
                ? 'Lembaga pendidikan bahasa Inggris terpercaya dengan metode pembelajaran modern dan guru berpengalaman.'
                : 'Trusted English education institution with modern learning methods and experienced teachers.'
              }
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center">
                <MapPin className="h-5 w-5 text-primary-400 mr-3 flex-shrink-0" />
                <span className="text-gray-300">
                  {getLocalizedText(content.settings.address, locale)}
                </span>
              </div>
              <div className="flex items-center">
                <Phone className="h-5 w-5 text-primary-400 mr-3 flex-shrink-0" />
                <a 
                  href={`tel:${content.settings.phone}`}
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  {content.settings.phone}
                </a>
              </div>
              <div className="flex items-center">
                <Mail className="h-5 w-5 text-primary-400 mr-3 flex-shrink-0" />
                <a 
                  href={`mailto:${content.settings.contactEmail}`}
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  {content.settings.contactEmail}
                </a>
              </div>
            </div>

            {/* WhatsApp CTA */}
            <div className="mt-6">
              <a
                href={getWhatsAppUrl(
                  content.settings.whatsapp,
                  locale === 'id' 
                    ? 'Halo, saya tertarik dengan kursus bahasa Inggris di English School Indonesia.'
                    : 'Hello, I am interested in English courses at English School Indonesia.'
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center bg-green-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-green-700 transition-colors duration-200"
              >
                <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                </svg>
                {locale === 'id' ? 'Chat WhatsApp' : 'WhatsApp Chat'}
              </a>
            </div>
          </div>

          {/* Footer Links */}
          {footerLinks.map((section, index) => (
            <div key={index}>
              <h3 className="text-lg font-semibold mb-4">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link
                      href={link.href}
                      className="text-gray-300 hover:text-white transition-colors duration-200"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Business Hours */}
        <div className="mt-8 pt-8 border-t border-gray-800">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">
                {locale === 'id' ? 'Jam Operasional' : 'Business Hours'}
              </h3>
              <div className="space-y-2 text-gray-300">
                <div>{getLocalizedText(content.settings.businessHours[locale].weekdays, locale)}</div>
                <div>{getLocalizedText(content.settings.businessHours[locale].saturday, locale)}</div>
                <div>{getLocalizedText(content.settings.businessHours[locale].sunday, locale)}</div>
              </div>
            </div>

            {/* Social Media */}
            <div>
              <h3 className="text-lg font-semibold mb-4">
                {locale === 'id' ? 'Ikuti Kami' : 'Follow Us'}
              </h3>
              <div className="flex space-x-4">
                <a
                  href={content.settings.socialMedia.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-blue-400 transition-colors"
                  aria-label="Facebook"
                >
                  <Facebook className="h-6 w-6" />
                </a>
                <a
                  href={content.settings.socialMedia.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-pink-400 transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram className="h-6 w-6" />
                </a>
                <a
                  href={content.settings.socialMedia.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-red-400 transition-colors"
                  aria-label="YouTube"
                >
                  <Youtube className="h-6 w-6" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400">
          <p>
            © {currentYear} English School Indonesia. {locale === 'id' ? 'Semua hak dilindungi.' : 'All rights reserved.'}
          </p>
        </div>
      </div>
    </footer>
  );
}
