import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { Clock, Users, Award } from 'lucide-react';
import { getLocalizedText, getYouTubeThumbnail } from '../lib/content';
import { useLanguage } from '../lib/LanguageContext';

export default function CourseCard({ course, showFullDescription = false }) {
  const router = useRouter();
  const { currentLocale } = useLanguage();

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 animate-fade-in">
      {/* Course Image */}
      <div className="relative h-48 bg-gray-200">
        <Image
          src={course.image || getYouTubeThumbnail(course.videoUrl)}
          alt={getLocalizedText(course.title, currentLocale)}
          fill
          className="object-cover"
          onError={(e) => {
            e.target.src = '/images/course-placeholder.jpg';
          }}
        />
        <div className="absolute top-4 left-4">
          <span className="bg-primary-600 text-white px-3 py-1 rounded-full text-sm font-medium">
            {course.level}
          </span>
        </div>
        <div className="absolute top-4 right-4">
          <span className="bg-white text-gray-800 px-3 py-1 rounded-full text-sm font-medium">
            {course.ageGroup}
          </span>
        </div>
      </div>

      {/* Course Content */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2">
          {getLocalizedText(course.title, currentLocale)}
        </h3>
        
        <p className="text-gray-600 mb-4 line-clamp-3">
          {showFullDescription 
            ? getLocalizedText(course.longDescription, currentLocale)
            : getLocalizedText(course.shortDescription, currentLocale)
          }
        </p>

        {/* Course Details */}
        <div className="flex flex-wrap gap-4 mb-4 text-sm text-gray-500">
          <div className="flex items-center">
            <Clock className="h-4 w-4 mr-1" />
            <span>{course.duration}</span>
          </div>
          <div className="flex items-center">
            <Users className="h-4 w-4 mr-1" />
            <span>{getLocalizedText(course.schedule, currentLocale)}</span>
          </div>
          <div className="flex items-center">
            <Award className="h-4 w-4 mr-1" />
            <span>{currentLocale === 'id' ? 'Sertifikat' : 'Certificate'}</span>
          </div>
        </div>

        {/* Key Features */}
        {course.bullets && (
          <div className="mb-4">
            <h4 className="font-semibold text-gray-800 mb-2">
              {currentLocale === 'id' ? 'Yang Akan Dipelajari:' : 'What You\'ll Learn:'}
            </h4>
            <ul className="space-y-1">
              {getLocalizedText(course.bullets, currentLocale).slice(0, 3).map((bullet, index) => (
                <li key={index} className="text-sm text-gray-600 flex items-start">
                  <span className="text-primary-500 mr-2">•</span>
                  {bullet}
                </li>
              ))}
              {getLocalizedText(course.bullets, currentLocale).length > 3 && (
                <li className="text-sm text-gray-500 italic">
                  {currentLocale === 'id' ? '+ dan masih banyak lagi...' : '+ and much more...'}
                </li>
              )}
            </ul>
          </div>
        )}

        {/* Price and CTA */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-200">
          <div>
            <span className="text-2xl font-bold text-primary-600">
              {course.priceDisplay}
            </span>
            <p className="text-sm text-gray-500">
              {currentLocale === 'id' ? 'per bulan' : 'per month'}
            </p>
          </div>
          <Link
            href={`/courses/${course.slug}`}
            className="bg-primary-600 text-white px-6 py-2 rounded-md font-medium hover:bg-primary-700 transition-colors duration-200"
          >
            {currentLocale === 'id' ? 'Lihat Detail' : 'View Details'}
          </Link>
        </div>
      </div>
    </div>
  );
}
