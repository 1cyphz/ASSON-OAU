import React from 'react';
import {
  Calendar,
  Clock,
  MapPin,
  ArrowRight,
  Eye,
  Building,
  GraduationCap,
  BookOpen,
  Award,
  Users
} from 'lucide-react';
import { HeroSlider } from '../components/HeroSlider';
import { Newsletter, EventItem } from '../types';
import { formatDate } from '../utils/helpers';

interface HomeViewProps {
  onNavigate: (tab: string) => void;
  newsletters: Newsletter[];
  events: EventItem[];
  onOpenNewsletter: (nl: Newsletter) => void;
  onOpenEventModal: (event: EventItem) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  onNavigate,
  newsletters,
  events,
  onOpenNewsletter,
  onOpenEventModal
}) => {
  const upcomingEvents = events.filter((e) => e.status === 'upcoming');
  const latestNewsletter = newsletters[0];

  return (
    <div className="space-y-16 sm:space-y-20 pb-20 bg-[#F4F7F6]">
      {/* 1. Home Hero Slider (matching user video) */}
      <HeroSlider
        onNavigate={onNavigate}
        onOpenEventModal={(id) => {
          const ev = events.find((e) => e._id === id);
          if (ev) onOpenEventModal(ev);
        }}
      />

      {/* 2. "Our Home" section appears BEFORE Upcoming Events */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
            {/* Department Photo */}
            <div className="lg:col-span-5 relative min-h-[280px] lg:min-h-full">
              <img
                src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1200&q=80"
                alt="Department of Statistics, Faculty of Science, Obafemi Awolowo University"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent flex items-end p-6">
                <div>
                  <span className="text-xs font-semibold text-[#34A0A4] uppercase tracking-wider block">
                    Campus Secretariat
                  </span>
                  <h3 className="text-lg font-bold text-white">
                    Department of Statistics
                  </h3>
                  <p className="text-xs text-slate-300">
                    Faculty of Science · Obafemi Awolowo University, Ile-Ife
                  </p>
                </div>
              </div>
            </div>

            {/* Department Narrative & Identity */}
            <div className="lg:col-span-7 p-6 sm:p-10 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#1A759F]">
                    Our Home & Secretariat
                  </span>
                  <span className="text-slate-300">·</span>
                  <span className="text-xs text-slate-500 font-medium">
                    Great Ife
                  </span>
                </div>

                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1E293B] tracking-tight">
                  A Center for Empirical Excellence and Statistical Integrity
                </h2>

                <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                  The Department of Statistics at Obafemi Awolowo University is a premier hub for data science, probability theory, biostatistics, and quantitative analysis. Under our guiding motto <span className="font-semibold text-[#1A759F]">"Facts with reliable figures"</span>, ASSON provides student statisticians with the community, resources, and computational skills to turn complex numbers into actionable societal impact.
                </p>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-2">
                  <div className="p-3.5 bg-[#F4F7F6] rounded-xl border border-slate-200">
                    <span className="text-xs text-slate-500 block">Degree Programs</span>
                    <span className="text-base font-extrabold text-[#1E293B]">B.Sc, M.Sc, Ph.D</span>
                  </div>
                  <div className="p-3.5 bg-[#F4F7F6] rounded-xl border border-slate-200">
                    <span className="text-xs text-slate-500 block">Motto</span>
                    <span className="text-xs font-bold text-[#1A759F] line-clamp-1">Facts & Figures</span>
                  </div>
                  <div className="p-3.5 bg-[#F4F7F6] rounded-xl border border-slate-200 col-span-2 sm:col-span-1">
                    <span className="text-xs text-slate-500 block">Location</span>
                    <span className="text-xs font-bold text-[#1E293B]">Faculty of Science</span>
                  </div>
                </div>
              </div>

              <div className="pt-2 flex flex-wrap items-center gap-3">
                <button
                  onClick={() => onNavigate('about')}
                  className="px-5 py-2.5 bg-[#1A759F] hover:bg-[#13597a] text-white text-xs font-bold rounded-lg transition-colors inline-flex items-center gap-2 cursor-pointer shadow-xs"
                >
                  <span>Learn About ASSON OAU</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => onNavigate('academics')}
                  className="px-5 py-2.5 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-bold rounded-lg transition-colors inline-flex items-center gap-2 cursor-pointer"
                >
                  <BookOpen className="w-4 h-4 text-[#34A0A4]" />
                  <span>Explore Course Resources</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Upcoming Events in List with Image and Details Format */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 pb-4 border-b border-slate-200 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#1A759F] block">
              Departmental Calendar
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1E293B] mt-1">
              Upcoming Events
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              Conferences, technical workshops, and student academic fixtures
            </p>
          </div>
          <button
            onClick={() => onNavigate('events')}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1A759F] hover:text-[#13597a] transition-colors cursor-pointer"
          >
            <span>View All Events & Gallery</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* List Layout with Image and Details Format */}
        <div className="space-y-4">
          {upcomingEvents.length > 0 ? (
            upcomingEvents.map((event) => (
              <div
                key={event._id}
                className="bg-white rounded-xl border border-slate-200 hover:border-[#1A759F]/40 p-4 sm:p-6 transition-all shadow-xs hover:shadow-md flex flex-col md:flex-row items-start md:items-center gap-6"
              >
                {/* Event Thumbnail */}
                <div className="w-full md:w-56 h-40 md:h-36 rounded-lg overflow-hidden shrink-0 relative bg-slate-100">
                  <img
                    src={event.image || '/src/assets/images/hero_stats_conference_1793142127421.jpg'}
                    alt={event.title}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-2 left-2 px-2 py-0.5 bg-black/60 backdrop-blur-xs text-white text-[11px] font-bold rounded">
                    {event.category}
                  </div>
                </div>

                {/* Event Details Content */}
                <div className="flex-1 space-y-2">
                  <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500">
                    <span className="inline-flex items-center gap-1 font-semibold text-[#1A759F]">
                      <Calendar className="w-3.5 h-3.5" />
                      {formatDate(event.date)}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      {event.time}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" />
                      {event.location}
                    </span>
                  </div>

                  <h3 className="text-lg sm:text-xl font-bold text-[#1E293B] leading-snug">
                    {event.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 line-clamp-2 leading-relaxed">
                    {event.description}
                  </p>
                </div>

                {/* Clickable Event Details Button */}
                <div className="w-full md:w-auto shrink-0 pt-2 md:pt-0">
                  <button
                    onClick={() => onOpenEventModal(event)}
                    className="w-full md:w-auto px-5 py-2.5 bg-[#FF7A00] hover:bg-[#e66e00] text-white text-xs font-bold rounded-lg transition-colors inline-flex items-center justify-center gap-2 cursor-pointer shadow-xs"
                  >
                    <span>Event Details</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="p-8 text-center bg-white rounded-xl border border-slate-200">
              <p className="text-sm text-slate-500">No upcoming events scheduled at the moment.</p>
            </div>
          )}
        </div>
      </section>

      {/* 4. Newsletter Preview Card (strictly preview, NO download button) */}
      {latestNewsletter && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-[#1E293B] to-[#0f172a] rounded-2xl p-6 sm:p-10 text-white shadow-md border border-slate-800">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-8 space-y-3">
                <span className="text-xs font-bold uppercase tracking-wider text-[#34A0A4] block">
                  ASSON Editorial Bulletin
                </span>
                <h3 className="text-2xl sm:text-3xl font-black tracking-tight">
                  {latestNewsletter.title}
                </h3>
                <p className="text-xs text-slate-400">
                  Published {formatDate(latestNewsletter.publishDate)} · Volume {latestNewsletter.volume}
                </p>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-2xl">
                  {latestNewsletter.description}
                </p>
              </div>

              <div className="lg:col-span-4 flex justify-start lg:justify-end">
                {/* Strictly Preview Button, NO download button */}
                <button
                  onClick={() => onOpenNewsletter(latestNewsletter)}
                  className="px-6 py-3 bg-[#1A759F] hover:bg-[#13597a] text-white text-xs font-bold rounded-lg transition-colors inline-flex items-center gap-2 cursor-pointer shadow-sm"
                >
                  <Eye className="w-4 h-4" />
                  <span>Preview Issue</span>
                </button>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};
