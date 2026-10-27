import React, { useState } from 'react';
import {
  Eye,
  Target,
  Heart,
  Phone,
  BookOpen,
  Users,
  Shield,
  ScrollText,
  ChevronDown,
  ChevronUp,
  Layers,
  GraduationCap
} from 'lucide-react';
import { ASSON_EXECUTIVES } from '../data/assonData';
import { formatPhoneLink } from '../utils/helpers';
import { ConstitutionModal } from '../components/ConstitutionModal';

export const AboutView: React.FC = () => {
  const [showConstitution, setShowConstitution] = useState(false);
  const [showGovernance, setShowGovernance] = useState(false);

  return (
    <div className="space-y-16 sm:space-y-20 pb-20 bg-[#F4F7F6]">
      {/* Page Header */}
      <section className="bg-gradient-to-b from-[#1A759F]/10 via-[#F4F7F6] to-[#F4F7F6] py-14 sm:py-20 border-b border-slate-200 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-[#1A759F]">
            Association of Statistics Students of Nigeria
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-[#1E293B] tracking-tight">
            About ASSON OAU
          </h1>
          <p className="text-sm sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Department of Statistics, Obafemi Awolowo University Chapter.
            <br />
            <span className="font-semibold text-[#1A759F]">
              Motto: "Facts with reliable figures"
            </span>
          </p>
        </div>
      </section>

      {/* Our History */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-8">
          <span className="text-xs font-bold uppercase tracking-wider text-[#1A759F] block">
            Our Heritage
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1E293B] mt-1">
            Our History
          </h2>
        </div>
        <div className="bg-white rounded-2xl border border-slate-200 p-8 sm:p-10 shadow-xs space-y-5 text-sm sm:text-base text-slate-700 leading-relaxed">
          <p>
            The Association of Statistics Students of Nigeria (ASSON), Obafemi Awolowo University Chapter, was instituted to champion academic excellence in statistical science, foster collaborative peer learning, and prepare undergraduate and postgraduate statisticians for high-impact careers in data science, actuarial practice, biostatistics, operations research, and national planning.
          </p>
          <p>
            Operating within the prestigious Department of Statistics, Faculty of Science at Great Ife, ASSON OAU upholds the core philosophy that every national policy, medical clinical trial, financial market model, and technological breakthrough requires rigorous empirical truth: <em className="font-semibold text-[#1A759F]">facts with reliable figures</em>.
          </p>
          <p>
            Over the years, ASSON OAU has cultivated a distinguished legacy of scholastic achievements, organizing national workshops, the annual Legacy Cup, international hybrid symposiums, student data science hackathons, and peer-led academic tutorials across all four parts.
          </p>
        </div>
      </section>

      {/* Our Foundation (Vision, Mission, Values) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-[#1A759F] block">
            Guiding Philosophy
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1E293B]">
            Our Foundation
          </h2>
          <p className="text-sm text-slate-600">
            The core tenets driving our pursuit of statistical science, innovation, and student welfare
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Vision */}
          <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-xs flex flex-col items-center text-center space-y-4">
            <div className="w-14 h-14 rounded-2xl bg-[#1A759F]/10 text-[#1A759F] flex items-center justify-center">
              <Eye className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold text-[#1E293B]">Our Vision</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              To be the benchmark student statistical association in Africa, nurturing visionary statisticians and data leaders who solve complex socioeconomic problems with empirical precision and uncompromising integrity.
            </p>
          </div>

          {/* Mission */}
          <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-xs flex flex-col items-center text-center space-y-4">
            <div className="w-14 h-14 rounded-2xl bg-[#34A0A4]/10 text-[#34A0A4] flex items-center justify-center">
              <Target className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold text-[#1E293B]">Our Mission</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              To empower statistics students through superior academic resources, hands-on computational training in R and Python, intellectual discourse, industry mentorship, and an inclusive community of critical thinkers.
            </p>
          </div>

          {/* Values */}
          <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-xs flex flex-col items-center text-center space-y-4">
            <div className="w-14 h-14 rounded-2xl bg-[#FF7A00]/10 text-[#FF7A00] flex items-center justify-center">
              <Heart className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold text-[#1E293B]">Our Values</h3>
            <ul className="text-sm text-slate-600 space-y-2 text-left w-full list-disc list-inside">
              <li>Empirical rigor & statistical accuracy</li>
              <li>Integrity, transparency, and ethics</li>
              <li>Collaborative teamwork across all parts</li>
              <li>Continuous computational innovation</li>
              <li>Service to university and community</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Our Structure Section (with button to view governance) */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="bg-[#1E293B] text-white rounded-3xl p-8 sm:p-12 shadow-md space-y-6">
          <div className="flex items-center gap-3 text-[#34A0A4]">
            <Layers className="w-6 h-6" />
            <span className="text-xs font-bold uppercase tracking-wider">
              Organizational Hierarchy & By-Laws
            </span>
          </div>

          <div className="space-y-3">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              Our Structure
            </h2>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              ASSON OAU is structured into three interlocking democratic organs:
              the <strong className="text-white">General Congress</strong> (the supreme decision-making body composed of all bona fide student members), the <strong className="text-white">Executive Council</strong> (responsible for daily administrative leadership, academic programs, and financial stewardship), and <strong className="text-white">Statutory Committees</strong> (including Tutorials, Editorial Board, Sports, and Socials).
            </p>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row items-center gap-4">
            <button
              onClick={() => setShowGovernance(!showGovernance)}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#1A759F] hover:bg-[#13597a] text-white font-bold text-sm rounded-xl shadow-xs transition-colors cursor-pointer"
            >
              <Users className="w-4 h-4" />
              <span>
                {showGovernance
                  ? 'Hide Governance Positions'
                  : 'View Governance & Executive Positions'}
              </span>
              {showGovernance ? (
                <ChevronUp className="w-4 h-4" />
              ) : (
                <ChevronDown className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>
      </section>

      {/* Executive Positions (Revealed / toggled via View Governance) */}
      {showGovernance && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 animate-fadeIn">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#1A759F]">
              Department of Statistics
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-[#1E293B]">
              Executive Council & Governance Positions
            </h3>
            <p className="text-sm text-slate-600">
              The elected and appointed student officers serving the 2025/2026 tenure
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {ASSON_EXECUTIVES.map((exec) => (
              <div
                key={exec.name}
                className="bg-white rounded-2xl border border-slate-200 p-6 text-center shadow-xs hover:shadow-md transition-shadow flex flex-col items-center justify-between"
              >
                <div className="flex flex-col items-center space-y-4 w-full">
                  <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-slate-200 shadow-xs relative bg-slate-100">
                    <img
                      src={exec.image}
                      alt={exec.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = '/assets/namssn-logo.png';
                      }}
                    />
                  </div>

                  <div className="space-y-1 w-full">
                    <h4 className="text-base font-bold text-[#1E293B] leading-snug">
                      {exec.name}
                    </h4>
                    <div className="text-xs font-semibold text-[#1A759F]">
                      {exec.position}
                    </div>
                  </div>

                  {exec.bio && (
                    <p className="text-xs text-slate-500 leading-relaxed line-clamp-3">
                      {exec.bio}
                    </p>
                  )}
                </div>

                <div className="pt-4 mt-4 border-t border-slate-100 w-full">
                  <a
                    href={formatPhoneLink(exec.phone)}
                    className="inline-flex items-center justify-center gap-1.5 text-xs font-semibold text-emerald-700 hover:text-emerald-800 bg-emerald-50 hover:bg-emerald-100/70 border border-emerald-200 px-3 py-1.5 rounded-lg transition-colors w-full cursor-pointer"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>{exec.phone}</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Constitution Section (Click to view) */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="bg-white border border-slate-200 rounded-3xl p-8 sm:p-10 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start gap-2 text-[#1A759F]">
              <ScrollText className="w-5 h-5" />
              <span className="text-xs font-bold uppercase tracking-wider">
                Official Charter & By-Laws
              </span>
            </div>
            <h2 className="text-2xl font-black text-[#1E293B]">
              ASSON OAU Constitution
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 max-w-xl leading-relaxed">
              Review the supreme legal instrument establishing membership rights, statutory executive powers, electoral processes, and financial transparency regulations.
            </p>
          </div>

          <button
            onClick={() => setShowConstitution(true)}
            className="w-full sm:w-auto px-6 py-3 bg-[#FF7A00] hover:bg-[#e66e00] text-white font-bold text-xs sm:text-sm rounded-xl shadow-xs transition-colors whitespace-nowrap inline-flex items-center justify-center gap-2 shrink-0 cursor-pointer"
          >
            <BookOpen className="w-4 h-4 text-white" />
            <span>Click to View Constitution</span>
          </button>
        </div>
      </section>

      {/* Constitution Modal */}
      <ConstitutionModal
        isOpen={showConstitution}
        onClose={() => setShowConstitution(false)}
      />
    </div>
  );
};
