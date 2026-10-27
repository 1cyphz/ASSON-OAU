import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';

interface HeroSliderProps {
  onNavigate: (tab: string) => void;
  onOpenEventModal?: (eventId: string) => void;
}

export const HeroSlider: React.FC<HeroSliderProps> = ({
  onNavigate,
  onOpenEventModal
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const slides = [
    {
      id: 'slide-welcome',
      tag: 'WELCOME TO ASSON OAU',
      title: 'Welcome to ASSON',
      subtitle: 'Association of Statistics Students of Nigeria',
      subtext: 'Pace for excellence and knowledge',
      motto: 'Motto: Facts with reliable figures',
      description:
        'Obafemi Awolowo University Chapter. Dedicated to statistical excellence, empirical research, data science proficiency, and ethical leadership.',
      ctaText: 'Join Us',
      ctaAction: () => onNavigate('about'),
      bgGradient: 'from-[#1A759F] via-[#13597a] to-[#0d3b53]',
      image: '/src/assets/images/hero_stats_conference_1793142127421.jpg',
      imageAlt: 'Empowering Student Statisticians at Great Ife'
    },
    {
      id: 'slide-conference',
      tag: 'UPCOMING EVENT',
      title: 'ASSON-ASA 1st International Hybrid Conference 2026',
      subtitle: 'Department of Statistics & Virtual Livestream',
      subtext: 'Empowering Student Statisticians for Data-Driven Innovation',
      motto: 'Sustainable Development in the Digital Era',
      description:
        'Join global statistical academics, industry practitioners, and student researchers exploring machine learning, biometrics, and national development.',
      ctaText: 'Register',
      ctaAction: () => onNavigate('events'),
      bgGradient: 'from-[#13597a] via-[#1A759F] to-[#34A0A4]',
      image: '/src/assets/images/event_symposium_1793142128923.jpg',
      imageAlt: 'ASSON-ASA International Hybrid Conference 2026'
    },
    {
      id: 'slide-workshop',
      tag: 'PAST EVENT',
      title: 'ASSON-ASA NATIONAL WORKSHOP 2026.',
      subtitle: 'Faculty of Science Lecture Theatre',
      subtext: 'Privacy, Transparency, and Trust in the Digital Age',
      motto: 'Establishing Healthy Data Boundaries in Modern Practice',
      description:
        'A comprehensive national training session on statistical privacy, reproducible research, and advanced data visualization in R and Python.',
      ctaText: 'Secure a seat',
      ctaAction: () => onNavigate('events'),
      bgGradient: 'from-[#0d3b53] via-[#1E293B] to-[#1A759F]',
      image: '/src/assets/images/gallery_hackathon_1793142129565.jpg',
      imageAlt: 'ASSON National Technical Workshop'
    }
  ];

  // Auto-advance slides every 6 seconds unless paused
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [isPaused, slides.length]);

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const current = slides[currentSlide];

  return (
    <section
      className="relative overflow-hidden text-white min-h-[460px] sm:min-h-[520px] lg:min-h-[560px] flex items-center group/slider"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      aria-roledescription="carousel"
      aria-label="ASSON OAU Highlights"
    >
      {/* Dynamic Background Gradient */}
      <div
        className={`absolute inset-0 bg-gradient-to-r ${current.bgGradient} transition-all duration-700 ease-out`}
      />

      {/* Subtle overlay grid for visual depth */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:20px_20px]" />

      <div className="relative max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-12 sm:py-16 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Slide Text Content (7 columns on desktop) */}
          <div className="lg:col-span-7 space-y-4 sm:space-y-5 animate-fadeIn">
            {current.tag && (
              <span className="inline-block px-3 py-1 bg-white/15 backdrop-blur-xs text-white text-xs font-bold uppercase tracking-wider rounded-md border border-white/20">
                {current.tag}
              </span>
            )}

            <div className="space-y-2">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight drop-shadow-sm">
                {current.title}
              </h1>
              <p className="text-base sm:text-lg font-medium text-white/95">
                {current.subtitle}
              </p>
              <p className="text-xs sm:text-sm text-[#34A0A4] bg-white/10 inline-block px-2.5 py-0.5 rounded font-semibold tracking-wide">
                {current.subtext} · {current.motto}
              </p>
            </div>

            <p className="text-sm sm:text-base text-white/85 max-w-xl leading-relaxed">
              {current.description}
            </p>

            {/* Exactly 1 clean primary button (course material button removed per user instruction) */}
            <div className="pt-2">
              <button
                onClick={current.ctaAction}
                className="px-7 py-3 rounded-lg border-2 border-white bg-transparent hover:bg-white hover:text-[#1A759F] text-white font-bold text-sm transition-all shadow-md inline-flex items-center gap-2 cursor-pointer group"
              >
                <span>{current.ctaText}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          {/* Slide Image Showcase (5 columns on desktop) */}
          <div className="lg:col-span-5 hidden sm:block">
            <div className="relative rounded-2xl overflow-hidden border-2 border-white/20 shadow-2xl bg-white/5 backdrop-blur-xs">
              <img
                src={current.image}
                alt={current.imageAlt}
                className="w-full h-64 sm:h-72 lg:h-80 object-cover transition-transform duration-700 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex items-end p-4">
                <span className="text-xs font-medium text-white/90">
                  {current.imageAlt}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Slider Left Arrow */}
      <button
        onClick={prevSlide}
        className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-black/30 hover:bg-black/50 text-white backdrop-blur-sm border border-white/20 flex items-center justify-center transition-all cursor-pointer z-10 opacity-80 hover:opacity-100 shadow-md"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      {/* Slider Right Arrow */}
      <button
        onClick={nextSlide}
        className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-black/30 hover:bg-black/50 text-white backdrop-blur-sm border border-white/20 flex items-center justify-center transition-all cursor-pointer z-10 opacity-80 hover:opacity-100 shadow-md"
        aria-label="Next slide"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Slider Pagination Dots (matching video layout) */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex items-center gap-2 z-10">
        {slides.map((slide, idx) => (
          <button
            key={slide.id}
            onClick={() => setCurrentSlide(idx)}
            className={`transition-all rounded-full cursor-pointer ${
              currentSlide === idx
                ? 'w-7 h-2.5 bg-white'
                : 'w-2.5 h-2.5 bg-white/40 hover:bg-white/70'
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </section>
  );
};
