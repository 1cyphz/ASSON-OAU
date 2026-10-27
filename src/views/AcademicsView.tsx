import React, { useState } from 'react';
import {
  Folder,
  ExternalLink,
  Search,
  BookOpen,
  CheckCircle2,
  HelpCircle,
  Award,
  ArrowRight
} from 'lucide-react';
import { AcademicPart } from '../types';

interface AcademicsViewProps {
  statResources: AcademicPart[];
  onNavigateToQuiz?: () => void;
}

export const AcademicsView: React.FC<AcademicsViewProps> = ({
  statResources,
  onNavigateToQuiz
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredResources = statResources.filter((part) => {
    const q = searchQuery.toLowerCase();
    return (
      part.title.toLowerCase().includes(q) ||
      part.level.toLowerCase().includes(q) ||
      part.description.toLowerCase().includes(q) ||
      part.courses.some((c) => c.toLowerCase().includes(q))
    );
  });

  return (
    <div className="space-y-12 sm:space-y-16 pb-20 bg-[#F4F7F6]">
      {/* Header */}
      <section className="bg-gradient-to-b from-[#1A759F]/10 via-[#F4F7F6] to-[#F4F7F6] py-14 sm:py-20 border-b border-slate-200 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-[#1A759F]">
            Department of Statistics Study Portal
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-[#1E293B] tracking-tight">
            Statistics Academic Resources
          </h1>
          <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Curated Google Drive study drives, verified lecture notes, course outlines, and past questions from 100 to 400 Level for all ASSONites.
          </p>

          {/* Quick Quiz Banner */}
          {onNavigateToQuiz && (
            <div className="pt-3">
              <button
                onClick={onNavigateToQuiz}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#FF7A00] hover:bg-[#e66e00] text-white text-xs font-bold rounded-lg shadow-sm transition-colors cursor-pointer"
              >
                <HelpCircle className="w-4 h-4" />
                <span>Looking for Course Quizzes? Attempt Practice Quizzes</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Search Bar */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by course code (e.g. STA 101, STA 201), level, or topic..."
              className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#1A759F] focus:bg-white"
            />
          </div>
          <span className="text-xs text-slate-500 font-medium whitespace-nowrap self-center sm:self-auto">
            Showing {filteredResources.length} Statistical Parts
          </span>
        </div>

        {/* 4 Levels of Statistics (Parts 1 - 4) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredResources.map((item) => (
            <div
              key={item.part}
              className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between space-y-6"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-xl bg-[#1A759F]/10 text-[#1A759F] flex items-center justify-center font-bold text-lg">
                    Part {item.part}
                  </div>
                  <span className="text-xs font-bold text-[#34A0A4]">
                    {item.level}
                  </span>
                </div>

                <div className="space-y-1">
                  <h3 className="text-xl font-bold text-[#1E293B]">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {/* Core Courses List */}
                <div className="space-y-2 pt-2">
                  <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                    Core Modules & Syllabus:
                  </h4>
                  <ul className="space-y-1.5 text-xs text-slate-600">
                    {item.courses.map((course, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#34A0A4] shrink-0 mt-0.5" />
                        <span>{course}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Action Button: Drive Folder */}
              <div className="pt-4 border-t border-slate-100">
                <a
                  href={item.driveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 bg-[#1A759F] hover:bg-[#13597a] text-white font-bold text-xs sm:text-sm rounded-xl shadow-xs transition-colors cursor-pointer"
                >
                  <Folder className="w-4 h-4" />
                  <span>Open Part {item.part} Google Drive Folder</span>
                  <ExternalLink className="w-3.5 h-3.5 opacity-80" />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Computing & Statistical Software Guide */}
        <section className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs">
          <div className="max-w-3xl space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#1A759F] block">
              Computational Statistics
            </span>
            <h3 className="text-xl font-extrabold text-[#1E293B]">
              Departmental Software & Tooling
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Modern statistics students at OAU work extensively with industry-standard computing environments. Tutorial packages and setup scripts for R, RStudio, Python (NumPy, SciPy, Pandas, Statsmodels), SPSS, and LaTeX are available in each level's respective repository.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};
