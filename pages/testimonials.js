import { useRouter } from 'next/router';
import { Star, Quote } from 'lucide-react';
import TestimonialSlider from '../components/TestimonialSlider';
import { getContent, getLocalizedText } from '../lib/content';
import { useLanguage } from '../lib/LanguageContext';

export default function Testimonials() {
  const { currentLocale } = useLanguage();
  const router = useRouter();
  const content = getContent(currentLocale);

  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-600 to-primary-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              {getLocalizedText(content.navigation[currentLocale].testimonials, currentLocale)}
            </h1>
            <p className="text-xl md:text-2xl text-primary-100 max-w-3xl mx-auto">
              {currentLocale === 'id' 
                ? 'Dengarkan cerita sukses dari siswa dan orang tua yang telah bergabung dengan kami'
                : 'Listen to success stories from students and parents who have joined us'
              }
            </p>
          </div>
        </div>
      </section>

      {/* Main Testimonial Slider */}
      <TestimonialSlider testimonials={content.testimonials} />

      {/* All Testimonials Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {currentLocale === 'id' ? 'Semua Testimoni' : 'All Testimonials'}
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              {currentLocale === 'id' 
                ? 'Baca lebih banyak cerita inspiratif dari komunitas belajar kami'
                : 'Read more inspiring stories from our learning community'
              }
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {content.testimonials.map((testimonial) => (
              <div key={testimonial.id} className="bg-gray-50 rounded-lg p-6 relative">
                <Quote className="absolute top-4 right-4 h-8 w-8 text-primary-200" />
                
                {/* Rating */}
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < testimonial.rating
                          ? 'text-yellow-400 fill-current'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>

                {/* Testimonial Text */}
                <blockquote className="text-gray-700 mb-6 leading-relaxed">
                  "{getLocalizedText(testimonial.text, currentLocale)}"
                </blockquote>

                {/* Author Info */}
                <div className="flex items-center">
                  <img
                    src={testimonial.photoUrl || '/images/avatar-placeholder.jpg'}
                    alt={testimonial.name}
                    className="h-12 w-12 rounded-full object-cover mr-4"
                    onError={(e) => {
                      e.target.src = '/images/avatar-placeholder.jpg';
                    }}
                  />
                  <div>
                    <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                    <p className="text-gray-600 text-sm">{testimonial.role}</p>
                    <p className="text-primary-600 text-sm font-medium">{testimonial.course}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Success Stories by Course */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {currentLocale === 'id' ? 'Cerita Sukses per Kursus' : 'Success Stories by Course'}
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              {currentLocale === 'id' 
                ? 'Lihat bagaimana setiap program kursus membantu siswa mencapai tujuan mereka'
                : 'See how each course program helps students achieve their goals'
              }
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {content.courses.map((course) => {
              const courseTestimonials = content.testimonials.filter(
                t => t.course === getLocalizedText(course.title, currentLocale)
              );
              
              if (courseTestimonials.length === 0) return null;
              
              return (
                <div key={course.id} className="bg-white rounded-lg shadow-lg p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    {getLocalizedText(course.title, currentLocale)}
                  </h3>
                  <div className="space-y-4">
                    {courseTestimonials.map((testimonial) => (
                      <div key={testimonial.id} className="border-l-4 border-primary-500 pl-4">
                        <p className="text-gray-600 text-sm mb-2">
                          "{getLocalizedText(testimonial.text, currentLocale).substring(0, 120)}..."
                        </p>
                        <div className="flex items-center">
                          <div className="flex mr-2">
                            {[...Array(testimonial.rating)].map((_, i) => (
                              <Star key={i} className="h-3 w-3 text-yellow-400 fill-current" />
                            ))}
                          </div>
                          <span className="text-gray-800 font-medium text-sm">
                            {testimonial.name}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Statistics */}
      <section className="py-20 bg-primary-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">
              {currentLocale === 'id' ? 'Pencapaian Siswa Kami' : 'Our Students\' Achievements'}
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">95%</div>
              <div className="text-primary-200">
                {currentLocale === 'id' ? 'Tingkat Kepuasan' : 'Satisfaction Rate'}
              </div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">87%</div>
              <div className="text-primary-200">
                {currentLocale === 'id' ? 'Lulus dengan Nilai A' : 'Graduate with A Grade'}
              </div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">92%</div>
              <div className="text-primary-200">
                {currentLocale === 'id' ? 'Merekomendasikan ke Teman' : 'Recommend to Friends'}
              </div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">78%</div>
              <div className="text-primary-200">
                {currentLocale === 'id' ? 'Melanjutkan ke Level Berikutnya' : 'Continue to Next Level'}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Video Testimonials */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {currentLocale === 'id' ? 'Video Testimoni' : 'Video Testimonials'}
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              {currentLocale === 'id' 
                ? 'Dengarkan langsung dari siswa kami tentang pengalaman belajar mereka'
                : 'Listen directly from our students about their learning experience'
              }
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                title: currentLocale === 'id' ? 'Testimoni Sari - Ibu dari Siswa SD' : 'Sari\'s Testimonial - Elementary Student Parent',
                videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
                description: currentLocale === 'id' 
                  ? 'Sari berbagi pengalaman anaknya belajar di English School Indonesia'
                  : 'Sari shares her child\'s learning experience at English School Indonesia'
              },
              {
                title: currentLocale === 'id' ? 'Testimoni Ahmad - Siswa SMP' : 'Ahmad\'s Testimonial - Junior High Student',
                videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
                description: currentLocale === 'id' 
                  ? 'Ahmad menceritakan bagaimana kepercayaan dirinya meningkat setelah belajar di sini'
                  : 'Ahmad tells how his confidence improved after studying here'
              }
            ].map((video, index) => (
              <div key={index} className="bg-gray-50 rounded-lg overflow-hidden">
                <div className="relative pb-[56.25%] h-0">
                  <iframe
                    src={video.videoUrl}
                    title={video.title}
                    className="absolute top-0 left-0 w-full h-full"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {video.title}
                  </h3>
                  <p className="text-gray-600">
                    {video.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-accent-500 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">
            {currentLocale === 'id' 
              ? 'Ingin Menjadi Bagian dari Cerita Sukses Berikutnya?'
              : 'Want to Be Part of the Next Success Story?'
            }
          </h2>
          <p className="text-xl mb-8 text-accent-100">
            {currentLocale === 'id' 
              ? 'Bergabunglah dengan ribuan siswa yang telah merasakan transformasi kemampuan bahasa Inggris mereka'
              : 'Join thousands of students who have experienced the transformation of their English skills'
            }
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="bg-white text-accent-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors duration-200"
            >
              {currentLocale === 'id' ? 'Daftar Sekarang' : 'Register Now'}
            </a>
            <a
              href="/courses"
              className="bg-accent-600 text-white border-2 border-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-accent-700 transition-colors duration-200"
            >
              {currentLocale === 'id' ? 'Lihat Kursus' : 'View Courses'}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
