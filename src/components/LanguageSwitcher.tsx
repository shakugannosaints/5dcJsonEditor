import React from 'react';
import { useLocale } from '../context/LocaleContext';
import { SupportedLocale } from '../locales';

const LanguageSwitcher: React.FC = () => {
  const { locale, setLocale, t } = useLocale();

  const handleLanguageChange = (newLocale: SupportedLocale) => {
    setLocale(newLocale);
  };

  return (
    <div className="language-switcher" style={{
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      padding: '5px 10px',
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
      borderRadius: '6px',
      border: '1px solid rgba(255, 255, 255, 0.2)'
    }}>
      <span style={{ 
        fontSize: '14px', 
        color: 'white',
        fontWeight: '500'
      }}>
        {t.language.switchLanguage}:
      </span>
      <div style={{ display: 'flex', gap: '5px' }}>
        <button
          onClick={() => handleLanguageChange('zh')}
          style={{
            padding: '4px 8px',
            fontSize: '12px',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            backgroundColor: locale === 'zh' ? '#4CAF50' : 'rgba(255, 255, 255, 0.8)',
            color: locale === 'zh' ? 'white' : '#333',
            fontWeight: locale === 'zh' ? 'bold' : 'normal',
            transition: 'all 0.2s ease'
          }}
        >
          {t.language.chinese}
        </button>
        <button
          onClick={() => handleLanguageChange('en')}
          style={{
            padding: '4px 8px',
            fontSize: '12px',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            backgroundColor: locale === 'en' ? '#4CAF50' : 'rgba(255, 255, 255, 0.8)',
            color: locale === 'en' ? 'white' : '#333',
            fontWeight: locale === 'en' ? 'bold' : 'normal',
            transition: 'all 0.2s ease'
          }}
        >
          {t.language.english}
        </button>
      </div>
    </div>
  );
};

export default LanguageSwitcher;

