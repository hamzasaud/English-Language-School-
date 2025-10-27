import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Menu, X, Globe } from 'lucide-react';
import { getContent } from '../lib/content';
import { useLanguage } from '../lib/LanguageContext';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { currentLocale, toggleLanguage } = useLanguage();
  const router = useRouter();
  const content = getContent(currentLocale);

  const navigation = [
    { name: content.navigation[currentLocale].home, href: '/' },
    { name: content.navigation[currentLocale].courses, href: '/courses' },
    { name: content.navigation[currentLocale].pricing, href: '/pricing' },
    { name: content.navigation[currentLocale].about, href: '/about' },
    { name: content.navigation[currentLocale].testimonials, href: '/testimonials' },
    { name: content.navigation[currentLocale].contact, href: '/contact' },
  ];

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center">
              <img
                className="h-8 w-auto"
                src="https://via.placeholder.com/32x32/3B82F6/FFFFFF?text=ES"
                alt="English School Indonesia"
              />
              <span className="ml-3 text-xl font-bold text-primary-600">
                English School Indonesia
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navigation.map((item) => {
                const isActive = router.pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                      isActive
                        ? 'bg-primary-100 text-primary-700'
                        : 'text-gray-700 hover:bg-gray-100 hover:text-primary-600'
                    }`}
                  >
                    {item.name}
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Language Toggle & CTA */}
          <div className="hidden md:flex items-center space-x-4">
            <button
              onClick={toggleLanguage}
              className="flex items-center px-3 py-2 text-sm text-gray-600 hover:text-primary-600 transition-colors"
              aria-label="Toggle language"
            >
              <Globe className="h-4 w-4 mr-1" />
              {currentLocale === 'id' ? 'EN' : 'ID'}
            </button>
            <Link
              href="/contact"
              className="bg-primary-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-primary-700 transition-colors duration-200"
            >
              {currentLocale === 'id' ? 'Daftar Sekarang' : 'Register Now'}
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            <button
              onClick={toggleLanguage}
              className="p-2 text-gray-600 hover:text-primary-600"
              aria-label="Toggle language"
            >
              <Globe className="h-5 w-5" />
            </button>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-md text-gray-600 hover:text-primary-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t border-gray-200">
              {navigation.map((item) => {
                const isActive = router.pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 ${
                      isActive
                        ? 'bg-primary-100 text-primary-700'
                        : 'text-gray-700 hover:bg-gray-100 hover:text-primary-600'
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                );
              })}
              <div className="pt-4 pb-2">
                <Link
                  href="/contact"
                  className="block w-full text-center bg-primary-600 text-white px-4 py-2 rounded-md text-base font-medium hover:bg-primary-700 transition-colors duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {currentLocale === 'id' ? 'Daftar Sekarang' : 'Register Now'}
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
