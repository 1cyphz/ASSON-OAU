import React, { useState } from 'react';
import { X, Calendar, Clock, MapPin, CheckCircle2, ArrowRight } from 'lucide-react';
import { EventItem } from '../types';
import { formatDate } from '../utils/helpers';

interface EventModalProps {
  event: EventItem | null;
  onClose: () => void;
}

export const EventModal: React.FC<EventModalProps> = ({ event, onClose }) => {
  const [registered, setRegistered] = useState(false);

  if (!event) return null;

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="event-modal-title"
    >
      <div className="bg-white rounded-2xl max-w-2xl w-full shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header Image */}
        <div className="relative h-48 sm:h-56 bg-slate-900 overflow-hidden shrink-0">
          <img
            src={event.image || '/src/assets/images/hero_stats_conference_1793142127421.jpg'}
            alt={event.title}
            className="w-full h-full object-cover opacity-90"
            referrerPolicy="no-referrer"
          />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 bg-black/60 hover:bg-black text-white rounded-full transition-colors z-10 cursor-pointer"
            aria-label="Close event modal"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="absolute bottom-4 left-4">
            <span className="px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wider bg-[#1A759F] text-white">
              {event.category}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-5">
          <div>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-500 mb-2 font-medium">
              <span className="flex items-center gap-1.5 text-[#1A759F] font-semibold">
                <Calendar className="w-4 h-4 text-[#1A759F]" />
                {formatDate(event.date)}
              </span>
              <span>·</span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-slate-400" />
                {event.time}
              </span>
              <span>·</span>
              <span className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-slate-400" />
                {event.location}
              </span>
            </div>

            <h2
              id="event-modal-title"
              className="text-xl sm:text-2xl font-black text-[#1E293B]"
            >
              {event.title}
            </h2>
          </div>

          <div className="space-y-4 text-xs sm:text-sm text-slate-700 leading-relaxed whitespace-pre-line">
            <p>{event.description}</p>
          </div>

          {/* Speakers / Agenda if available */}
          {event.speakers && event.speakers.length > 0 && (
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-600 block">
                Confirmed Keynotes & Speakers
              </span>
              <ul className="space-y-1 text-xs text-slate-700">
                {event.speakers.map((spk, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#34A0A4]" />
                    <span>{spk}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Registration Box for upcoming events */}
          {event.status === 'upcoming' && (
            <div className="border border-[#1A759F]/30 bg-[#1A759F]/5 rounded-xl p-5 space-y-3">
              <span className="text-xs font-bold text-[#1A759F] uppercase tracking-wider block">
                Attendee Registration
              </span>
              <p className="text-xs text-slate-600">
                Secure your seat for this upcoming statistical event. Certificates of participation will be issued to all registered student delegates.
              </p>
              {registered ? (
                <div className="p-3 bg-emerald-100 text-emerald-800 rounded-lg text-xs font-bold flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                  <span>You have successfully secured a seat for this event!</span>
                </div>
              ) : (
                <button
                  onClick={() => setRegistered(true)}
                  className="px-5 py-2.5 bg-[#FF7A00] hover:bg-[#e66e00] text-white text-xs font-bold rounded-lg transition-colors inline-flex items-center gap-2 cursor-pointer shadow-xs"
                >
                  <span>Confirm Registration</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-100 bg-slate-50 flex items-center justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
          >
            Close Details
          </button>
        </div>
      </div>
    </div>
  );
};
