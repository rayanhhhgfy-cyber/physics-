'use client';

import { useState } from 'react';
import { useAuth, UserRole } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';

export default function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [selectedRole, setSelectedRole] = useState<UserRole>('student');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();
  const { t, language } = useLanguage();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      if (!username || !password) {
        setError(language === 'ar' ? 'يرجى ملء جميع الحقول' : 'Please fill all fields');
        setIsLoading(false);
        return;
      }

      await login(username, password, selectedRole);
    } catch (err) {
      setError(language === 'ar' ? 'خطأ في تسجيل الدخول' : 'Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-bg via-purple/10 to-dark-bg flex items-center justify-center p-4">
      {/* Animated Background */}
      <div className="fixed inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-20 right-20 w-72 h-72 bg-electric-blue/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 left-20 w-72 h-72 bg-purple/20 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
      </div>

      <div className="relative z-10 w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-electric-blue to-purple bg-clip-text text-transparent mb-2">
            {language === 'ar' ? 'مختبر الفيزياء' : 'Physics Lab'}
          </h1>
          <p className="text-xl text-gray-300 mb-1">
            {language === 'ar' ? 'كلية الملك حسين بن عبدالله' : 'King Hussein Ibn Abdallah High School'}
          </p>
          <p className="text-sm text-electric-blue">
            {language === 'ar' ? 'وزارة التربية والتعليم' : 'Ministry of Education'}
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-dark-bg/80 backdrop-blur-md border border-electric-blue/20 rounded-2xl p-8 shadow-2xl">
          <h2 className="text-2xl font-bold text-white mb-6 text-center">
            {t('login')}
          </h2>

          {error && (
            <div className="bg-orange/20 border border-orange/50 text-orange px-4 py-3 rounded mb-4 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Username */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                {t('username')}
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder={language === 'ar' ? 'أدخل اسم المستخدم' : 'Enter username'}
                className="w-full px-4 py-2 bg-white/5 border border-electric-blue/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-electric-blue focus:ring-2 focus:ring-electric-blue/20 transition-all"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                {t('password')}
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={language === 'ar' ? 'أدخل كلمة المرور' : 'Enter password'}
                className="w-full px-4 py-2 bg-white/5 border border-electric-blue/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-electric-blue focus:ring-2 focus:ring-electric-blue/20 transition-all"
              />
            </div>

            {/* Role Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-3">
                {language === 'ar' ? 'اختر دورك' : 'Select your role'}
              </label>
              <div className="grid grid-cols-3 gap-2">
                {(['student', 'teacher', 'parent'] as UserRole[]).map((role) => (
                  <button
                    key={role}
                    type="button"
                    onClick={() => setSelectedRole(role)}
                    className={`py-3 px-2 rounded-lg font-medium transition-all text-sm ${
                      selectedRole === role
                        ? 'bg-electric-blue text-white ring-2 ring-electric-blue/50'
                        : 'bg-white/10 text-gray-400 hover:bg-white/20'
                    }`}
                  >
                    {role === 'student' && (language === 'ar' ? 'طالب' : 'Student')}
                    {role === 'teacher' && (language === 'ar' ? 'معلم' : 'Teacher')}
                    {role === 'parent' && (language === 'ar' ? 'ولي أمر' : 'Parent')}
                  </button>
                ))}
              </div>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full mt-6 py-3 px-4 bg-gradient-to-r from-electric-blue to-purple rounded-lg text-white font-semibold hover:shadow-lg hover:shadow-electric-blue/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading
                ? (language === 'ar' ? 'جاري التحميل...' : 'Loading...')
                : t('login')}
            </button>
          </form>

          {/* Demo Credentials */}
          <div className="mt-6 pt-6 border-t border-electric-blue/10">
            <p className="text-xs text-gray-500 text-center mb-2">
              {language === 'ar' ? 'بيانات تجريبية:' : 'Demo Credentials:'}
            </p>
            <p className="text-xs text-gray-600 text-center">
              {language === 'ar' ? 'اسم المستخدم: demo | كلمة المرور: 1234' : 'Username: demo | Password: 1234'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
