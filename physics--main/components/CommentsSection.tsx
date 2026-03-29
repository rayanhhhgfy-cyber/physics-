'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';

interface Comment {
  id: string;
  author: string;
  role: string;
  text: string;
  timestamp: string;
  language: 'ar' | 'en';
}

export default function CommentsSection() {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const { user } = useAuth();
  const { language: appLanguage, t } = useLanguage();

  useEffect(() => {
    // Load comments from localStorage
    const saved = localStorage.getItem('physics-lab-comments');
    if (saved) {
      try {
        setComments(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to load comments');
      }
    }
  }, [appLanguage]);

  const handleAddComment = () => {
    if (!newComment.trim() || !user) return;

    const comment: Comment = {
      id: Math.random().toString(36).substr(2, 9),
      author: user.username,
      role: user.role,
      text: newComment,
      timestamp: new Date().toLocaleString(),
      language: appLanguage,
    };

    const updatedComments = [comment, ...comments];
    setComments(updatedComments);
    localStorage.setItem('physics-lab-comments', JSON.stringify(updatedComments));
    setNewComment('');
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'student':
        return 'bg-blue-500/30 text-blue-300';
      case 'teacher':
        return 'bg-purple-500/30 text-purple-300';
      case 'parent':
        return 'bg-orange-500/30 text-orange-300';
      default:
        return 'bg-gray-500/30 text-gray-300';
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-4 md:p-6">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white mb-2">
          {t('comments')} 💬
        </h2>
        <p className="text-gray-400 text-sm">
          {appLanguage === 'ar'
            ? 'شارك تعليقاتك ومرئياتك حول المحاكاات'
            : 'Share your feedback and thoughts about the simulations'}
        </p>
      </div>

      {/* Comment Input */}
      {user ? (
        <div className="bg-gradient-to-br from-electric-blue/10 to-purple/10 border border-electric-blue/30 rounded-lg p-4 mb-6">
          <div className="flex items-center gap-3 mb-4">
            <div className={`px-3 py-1 rounded-full text-xs font-semibold ${getRoleColor(user.role)}`}>
              {user.role.toUpperCase()}
            </div>
            <span className="text-white font-medium">{user.username}</span>
          </div>

          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder={appLanguage === 'ar' ? 'اكتب تعليقك هنا...' : 'Write your comment here...'}
            className="w-full px-4 py-3 bg-white/10 border border-electric-blue/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-electric-blue focus:ring-2 focus:ring-electric-blue/20 transition-all resize-none"
            rows={3}
          ></textarea>

          <div className="flex justify-end gap-3 mt-4">
            <button
              onClick={() => setNewComment('')}
              className="px-4 py-2 rounded-lg bg-white/5 text-gray-300 hover:bg-white/10 transition-all"
            >
              {t('cancel')}
            </button>
            <button
              onClick={handleAddComment}
              disabled={!newComment.trim()}
              className="px-4 py-2 rounded-lg bg-gradient-to-r from-electric-blue to-purple text-white font-semibold hover:shadow-lg hover:shadow-electric-blue/50 transition-all disabled:opacity-50"
            >
              {t('send')}
            </button>
          </div>
        </div>
      ) : (
        <div className="bg-orange/10 border border-orange/30 rounded-lg p-4 mb-6 text-center">
          <p className="text-orange">
            {appLanguage === 'ar'
              ? 'يجب تسجيل الدخول لإضافة تعليق'
              : 'Please login to add a comment'}
          </p>
        </div>
      )}

      {/* Comments List */}
      <div className="space-y-4">
        {comments.length === 0 ? (
          <div className="text-center text-gray-500 py-8">
            {appLanguage === 'ar' ? 'لا توجد تعليقات حتى الآن' : 'No comments yet'}
          </div>
        ) : (
          comments.map((comment) => (
            <div
              key={comment.id}
              className="bg-gradient-to-r from-white/5 to-white/10 border border-white/10 rounded-lg p-4 hover:border-electric-blue/30 transition-colors"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className={`px-2 py-1 rounded-full text-xs font-semibold ${getRoleColor(comment.role)}`}>
                    {comment.role.toUpperCase()}
                  </div>
                  <div>
                    <p className="text-white font-medium">{comment.author}</p>
                    <p className="text-gray-500 text-xs">{comment.timestamp}</p>
                  </div>
                </div>
                {comment.language === 'ar' && <span className="text-gray-500 text-xs">عربي</span>}
                {comment.language === 'en' && <span className="text-gray-500 text-xs">English</span>}
              </div>
              <p className="text-gray-300 leading-relaxed">{comment.text}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
