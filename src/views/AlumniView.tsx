import React, { useState } from 'react';
import {
  GraduationCap,
  Search,
  Plus,
  CheckCircle2,
  X,
  User,
  Calendar
} from 'lucide-react';
import { AlumniRecord } from '../types';
import { useAssonData, assonStore } from '../services/assonStore';

export const AlumniView: React.FC = () => {
  const { alumni } = useAssonData();
  const [selectedYear, setSelectedYear] = useState<number | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);

  // Form state - strictly full name & graduation year per user instructions
  const [newName, setNewName] = useState('');
  const [newYear, setNewYear] = useState<number>(2024);
  const [successMessage, setSuccessMessage] = useState(false);
  const [formError, setFormError] = useState('');

  // Extract unique graduating years descending
  const years = Array.from(new Set(alumni.map((a) => a.gradYear))).sort((a, b) => b - a);

  // Filter alumni strictly by search query and year
  const filtered = alumni.filter((a) => {
    const matchesYear = selectedYear === 'all' || a.gradYear === selectedYear;
    const matchesSearch = a.name.toLowerCase().includes(searchQuery.trim().toLowerCase());
    return matchesYear && matchesSearch;
  });

  // Group by year
  const groupedByYear: Record<number, AlumniRecord[]> = {};
  filtered.forEach((item) => {
    if (!groupedByYear[item.gradYear]) {
      groupedByYear[item.gradYear] = [];
    }
    groupedByYear[item.gradYear].push(item);
  });

  const sortedGroupYears = Object.keys(groupedByYear)
    .map(Number)
    .sort((a, b) => b - a);

  const handleAddAlumnus = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) {
      setFormError('Please enter the full name of the alumnus.');
      return;
    }

    const newRecord: AlumniRecord = {
      id: `alm-${Date.now()}`,
      name: newName.trim(),
      gradYear: Number(newYear)
    };

    const updated = [newRecord, ...alumni];
    assonStore.saveAlumni(updated);

    setSuccessMessage(true);
    setTimeout(() => {
      setSuccessMessage(false);
      setShowAddModal(false);
      setNewName('');
      setFormError('');
    }, 1500);
  };

  return (
    <div className="space-y-12 sm:space-y-16 pb-20 bg-[#F4F7F6]">
      {/* Header */}
      <section className="bg-gradient-to-b from-[#1A759F]/10 via-[#F4F7F6] to-[#F4F7F6] py-14 sm:py-20 border-b border-slate-200 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-[#1A759F]">
            Department of Statistics Alumni Network
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-[#1E293B] tracking-tight">
            ASSON OAU Alumni Directory
          </h1>
          <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Celebrating the distinguished graduates of the Department of Statistics, Obafemi Awolowo University across all graduating sets.
          </p>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Controls: Search, Year Filters, Add Alumnus Button */}
        <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-6 shadow-xs flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          {/* Search Box */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search alumni by full name..."
              className="w-full pl-9 pr-4 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#1A759F]"
            />
          </div>

          {/* Year Filter Select */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-600 whitespace-nowrap">Filter Year:</span>
              <select
                value={selectedYear}
                onChange={(e) =>
                  setSelectedYear(
                    e.target.value === 'all' ? 'all' : Number(e.target.value)
                  )
                }
                className="py-2 px-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 focus:outline-none focus:border-[#1A759F] cursor-pointer"
              >
                <option value="all">All Graduating Years</option>
                {years.map((y) => (
                  <option key={y} value={y}>
                    Class of {y}
                  </option>
                ))}
              </select>
            </div>

            <button
              onClick={() => setShowAddModal(true)}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#FF7A00] hover:bg-[#e66e00] text-white text-xs font-bold rounded-xl transition-colors cursor-pointer shadow-xs whitespace-nowrap"
            >
              <Plus className="w-4 h-4" />
              <span>Add Alumni Name</span>
            </button>
          </div>
        </div>

        {/* Directory Count Indicator */}
        <div className="flex items-center justify-between text-xs text-slate-500 px-1">
          <span>
            Showing <strong className="text-slate-800">{filtered.length}</strong> alumni
            {selectedYear !== 'all' && ` from Class of ${selectedYear}`}
          </span>
          <span>{years.length} Graduating Sets Recorded</span>
        </div>

        {/* Alumni Lists Grouped Year by Year (Strictly Full Name Only) */}
        {sortedGroupYears.length > 0 ? (
          <div className="space-y-8">
            {sortedGroupYears.map((year) => {
              const names = groupedByYear[year];
              return (
                <div
                  key={year}
                  className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden"
                >
                  {/* Year Header Banner */}
                  <div className="bg-slate-50/80 px-6 py-4 border-b border-slate-200 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-[#1A759F]/10 text-[#1A759F] flex items-center justify-center font-bold text-xs">
                        {year}
                      </div>
                      <h2 className="text-base sm:text-lg font-extrabold text-[#1E293B]">
                        Class of {year}
                      </h2>
                    </div>
                    <span className="text-xs font-semibold text-slate-500">
                      {names.length} Alumn{names.length === 1 ? 'us' : 'i'}
                    </span>
                  </div>

                  {/* Strictly Full Name List */}
                  <div className="p-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                      {names.map((person) => (
                        <div
                          key={person.id}
                          className="p-3 rounded-xl border border-slate-100 hover:border-[#1A759F]/30 bg-white hover:bg-slate-50/70 transition-all flex items-center gap-2.5"
                        >
                          <div className="w-7 h-7 rounded-full bg-[#1A759F]/10 text-[#1A759F] flex items-center justify-center shrink-0">
                            <User className="w-3.5 h-3.5" />
                          </div>
                          <span className="text-xs sm:text-sm font-semibold text-[#1E293B] truncate">
                            {person.name}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center space-y-3">
            <GraduationCap className="w-10 h-10 text-slate-300 mx-auto" />
            <h3 className="text-base font-bold text-slate-900">
              No alumni found
            </h3>
            <p className="text-xs text-slate-500">
              No alumni records match "{searchQuery}" in the selected graduating year.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedYear('all');
              }}
              className="px-4 py-2 text-xs font-semibold text-[#1A759F] hover:bg-[#1A759F]/10 border border-[#1A759F]/30 rounded-lg cursor-pointer"
            >
              Reset Filter
            </button>
          </div>
        )}
      </div>

      {/* Add Alumnus Modal (Strictly Full Name and Year) */}
      {showAddModal && (
        <div
          className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-4"
          role="dialog"
        >
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-[#1A759F]" />
                <h3 className="text-base font-bold text-[#1E293B]">
                  Add Name to Alumni Directory
                </h3>
              </div>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {successMessage ? (
              <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Alumnus name successfully added to directory!</span>
              </div>
            ) : (
              <form onSubmit={handleAddAlumnus} className="space-y-4">
                {formError && (
                  <p className="text-xs text-red-600 bg-red-50 p-2.5 rounded-lg border border-red-200">
                    {formError}
                  </p>
                )}

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Full Name (Surname First or Full Legal Name)
                  </label>
                  <input
                    type="text"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    placeholder="e.g. Oluwaseun Alabi"
                    required
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs sm:text-sm focus:outline-none focus:border-[#1A759F]"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Graduating Year (Set)
                  </label>
                  <input
                    type="number"
                    min={1970}
                    max={2030}
                    value={newYear}
                    onChange={(e) => setNewYear(Number(e.target.value))}
                    required
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs sm:text-sm focus:outline-none focus:border-[#1A759F]"
                  />
                  <span className="text-[11px] text-slate-500 mt-1 block">
                    e.g. 2024, 2023, 2022, 2021...
                  </span>
                </div>

                <div className="pt-2 flex items-center justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="px-4 py-2 border border-slate-200 text-xs font-semibold text-slate-700 rounded-lg hover:bg-slate-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-[#FF7A00] hover:bg-[#e66e00] text-white text-xs font-bold rounded-lg transition-colors cursor-pointer shadow-xs"
                  >
                    Save Alumnus
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
