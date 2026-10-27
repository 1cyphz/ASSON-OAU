import React, { useState } from 'react';
import { X, BookOpen, Shield, ScrollText, Search, CheckCircle2 } from 'lucide-react';
import { CONSTITUTION_ARTICLES } from '../data/assonData';

interface ConstitutionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ConstitutionModal: React.FC<ConstitutionModalProps> = ({
  isOpen,
  onClose
}) => {
  const [search, setSearch] = useState('');

  if (!isOpen) return null;

  const filteredArticles = CONSTITUTION_ARTICLES.filter((item) =>
    item.title.toLowerCase().includes(search.toLowerCase()) ||
    item.content.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="constitution-title"
    >
      <div className="bg-white rounded-2xl max-w-4xl w-full shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-200 bg-slate-50/70 shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-[#1A759F]/10 text-[#1A759F] rounded-xl">
              <ScrollText className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs font-bold text-[#1A759F] uppercase tracking-wider block">
                Official Charter & By-Laws
              </span>
              <h2
                id="constitution-title"
                className="text-lg sm:text-xl font-black text-slate-900 leading-tight"
              >
                Constitution of ASSON OAU
              </h2>
              <p className="text-xs text-slate-500 font-medium">
                Department of Statistics, Obafemi Awolowo University Chapter · Motto: "Facts with reliable figures"
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
            aria-label="Close Constitution modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search Bar */}
        <div className="px-6 py-3 bg-white border-b border-slate-100 shrink-0">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search articles, executive powers, financial dues, or preamble..."
              className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-[#1A759F]"
            />
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
          {filteredArticles.map((article, idx) => (
            <div
              key={idx}
              className="border border-slate-200 rounded-xl p-6 bg-white space-y-3 shadow-xs"
            >
              <h3 className="text-base font-extrabold text-[#1E293B] border-b border-slate-100 pb-2 flex items-center gap-2">
                <Shield className="w-4 h-4 text-[#1A759F]" />
                <span>{article.title}</span>
              </h3>

              <div className="text-xs sm:text-sm text-slate-700 leading-relaxed whitespace-pre-line">
                {article.content}
              </div>
            </div>
          ))}

          {filteredArticles.length === 0 && (
            <div className="p-8 text-center text-slate-500 text-xs">
              No matching sections found for "{search}".
            </div>
          )}

          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-xs text-slate-500 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>
              Enacted by the General Assembly of ASSON OAU. All amendments are ratified by two-thirds parliamentary majority.
            </span>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-100 bg-slate-50 flex items-center justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-200 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
          >
            Close Constitution
          </button>
        </div>
      </div>
    </div>
  );
};
