import React from 'react';
import { X, FileText, ExternalLink, Calendar, CheckCircle2 } from 'lucide-react';
import { Newsletter } from '../types';
import { formatDate } from '../utils/helpers';

interface NewsletterModalProps {
  newsletter: Newsletter | null;
  onClose: () => void;
}

export const NewsletterModal: React.FC<NewsletterModalProps> = ({
  newsletter,
  onClose
}) => {
  if (!newsletter) return null;

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div className="bg-white rounded-2xl max-w-3xl w-full shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="flex items-start justify-between p-6 border-b border-slate-100 bg-slate-50/70 shrink-0">
          <div className="flex items-start gap-3">
            <div className="p-2.5 bg-[#1A759F]/10 text-[#1A759F] rounded-xl">
              <FileText className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#34A0A4]">
                The Yellow Times · Volume {newsletter.volume}
              </span>
              <h2
                id="modal-title"
                className="text-lg sm:text-xl font-bold text-slate-900 mt-0.5 leading-snug"
              >
                {newsletter.title}
              </h2>
              <div className="flex items-center gap-2 mt-1.5 text-xs text-slate-500">
                <Calendar className="w-3.5 h-3.5" />
                <span>Published {formatDate(newsletter.publishDate)}</span>
                <span>·</span>
                <span>ASSON OAU Departmental Publication</span>
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content Preview (Strictly Preview Only - No Download Button) */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 text-xs sm:text-sm text-slate-800 leading-relaxed whitespace-pre-line">
            {newsletter.description}
          </div>

          <div className="border border-slate-200 rounded-2xl p-6 bg-slate-50/50 text-center space-y-3">
            <h3 className="text-base font-bold text-[#1E293B]">
              Digital Issue Preview
            </h3>
            <p className="text-xs text-slate-500 max-w-md mx-auto">
              Preview the complete digital issue in full screen with high resolution charts, student columns, and interviews.
            </p>
            <div className="pt-2">
              <a
                href={newsletter.pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-[#1A759F] hover:bg-[#13597a] text-white text-xs sm:text-sm font-semibold rounded-xl shadow-xs transition-colors cursor-pointer"
              >
                <ExternalLink className="w-4 h-4" />
                <span>Open Full Preview in New Tab</span>
              </a>
            </div>
          </div>

          <div className="text-xs text-slate-500 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>
              Curated by the Editorial Board of the Association of Statistics Students of Nigeria, OAU Chapter.
            </span>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-slate-100 bg-slate-50 flex items-center justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
          >
            Close Preview
          </button>
        </div>
      </div>
    </div>
  );
};
