import { useRouter } from 'next/router';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Users, BookOpen, Award, Clock } from 'lucide-react';
import CourseCard from '../components/CourseCard';
import TestimonialSlider from '../components/TestimonialSlider';
import { getContent, getLocalizedText } from '../lib/content';
import { useLanguage } from '../lib/LanguageContext';

export default function Home() {
  const { currentLocale } = useLanguage();
  const router = useRouter();
  const content = getContent(currentLocale);
  const homepage = content.homepage[currentLocale];

  const iconMap = {
    users: Users,
    'book-open': BookOpen,
    award: Award,
    clock: Clock,
  };

  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight animate-slide-up">
                {homepage.hero.title}
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-primary-100 leading-relaxed animate-slide-up">
                {homepage.hero.subtitle}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start animate-slide-up">
                <Link
                  href="/contact"
                  className="bg-accent-500 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-accent-600 transition-colors duration-200 flex items-center justify-center"
                >
                  {homepage.hero.ctaPrimary}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
                <Link
                  href="/courses"
                  className="bg-white bg-opacity-20 text-white border border-white border-opacity-30 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-opacity-30 transition-all duration-200"
                >
                  {homepage.hero.ctaSecondary}
                </Link>
              </div>
            </div>
            <div className="relative animate-fade-in">
              <div className="relative z-10">
                <Image
                  src={homepage.hero.heroImage}
                  alt="Students learning English"
                  width={600}
                  height={400}
                  className="rounded-lg shadow-2xl"
                  priority
                  onError={(e) => {
                    e.target.src = '/images/hero-placeholder.jpg';
                  }}
                />
              </div>
              <div className="absolute -top-4 -right-4 w-72 h-72 bg-accent-400 rounded-full opacity-20 animate-bounce-gentle"></div>
              <div className="absolute -bottom-4 -left-4 w-48 h-48 bg-white rounded-full opacity-10 animate-bounce-gentle" style={{ animationDelay: '1s' }}></div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Courses Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {currentLocale === 'id' ? 'Kursus Unggulan Kami' : 'Our Featured Courses'}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {currentLocale === 'id' 
                ? 'Pilih program yang sesuai dengan usia dan kebutuhan belajar Anda'
                : 'Choose a program that suits your age and learning needs'
              }
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {content.courses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
          <div className="text-center mt-12">
            <Link
              href="/courses"
              className="btn-primary inline-flex items-center"
            >
              {currentLocale === 'id' ? 'Lihat Semua Kursus' : 'View All Courses'}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {homepage.whyChooseUs.title}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {homepage.whyChooseUs.subtitle}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {homepage.whyChooseUs.features.map((feature, index) => {
              const IconComponent = iconMap[feature.icon] || Users;
              return (
                <div
                  key={index}
                  className="text-center p-6 rounded-lg hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="bg-primary-100 rounded-full p-4 w-20 h-20 mx-auto mb-6 flex items-center justify-center">
                    <IconComponent className="h-10 w-10 text-primary-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-20 bg-primary-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {content.about[currentLocale].stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl md:text-5xl font-bold mb-2">
                  {stat.number}
                </div>
                <div className="text-primary-200 font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <TestimonialSlider testimonials={content.testimonials} />

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-accent-500 to-accent-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            {currentLocale === 'id' 
              ? 'Siap Memulai Perjalanan Belajar Bahasa Inggris Anda?'
              : 'Ready to Start Your English Learning Journey?'
            }
          </h2>
          <p className="text-xl mb-8 text-accent-100">
            {currentLocale === 'id' 
              ? 'Bergabunglah dengan ribuan siswa yang telah merasakan manfaat belajar bersama kami. Konsultasi gratis tersedia!'
              : 'Join thousands of students who have experienced the benefits of learning with us. Free consultation available!'
            }
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="bg-white text-accent-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors duration-200 inline-flex items-center justify-center"
            >
              {currentLocale === 'id' ? 'Konsultasi Gratis' : 'Free Consultation'}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link
              href="/pricing"
              className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-accent-600 transition-all duration-200"
            >
              {currentLocale === 'id' ? 'Lihat Harga' : 'View Pricing'}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
