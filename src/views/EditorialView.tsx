import React, { useState } from 'react';
import {
  Search,
  Calendar,
  User,
  ArrowRight,
  TrendingUp,
  Clock,
  BookOpen,
  Image as ImageIcon
} from 'lucide-react';
import { Article } from '../types';
import {
  filterArticles,
  countArticlesByCategory,
  formatDate
} from '../utils/helpers';

interface EditorialViewProps {
  articles: Article[];
  onOpenArticle: (article: Article) => void;
}

export const EditorialView: React.FC<EditorialViewProps> = ({
  articles,
  onOpenArticle
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = [
    'All',
    'Statistics & Data Science',
    'Opinion & Editorials',
    'Research & Innovation'
  ];

  const filteredArticles = filterArticles(
    articles,
    searchTerm,
    selectedCategory === 'All' ? null : selectedCategory
  );

  const categoryCounts = countArticlesByCategory(
    articles,
    categories.filter((c) => c !== 'All')
  );

  const recentPosts = articles.slice(0, 3);

  return (
    <div className="space-y-12 sm:space-y-16 pb-20 bg-[#F4F7F6]">
      {/* Header */}
      <section className="bg-gradient-to-b from-[#1A759F]/10 via-[#F4F7F6] to-[#F4F7F6] py-14 sm:py-20 border-b border-slate-200 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-4">
          <span className="text-xs font-bold uppercase tracking-wider text-[#1A759F]">
            ASSON OAU Editorial Board
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-[#1E293B] tracking-tight">
            Editorial Section
          </h1>
          <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Discover insightful articles, empirical research findings, and thought-provoking analysis from our student statisticians and guest contributors.
          </p>

          {/* Search Box */}
          <div className="max-w-md mx-auto pt-2">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search articles, topics, or authors..."
                className="w-full pl-9 pr-4 py-2.5 text-xs sm:text-sm bg-white rounded-xl border border-slate-200 focus:outline-none focus:border-[#1A759F] shadow-xs"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Articles List (8 cols) */}
          <div className="lg:col-span-8 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <h2 className="text-xl font-bold text-[#1E293B]">
                {selectedCategory === 'All'
                  ? 'Featured Statistical Publications'
                  : `${selectedCategory}`}
              </h2>
              <span className="text-xs text-slate-500 font-medium">
                Showing {filteredArticles.length} article{filteredArticles.length === 1 ? '' : 's'}
              </span>
            </div>

            {filteredArticles.length === 0 ? (
              <div className="bg-white border border-slate-200 rounded-2xl p-10 text-center space-y-3">
                <BookOpen className="w-10 h-10 text-slate-300 mx-auto" />
                <h3 className="text-base font-bold text-slate-900">
                  No articles found
                </h3>
                <p className="text-xs text-slate-500">
                  Try adjusting your search query or category filter.
                </p>
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedCategory('All');
                  }}
                  className="px-4 py-1.5 text-xs font-semibold text-[#1A759F] hover:bg-[#1A759F]/10 rounded-lg border border-[#1A759F]/30 cursor-pointer"
                >
                  Reset Filters
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                {filteredArticles.map((article) => (
                  <article
                    key={article._id}
                    className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:border-[#1A759F]/40 hover:shadow-md transition-all flex flex-col md:flex-row items-stretch"
                  >
                    {/* Featured Article Image */}
                    <div
                      onClick={() => onOpenArticle(article)}
                      className="md:w-64 lg:w-72 shrink-0 relative bg-slate-100 cursor-pointer overflow-hidden min-h-[190px] md:min-h-full group"
                    >
                      <img
                        src={article.featuredImage || '/src/assets/images/article_data_science_1793142128872.jpg'}
                        alt={article.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        referrerPolicy="no-referrer"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = '/src/assets/images/article_data_science_1793142128872.jpg';
                        }}
                      />
                      <div className="absolute top-3 left-3">
                        <span className="px-2.5 py-1 rounded-md text-[11px] font-bold bg-[#1E293B]/90 text-white backdrop-blur-xs">
                          {article.category}
                        </span>
                      </div>
                    </div>

                    {/* Article Details */}
                    <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between space-y-3">
                      <div className="space-y-2.5">
                        <div className="flex items-center justify-between text-xs text-slate-400">
                          <span className="font-semibold text-[#1A759F]">
                            {article.category}
                          </span>
                          <span className="font-mono text-slate-500">{article.readTime}</span>
                        </div>

                        <h3
                          onClick={() => onOpenArticle(article)}
                          className="text-lg sm:text-xl font-bold text-[#1E293B] hover:text-[#1A759F] cursor-pointer transition-colors leading-snug"
                        >
                          {article.title}
                        </h3>

                        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-2 sm:line-clamp-3">
                          {article.excerpt}
                        </p>
                      </div>

                      {/* Author & Read Link */}
                      <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 rounded-full bg-[#1A759F]/10 text-[#1A759F] flex items-center justify-center font-bold text-xs uppercase">
                            {article.author.charAt(0)}
                          </div>
                          <div>
                            <span className="font-bold text-slate-800 block">
                              {article.author}
                            </span>
                            <span className="text-[11px] text-slate-400">
                              {formatDate(article.publishDate)}
                            </span>
                          </div>
                        </div>

                        <button
                          onClick={() => onOpenArticle(article)}
                          className="font-bold text-[#1A759F] hover:text-[#13597a] inline-flex items-center gap-1 transition-colors cursor-pointer"
                        >
                          <span>Read Full Article</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>

          {/* Sidebar (4 cols) */}
          <aside className="lg:col-span-4 space-y-6">
            {/* Category Filter Tabs */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
              <h3 className="text-base font-bold text-[#1E293B] border-b border-slate-100 pb-2">
                Categories
              </h3>
              <div className="space-y-1">
                {categories.map((cat) => {
                  const isSelected = selectedCategory === cat;
                  const count =
                    cat === 'All' ? articles.length : categoryCounts[cat] || 0;

                  return (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                        isSelected
                          ? 'bg-[#1A759F] text-white font-bold'
                          : 'text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      <span>{cat}</span>
                      <span
                        className={`text-[11px] font-mono px-1.5 py-0.5 rounded ${
                          isSelected ? 'bg-white/20 text-white' : 'text-slate-400'
                        }`}
                      >
                        {count}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Recent Publications */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
              <h3 className="text-base font-bold text-[#1E293B] border-b border-slate-100 pb-2 flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-[#1A759F]" />
                <span>Recent Articles</span>
              </h3>

              <div className="space-y-4">
                {recentPosts.map((post) => (
                  <div
                    key={post._id}
                    onClick={() => onOpenArticle(post)}
                    className="group cursor-pointer space-y-1"
                  >
                    <span className="text-[11px] font-semibold text-[#1A759F]">
                      {post.category}
                    </span>
                    <h4 className="text-xs sm:text-sm font-bold text-slate-800 group-hover:text-[#1A759F] transition-colors line-clamp-2">
                      {post.title}
                    </h4>
                    <span className="text-[11px] text-slate-400 block">
                      {formatDate(post.publishDate)} · {post.readTime}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* ASSON Motto Quote Card */}
            <div className="bg-gradient-to-br from-[#1A759F] to-[#13597a] text-white rounded-2xl p-6 shadow-sm space-y-3">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#34A0A4] block">
                Editorial Creed
              </span>
              <p className="text-sm font-semibold italic leading-relaxed">
                "In God we trust; all others must bring data. Facts with reliable figures guide every equation we solve."
              </p>
              <span className="text-xs text-white/80 block">— ASSON OAU</span>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
};
