import '../styles/globals.css';
import Layout from '../components/Layout';
import { LanguageProvider } from '../lib/LanguageContext';

export default function App({ Component, pageProps }) {
  // Check if the page has a custom layout
  const getLayout = Component.getLayout || ((page) => <Layout>{page}</Layout>);

  return (
    <LanguageProvider>
      {getLayout(<Component {...pageProps} />)}
    </LanguageProvider>
  );
}
