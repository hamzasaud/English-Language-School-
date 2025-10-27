import { useRouter } from 'next/router';
import Link from 'next/link';
import { ArrowLeft, Clock, Users, Award, Check, Play } from 'lucide-react';
import VideoBlock from '../../components/VideoBlock';
import { getContent, getLocalizedText, getCourseBySlug, getWhatsAppUrl } from '../../lib/content';

export default function CourseDetail() {
  const router = useRouter();
  const { slug, locale = 'id' } = router.query;
  const content = getContent(locale);
  
  if (!slug) {
    return <div>Loading...</div>;
  }

  const course = getCourseBySlug(slug);
  
  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            {locale === 'id' ? 'Kursus tidak ditemukan' : 'Course not found'}
          </h1>
          <Link href="/courses" className="btn-primary">
            {locale === 'id' ? 'Kembali ke Kursus' : 'Back to Courses'}
          </Link>
        </div>
      </div>
    );
  }

  const whatsappMessage = locale === 'id' 
    ? `Halo, saya tertarik dengan kursus "${getLocalizedText(course.title, locale)}". Bisakah saya mendapatkan informasi lebih lanjut?`
    : `Hello, I am interested in the "${getLocalizedText(course.title, locale)}" course. Can I get more information?`;

  return (
    <>
      {/* Breadcrumb */}
      <div className="bg-gray-50 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center space-x-2 text-sm">
            <Link href="/" className="text-gray-500 hover:text-primary-600">
              {content.navigation[locale].home}
            </Link>
            <span className="text-gray-400">/</span>
            <Link href="/courses" className="text-gray-500 hover:text-primary-600">
              {content.navigation[locale].courses}
            </Link>
            <span className="text-gray-400">/</span>
            <span className="text-gray-900 font-medium">
              {getLocalizedText(course.title, locale)}
            </span>
          </nav>
        </div>
      </div>

      {/* Course Header */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div>
              <div className="flex items-center mb-4">
                <Link
                  href="/courses"
                  className="flex items-center text-primary-600 hover:text-primary-700 mr-4"
                >
                  <ArrowLeft className="h-5 w-5 mr-1" />
                  {locale === 'id' ? 'Kembali' : 'Back'}
                </Link>
                <span className="bg-primary-100 text-primary-800 px-3 py-1 rounded-full text-sm font-medium">
                  {course.level}
                </span>
              </div>
              
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                {getLocalizedText(course.title, locale)}
              </h1>
              
              <p className="text-xl text-gray-600 mb-6">
                {getLocalizedText(course.longDescription, locale)}
              </p>

              {/* Course Meta */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
                <div className="flex items-center text-gray-600">
                  <Users className="h-5 w-5 mr-2 text-primary-500" />
                  <span>{course.ageGroup}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Clock className="h-5 w-5 mr-2 text-primary-500" />
                  <span>{course.duration}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Award className="h-5 w-5 mr-2 text-primary-500" />
                  <span>{locale === 'id' ? 'Sertifikat' : 'Certificate'}</span>
                </div>
              </div>

              {/* Price and CTA */}
              <div className="bg-gray-50 rounded-lg p-6 mb-8">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <div className="text-3xl font-bold text-primary-600">
                      {course.priceDisplay}
                    </div>
                    <p className="text-gray-600">
                      {getLocalizedText(course.schedule, locale)}
                    </p>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <Link
                    href="/contact"
                    className="w-full bg-primary-600 text-white py-3 px-6 rounded-lg font-semibold text-center block hover:bg-primary-700 transition-colors duration-200"
                  >
                    {locale === 'id' ? 'Daftar Sekarang' : 'Register Now'}
                  </Link>
                  <a
                    href={getWhatsAppUrl(content.settings.whatsapp, whatsappMessage)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-green-600 text-white py-3 px-6 rounded-lg font-semibold text-center block hover:bg-green-700 transition-colors duration-200"
                  >
                    {locale === 'id' ? 'Tanyakan via WhatsApp' : 'Ask via WhatsApp'}
                  </a>
                </div>
              </div>
            </div>

            {/* Course Video */}
            <div>
              <VideoBlock
                videoUrl={course.videoUrl}
                title={`${getLocalizedText(course.title, locale)} - ${locale === 'id' ? 'Video Contoh' : 'Sample Video'}`}
                className="aspect-video"
              />
              <p className="text-sm text-gray-500 mt-2 text-center">
                {locale === 'id' 
                  ? 'Video contoh pembelajaran (30-90 detik)'
                  : 'Sample learning video (30-90 seconds)'
                }
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Course Content */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Learning Outcomes */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                {locale === 'id' ? 'Yang Akan Anda Pelajari' : 'What You Will Learn'}
              </h2>
              <ul className="space-y-3">
                {getLocalizedText(course.bullets, locale).map((bullet, index) => (
                  <li key={index} className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{bullet}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Course Details */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                {locale === 'id' ? 'Detail Kursus' : 'Course Details'}
              </h2>
              <div className="space-y-4">
                <div className="flex justify-between py-3 border-b border-gray-200">
                  <span className="font-medium text-gray-900">
                    {locale === 'id' ? 'Level' : 'Level'}
                  </span>
                  <span className="text-gray-600">{course.level}</span>
                </div>
                <div className="flex justify-between py-3 border-b border-gray-200">
                  <span className="font-medium text-gray-900">
                    {locale === 'id' ? 'Usia Target' : 'Target Age'}
                  </span>
                  <span className="text-gray-600">{course.ageGroup}</span>
                </div>
                <div className="flex justify-between py-3 border-b border-gray-200">
                  <span className="font-medium text-gray-900">
                    {locale === 'id' ? 'Durasi' : 'Duration'}
                  </span>
                  <span className="text-gray-600">{course.duration}</span>
                </div>
                <div className="flex justify-between py-3 border-b border-gray-200">
                  <span className="font-medium text-gray-900">
                    {locale === 'id' ? 'Jadwal' : 'Schedule'}
                  </span>
                  <span className="text-gray-600">{getLocalizedText(course.schedule, locale)}</span>
                </div>
                <div className="flex justify-between py-3 border-b border-gray-200">
                  <span className="font-medium text-gray-900">
                    {locale === 'id' ? 'Harga' : 'Price'}
                  </span>
                  <span className="text-gray-600 font-semibold">{course.priceDisplay}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Courses */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            {locale === 'id' ? 'Kursus Lainnya' : 'Other Courses'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {content.courses
              .filter(c => c.id !== course.id)
              .slice(0, 2)
              .map((relatedCourse) => (
                <div key={relatedCourse.id} className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {getLocalizedText(relatedCourse.title, locale)}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {getLocalizedText(relatedCourse.shortDescription, locale)}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-primary-600">
                      {relatedCourse.priceDisplay}
                    </span>
                    <Link
                      href={`/courses/${relatedCourse.slug}`}
                      className="btn-secondary"
                    >
                      {locale === 'id' ? 'Lihat Detail' : 'View Details'}
                    </Link>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 bg-primary-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">
            {locale === 'id' 
              ? 'Siap Bergabung dengan Kursus Ini?'
              : 'Ready to Join This Course?'
            }
          </h2>
          <p className="text-xl mb-8 text-primary-100">
            {locale === 'id' 
              ? 'Jangan lewatkan kesempatan untuk meningkatkan kemampuan bahasa Inggris Anda bersama instruktur berpengalaman.'
              : 'Don\'t miss the opportunity to improve your English skills with experienced instructors.'
            }
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="bg-accent-500 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-accent-600 transition-colors duration-200"
            >
              {locale === 'id' ? 'Daftar Sekarang' : 'Register Now'}
            </Link>
            <a
              href={`tel:${content.settings.phone}`}
              className="bg-white text-primary-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors duration-200"
            >
              {locale === 'id' ? 'Hubungi Kami' : 'Contact Us'}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
