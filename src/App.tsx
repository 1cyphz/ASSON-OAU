import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomeView } from './views/HomeView';
import { AboutView } from './views/AboutView';
import { AcademicsView } from './views/AcademicsView';
import { QuizView } from './views/QuizView';
import { EditorialView } from './views/EditorialView';
import { EventsView } from './views/EventsView';
import { AlumniView } from './views/AlumniView';
import { ContactView } from './views/ContactView';
import { AdminView } from './views/AdminView';
import { NewsletterModal } from './components/NewsletterModal';
import { ArticleModal } from './components/ArticleModal';
import { EventModal } from './components/EventModal';
import { AdminLoginModal } from './components/AdminLoginModal';
import { useAssonData } from './services/assonStore';
import { STATISTICS_RESOURCES, NEWSLETTERS } from './data/assonData';
import { Article, Newsletter, EventItem } from './types';

const VALID_TABS = [
  'home',
  'about',
  'academics',
  'quiz',
  'editorial',
  'events',
  'alumni',
  'contact',
  'admin'
];

export default function App() {
  const [currentTab, setCurrentTab] = useState<string>('home');
  const [selectedNewsletter, setSelectedNewsletter] = useState<Newsletter | null>(null);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<EventItem | null>(null);
  const [showAdminLogin, setShowAdminLogin] = useState(false);

  const { events, articles, currentUser } = useAssonData();

  // Sync tab with URL hash or query param
  useEffect(() => {
    const handleLocationChange = () => {
      const hash = window.location.hash.replace('#', '').toLowerCase();
      const params = new URLSearchParams(window.location.search);
      const tabParam = params.get('tab');

      if (VALID_TABS.includes(hash)) {
        setCurrentTab(hash);
      } else if (hash === 'newsletter') {
        if (NEWSLETTERS.length > 0) {
          setSelectedNewsletter(NEWSLETTERS[0]);
        }
        setCurrentTab('home');
      } else if (tabParam && VALID_TABS.includes(tabParam)) {
        setCurrentTab(tabParam);
      }
    };

    handleLocationChange();
    window.addEventListener('hashchange', handleLocationChange);
    return () => window.removeEventListener('hashchange', handleLocationChange);
  }, []);

  const changeTab = (tab: string) => {
    setCurrentTab(tab);
    window.location.hash = tab === 'home' ? '' : tab;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F4F7F6] text-[#1E293B] selection:bg-[#1A759F]/20 selection:text-[#1A759F]">
      <Navbar
        currentTab={currentTab}
        onSelectTab={changeTab}
        onOpenAdminLogin={() => setShowAdminLogin(true)}
      />

      <main className="flex-1">
        {currentTab === 'home' && (
          <HomeView
            onNavigate={changeTab}
            newsletters={NEWSLETTERS}
            events={events}
            onOpenNewsletter={(nl) => setSelectedNewsletter(nl)}
            onOpenEventModal={(ev) => setSelectedEvent(ev)}
          />
        )}

        {currentTab === 'about' && <AboutView />}

        {currentTab === 'academics' && (
          <AcademicsView
            statResources={STATISTICS_RESOURCES}
            onNavigateToQuiz={() => changeTab('quiz')}
          />
        )}

        {currentTab === 'quiz' && <QuizView />}

        {currentTab === 'editorial' && (
          <EditorialView
            articles={articles}
            onOpenArticle={(art) => setSelectedArticle(art)}
          />
        )}

        {currentTab === 'events' && (
          <EventsView
            events={events}
            onOpenEventModal={(ev) => setSelectedEvent(ev)}
          />
        )}

        {currentTab === 'alumni' && <AlumniView />}

        {currentTab === 'contact' && <ContactView />}

        {currentTab === 'admin' && (
          <AdminView onNavigateHome={() => changeTab('home')} />
        )}
      </main>

      <Footer
        onSelectTab={changeTab}
        onOpenAdminLogin={() => setShowAdminLogin(true)}
      />

      {/* Global Modals */}
      <NewsletterModal
        newsletter={selectedNewsletter}
        onClose={() => setSelectedNewsletter(null)}
      />

      <ArticleModal
        article={selectedArticle}
        onClose={() => setSelectedArticle(null)}
      />

      <EventModal
        event={selectedEvent}
        onClose={() => setSelectedEvent(null)}
      />

      <AdminLoginModal
        isOpen={showAdminLogin}
        onClose={() => setShowAdminLogin(false)}
        onSuccess={() => changeTab('admin')}
      />
    </div>
  );
}
