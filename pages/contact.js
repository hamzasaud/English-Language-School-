import { useState } from 'react';
import { MapPin, Phone, Mail, Clock, MessageCircle } from 'lucide-react';
import { getContent, getLocalizedText, buildWhatsAppUrl } from '../lib/content';
import ContactForm from '../components/ContactForm';
import { useLanguage } from '../lib/LanguageContext';

export default function Contact() {
  const { currentLocale } = useLanguage();
  const content = getContent(currentLocale);
  const contactContent = content.contact[currentLocale];

  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              {contactContent.title}
            </h1>
            <p className="text-xl text-primary-100 max-w-3xl mx-auto">
              {contactContent.subtitle}
            </p>
          </div>
        </div>
      </section>

      {/* Contact Information & Form */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-8">
                {currentLocale === 'id' ? 'Informasi Kontak' : 'Contact Information'}
              </h2>
              
              <div className="space-y-6">
                {/* Address */}
                <div className="flex items-start">
                  <MapPin className="h-6 w-6 text-primary-600 mt-1 mr-4 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">
                      {currentLocale === 'id' ? 'Alamat' : 'Address'}
                    </h3>
                    <p className="text-gray-600">
                      {getLocalizedText(content.settings.address, currentLocale)}
                    </p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start">
                  <Phone className="h-6 w-6 text-primary-600 mt-1 mr-4 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">
                      {currentLocale === 'id' ? 'Telepon' : 'Phone'}
                    </h3>
                    <p className="text-gray-600">{content.settings.phone}</p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start">
                  <Mail className="h-6 w-6 text-primary-600 mt-1 mr-4 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Email</h3>
                    <p className="text-gray-600">{content.settings.contactEmail}</p>
                  </div>
                </div>

                {/* Business Hours */}
                <div className="flex items-start">
                  <Clock className="h-6 w-6 text-primary-600 mt-1 mr-4 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">
                      {currentLocale === 'id' ? 'Jam Operasional' : 'Business Hours'}
                    </h3>
                    <div className="text-gray-600">
                      <p>{content.settings.businessHours[currentLocale].weekdays}</p>
                      <p>{content.settings.businessHours[currentLocale].saturday}</p>
                      <p>{content.settings.businessHours[currentLocale].sunday}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* WhatsApp CTA */}
              <div className="mt-8 p-6 bg-green-50 rounded-lg border border-green-200">
                <div className="flex items-center mb-4">
                  <MessageCircle className="h-6 w-6 text-green-600 mr-3" />
                  <h3 className="font-semibold text-green-900">
                    {currentLocale === 'id' ? 'Chat WhatsApp' : 'WhatsApp Chat'}
                  </h3>
                </div>
                <p className="text-green-700 mb-4">
                  {currentLocale === 'id' 
                    ? 'Hubungi kami langsung melalui WhatsApp untuk konsultasi cepat'
                    : 'Contact us directly via WhatsApp for quick consultation'
                  }
                </p>
                <a
                  href={buildWhatsAppUrl(
                    content.settings.whatsapp,
                    currentLocale === 'id' 
                      ? 'Halo, saya ingin bertanya tentang kursus bahasa Inggris'
                      : 'Hello, I would like to ask about English courses'
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors duration-200"
                >
                  <MessageCircle className="h-5 w-5 mr-2" />
                  {currentLocale === 'id' ? 'Chat Sekarang' : 'Chat Now'}
                </a>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-8">
                {contactContent.formTitle}
              </h2>
              <ContactForm locale={currentLocale} />
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {currentLocale === 'id' ? 'Lokasi Kami' : 'Our Location'}
            </h2>
            <p className="text-lg text-gray-600">
              {currentLocale === 'id' 
                ? 'Kunjungi langsung kantor kami untuk konsultasi lebih lanjut'
                : 'Visit our office directly for further consultation'
              }
            </p>
          </div>
          
          {/* Map Placeholder */}
          <div className="bg-gray-200 rounded-lg h-96 flex items-center justify-center">
            <div className="text-center">
              <MapPin className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500 text-lg">
                {currentLocale === 'id' ? 'Peta Lokasi' : 'Location Map'}
              </p>
              <p className="text-gray-400 text-sm mt-2">
                {getLocalizedText(content.settings.address, currentLocale)}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {currentLocale === 'id' ? 'Pertanyaan Umum' : 'Frequently Asked Questions'}
            </h2>
          </div>

          <div className="space-y-6">
            {[
              {
                question: currentLocale === 'id' ? 'Bagaimana cara mendaftar kursus?' : 'How to register for courses?',
                answer: currentLocale === 'id' 
                  ? 'Anda dapat mendaftar melalui WhatsApp, telepon, atau datang langsung ke kantor kami. Tim kami akan membantu Anda memilih kursus yang tepat sesuai level dan kebutuhan.'
                  : 'You can register via WhatsApp, phone, or come directly to our office. Our team will help you choose the right course according to your level and needs.'
              },
              {
                question: currentLocale === 'id' ? 'Apakah ada tes penempatan?' : 'Is there a placement test?',
                answer: currentLocale === 'id' 
                  ? 'Ya, kami menyediakan tes penempatan gratis untuk menentukan level yang tepat untuk Anda. Tes ini meliputi speaking, listening, reading, dan writing.'
                  : 'Yes, we provide a free placement test to determine the right level for you. This test includes speaking, listening, reading, and writing.'
              },
              {
                question: currentLocale === 'id' ? 'Berapa lama durasi setiap kursus?' : 'How long is each course duration?',
                answer: currentLocale === 'id' 
                  ? 'Durasi kursus bervariasi tergantung program yang dipilih. Umumnya 3-6 bulan dengan 2-3 pertemuan per minggu. Detail lengkap dapat dilihat di halaman kursus.'
                  : 'Course duration varies depending on the chosen program. Generally 3-6 months with 2-3 meetings per week. Complete details can be seen on the courses page.'
              },
              {
                question: currentLocale === 'id' ? 'Apakah tersedia kelas online?' : 'Are online classes available?',
                answer: currentLocale === 'id' 
                  ? 'Ya, kami menyediakan kelas online dan offline. Kelas online menggunakan platform interaktif dengan fitur lengkap seperti kelas tatap muka.'
                  : 'Yes, we provide both online and offline classes. Online classes use an interactive platform with complete features like face-to-face classes.'
              }
            ].map((item, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  {item.question}
                </h3>
                <p className="text-gray-600">
                  {item.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
