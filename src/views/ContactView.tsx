import React, { useState } from 'react';
import {
  MapPin,
  Mail,
  Send,
  CheckCircle2,
  ExternalLink,
  Facebook,
  Instagram,
  Twitter,
  Clock,
  Building
} from 'lucide-react';
import { isValidEmail } from '../utils/helpers';

export const ContactView: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      setError('Please provide your name.');
      return;
    }
    if (!isValidEmail(formData.email)) {
      setError('Please provide a valid email address.');
      return;
    }
    if (!formData.message.trim()) {
      setError('Please enter your message.');
      return;
    }

    setError('');
    setSubmitted(true);

    try {
      const messages = JSON.parse(
        localStorage.getItem('asson_messages') || '[]'
      );
      messages.push({
        ...formData,
        date: new Date().toISOString()
      });
      localStorage.setItem('asson_messages', JSON.stringify(messages));
    } catch {}
  };

  return (
    <div className="space-y-14 sm:space-y-20 pb-20 bg-[#F4F7F6]">
      {/* Header */}
      <section className="bg-gradient-to-b from-[#1A759F]/10 via-[#F4F7F6] to-[#F4F7F6] py-14 sm:py-20 border-b border-slate-200 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-[#1A759F]">
            Secretariat & Communications
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-[#1E293B] tracking-tight">
            Contact ASSON OAU
          </h1>
          <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Have questions about academic course materials, upcoming conferences, editorial submissions, or student membership? Reach out to our executive secretariat.
          </p>
        </div>
      </section>

      {/* Main Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Contact Details & Info (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
              <h2 className="text-xl font-bold text-[#1E293B] border-b border-slate-100 pb-3">
                Secretariat Information
              </h2>

              <div className="space-y-5 text-xs sm:text-sm">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#1A759F]/10 text-[#1A759F] flex items-center justify-center shrink-0 mt-0.5">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-bold text-[#1E293B]">Physical Address</h3>
                    <p className="text-slate-600 leading-relaxed text-xs">
                      Department of Statistics, Faculty of Science,
                      <br />
                      Obafemi Awolowo University, Ile-Ife,
                      <br />
                      Osun State, Nigeria.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#34A0A4]/10 text-[#34A0A4] flex items-center justify-center shrink-0 mt-0.5">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-bold text-[#1E293B]">Email Secretariat</h3>
                    <a
                      href="mailto:secretariat@asson-oau.org"
                      className="text-[#1A759F] hover:underline text-xs"
                    >
                      secretariat@asson-oau.org
                    </a>
                    <span className="text-slate-400 block text-[11px]">
                      General correspondence & submissions
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0 mt-0.5">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-bold text-[#1E293B]">Office Hours</h3>
                    <p className="text-slate-600 text-xs">
                      Monday – Friday: 9:00 AM – 4:00 PM WAT
                      <br />
                      (During active academic semesters)
                    </p>
                  </div>
                </div>
              </div>

              {/* Social Channels */}
              <div className="pt-4 border-t border-slate-100 space-y-3">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
                  Connect on Social Media
                </span>
                <div className="flex items-center gap-3">
                  <a
                    href="https://facebook.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 rounded-lg bg-slate-100 hover:bg-[#1A759F] hover:text-white text-slate-700 flex items-center justify-center transition-colors cursor-pointer"
                    aria-label="Facebook"
                  >
                    <Facebook className="w-4 h-4" />
                  </a>
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 rounded-lg bg-slate-100 hover:bg-[#34A0A4] hover:text-white text-slate-700 flex items-center justify-center transition-colors cursor-pointer"
                    aria-label="Instagram"
                  >
                    <Instagram className="w-4 h-4" />
                  </a>
                  <a
                    href="https://twitter.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 rounded-lg bg-slate-100 hover:bg-[#1E293B] hover:text-white text-slate-700 flex items-center justify-center transition-colors cursor-pointer"
                    aria-label="X (Twitter)"
                  >
                    <Twitter className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Message Form (7 cols) */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-10 shadow-xs space-y-6">
              <div className="space-y-1">
                <h2 className="text-xl font-bold text-[#1E293B]">
                  Send a Direct Inquiry
                </h2>
                <p className="text-xs sm:text-sm text-slate-500">
                  Leave a message and an ASSON executive council member will respond shortly.
                </p>
              </div>

              {submitted ? (
                <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-8 text-center space-y-3">
                  <div className="w-12 h-12 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h3 className="text-base font-bold text-emerald-900">
                    Message Dispatched Successfully!
                  </h3>
                  <p className="text-xs text-emerald-700 leading-relaxed max-w-sm mx-auto">
                    Thank you, {formData.name}. Your correspondence has been logged with the ASSON OAU secretariat.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({
                        name: '',
                        email: '',
                        subject: '',
                        message: ''
                      });
                    }}
                    className="px-4 py-2 bg-white border border-emerald-300 text-emerald-800 text-xs font-bold rounded-lg hover:bg-emerald-50 transition-colors cursor-pointer"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {error && (
                    <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-lg">
                      {error}
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-bold text-slate-700 block mb-1">
                        Your Full Name *
                      </label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        placeholder="e.g. Oluwaseun Alabi"
                        required
                        className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs sm:text-sm focus:outline-none focus:border-[#1A759F]"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold text-slate-700 block mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        placeholder="e.g. student@oauife.edu.ng"
                        required
                        className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs sm:text-sm focus:outline-none focus:border-[#1A759F]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      Subject
                    </label>
                    <input
                      type="text"
                      value={formData.subject}
                      onChange={(e) =>
                        setFormData({ ...formData, subject: e.target.value })
                      }
                      placeholder="e.g. Academic Past Questions Inquiry"
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs sm:text-sm focus:outline-none focus:border-[#1A759F]"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      Message *
                    </label>
                    <textarea
                      rows={5}
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      placeholder="Type your message or inquiry here..."
                      required
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs sm:text-sm focus:outline-none focus:border-[#1A759F]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-[#FF7A00] hover:bg-[#e66e00] text-white text-xs font-bold rounded-lg transition-colors cursor-pointer shadow-xs inline-flex items-center justify-center gap-2"
                  >
                    <span>Send Message to ASSON</span>
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
