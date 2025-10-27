import contentData from '../data/content.json';

/**
 * Get content based on current locale
 * @param {string} locale - Current locale (id or en)
 * @returns {object} Content object
 */
export function getContent(locale = 'id') {
  return contentData;
}

/**
 * Get localized text from content object
 * @param {object} textObj - Object with id and en properties
 * @param {string} locale - Current locale
 * @returns {string} Localized text
 */
export function getLocalizedText(textObj, locale = 'id') {
  if (typeof textObj === 'string') return textObj;
  return textObj[locale] || textObj.id || textObj.en || '';
}

/**
 * Get course by slug
 * @param {string} slug - Course slug
 * @returns {object|null} Course object or null if not found
 */
export function getCourseBySlug(slug) {
  const content = getContent();
  return content.courses.find(course => course.slug === slug) || null;
}

/**
 * Generate slug from Indonesian title
 * @param {string} title - Title to convert to slug
 * @returns {string} URL-friendly slug
 */
export function generateSlug(title) {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single
    .trim();
}

/**
 * Format price for Indonesian locale
 * @param {number} price - Price in rupiah
 * @returns {string} Formatted price string
 */
export function formatPrice(price) {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
}

/**
 * Get WhatsApp contact URL
 * @param {string} phone - WhatsApp phone number
 * @param {string} message - Pre-filled message
 * @returns {string} WhatsApp URL
 */
export function getWhatsAppUrl(phone, message = '') {
  const cleanPhone = phone.replace(/[^\d]/g, '');
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${cleanPhone}${message ? `?text=${encodedMessage}` : ''}`;
}

/**
 * Build WhatsApp URL (alias for getWhatsAppUrl)
 * @param {string} phone - WhatsApp phone number
 * @param {string} message - Pre-filled message
 * @returns {string} WhatsApp URL
 */
export function buildWhatsAppUrl(phone, message = '') {
  return getWhatsAppUrl(phone, message);
}

/**
 * Extract YouTube video ID from URL
 * @param {string} url - YouTube URL
 * @returns {string|null} Video ID or null
 */
export function getYouTubeVideoId(url) {
  const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
  const match = url.match(regex);
  return match ? match[1] : null;
}

/**
 * Get YouTube thumbnail URL
 * @param {string} videoUrl - YouTube video URL
 * @param {string} quality - Thumbnail quality (default, hqdefault, maxresdefault)
 * @returns {string} Thumbnail URL
 */
export function getYouTubeThumbnail(videoUrl, quality = 'hqdefault') {
  const videoId = getYouTubeVideoId(videoUrl);
  if (!videoId) return '/images/video-placeholder.jpg';
  return `https://img.youtube.com/vi/${videoId}/${quality}.jpg`;
}
