'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

interface LanguageContextType {
  language: 'ar' | 'en';
  setLanguage: (lang: 'ar' | 'en') => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  'ar': {
    'title': 'مختبر الفيزياء التفاعلي',
    'subtitle': 'كلية الملك حسين بن عبدالله',
    'ministry': 'وزارة التربية والتعليم',
    'login': 'تسجيل الدخول',
    'logout': 'تسجيل الخروج',
    'username': 'اسم المستخدم',
    'password': 'كلمة المرور',
    'student': 'طالب',
    'teacher': 'معلم',
    'parent': 'ولي أمر',
    'comments': 'التعليقات',
    'language': 'اللغة',
    'theme': 'المظهر',
    'lightMode': 'فاتح',
    'darkMode': 'داكن',
    'menu': 'القائمة',
    'home': 'الرئيسية',
    'simulations': 'المحاكاات',
    'about': 'حول',
    'addComment': 'إضافة تعليق',
    'send': 'إرسال',
    'cancel': 'إلغاء',
    'uploadLogo': 'رفع الشعار',
    'selectFile': 'اختر ملف',
  },
  'en': {
    'title': 'Interactive Physics Lab',
    'subtitle': 'King Hussein Ibn Abdallah High School for Boys',
    'ministry': 'Ministry of Education',
    'login': 'Login',
    'logout': 'Logout',
    'username': 'Username',
    'password': 'Password',
    'student': 'Student',
    'teacher': 'Teacher',
    'parent': 'Parent',
    'comments': 'Comments',
    'language': 'Language',
    'theme': 'Theme',
    'lightMode': 'Light',
    'darkMode': 'Dark',
    'menu': 'Menu',
    'home': 'Home',
    'simulations': 'Simulations',
    'about': 'About',
    'addComment': 'Add Comment',
    'send': 'Send',
    'cancel': 'Cancel',
    'uploadLogo': 'Upload Logo',
    'selectFile': 'Select File',
  },
};

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<'ar' | 'en'>('ar');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const savedLang = localStorage.getItem('language') as 'ar' | 'en' | null;
    if (savedLang) {
      setLanguage(savedLang);
    }
    setMounted(true);
  }, []);

  const handleSetLanguage = (lang: 'ar' | 'en') => {
    setLanguage(lang);
    localStorage.setItem('language', lang);
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  };

  const t = (key: string): string => {
    const langKey = language as 'ar' | 'en';
    return (translations[langKey] as Record<string, string>)[key] || key;
  };

  if (!mounted) {
    return <>{children}</>;
  }

  return(
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
}
