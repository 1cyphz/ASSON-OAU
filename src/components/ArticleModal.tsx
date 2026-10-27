import React, { useState } from 'react';
import { X, Calendar, User, Clock, Heart, Share2, Check } from 'lucide-react';
import { Article } from '../types';
import { formatDate } from '../utils/helpers';

interface ArticleModalProps {
  article: Article | null;
  onClose: () => void;
}

export const ArticleModal: React.FC<ArticleModalProps> = ({
  article,
  onClose
}) => {
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState<number>(article?.likes || 0);
  const [copied, setCopied] = useState(false);

  if (!article) return null;

  const handleLike = () => {
    if (liked) {
      setLikesCount((prev) => Math.max(0, prev - 1));
      setLiked(false);
    } else {
      setLikesCount((prev) => prev + 1);
      setLiked(true);
    }
  };

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="article-title"
    >
      <div className="bg-white rounded-2xl max-w-3xl w-full shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/50 shrink-0">
          <span className="text-xs font-bold text-[#1A759F] uppercase tracking-wider">
            {article.category}
          </span>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
            aria-label="Close article"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Article Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
          {/* Featured Article Image */}
          {article.featuredImage && (
            <div className="w-full h-64 sm:h-80 rounded-xl overflow-hidden bg-slate-100 border border-slate-200">
              <img
                src={article.featuredImage}
                alt={article.title}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/src/assets/images/article_data_science_1793142128872.jpg';
                }}
              />
            </div>
          )}

          {/* Title & Metadata */}
          <div className="space-y-3">
            <h1
              id="article-title"
              className="text-2xl sm:text-3xl font-black text-[#1E293B] leading-tight"
            >
              {article.title}
            </h1>

            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-slate-500 pt-1 border-b border-slate-100 pb-4">
              <span className="flex items-center gap-1.5 font-bold text-slate-800">
                <User className="w-4 h-4 text-[#1A759F]" />
                {article.author}
              </span>
              <span>·</span>
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-slate-400" />
                {formatDate(article.publishDate)}
              </span>
              <span>·</span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-slate-400" />
                {article.readTime}
              </span>
            </div>
          </div>

          {/* Excerpt Callout */}
          <div className="p-4 bg-slate-50 border-l-4 border-[#1A759F] text-xs sm:text-sm text-slate-700 font-medium italic leading-relaxed">
            "{article.excerpt}"
          </div>

          {/* Full Markdown/Prose Body */}
          <div className="text-xs sm:text-sm text-slate-800 leading-relaxed space-y-4 whitespace-pre-line">
            {article.content}
          </div>

          {/* Social Feedback Bar */}
          <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
            <button
              onClick={handleLike}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
                liked
                  ? 'bg-rose-50 text-rose-600 border border-rose-200'
                  : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              <Heart
                className={`w-4 h-4 ${liked ? 'fill-rose-500 text-rose-500' : ''}`}
              />
              <span>{likesCount} {likesCount === 1 ? 'Like' : 'Likes'}</span>
            </button>

            <button
              onClick={handleShare}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200 transition-colors cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span className="text-emerald-600 font-bold">Link Copied!</span>
                </>
              ) : (
                <>
                  <Share2 className="w-4 h-4" />
                  <span>Share Article</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-100 bg-slate-50 flex items-center justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
          >
            Close Article
          </button>
        </div>
      </div>
    </div>
  );
};
