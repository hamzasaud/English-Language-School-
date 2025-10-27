import { useRouter } from 'next/router';
import Link from 'next/link';
import { Check, Star } from 'lucide-react';
import { getContent, getLocalizedText } from '../lib/content';

export default function PricingTable() {
  const router = useRouter();
  const { locale = 'id' } = router;
  const content = getContent(locale);

  return (
    <div className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            {locale === 'id' ? 'Pilih Paket yang Tepat untuk Anda' : 'Choose the Right Package for You'}
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            {locale === 'id' 
              ? 'Kami menawarkan berbagai pilihan kursus dengan harga terjangkau dan kualitas terbaik. Semua paket sudah termasuk sertifikat resmi.'
              : 'We offer various course options with affordable prices and the best quality. All packages include official certificates.'
            }
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {content.courses.map((course, index) => {
            const isPopular = index === 1; // Middle course is popular
            
            return (
              <div
                key={course.id}
                className={`relative bg-white rounded-2xl shadow-lg overflow-hidden ${
                  isPopular ? 'ring-2 ring-primary-500 transform scale-105' : ''
                }`}
              >
                {isPopular && (
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <div className="bg-primary-500 text-white px-4 py-1 rounded-full text-sm font-medium flex items-center">
                      <Star className="h-4 w-4 mr-1" />
                      {locale === 'id' ? 'Paling Populer' : 'Most Popular'}
                    </div>
                  </div>
                )}

                <div className="p-8">
                  {/* Course Header */}
                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      {getLocalizedText(course.title, locale)}
                    </h3>
                    <p className="text-gray-600 mb-4">
                      {course.ageGroup}
                    </p>
                    <div className="mb-4">
                      <span className="text-4xl font-bold text-primary-600">
                        {course.priceDisplay.split(' / ')[0]}
                      </span>
                      <span className="text-gray-600 ml-2">
                        / {locale === 'id' ? 'bulan' : 'month'}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500">
                      {locale === 'id' ? 'Durasi:' : 'Duration:'} {course.duration}
                    </p>
                  </div>

                  {/* Features List */}
                  <div className="mb-8">
                    <ul className="space-y-3">
                      {getLocalizedText(course.bullets, locale).map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-start">
                          <Check className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Schedule Info */}
                  <div className="mb-8 p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-semibold text-gray-800 mb-2">
                      {locale === 'id' ? 'Jadwal Kelas:' : 'Class Schedule:'}
                    </h4>
                    <p className="text-gray-600">{getLocalizedText(course.schedule, locale)}</p>
                  </div>

                  {/* CTA Buttons */}
                  <div className="space-y-3">
                    <Link
                      href={`/courses/${course.slug}`}
                      className={`w-full py-3 px-6 rounded-md font-medium text-center block transition-colors duration-200 ${
                        isPopular
                          ? 'bg-primary-600 text-white hover:bg-primary-700'
                          : 'bg-primary-100 text-primary-700 hover:bg-primary-200'
                      }`}
                    >
                      {locale === 'id' ? 'Lihat Detail' : 'View Details'}
                    </Link>
                    <Link
                      href="/contact"
                      className="w-full py-3 px-6 rounded-md font-medium text-center block border border-primary-600 text-primary-600 hover:bg-primary-50 transition-colors duration-200"
                    >
                      {locale === 'id' ? 'Daftar Sekarang' : 'Register Now'}
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Additional Info */}
        <div className="mt-16 text-center">
          <div className="bg-white rounded-lg shadow-lg p-8 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              {locale === 'id' ? 'Yang Termasuk dalam Semua Paket:' : 'Included in All Packages:'}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="bg-primary-100 rounded-full p-3 w-16 h-16 mx-auto mb-3 flex items-center justify-center">
                  <Check className="h-8 w-8 text-primary-600" />
                </div>
                <h4 className="font-semibold text-gray-800 mb-2">
                  {locale === 'id' ? 'Sertifikat Resmi' : 'Official Certificate'}
                </h4>
                <p className="text-sm text-gray-600">
                  {locale === 'id' 
                    ? 'Sertifikat yang diakui nasional dan internasional'
                    : 'Nationally and internationally recognized certificate'
                  }
                </p>
              </div>
              <div className="text-center">
                <div className="bg-primary-100 rounded-full p-3 w-16 h-16 mx-auto mb-3 flex items-center justify-center">
                  <Check className="h-8 w-8 text-primary-600" />
                </div>
                <h4 className="font-semibold text-gray-800 mb-2">
                  {locale === 'id' ? 'Materi Lengkap' : 'Complete Materials'}
                </h4>
                <p className="text-sm text-gray-600">
                  {locale === 'id' 
                    ? 'Buku, audio, video, dan materi digital'
                    : 'Books, audio, video, and digital materials'
                  }
                </p>
              </div>
              <div className="text-center">
                <div className="bg-primary-100 rounded-full p-3 w-16 h-16 mx-auto mb-3 flex items-center justify-center">
                  <Check className="h-8 w-8 text-primary-600" />
                </div>
                <h4 className="font-semibold text-gray-800 mb-2">
                  {locale === 'id' ? 'Guru Berpengalaman' : 'Experienced Teachers'}
                </h4>
                <p className="text-sm text-gray-600">
                  {locale === 'id' 
                    ? 'Pengajar profesional dengan sertifikasi internasional'
                    : 'Professional teachers with international certification'
                  }
                </p>
              </div>
              <div className="text-center">
                <div className="bg-primary-100 rounded-full p-3 w-16 h-16 mx-auto mb-3 flex items-center justify-center">
                  <Check className="h-8 w-8 text-primary-600" />
                </div>
                <h4 className="font-semibold text-gray-800 mb-2">
                  {locale === 'id' ? 'Konsultasi Gratis' : 'Free Consultation'}
                </h4>
                <p className="text-sm text-gray-600">
                  {locale === 'id' 
                    ? 'Konsultasi pembelajaran dan progress tracking'
                    : 'Learning consultation and progress tracking'
                  }
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Money Back Guarantee */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center bg-green-50 border border-green-200 rounded-lg px-6 py-4">
            <Check className="h-6 w-6 text-green-600 mr-3" />
            <span className="text-green-800 font-medium">
              {locale === 'id' 
                ? '30 Hari Garansi Uang Kembali - Jika tidak puas!'
                : '30 Days Money Back Guarantee - If not satisfied!'
              }
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
