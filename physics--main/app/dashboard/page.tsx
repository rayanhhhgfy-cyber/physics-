'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import HamburgerMenu from '@/components/HamburgerMenu';
import CommentsSection from '@/components/CommentsSection';

export default function DashboardPage() {
  const router = useRouter();
  const { user, isLoading } = useAuth();
  const { language, t } = useLanguage();
  const [selectedSimulation, setSelectedSimulation] = useState('relativity');
  const [logoPreview, setLogoPreview] = useState<string | null>(null);

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/login');
    }
  }, [user, isLoading, router]);

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result as string);
        localStorage.setItem('school-logo', reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    const savedLogo = localStorage.getItem('school-logo');
    if (savedLogo) {
      setLogoPreview(savedLogo);
    }
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-dark-bg flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-electric-blue/30 border-t-electric-blue rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-400">{language === 'ar' ? 'جاري التحميل...' : 'Loading...'}</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const simulations = [
    { id: 'relativity', name: language === 'ar' ? 'النسبية الخاصة' : 'Special Relativity', icon: '⚡' },
    { id: 'waves', name: language === 'ar' ? 'تداخل الموجات' : 'Wave Interference', icon: '〰️' },
    { id: 'gravity', name: language === 'ar' ? 'الجاذبية' : 'Gravity', icon: '🌍' },
    { id: 'magnetic', name: language === 'ar' ? 'المجالات المغناطيسية' : 'Magnetic Fields', icon: '🧲' },
    { id: 'decay', name: language === 'ar' ? 'الاضمحلال النووي' : 'Nuclear Decay', icon: '☢️' },
    { id: 'pendulum', name: language === 'ar' ? 'البندول' : 'Double Pendulum', icon: '⚙️' },
    { id: 'gas', name: language === 'ar' ? 'الغاز المثالي' : 'Ideal Gas', icon: '💨' },
    { id: 'blackhole', name: language === 'ar' ? 'الثقب الأسود' : 'Black Hole', icon: '⚫' },
    { id: 'quantum', name: language === 'ar' ? 'الكم' : 'Quantum Slit', icon: '⚛️' },
    { id: 'entropy', name: language === 'ar' ? 'الإنتروبيا' : 'Entropy', icon: '🌀' },
    { id: 'accelerator', name: language === 'ar' ? 'المسرع' : 'Accelerator', icon: '🚀' },
    { id: 'optics', name: language === 'ar' ? 'البصريات' : 'Optics', icon: '🔬' },
  ];

  return (
    <main className="min-h-screen bg-dark-bg">
      <HamburgerMenu />

      {/* Header with Logo and School Info */}
      <header className="border-b border-electric-blue/10 p-6">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-6">
            {logoPreview && (
              <img src={logoPreview} alt="School Logo" className="h-16 w-16 rounded-lg object-cover" />
            )}
            <div>
              <h1 className="text-3xl font-bold gradient-text">
                {language === 'ar' ? 'مختبر الفيزياء' : 'Physics Lab'}
              </h1>
              <p className="text-gray-400">
                {language === 'ar' ? `مرحبا ${user.username}` : `Hello ${user.username}`} ({user.role.toUpperCase()})
              </p>
            </div>
          </div>

          {/* Logo Upload */}
          {user.role === 'teacher' && (
            <label className="btn cursor-pointer hover:opacity-90">
              {language === 'ar' ? '📤 رفع شعار' : '📤 Upload Logo'}
              <input type="file" accept="image/*" onChange={handleLogoUpload} className="hidden" />
            </label>
          )}
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto p-6 mt-6">
        {/* Simulations Grid */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            🔬 {language === 'ar' ? 'المحاكاات التفاعلية' : 'Interactive Simulations'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {simulations.map((sim) => (
              <button
                key={sim.id}
                onClick={() => setSelectedSimulation(sim.id)}
                className={`glass-panel p-6 text-center hover:border-electric-blue/50 transition-all group cursor-pointer ${
                  selectedSimulation === sim.id ? 'border-electric-blue/80 bg-electric-blue/10' : ''
                }`}
              >
                <div className="text-3xl mb-3 group-hover:scale-110 transition-transform">{sim.icon}</div>
                <h3 className="font-semibold text-sm group-hover:text-electric-blue transition-colors">{sim.name}</h3>
              </button>
            ))}
          </div>
        </section>

        {/* Simulation View */}
        <section className="mb-12">
          <div className="glass-panel">
            <div className="h-96 flex items-center justify-center text-center">
              <div>
                <p className="text-3xl mb-4">
                  {simulations.find(s => s.id === selectedSimulation)?.icon}
                </p>
                <h3 className="text-xl font-semibold mb-2">
                  {simulations.find(s => s.id === selectedSimulation)?.name}
                </h3>
                <p className="text-gray-400 mb-4">
                  {language === 'ar'
                    ? 'محاكاة فيزيائية تفاعلية متقدمة'
                    : 'An advanced interactive physics simulation'}
                </p>
                <p className="text-sm text-gray-500">
                  {language === 'ar'
                    ? '[سيتم إضافة المحاكاة هنا]'
                    : '[Simulation will be added here]'}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Comments and Feedback */}
        <section>
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            💬 {t('comments')}
          </h2>
          <CommentsSection />
        </section>
      </div>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-electric-blue/10 mt-12 text-center text-gray-500 text-sm">
        <p className="mb-2">
          {language === 'ar'
            ? 'مختبر الفيزياء التفاعلي - كلية الملك حسين بن عبدالله'
            : 'Interactive Physics Lab - King Hussein Ibn Abdallah High School'}
        </p>
        <p>© 2024 {language === 'ar' ? 'وزارة التربية والتعليم' : 'Ministry of Education'}</p>
      </footer>
    </main>
  );
}
