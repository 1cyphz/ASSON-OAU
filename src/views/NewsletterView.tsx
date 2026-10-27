import React, { useState } from 'react';
import { Mail, Download, FileText, CheckCircle2, AlertCircle } from 'lucide-react';
import { Newsletter } from '../types';
import { formatDate, isValidEmail } from '../utils/helpers';

interface NewsletterViewProps {
  newsletters: Newsletter[];
  onOpenNewsletter: (newsletter: Newsletter) => void;
}

export const NewsletterView: React.FC<NewsletterViewProps> = ({
  newsletters,
  onOpenNewsletter
}) => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValidEmail(email)) {
      setError('Please provide a valid email address (e.g. user@gmail.com)');
      return;
    }
    setError('');
    setSubmitted(true);
    // Persist in localStorage
    try {
      const existing = JSON.parse(
        localStorage.getItem('namssn_subscribers') || '[]'
      );
      if (!existing.includes(email.trim().toLowerCase())) {
        existing.push(email.trim().toLowerCase());
        localStorage.setItem('namssn_subscribers', JSON.stringify(existing));
      }
    } catch {}
  };

  return (
    <div className="space-y-16 sm:space-y-24 pb-20">
      {/* Header & Subscribe Card */}
      <section className="bg-gradient-to-b from-blue-50/70 to-white py-14 sm:py-20 border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-6">
          <div className="space-y-3">
            <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
              Newsletter
            </h1>
            <p className="text-sm sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
              Stay connected with NAMSSN OAU through our monthly newsletter
              featuring events, achievements, and community updates.
            </p>
          </div>

          {/* Subscribe Box */}
          <div className="max-w-lg mx-auto bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm">
            <div className="flex items-center justify-center gap-2 text-slate-900 font-bold text-lg mb-1">
              <Mail className="w-5 h-5 text-blue-600" />
              <span>Subscribe to Newsletter</span>
            </div>
            <p className="text-xs text-slate-500 mb-5">
              Get the latest updates delivered directly to your inbox.
            </p>

            {submitted ? (
              <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-4 rounded-xl text-xs sm:text-sm flex items-center justify-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                <span>
                  Thank you for subscribing! You will receive future editions of
                  The Yellow Times.
                </span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-3">
                <div className="space-y-1.5 text-left">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (error) setError('');
                    }}
                    placeholder="Enter your email address"
                    className="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-600 bg-slate-50/50"
                  />
                  {error && (
                    <div className="flex items-center gap-1.5 text-xs text-rose-600 pt-0.5">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>{error}</span>
                    </div>
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm rounded-xl shadow-xs transition-colors"
                >
                  Subscribe Now
                </button>
                <p className="text-[11px] text-slate-400">
                  We respect your privacy. Unsubscribe at any time.
                </p>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Newsletter Archive */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10 space-y-2">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            Newsletter Archive
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Browse all past and current volumes of The Yellow Times
          </p>
        </div>

        <div className="space-y-6">
          {newsletters.map((nl, idx) => {
            const isLatest = idx === 0;
            return (
              <div
                key={nl._id}
                className={`bg-white rounded-2xl border p-6 sm:p-8 shadow-xs flex flex-col md:flex-row md:items-start justify-between gap-6 transition-all ${
                  isLatest
                    ? 'border-blue-300 ring-2 ring-blue-100'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="space-y-3 flex-1">
                  {isLatest && (
                    <span className="inline-block px-2.5 py-0.5 bg-slate-900 text-white text-[11px] font-bold rounded-md uppercase tracking-wider">
                      Latest Issue
                    </span>
                  )}
                  <div className="text-xs font-semibold text-amber-600">
                    Volume {nl.volume} · Editorial Board
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-slate-900 leading-snug">
                    {nl.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed whitespace-pre-line">
                    {nl.description}
                  </p>
                  <div className="text-xs text-slate-400 pt-1">
                    Published: {formatDate(nl.publishDate)}
                  </div>
                </div>

                <div className="flex md:flex-col items-center gap-3 shrink-0 pt-2 md:pt-0">
                  <button
                    onClick={() => onOpenNewsletter(nl)}
                    className="w-full sm:w-auto px-4 py-2 text-xs font-semibold text-slate-700 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg transition-colors inline-flex items-center justify-center gap-1.5"
                  >
                    <FileText className="w-4 h-4 text-blue-600" />
                    <span>Preview</span>
                  </button>
                  <a
                    href={nl.pdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors inline-flex items-center justify-center gap-1.5 shadow-xs"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download PDF</span>
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Don't Miss Out Callout */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="bg-slate-900 rounded-3xl p-8 sm:p-12 text-center text-white space-y-4">
          <h2 className="text-2xl sm:text-3xl font-extrabold">
            Don't Miss Out!
          </h2>
          <p className="text-sm text-slate-300 max-w-xl mx-auto leading-relaxed">
            Join our community of mathematical science enthusiasts and stay
            informed about everything happening in our department.
          </p>
          <div className="pt-2">
            <button
              onClick={() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs sm:text-sm rounded-xl transition-colors shadow-sm"
            >
              Subscribe to Newsletter
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
