import { useRouter } from 'next/router';
import Image from 'next/image';
import { Users, Target, Heart, Shield } from 'lucide-react';
import { getContent, getLocalizedText } from '../lib/content';
import { useLanguage } from '../lib/LanguageContext';

export default function About() {
  const { currentLocale } = useLanguage();
  const content = getContent(currentLocale);
  const aboutContent = content.about[currentLocale];

  const valueIcons = {
    'Kualitas': Target,
    'Quality': Target,
    'Inovasi': Users,
    'Innovation': Users,
    'Kepedulian': Heart,
    'Care': Heart,
    'Integritas': Shield,
    'Integrity': Shield,
  };

  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-600 to-primary-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              {aboutContent.title}
            </h1>
            <p className="text-xl md:text-2xl text-primary-100 max-w-3xl mx-auto">
              {aboutContent.subtitle}
            </p>
          </div>
        </div>
      </section>

      {/* Main Story */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                {currentLocale === 'id' ? 'Cerita Kami' : 'Our Story'}
              </h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                {aboutContent.description}
              </p>
              <div className="grid grid-cols-2 gap-6">
                {aboutContent.stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-3xl font-bold text-primary-600 mb-2">
                      {stat.number}
                    </div>
                    <div className="text-gray-600 font-medium">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <Image
                src="/images/about-school.jpg"
                alt="English School Indonesia"
                width={600}
                height={400}
                className="rounded-lg shadow-lg"
                onError={(e) => {
                  e.target.src = '/images/about-placeholder.jpg';
                }}
              />
              <div className="absolute -bottom-6 -left-6 bg-accent-500 text-white p-6 rounded-lg shadow-lg">
                <div className="text-2xl font-bold">2015</div>
                <div className="text-sm">
                  {currentLocale === 'id' ? 'Didirikan' : 'Founded'}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="bg-white rounded-lg p-8 shadow-lg">
              <div className="bg-primary-100 rounded-full p-4 w-16 h-16 mb-6 flex items-center justify-center">
                <Target className="h-8 w-8 text-primary-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                {currentLocale === 'id' ? 'Misi Kami' : 'Our Mission'}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {aboutContent.mission}
              </p>
            </div>
            <div className="bg-white rounded-lg p-8 shadow-lg">
              <div className="bg-accent-100 rounded-full p-4 w-16 h-16 mb-6 flex items-center justify-center">
                <Users className="h-8 w-8 text-accent-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                {currentLocale === 'id' ? 'Visi Kami' : 'Our Vision'}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {aboutContent.vision}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {currentLocale === 'id' ? 'Nilai-Nilai Kami' : 'Our Values'}
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              {currentLocale === 'id' 
                ? 'Nilai-nilai yang menjadi fondasi dalam setiap aspek pendidikan yang kami berikan'
                : 'Values that form the foundation of every aspect of education we provide'
              }
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {aboutContent.values.map((value, index) => {
              const IconComponent = valueIcons[value.title] || Target;
              return (
                <div key={index} className="text-center">
                  <div className="bg-primary-100 rounded-full p-4 w-20 h-20 mx-auto mb-6 flex items-center justify-center">
                    <IconComponent className="h-10 w-10 text-primary-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    {value.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {value.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {currentLocale === 'id' ? 'Tim Pengajar Kami' : 'Our Teaching Team'}
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              {currentLocale === 'id' 
                ? 'Bertemu dengan para pengajar berpengalaman yang akan membantu Anda mencapai tujuan belajar'
                : 'Meet our experienced teachers who will help you achieve your learning goals'
              }
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: 'Sarah Johnson',
                role: currentLocale === 'id' ? 'Kepala Sekolah & Pengajar Senior' : 'Principal & Senior Teacher',
                experience: currentLocale === 'id' ? '10+ tahun pengalaman' : '10+ years experience',
                education: 'M.Ed TESOL, Cambridge University',
                image: '/images/teacher-1.jpg'
              },
              {
                name: 'Michael Chen',
                role: currentLocale === 'id' ? 'Pengajar TOEFL/IELTS' : 'TOEFL/IELTS Instructor',
                experience: currentLocale === 'id' ? '8 tahun pengalaman' : '8 years experience',
                education: 'M.A Applied Linguistics, Oxford University',
                image: '/images/teacher-2.jpg'
              },
              {
                name: 'Amanda Williams',
                role: currentLocale === 'id' ? 'Pengajar Anak & Remaja' : 'Children & Teen Instructor',
                experience: currentLocale === 'id' ? '6 tahun pengalaman' : '6 years experience',
                education: 'B.Ed English Education, University of Sydney',
                image: '/images/teacher-3.jpg'
              }
            ].map((teacher, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="relative h-64">
                  <Image
                    src={teacher.image}
                    alt={teacher.name}
                    fill
                    className="object-cover"
                    onError={(e) => {
                      e.target.src = '/images/teacher-placeholder.jpg';
                    }}
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {teacher.name}
                  </h3>
                  <p className="text-primary-600 font-medium mb-2">
                    {teacher.role}
                  </p>
                  <p className="text-gray-600 text-sm mb-2">
                    {teacher.experience}
                  </p>
                  <p className="text-gray-500 text-sm">
                    {teacher.education}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Facilities */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {currentLocale === 'id' ? 'Fasilitas Kami' : 'Our Facilities'}
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              {currentLocale === 'id' 
                ? 'Lingkungan belajar yang nyaman dan modern untuk mendukung proses pembelajaran yang optimal'
                : 'Comfortable and modern learning environment to support optimal learning process'
              }
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: currentLocale === 'id' ? 'Ruang Kelas Modern' : 'Modern Classrooms',
                description: currentLocale === 'id' 
                  ? 'Ruang kelas ber-AC dengan proyektor dan audio system untuk pembelajaran interaktif'
                  : 'Air-conditioned classrooms with projectors and audio systems for interactive learning',
                image: '/images/classroom.jpg'
              },
              {
                title: currentLocale === 'id' ? 'Perpustakaan Digital' : 'Digital Library',
                description: currentLocale === 'id' 
                  ? 'Akses ke ribuan buku digital dan materi pembelajaran online'
                  : 'Access to thousands of digital books and online learning materials',
                image: '/images/library.jpg'
              },
              {
                title: currentLocale === 'id' ? 'Lab Bahasa' : 'Language Lab',
                description: currentLocale === 'id' 
                  ? 'Laboratorium bahasa dengan teknologi terkini untuk latihan speaking dan listening'
                  : 'Language laboratory with latest technology for speaking and listening practice',
                image: '/images/language-lab.jpg'
              }
            ].map((facility, index) => (
              <div key={index} className="bg-gray-50 rounded-lg overflow-hidden">
                <div className="relative h-48">
                  <Image
                    src={facility.image}
                    alt={facility.title}
                    fill
                    className="object-cover"
                    onError={(e) => {
                      e.target.src = '/images/facility-placeholder.jpg';
                    }}
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {facility.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {facility.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">
            {currentLocale === 'id' 
              ? 'Bergabunglah dengan Keluarga Besar Kami'
              : 'Join Our Big Family'
            }
          </h2>
          <p className="text-xl mb-8 text-primary-100">
            {currentLocale === 'id' 
              ? 'Mulai perjalanan belajar bahasa Inggris Anda bersama tim pengajar terbaik dan fasilitas modern'
              : 'Start your English learning journey with the best teaching team and modern facilities'
            }
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="bg-accent-500 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-accent-600 transition-colors duration-200"
            >
              {currentLocale === 'id' ? 'Hubungi Kami' : 'Contact Us'}
            </a>
            <a
              href="/courses"
              className="bg-white text-primary-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors duration-200"
            >
              {currentLocale === 'id' ? 'Lihat Kursus' : 'View Courses'}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
