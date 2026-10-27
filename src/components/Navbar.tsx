import React, { useState } from 'react';
import { Menu, X, Shield, UserCheck } from 'lucide-react';
import { AssonLogo } from './AssonLogo';
import { useAssonData, assonStore } from '../services/assonStore';

interface NavbarProps {
  currentTab: string;
  onSelectTab: (tab: string) => void;
  onOpenAdminLogin: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentTab, onSelectTab, onOpenAdminLogin }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { currentUser } = useAssonData();

  // Navigation Links aligned to the right-hand side (no Statistics Hub button)
  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About Us' },
    { id: 'academics', label: 'Academics' },
    { id: 'quiz', label: 'Quiz' },
    { id: 'editorial', label: 'Editorial' },
    { id: 'events', label: 'Events & Gallery' },
    { id: 'alumni', label: 'Alumni' },
    { id: 'contact', label: 'Contact Us' }
  ];

  const handleNav = (tabId: string) => {
    onSelectTab(tabId);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-6">
          {/* Brand Emblem & Title on the Left */}
          <button
            onClick={() => handleNav('home')}
            className="flex items-center gap-3 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1A759F] rounded-lg cursor-pointer"
          >
            <AssonLogo size={42} showText={true} />
          </button>

          {/* Right-Aligned Navigation Menu */}
          <div className="hidden lg:flex items-center gap-6 xl:gap-7 ml-auto">
            <nav className="flex items-center gap-6 xl:gap-7 text-sm font-medium">
              {navLinks.map((link) => {
                const isActive = currentTab === link.id;
                return (
                  <button
                    key={link.id}
                    onClick={() => handleNav(link.id)}
                    className={`whitespace-nowrap transition-colors py-1 relative cursor-pointer ${
                      isActive
                        ? 'text-[#1A759F] font-bold'
                        : 'text-slate-600 hover:text-[#1A759F]'
                    }`}
                  >
                    {link.label}
                    {isActive && (
                      <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#1A759F] rounded-full" />
                    )}
                  </button>
                );
              })}
            </nav>

            {/* Admin Portal Trigger */}
            <div className="pl-2 border-l border-slate-200 flex items-center">
              {currentUser ? (
                <button
                  onClick={() => handleNav('admin')}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-md bg-[#1A759F]/10 text-[#1A759F] hover:bg-[#1A759F]/20 transition-colors cursor-pointer"
                  title={`Logged in as ${currentUser.name} (${currentUser.roleName})`}
                >
                  <UserCheck className="w-3.5 h-3.5" />
                  <span className="hidden xl:inline">Portal:</span> {currentUser.roleName.split(' ')[0]}
                </button>
              ) : (
                <button
                  onClick={onOpenAdminLogin}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md text-slate-600 hover:text-[#1A759F] hover:bg-slate-100 transition-colors cursor-pointer"
                  title="Admin Portal Login"
                >
                  <Shield className="w-3.5 h-3.5" />
                  <span>Admin</span>
                </button>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center gap-2">
            {currentUser && (
              <button
                onClick={() => handleNav('admin')}
                className="p-1.5 text-xs font-semibold rounded bg-[#1A759F]/10 text-[#1A759F]"
              >
                Portal
              </button>
            )}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-[#1A759F] cursor-pointer"
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-6 space-y-1 shadow-lg">
          {navLinks.map((link) => {
            const isActive = currentTab === link.id;
            return (
              <button
                key={link.id}
                onClick={() => handleNav(link.id)}
                className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                  isActive
                    ? 'bg-[#1A759F]/10 text-[#1A759F] font-bold'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                {link.label}
              </button>
            );
          })}
          <div className="pt-3 border-t border-slate-100">
            {currentUser ? (
              <button
                onClick={() => handleNav('admin')}
                className="w-full py-2.5 px-4 text-center text-sm font-semibold text-white bg-[#1A759F] rounded-lg hover:bg-[#165a7d] transition-colors cursor-pointer"
              >
                Go to Admin Dashboard ({currentUser.name})
              </button>
            ) : (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAdminLogin();
                }}
                className="w-full py-2.5 px-4 text-center text-sm font-medium text-slate-700 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer"
              >
                Admin & Executive Login
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
