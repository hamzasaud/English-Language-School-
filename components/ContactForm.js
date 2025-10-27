import { useState } from 'react';
import { useRouter } from 'next/router';
import { Send, CheckCircle, AlertCircle } from 'lucide-react';
import { getContent, getLocalizedText } from '../lib/content';
import { useLanguage } from '../lib/LanguageContext';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    course: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success', 'error', null

  const router = useRouter();
  const { currentLocale } = useLanguage();
  const content = getContent(currentLocale);
  const contactContent = content.contact[currentLocale];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // Netlify Forms submission
      const formDataToSubmit = new FormData();
      formDataToSubmit.append('form-name', 'contact');
      Object.keys(formData).forEach(key => {
        formDataToSubmit.append(key, formData[key]);
      });

      const response = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(formDataToSubmit).toString()
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({
          name: '',
          email: '',
          phone: '',
          course: '',
          message: ''
        });
      } else {
        throw new Error('Form submission failed');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
      <h3 className="text-2xl font-bold text-gray-900 mb-6">
        {contactContent.formTitle}
      </h3>

      {/* Success/Error Messages */}
      {submitStatus === 'success' && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-md flex items-center">
          <CheckCircle className="h-5 w-5 text-green-600 mr-3" />
          <p className="text-green-800">{contactContent.successMessage}</p>
        </div>
      )}

      {submitStatus === 'error' && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md flex items-center">
          <AlertCircle className="h-5 w-5 text-red-600 mr-3" />
          <p className="text-red-800">{contactContent.errorMessage}</p>
        </div>
      )}

      <form 
        name="contact" 
        method="POST" 
        data-netlify="true" 
        onSubmit={handleSubmit}
        className="space-y-6"
      >
        {/* Hidden field for Netlify */}
        <input type="hidden" name="form-name" value="contact" />

        {/* Name Field */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
            {contactContent.formFields.name} *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
            placeholder={contactContent.formFields.name}
          />
        </div>

        {/* Email Field */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
            {contactContent.formFields.email} *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
            placeholder={contactContent.formFields.email}
          />
        </div>

        {/* Phone Field */}
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
            {contactContent.formFields.phone}
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
            placeholder={contactContent.formFields.phone}
          />
        </div>

        {/* Course Interest Field */}
        <div>
          <label htmlFor="course" className="block text-sm font-medium text-gray-700 mb-2">
            {contactContent.formFields.course}
          </label>
          <select
            id="course"
            name="course"
            value={formData.course}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
          >
            <option value="">
              {currentLocale === 'id' ? 'Pilih kursus...' : 'Select course...'}
            </option>
            {content.courses.map(course => (
              <option key={course.id} value={getLocalizedText(course.title, currentLocale)}>
                {getLocalizedText(course.title, currentLocale)}
              </option>
            ))}
          </select>
        </div>

        {/* Message Field */}
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
            {contactContent.formFields.message} *
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            rows={5}
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors resize-vertical"
            placeholder={currentLocale === 'id' 
              ? 'Ceritakan kepada kami tentang kebutuhan belajar Anda...'
              : 'Tell us about your learning needs...'
            }
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-primary-600 text-white py-3 px-6 rounded-md font-medium hover:bg-primary-700 focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 flex items-center justify-center"
        >
          {isSubmitting ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
              {currentLocale === 'id' ? 'Mengirim...' : 'Sending...'}
            </>
          ) : (
            <>
              <Send className="h-5 w-5 mr-2" />
              {contactContent.submitButton}
            </>
          )}
        </button>
      </form>

      {/* Additional Contact Info */}
      <div className="mt-8 pt-6 border-t border-gray-200">
        <p className="text-sm text-gray-600 text-center">
          {currentLocale === 'id' 
            ? 'Atau hubungi kami langsung melalui:'
            : 'Or contact us directly via:'
          }
        </p>
        <div className="flex flex-col sm:flex-row justify-center items-center space-y-2 sm:space-y-0 sm:space-x-6 mt-4">
          <a
            href={`tel:${content.settings.phone}`}
            className="text-primary-600 hover:text-primary-700 font-medium"
          >
            {content.settings.phone}
          </a>
          <a
            href={`mailto:${content.settings.contactEmail}`}
            className="text-primary-600 hover:text-primary-700 font-medium"
          >
            {content.settings.contactEmail}
          </a>
        </div>
      </div>
    </div>
  );
}
