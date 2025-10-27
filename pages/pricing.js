import { useRouter } from 'next/router';
import { Check, CreditCard, Smartphone, Building2 } from 'lucide-react';
import PricingTable from '../components/PricingTable';
import { getContent, getLocalizedText } from '../lib/content';

export default function Pricing() {
  const router = useRouter();
  const { locale = 'id' } = router;
  const content = getContent(locale);

  const faqs = [
    {
      question: locale === 'id' ? 'Apakah ada biaya pendaftaran?' : 'Is there a registration fee?',
      answer: locale === 'id' 
        ? 'Tidak ada biaya pendaftaran. Anda hanya perlu membayar biaya kursus bulanan sesuai paket yang dipilih.'
        : 'There is no registration fee. You only need to pay the monthly course fee according to the selected package.'
    },
    {
      question: locale === 'id' ? 'Apakah bisa membayar per semester?' : 'Can I pay per semester?',
      answer: locale === 'id' 
        ? 'Ya, kami menyediakan opsi pembayaran bulanan, per semester (3 bulan), atau tahunan dengan diskon khusus.'
        : 'Yes, we provide monthly, semester (3 months), or annual payment options with special discounts.'
    },
    {
      question: locale === 'id' ? 'Apa yang terjadi jika saya melewatkan kelas?' : 'What happens if I miss a class?',
      answer: locale === 'id' 
        ? 'Anda dapat mengikuti kelas pengganti atau mengakses materi pembelajaran online. Kami juga menyediakan rekaman kelas untuk review.'
        : 'You can attend makeup classes or access online learning materials. We also provide class recordings for review.'
    },
    {
      question: locale === 'id' ? 'Apakah ada garansi uang kembali?' : 'Is there a money-back guarantee?',
      answer: locale === 'id' 
        ? 'Ya, kami memberikan garansi uang kembali 100% dalam 30 hari pertama jika Anda tidak puas dengan kualitas pembelajaran.'
        : 'Yes, we provide a 100% money-back guarantee within the first 30 days if you are not satisfied with the learning quality.'
    },
    {
      question: locale === 'id' ? 'Bisakah pindah ke kelas yang berbeda?' : 'Can I switch to a different class?',
      answer: locale === 'id' 
        ? 'Ya, Anda dapat pindah ke kelas yang sesuai dengan level dan jadwal Anda dengan pemberitahuan 1 minggu sebelumnya.'
        : 'Yes, you can switch to a class that suits your level and schedule with 1 week advance notice.'
    }
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-600 to-primary-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              {content.navigation[locale].pricing}
            </h1>
            <p className="text-xl md:text-2xl text-primary-100 max-w-3xl mx-auto">
              {locale === 'id' 
                ? 'Investasi terbaik untuk masa depan Anda dengan harga yang terjangkau'
                : 'The best investment for your future at an affordable price'
              }
            </p>
          </div>
        </div>
      </section>

      {/* Pricing Table */}
      <PricingTable />

      {/* Payment Methods */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {locale === 'id' ? 'Metode Pembayaran' : 'Payment Methods'}
            </h2>
            <p className="text-lg text-gray-600">
              {locale === 'id' 
                ? 'Kami menerima berbagai metode pembayaran untuk kemudahan Anda'
                : 'We accept various payment methods for your convenience'
              }
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {[
              { name: 'Bank Transfer', logo: '/images/bank-transfer.png' },
              { name: 'Credit Card', logo: '/images/credit-card.png' },
              { name: 'GoPay', logo: '/images/gopay.png' },
              { name: 'OVO', logo: '/images/ovo.png' },
              { name: 'DANA', logo: '/images/dana.png' },
              { name: 'ShopeePay', logo: '/images/shopeepay.png' }
            ].map((method, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-4 flex items-center justify-center">
                <img
                  src={method.logo}
                  alt={method.name}
                  className="h-8 w-auto"
                  onError={(e) => {
                    e.target.src = '/images/payment-placeholder.png';
                  }}
                />
              </div>
            ))}
          </div>
          
          <div className="mt-8 text-center">
            <p className="text-gray-600">
              {locale === 'id' 
                ? 'Pembayaran aman dan terpercaya dengan enkripsi SSL'
                : 'Secure and trusted payments with SSL encryption'
              }
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {locale === 'id' ? 'Pertanyaan yang Sering Diajukan' : 'Frequently Asked Questions'}
            </h2>
            <p className="text-lg text-gray-600">
              {locale === 'id' 
                ? 'Temukan jawaban untuk pertanyaan umum tentang harga dan pembayaran'
                : 'Find answers to common questions about pricing and payments'
              }
            </p>
          </div>
          
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  {faq.question}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact for Custom Pricing */}
      <section className="py-16 bg-primary-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">
            {locale === 'id' 
              ? 'Butuh Paket Khusus atau Kelas Grup?'
              : 'Need Custom Package or Group Classes?'
            }
          </h2>
          <p className="text-xl mb-8 text-primary-100">
            {locale === 'id' 
              ? 'Kami menyediakan paket khusus untuk perusahaan, sekolah, atau grup belajar dengan harga yang dapat disesuaikan.'
              : 'We provide custom packages for companies, schools, or study groups with adjustable pricing.'
            }
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="bg-accent-500 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-accent-600 transition-colors duration-200"
            >
              {locale === 'id' ? 'Hubungi untuk Penawaran Khusus' : 'Contact for Special Offer'}
            </a>
            <a
              href={`tel:${content.settings.phone}`}
              className="bg-white text-primary-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors duration-200"
            >
              {content.settings.phone}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
