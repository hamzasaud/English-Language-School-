import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react';
import { getLocalizedText } from '../lib/content';

export default function TestimonialSlider({ testimonials }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const router = useRouter();
  const { locale = 'id' } = router;

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying || testimonials.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, testimonials.length]);

  const goToPrevious = () => {
    setCurrentIndex(currentIndex === 0 ? testimonials.length - 1 : currentIndex - 1);
    setIsAutoPlaying(false);
  };

  const goToNext = () => {
    setCurrentIndex(currentIndex === testimonials.length - 1 ? 0 : currentIndex + 1);
    setIsAutoPlaying(false);
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
  };

  if (!testimonials || testimonials.length === 0) {
    return null;
  }

  const currentTestimonial = testimonials[currentIndex];

  return (
    <div className="relative bg-gray-50 py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            {locale === 'id' ? 'Apa Kata Mereka?' : 'What They Say?'}
          </h2>
          <p className="text-lg text-gray-600">
            {locale === 'id' 
              ? 'Testimoni dari siswa dan orang tua yang telah merasakan manfaat belajar bersama kami'
              : 'Testimonials from students and parents who have experienced the benefits of learning with us'
            }
          </p>
        </div>

        <div className="relative">
          {/* Main Testimonial */}
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 relative">
            <Quote className="absolute top-6 left-6 h-8 w-8 text-primary-200" />
            
            <div className="text-center">
              {/* Rating Stars */}
              <div className="flex justify-center mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${
                      i < currentTestimonial.rating
                        ? 'text-yellow-400 fill-current'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>

              {/* Testimonial Text */}
              <blockquote className="text-lg md:text-xl text-gray-700 mb-8 leading-relaxed">
                "{getLocalizedText(currentTestimonial.text, locale)}"
              </blockquote>

              {/* Author Info */}
              <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
                <div className="flex-shrink-0">
                  <img
                    src={currentTestimonial.photoUrl || '/images/avatar-placeholder.jpg'}
                    alt={currentTestimonial.name}
                    className="h-16 w-16 rounded-full object-cover"
                    onError={(e) => {
                      e.target.src = '/images/avatar-placeholder.jpg';
                    }}
                  />
                </div>
                <div className="text-center sm:text-left">
                  <h4 className="font-semibold text-gray-900">{currentTestimonial.name}</h4>
                  <p className="text-gray-600">{currentTestimonial.role}</p>
                  <p className="text-sm text-primary-600">{currentTestimonial.course}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Arrows */}
          {testimonials.length > 1 && (
            <>
              <button
                onClick={goToPrevious}
                className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 bg-white rounded-full p-2 shadow-lg hover:shadow-xl transition-shadow duration-200"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="h-6 w-6 text-gray-600" />
              </button>
              <button
                onClick={goToNext}
                className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 bg-white rounded-full p-2 shadow-lg hover:shadow-xl transition-shadow duration-200"
                aria-label="Next testimonial"
              >
                <ChevronRight className="h-6 w-6 text-gray-600" />
              </button>
            </>
          )}
        </div>

        {/* Dots Indicator */}
        {testimonials.length > 1 && (
          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-colors duration-200 ${
                  index === currentIndex
                    ? 'bg-primary-600'
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        )}

        {/* Auto-play indicator */}
        {testimonials.length > 1 && (
          <div className="text-center mt-4">
            <button
              onClick={() => setIsAutoPlaying(!isAutoPlaying)}
              className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
            >
              {isAutoPlaying 
                ? (locale === 'id' ? 'Jeda otomatis' : 'Pause auto-play')
                : (locale === 'id' ? 'Mulai otomatis' : 'Start auto-play')
              }
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
