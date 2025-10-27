import { useState } from 'react';
import { Play } from 'lucide-react';

export default function VideoBlock({ videoUrl, title = 'Course Video' }) {
  const [showVideo, setShowVideo] = useState(false);

  if (!videoUrl) {
    return (
      <div className="bg-gray-100 rounded-lg p-8 text-center">
        <p className="text-gray-500">Video akan tersedia segera / Video coming soon</p>
      </div>
    );
  }

  return (
    <div className="relative bg-gray-900 rounded-lg overflow-hidden">
      {!showVideo ? (
        <div className="relative bg-gray-200 aspect-video flex items-center justify-center cursor-pointer hover:bg-gray-300 transition-colors duration-200">
          <div className="text-center">
            <div className="bg-primary-600 rounded-full p-4 mx-auto mb-4 w-16 h-16 flex items-center justify-center">
              <Play className="h-8 w-8 text-white ml-1" />
            </div>
            <p className="text-gray-700 font-medium">Click to play video</p>
            <p className="text-gray-500 text-sm mt-1">{title}</p>
          </div>
        </div>
      ) : (
        <div className="aspect-video bg-gray-800 flex items-center justify-center">
          <p className="text-white">Video player would load here</p>
        </div>
      )}
    </div>
  );
}
