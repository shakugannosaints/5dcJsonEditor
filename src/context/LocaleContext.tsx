import React, { createContext, useContext, useState } from 'react';
import { locales, SupportedLocale } from '../locales';
import { LocaleType } from '../locales/zh';

interface LocaleContextType {
  locale: SupportedLocale;
  setLocale: (locale: SupportedLocale) => void;
  t: LocaleType;
}

const LocaleContext = createContext<LocaleContextType | undefined>(undefined);

export const useLocale = () => {
  const context = useContext(LocaleContext);
  if (!context) {
    throw new Error('useLocale must be used within a LocaleProvider');
  }
  return context;
};

interface LocaleProviderProps {
  children: React.ReactNode;
}

export const LocaleProvider: React.FC<LocaleProviderProps> = ({ children }) => {
  // 从localStorage获取保存的语言设置，默认为中文
  const [locale, setLocaleState] = useState<SupportedLocale>(() => {
    const saved = localStorage.getItem('locale');
    return (saved as SupportedLocale) || 'zh';
  });

  // 当语言改变时保存到localStorage
  const setLocale = (newLocale: SupportedLocale) => {
    setLocaleState(newLocale);
    localStorage.setItem('locale', newLocale);
  };

  // 获取当前语言的翻译对象
  const t = locales[locale];

  const value = {
    locale,
    setLocale,
    t
  };

  return (
    <LocaleContext.Provider value={value}>
      {children}
    </LocaleContext.Provider>
  );
};

