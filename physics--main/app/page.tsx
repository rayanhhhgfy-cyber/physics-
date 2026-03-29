'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import HamburgerMenu from '@/components/HamburgerMenu';

export default function HomePage() {
  const router = useRouter();
  const { user } = useAuth();
  const { language, t } = useLanguage();

  useEffect(() => {
    if (!user) {
      router.push('/login');
    }
  }, [user, router]);

  if (!user) {
    return null;
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-dark-bg via-purple/5 to-dark-bg">
      <HamburgerMenu />

      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center px-4 py-20">
        <div className="text-center max-w-3xl mx-auto">
          {/* School Info */}
          <div className="mb-8">
            <div className="text-sm font-semibold text-electric-blue mb-2 tracking-widest uppercase">
              {t('ministry')}
            </div>
            <h1 className="text-5xl md:text-6xl font-bold gradient-text mb-4">
              {language === 'ar' ? 'كلية الملك حسين بن عبدالله' : 'King Hussein Ibn Abdallah High School'}
            </h1>
            <h2 className="text-2xl md:text-3xl font-semibold text-purple mb-8">
              {t('title')}
            </h2>
          </div>

          {/* Description */}
          <p className="text-lg text-gray-300 mb-12 leading-relaxed max-w-2xl mx-auto">
            {language === 'ar'
              ? 'استكشف عالم الفيزياء الحديثة من خلال 12 محاكاة تفاعلية متقدمة. من النسبية الخاصة إلى ميكانيكا الكم، اكتشف القوانين التي تحكم الكون!'
              : 'Explore modern physics through 12 interactive simulations. From Special Relativity to Quantum Mechanics, discover the laws governing the universe!'}
          </p>

          {/* Quick Stats */}
          <div className="grid grid-cols-3 gap-4 mb-12 max-w-lg mx-auto">
            <div className="glass-panel py-4">
              <div className="text-3xl font-bold text-electric-blue">12</div>
              <div className="text-sm text-gray-400">{language === 'ar' ? 'محاكاة' : 'Simulations'}</div>
            </div>
            <div className="glass-panel py-4">
              <div className="text-3xl font-bold text-purple">2</div>
              <div className="text-sm text-gray-400">{language === 'ar' ? 'لغة' : 'Languages'}</div>
            </div>
            <div className="glass-panel py-4">
              <div className="text-3xl font-bold text-orange">∞</div>
              <div className="text-sm text-gray-400">{language === 'ar' ? 'إمكانيات' : 'Features'}</div>
            </div>
          </div>

          {/* CTA Button */}
          <button
            onClick={() => router.push('/dashboard')}
            className="btn text-lg px-8 py-4 mb-8 hover:shadow-2xl hover:shadow-electric-blue/50 transition-all"
          >
            {language === 'ar' ? 'ابدأ الآن' : 'Get Started'}
          </button>

          {/* Features List */}
          <div className="grid md:grid-cols-2 gap-4 mt-16">
            <div className="glass-panel text-left">
              <div className="text-2xl mb-2">🔬</div>
              <h3 className="font-bold text-lg mb-2">{language === 'ar' ? 'محاكاات متقدمة' : 'Advanced Simulations'}</h3>
              <p className="text-sm text-gray-400">
                {language === 'ar'
                  ? 'تفاعل مع ظواهر فيزيائية معقدة بطريقة بسيطة وممتعة'
                  : 'Interact with complex physics phenomena in fun, easy ways'}
              </p>
            </div>

            <div className="glass-panel text-left">
              <div className="text-2xl mb-2">📱</div>
              <h3 className="font-bold text-lg mb-2">{language === 'ar' ? 'متوافق مع الأجهزة' : 'Device Compatible'}</h3>
              <p className="text-sm text-gray-400">
                {language === 'ar'
                  ? 'استخدم على أي جهاز - جهاز كمبيوتر أو لوحي أو هاتف ذكي'
                  : 'Use on any device - desktop, tablet, or smartphone'}
              </p>
            </div>

            <div className="glass-panel text-left">
              <div className="text-2xl mb-2">🌐</div>
              <h3 className="font-bold text-lg mb-2">{language === 'ar' ? 'ثنائي اللغة' : 'Bilingual'}</h3>
              <p className="text-sm text-gray-400">
                {language === 'ar'
                  ? 'تعلم باللغة العربية والإنجليزية بسهولة'
                  : 'Learn in Arabic and English effortlessly'}
              </p>
            </div>

            <div className="glass-panel text-left">
              <div className="text-2xl mb-2">🎓</div>
              <h3 className="font-bold text-lg mb-2">{language === 'ar' ? 'للجميع' : 'For Everyone'}</h3>
              <p className="text-sm text-gray-400">
                {language === 'ar'
                  ? 'مصمم للطلاب والمعلمين وأولياء الأمور'
                  : 'Designed for students, teachers, and parents'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Welcome Section */}
      <section className="py-20 px-4 border-t border-electric-blue/10">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6 gradient-text">
            {language === 'ar' ? `مرحبا ${user.username}! 👋` : `Welcome ${user.username}! 👋`}
          </h2>
          <p className="text-gray-300 mb-8">
            {user.role === 'student' && (language === 'ar'
              ? 'أنت في الدور الصحيح! استعد لاستكشاف عالم الفيزياء الرائع.'
              : 'You\'re all set! Get ready to explore the amazing world of physics.')}
            {user.role === 'teacher' && (language === 'ar'
              ? 'يمكنك الآن إدارة المحتوى ومراقبة تقدم طلابك.'
              : 'You can now manage content and monitor your students\' progress.')}
            {user.role === 'parent' && (language === 'ar'
              ? 'يمكنك متابعة أداء طفلك ومشاركته في العملية التعليمية.'
              : 'You can now follow your child\'s progress and participate in their learning.')}
          </p>
          <button
            onClick={() => router.push('/dashboard')}
            className="btn px-8 py-3"
          >
            {language === 'ar' ? 'انتقل إلى لوحة التحكم' : 'Go to Dashboard'}
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-electric-blue/10 text-center text-gray-500 text-sm">
        <div className="max-w-3xl mx-auto">
          <p className="mb-2">
            {language === 'ar'
              ? 'مختبر الفيزياء التفاعلي - كلية الملك حسين بن عبدالله'
              : 'Interactive Physics Lab - King Hussein Ibn Abdallah High School'}
          </p>
          <p>© 2024 {language === 'ar' ? 'وزارة التربية والتعليم' : 'Ministry of Education'}</p>
        </div>
      </footer>
    </main>
  );
}
