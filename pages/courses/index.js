import { useState } from 'react';
import { useRouter } from 'next/router';
import { Filter, Search } from 'lucide-react';
import CourseCard from '../../components/CourseCard';
import { getContent, getLocalizedText } from '../../lib/content';
import { useLanguage } from '../../lib/LanguageContext';

export default function Courses() {
  const { currentLocale } = useLanguage();
  const router = useRouter();
  const content = getContent(currentLocale);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('all');

  const filteredCourses = content.courses.filter(course => {
    const matchesSearch = searchTerm === '' || 
      getLocalizedText(course.title, currentLocale).toLowerCase().includes(searchTerm.toLowerCase()) ||
      getLocalizedText(course.shortDescription, currentLocale).toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesLevel = selectedLevel === 'all' || course.level === selectedLevel;
    
    return matchesSearch && matchesLevel;
  });

  const levels = ['all', ...new Set(content.courses.map(course => course.level))];

  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-600 to-primary-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              {content.navigation[currentLocale].courses}
            </h1>
            <p className="text-xl md:text-2xl text-primary-100 max-w-3xl mx-auto">
              {currentLocale === 'id' 
                ? 'Temukan program belajar bahasa Inggris yang sesuai dengan usia dan kebutuhan Anda'
                : 'Find an English learning program that suits your age and needs'
              }
            </p>
          </div>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="py-8 bg-gray-50 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder={currentLocale === 'id' ? 'Cari kursus...' : 'Search courses...'}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
            </div>

            {/* Level Filter */}
            <div className="flex items-center gap-2">
              <Filter className="h-5 w-5 text-gray-600" />
              <select
                value={selectedLevel}
                onChange={(e) => setSelectedLevel(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              >
                <option value="all">
                  {currentLocale === 'id' ? 'Semua Level' : 'All Levels'}
                </option>
                {levels.slice(1).map(level => (
                  <option key={level} value={level}>
                    {level}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Courses Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredCourses.length > 0 ? (
            <>
              <div className="mb-8">
                <p className="text-gray-600">
                  {currentLocale === 'id' 
                    ? `Menampilkan ${filteredCourses.length} dari ${content.courses.length} kursus`
                    : `Showing ${filteredCourses.length} of ${content.courses.length} courses`
                  }
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredCourses.map((course) => (
                  <CourseCard key={course.id} course={course} />
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-16">
              <div className="text-gray-400 mb-4">
                <Search className="h-16 w-16 mx-auto" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {currentLocale === 'id' ? 'Tidak ada kursus ditemukan' : 'No courses found'}
              </h3>
              <p className="text-gray-600 mb-6">
                {currentLocale === 'id' 
                  ? 'Coba ubah kata kunci pencarian atau filter yang Anda gunakan'
                  : 'Try changing your search keywords or filters'
                }
              </p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedLevel('all');
                }}
                className="btn-primary"
              >
                {currentLocale === 'id' ? 'Reset Filter' : 'Reset Filters'}
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Course Comparison Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {currentLocale === 'id' ? 'Perbandingan Kursus' : 'Course Comparison'}
            </h2>
            <p className="text-lg text-gray-600">
              {currentLocale === 'id' 
                ? 'Bandingkan fitur dan manfaat dari setiap program kursus'
                : 'Compare features and benefits of each course program'
              }
            </p>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full bg-white rounded-lg shadow-lg">
              <thead className="bg-primary-600 text-white">
                <tr>
                  <th className="px-6 py-4 text-left font-semibold">
                    {currentLocale === 'id' ? 'Fitur' : 'Features'}
                  </th>
                  {content.courses.map(course => (
                    <th key={course.id} className="px-6 py-4 text-center font-semibold">
                      {getLocalizedText(course.title, currentLocale)}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="px-6 py-4 font-medium text-gray-900">
                    {currentLocale === 'id' ? 'Usia Target' : 'Target Age'}
                  </td>
                  {content.courses.map(course => (
                    <td key={course.id} className="px-6 py-4 text-center text-gray-600">
                      {course.ageGroup}
                    </td>
                  ))}
                </tr>
                <tr className="bg-gray-50">
                  <td className="px-6 py-4 font-medium text-gray-900">
                    {currentLocale === 'id' ? 'Harga per Bulan' : 'Price per Month'}
                  </td>
                  {content.courses.map(course => (
                    <td key={course.id} className="px-6 py-4 text-center font-semibold text-primary-600">
                      {course.priceDisplay}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="px-6 py-4 font-medium text-gray-900">
                    {currentLocale === 'id' ? 'Durasi Program' : 'Program Duration'}
                  </td>
                  {content.courses.map(course => (
                    <td key={course.id} className="px-6 py-4 text-center text-gray-600">
                      {course.duration}
                    </td>
                  ))}
                </tr>
                <tr className="bg-gray-50">
                  <td className="px-6 py-4 font-medium text-gray-900">
                    {currentLocale === 'id' ? 'Jadwal Kelas' : 'Class Schedule'}
                  </td>
                  {content.courses.map(course => (
                    <td key={course.id} className="px-6 py-4 text-center text-gray-600">
                      {getLocalizedText(course.schedule, currentLocale)}
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">
            {currentLocale === 'id' 
              ? 'Masih Bingung Memilih Kursus yang Tepat?'
              : 'Still Confused About Choosing the Right Course?'
            }
          </h2>
          <p className="text-xl mb-8 text-primary-100">
            {currentLocale === 'id' 
              ? 'Tim konsultan kami siap membantu Anda menemukan program yang paling sesuai dengan kebutuhan dan tujuan belajar Anda.'
              : 'Our consultant team is ready to help you find the program that best suits your learning needs and goals.'
            }
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="bg-accent-500 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-accent-600 transition-colors duration-200"
            >
              {currentLocale === 'id' ? 'Konsultasi Gratis' : 'Free Consultation'}
            </a>
            <a
              href={`tel:${content.settings.phone}`}
              className="bg-white text-primary-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors duration-200"
            >
              {currentLocale === 'id' ? 'Hubungi Sekarang' : 'Call Now'}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
