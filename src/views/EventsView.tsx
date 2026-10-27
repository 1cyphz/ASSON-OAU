import React, { useState } from 'react';
import {
  Calendar,
  Clock,
  MapPin,
  Camera,
  X,
  Upload,
  ArrowRight,
  FolderOpen,
  CheckCircle2,
  Image as ImageIcon
} from 'lucide-react';
import { EventItem, GalleryAlbum } from '../types';
import { formatDate } from '../utils/helpers';
import { useAssonData, assonStore } from '../services/assonStore';

interface EventsViewProps {
  events: EventItem[];
  onOpenEventModal: (event: EventItem) => void;
}

export const EventsView: React.FC<EventsViewProps> = ({
  events,
  onOpenEventModal
}) => {
  const { gallery } = useAssonData();
  const [selectedAlbum, setSelectedAlbum] = useState<GalleryAlbum | null>(null);
  const [activePhoto, setActivePhoto] = useState<{ url: string; caption: string } | null>(null);

  // Upload photo state
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [uploadData, setUploadData] = useState({
    albumId: gallery[0]?.id || '',
    caption: '',
    imageUrl: ''
  });
  const [uploadSuccess, setUploadSuccess] = useState(false);

  const upcomingEvents = events.filter((e) => e.status === 'upcoming');
  const pastEvents = events.filter((e) => e.status === 'completed');

  const handleUploadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!uploadData.imageUrl.trim() || !uploadData.caption.trim()) return;

    const updated = gallery.map((alb) => {
      if (alb.id === uploadData.albumId) {
        return {
          ...alb,
          images: [
            { url: uploadData.imageUrl, caption: uploadData.caption },
            ...alb.images
          ]
        };
      }
      return alb;
    });

    assonStore.saveGallery(updated);
    setUploadSuccess(true);
    setTimeout(() => {
      setUploadSuccess(false);
      setShowUploadModal(false);
      setUploadData({ albumId: gallery[0]?.id || '', caption: '', imageUrl: '' });
    }, 1500);
  };

  return (
    <div className="space-y-16 sm:space-y-20 pb-20 bg-[#F4F7F6]">
      {/* Header */}
      <section className="bg-gradient-to-b from-[#1A759F]/10 via-[#F4F7F6] to-[#F4F7F6] py-14 sm:py-20 border-b border-slate-200 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-[#1A759F]">
            Department of Statistics
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-[#1E293B] tracking-tight">
            Events & Visual Gallery
          </h1>
          <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Upcoming conferences, technical symposiums, and photo archives from our student community at Great Ife.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* 1. UPCOMING EVENTS IN LIST FORMAT WITH IMAGE AND DETAILS */}
        <section className="space-y-6">
          <div className="border-b border-slate-200 pb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-[#1A759F] block">
              Schedule & Registration
            </span>
            <h2 className="text-2xl font-extrabold text-[#1E293B] mt-1">
              Upcoming Events
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Check out our upcoming statistical workshops, conferences, and student competitions.
            </p>
          </div>

          <div className="space-y-4">
            {upcomingEvents.length > 0 ? (
              upcomingEvents.map((event) => (
                <div
                  key={event._id}
                  className="bg-white rounded-2xl border border-slate-200 hover:border-[#1A759F]/40 p-5 sm:p-7 transition-all shadow-xs hover:shadow-md flex flex-col md:flex-row items-start md:items-center gap-6"
                >
                  {/* Event Thumbnail */}
                  <div className="w-full md:w-64 h-44 md:h-40 rounded-xl overflow-hidden shrink-0 relative bg-slate-100">
                    <img
                      src={event.image || '/src/assets/images/hero_stats_conference_1793142127421.jpg'}
                      alt={event.title}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-2 left-2 px-2.5 py-0.5 bg-[#1E293B]/80 backdrop-blur-xs text-white text-[11px] font-bold rounded">
                      {event.category}
                    </div>
                  </div>

                  {/* Event Details Content */}
                  <div className="flex-1 space-y-2.5">
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
                <p className="text-sm text-slate-500">No upcoming events scheduled right now.</p>
              </div>
            )}
          </div>
        </section>

        {/* 2. GALLERY SECTION: PAST EVENTS IN CLICKABLE SECTIONS & UPLOAD */}
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between pb-4 border-b border-slate-200 gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#1A759F] block">
                Moments & Memories
              </span>
              <h2 className="text-2xl font-extrabold text-[#1E293B] mt-1">
                ASSON Gallery Albums
              </h2>
              <p className="text-xs sm:text-sm text-slate-500">
                Click into any album section below to view high-resolution event photographs.
              </p>
            </div>

            <button
              onClick={() => setShowUploadModal(true)}
              className="inline-flex items-center gap-2 px-4 py-2 bg-[#1A759F] hover:bg-[#13597a] text-white text-xs font-bold rounded-lg transition-colors shadow-xs cursor-pointer self-start sm:self-auto"
            >
              <Upload className="w-3.5 h-3.5" />
              <span>Upload Photo to Gallery</span>
            </button>
          </div>

          {/* Clickable Album Sections */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {gallery.map((album) => {
              const isSelected = selectedAlbum?.id === album.id;
              return (
                <div
                  key={album.id}
                  onClick={() => setSelectedAlbum(album)}
                  className={`bg-white rounded-2xl border overflow-hidden cursor-pointer transition-all shadow-xs group ${
                    isSelected
                      ? 'border-[#1A759F] ring-2 ring-[#1A759F]/20 shadow-md'
                      : 'border-slate-200 hover:border-slate-300 hover:shadow-md'
                  }`}
                >
                  <div className="h-44 relative bg-slate-100 overflow-hidden">
                    <img
                      src={album.coverImage}
                      alt={album.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex items-end p-4">
                      <div>
                        <span className="text-[10px] uppercase font-bold text-[#34A0A4] block">
                          {album.category} · {album.date}
                        </span>
                        <h4 className="text-sm font-bold text-white line-clamp-1">
                          {album.title}
                        </h4>
                      </div>
                    </div>
                    <div className="absolute top-2 right-2 px-2 py-0.5 rounded bg-black/60 text-white text-[11px] font-mono">
                      {album.images.length} photos
                    </div>
                  </div>
                  <div className="p-3 text-center bg-slate-50 border-t border-slate-100 text-xs font-semibold text-[#1A759F]">
                    Click to Open Album
                  </div>
                </div>
              );
            })}
          </div>

          {/* Album Photos View */}
          {selectedAlbum && (
            <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-sm animate-fadeIn">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div>
                  <span className="text-xs font-bold text-[#1A759F] uppercase tracking-wider block">
                    Album Section
                  </span>
                  <h3 className="text-xl font-bold text-[#1E293B]">
                    {selectedAlbum.title} ({selectedAlbum.date})
                  </h3>
                </div>
                <button
                  onClick={() => setSelectedAlbum(null)}
                  className="text-xs font-semibold text-slate-500 hover:text-slate-800 p-1 cursor-pointer"
                >
                  Close Album View
                </button>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {selectedAlbum.images.map((img, idx) => (
                  <div
                    key={idx}
                    onClick={() => setActivePhoto(img)}
                    className="relative group rounded-xl overflow-hidden aspect-4/3 bg-slate-100 cursor-pointer border border-slate-200"
                  >
                    <img
                      src={img.url}
                      alt={img.caption}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-2.5">
                      <p className="text-[11px] text-white font-medium line-clamp-2">
                        {img.caption}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>

        {/* 3. PAST FIXTURES & EVENTS */}
        <section className="space-y-6">
          <div className="border-b border-slate-200 pb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
              Archives
            </span>
            <h2 className="text-xl font-bold text-[#1E293B] mt-1">
              Concluded Events
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {pastEvents.map((event) => (
              <div
                key={event._id}
                className="bg-white rounded-xl border border-slate-200 p-5 space-y-3 shadow-xs hover:shadow-md transition-shadow"
              >
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span className="font-semibold text-slate-700">{event.category}</span>
                  <span>{formatDate(event.date)}</span>
                </div>
                <h4 className="text-base font-bold text-[#1E293B]">
                  {event.title}
                </h4>
                <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                  {event.description}
                </p>
                <button
                  onClick={() => onOpenEventModal(event)}
                  className="text-xs font-bold text-[#1A759F] hover:text-[#13597a] inline-flex items-center gap-1 cursor-pointer pt-1"
                >
                  <span>Review Event Recap</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Lightbox Photo Modal */}
      {activePhoto && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setActivePhoto(null)}
        >
          <div
            className="max-w-4xl max-h-[90vh] bg-slate-900 rounded-2xl overflow-hidden flex flex-col relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActivePhoto(null)}
              className="absolute top-4 right-4 text-white bg-black/60 hover:bg-black/90 rounded-full p-2 z-10 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="flex-1 overflow-hidden flex items-center justify-center bg-black">
              <img
                src={activePhoto.url}
                alt={activePhoto.caption}
                className="max-h-[75vh] w-auto object-contain"
              />
            </div>
            <div className="p-4 bg-slate-900 text-white text-xs sm:text-sm font-medium">
              {activePhoto.caption}
            </div>
          </div>
        </div>
      )}

      {/* Upload Photo Modal */}
      {showUploadModal && (
        <div
          className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-4"
          role="dialog"
        >
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Upload className="w-4 h-4 text-[#1A759F]" />
                <h3 className="text-base font-bold text-[#1E293B]">
                  Upload Photo to Gallery
                </h3>
              </div>
              <button
                onClick={() => setShowUploadModal(false)}
                className="text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {uploadSuccess ? (
              <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Photo successfully uploaded to gallery album!</span>
              </div>
            ) : (
              <form onSubmit={handleUploadSubmit} className="space-y-3">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Select Target Album
                  </label>
                  <select
                    value={uploadData.albumId}
                    onChange={(e) =>
                      setUploadData({ ...uploadData, albumId: e.target.value })
                    }
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:outline-none focus:border-[#1A759F]"
                  >
                    {gallery.map((alb) => (
                      <option key={alb.id} value={alb.id}>
                        {alb.title} ({alb.category})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Image URL or Hosted Path
                  </label>
                  <input
                    type="url"
                    value={uploadData.imageUrl}
                    onChange={(e) =>
                      setUploadData({ ...uploadData, imageUrl: e.target.value })
                    }
                    placeholder="https://... or /src/assets/images/..."
                    required
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:outline-none focus:border-[#1A759F]"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Photo Caption & Event Note
                  </label>
                  <textarea
                    rows={2}
                    value={uploadData.caption}
                    onChange={(e) =>
                      setUploadData({ ...uploadData, caption: e.target.value })
                    }
                    placeholder="e.g. Statistical delegates attending the symposium opening session..."
                    required
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:outline-none focus:border-[#1A759F]"
                  />
                </div>

                <div className="pt-2 flex items-center justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setShowUploadModal(false)}
                    className="px-4 py-2 border border-slate-200 text-xs font-semibold text-slate-700 rounded-lg hover:bg-slate-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-[#1A759F] hover:bg-[#13597a] text-white text-xs font-bold rounded-lg transition-colors cursor-pointer"
                  >
                    Upload Photo
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
