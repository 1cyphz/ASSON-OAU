import React, { useState } from 'react';
import { Mail, CheckCircle2, MapPin, Send, Shield, BookOpen, GraduationCap } from 'lucide-react';
import { AssonLogo } from './AssonLogo';

interface FooterProps {
  onSelectTab: (tab: string) => void;
  onOpenAdminLogin: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectTab, onOpenAdminLogin }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [error, setError] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please provide a valid email address.');
      return;
    }

    // Persist newsletter subscriber
    try {
      const existing = JSON.parse(localStorage.getItem('asson_subscribers') || '[]');
      if (!existing.includes(email.toLowerCase())) {
        existing.push(email.toLowerCase());
        localStorage.setItem('asson_subscribers', JSON.stringify(existing));
      }
    } catch (_) {}

    setSubscribed(true);
    setEmail('');
    setTimeout(() => setSubscribed(false), 5000);
  };

  return (
    <footer className="bg-[#1E293B] text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-slate-700/60">
          {/* Brand & Chapter Mission */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="bg-white p-1 rounded-lg">
                <AssonLogo size={42} showText={false} />
              </div>
              <div>
                <span className="text-lg font-extrabold text-white block tracking-tight">
                  ASSON OAU
                </span>
                <span className="text-xs text-slate-400 font-medium">
                  Association of Statistics Students of Nigeria
                </span>
              </div>
            </div>

            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              Department of Statistics, Faculty of Science, Obafemi Awolowo University, Ile-Ife, Osun State.
            </p>

            <div className="inline-block px-3 py-1 bg-slate-800/80 border border-slate-700 rounded-md text-xs font-medium text-[#34A0A4]">
              Motto: <span className="text-white italic">"Facts with reliable figures"</span>
            </div>

            <div className="flex items-start gap-2.5 text-xs text-slate-400 pt-2">
              <MapPin className="w-4 h-4 text-[#34A0A4] shrink-0 mt-0.5" />
              <span>Department of Statistics Building, Faculty of Science, OAU Campus, Ile-Ife</span>
            </div>
          </div>

          {/* Quick Nav Links */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">
              Navigation
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button
                  onClick={() => onSelectTab('home')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('about')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  About Us & Governance
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('academics')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Statistics Resources
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('quiz')}
                  className="hover:text-white transition-colors cursor-pointer text-[#34A0A4]"
                >
                  Course Quizzes
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('editorial')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Editorial Articles
                </button>
              </li>
            </ul>
          </div>

          {/* Association Community */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">
              Community
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button
                  onClick={() => onSelectTab('events')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Events & Gallery
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('alumni')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Alumni Directory
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('contact')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Contact Secretariat
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenAdminLogin}
                  className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white pt-2 cursor-pointer"
                >
                  <Shield className="w-3.5 h-3.5 text-amber-400" />
                  <span>Admin & Role Portal</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Newsletter Subscription Form */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">
              Newsletter Subscription
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Subscribe to receive the latest editions of The Yellow Times, academic research releases, hackathon alerts, and departmental announcements directly to your inbox.
            </p>

            {subscribed ? (
              <div className="flex items-center gap-2 p-3 bg-emerald-950/60 border border-emerald-700/50 rounded-lg text-emerald-300 text-xs">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>Thank you! You are now subscribed to the ASSON newsletter.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="relative flex-1">
                    <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter student or personal email"
                      required
                      className="w-full pl-9 pr-3 py-2 bg-slate-800/90 border border-slate-700 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#34A0A4]"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-[#FF7A00] hover:bg-[#e66e00] text-white text-xs font-bold rounded-lg transition-colors inline-flex items-center gap-1.5 shrink-0 cursor-pointer shadow-sm"
                  >
                    <span>Subscribe</span>
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </div>
                {error && <p className="text-xs text-red-400">{error}</p>}
                <p className="text-[11px] text-slate-500">
                  Zero spam. Curated monthly statistical insights and student opportunities.
                </p>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Bar: Copyright & Attribution */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>
            © {new Date().getFullYear()} Association of Statistics Students of Nigeria (ASSON), Obafemi Awolowo University Chapter.
          </p>
          <div className="flex items-center gap-4">
            <span className="text-slate-400">Department of Statistics, Faculty of Science</span>
            <span aria-hidden="true">·</span>
            <span>OAU Ile-Ife, Nigeria</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
