import { createContext, useContext, useState } from 'react';

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [currentLocale, setCurrentLocale] = useState('id');

  const toggleLanguage = () => {
    const newLocale = currentLocale === 'id' ? 'en' : 'id';
    setCurrentLocale(newLocale);
  };

  return (
    <LanguageContext.Provider value={{ currentLocale, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
