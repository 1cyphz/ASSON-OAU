import React, { useState } from 'react';
import {
  Shield,
  Users,
  Calendar,
  BookOpen,
  GraduationCap,
  HelpCircle,
  Image as ImageIcon,
  Plus,
  Trash2,
  Edit,
  CheckCircle2,
  LogOut,
  Key,
  Lock,
  Layers,
  ArrowRight,
  AlertCircle
} from 'lucide-react';
import { useAssonData, assonStore } from '../services/assonStore';
import { Role, AdminUser, EventItem, Article, AlumniRecord, CourseQuiz } from '../types';

interface AdminViewProps {
  onNavigateHome: () => void;
}

export const AdminView: React.FC<AdminViewProps> = ({ onNavigateHome }) => {
  const {
    events,
    articles,
    alumni,
    quizzes,
    gallery,
    roles,
    adminUsers,
    currentUser,
    refresh
  } = useAssonData();

  const [activeTab, setActiveTab] = useState<'roles' | 'events' | 'articles' | 'alumni' | 'quizzes'>('roles');

  // Role creation form modal
  const [showRoleModal, setShowRoleModal] = useState(false);
  const [newRoleName, setNewRoleName] = useState('');
  const [newRoleDesc, setNewRoleDesc] = useState('');
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>([
    'manage_events',
    'manage_articles'
  ]);

  // User creation form modal
  const [showUserModal, setShowUserModal] = useState(false);
  const [newUserName, setNewUserName] = useState('');
  const [newUserEmail, setNewUserEmail] = useState('');
  const [newUserRoleId, setNewUserRoleId] = useState(roles[0]?.id || 'role-superadmin');

  // Event modal
  const [showEventModal, setShowEventModal] = useState(false);
  const [eventFormData, setEventFormData] = useState<Partial<EventItem>>({
    title: '',
    category: 'Workshop',
    date: new Date().toISOString().split('T')[0],
    time: '10:00 AM WAT',
    location: 'Department of Statistics, OAU',
    description: '',
    image: '/src/assets/images/hero_stats_conference_1793142127421.jpg',
    status: 'upcoming'
  });

  // Article modal
  const [showArticleModal, setShowArticleModal] = useState(false);
  const [articleFormData, setArticleFormData] = useState<Partial<Article>>({
    title: '',
    category: 'Statistics & Data Science',
    author: currentUser?.name || 'ASSON Editorial Member',
    excerpt: '',
    content: '',
    featuredImage: '/src/assets/images/article_data_science_1793142128872.jpg',
    readTime: '5 min read'
  });

  // Quiz question modal
  const [showQuizModal, setShowQuizModal] = useState(false);
  const [selectedCourseCode, setSelectedCourseCode] = useState(quizzes[0]?.courseCode || 'STA 101');
  const [newQuestionText, setNewQuestionText] = useState('');
  const [optA, setOptA] = useState('');
  const [optB, setOptB] = useState('');
  const [optC, setOptC] = useState('');
  const [optD, setOptD] = useState('');
  const [correctOptIndex, setCorrectOptIndex] = useState(0);
  const [questionExplanation, setQuestionExplanation] = useState('');

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const allAvailablePermissions = [
    { key: 'manage_events', label: 'Manage & Publish Events' },
    { key: 'manage_articles', label: 'Manage Editorial Articles' },
    { key: 'manage_alumni', label: 'Manage Alumni Directory' },
    { key: 'manage_quizzes', label: 'Manage Course Practice Quizzes' },
    { key: 'manage_gallery', label: 'Manage & Upload Gallery Media' },
    { key: 'manage_roles', label: 'Create & Manage Roles' },
    { key: 'manage_users', label: 'Manage Admin Users & Assignments' }
  ];

  const handleTogglePermission = (key: string) => {
    if (selectedPermissions.includes(key)) {
      setSelectedPermissions(selectedPermissions.filter((p) => p !== key));
    } else {
      setSelectedPermissions([...selectedPermissions, key]);
    }
  };

  const handleCreateRole = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newRoleName.trim()) return;

    const newRole: Role = {
      id: `role-${Date.now()}`,
      name: newRoleName.trim(),
      description: newRoleDesc.trim() || 'Custom administrative role for ASSON OAU.',
      permissions: selectedPermissions
    };

    const updatedRoles = [...roles, newRole];
    assonStore.saveRoles(updatedRoles);
    setShowRoleModal(false);
    setNewRoleName('');
    setNewRoleDesc('');
    showToast(`Role "${newRole.name}" created successfully!`);
  };

  const handleDeleteRole = (roleId: string) => {
    if (roleId === 'role-superadmin') {
      alert('The Super Admin role cannot be deleted.');
      return;
    }
    const updated = roles.filter((r) => r.id !== roleId);
    assonStore.saveRoles(updated);
    showToast('Role deleted successfully.');
  };

  const handleCreateUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUserName.trim() || !newUserEmail.trim()) return;

    const roleObj = roles.find((r) => r.id === newUserRoleId);
    const newUser: AdminUser = {
      id: `user-${Date.now()}`,
      name: newUserName.trim(),
      email: newUserEmail.trim(),
      roleId: newUserRoleId,
      roleName: roleObj ? roleObj.name : 'Executive Member'
    };

    const updatedUsers = [...adminUsers, newUser];
    assonStore.saveAdminUsers(updatedUsers);
    setShowUserModal(false);
    setNewUserName('');
    setNewUserEmail('');
    showToast(`User ${newUser.name} assigned to role ${newUser.roleName}.`);
  };

  const handleSaveEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!eventFormData.title?.trim()) return;

    const newEvent: EventItem = {
      _id: `ev-${Date.now()}`,
      title: eventFormData.title.trim(),
      category: eventFormData.category || 'Workshop',
      date: eventFormData.date || new Date().toISOString().split('T')[0],
      time: eventFormData.time || '10:00 AM WAT',
      location: eventFormData.location || 'Department of Statistics, OAU',
      description: eventFormData.description || '',
      image: eventFormData.image || '/src/assets/images/hero_stats_conference_1793142127421.jpg',
      status: (eventFormData.status as 'upcoming' | 'completed') || 'upcoming',
      gallery: [eventFormData.image || '/src/assets/images/hero_stats_conference_1793142127421.jpg']
    };

    const updated = [newEvent, ...events];
    assonStore.saveEvents(updated);
    setShowEventModal(false);
    showToast(`Event "${newEvent.title}" published!`);
  };

  const handleDeleteEvent = (id: string) => {
    const updated = events.filter((e) => e._id !== id);
    assonStore.saveEvents(updated);
    showToast('Event deleted.');
  };

  const handleSaveArticle = (e: React.FormEvent) => {
    e.preventDefault();
    if (!articleFormData.title?.trim() || !articleFormData.content?.trim()) return;

    const newArt: Article = {
      _id: `art-${Date.now()}`,
      title: articleFormData.title.trim(),
      slug: articleFormData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      author: articleFormData.author || currentUser?.name || 'ASSON Member',
      authorRole: 'Editorial Officer',
      category: articleFormData.category || 'Statistics & Data Science',
      publishDate: new Date().toISOString().split('T')[0],
      readTime: articleFormData.readTime || '5 min read',
      excerpt: articleFormData.excerpt || articleFormData.content.substring(0, 160) + '...',
      content: articleFormData.content,
      featuredImage: articleFormData.featuredImage || '/src/assets/images/article_data_science_1793142128872.jpg',
      likes: 0,
      views: 1
    };

    const updated = [newArt, ...articles];
    assonStore.saveArticles(updated);
    setShowArticleModal(false);
    showToast(`Article "${newArt.title}" published!`);
  };

  const handleDeleteArticle = (id: string) => {
    const updated = articles.filter((a) => a._id !== id);
    assonStore.saveArticles(updated);
    showToast('Article removed.');
  };

  const handleAddQuizQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newQuestionText.trim() || !optA.trim() || !optB.trim()) return;

    const options = [optA.trim(), optB.trim()];
    if (optC.trim()) options.push(optC.trim());
    if (optD.trim()) options.push(optD.trim());

    const updatedQuizzes = quizzes.map((qz) => {
      if (qz.courseCode === selectedCourseCode) {
        return {
          ...qz,
          questions: [
            ...qz.questions,
            {
              id: `q-${Date.now()}`,
              question: newQuestionText.trim(),
              options,
              correctAnswer: correctOptIndex,
              explanation: questionExplanation.trim() || 'Correct answer verified by ASSON Academic Board.'
            }
          ]
        };
      }
      return qz;
    });

    assonStore.saveQuizzes(updatedQuizzes);
    setShowQuizModal(false);
    setNewQuestionText('');
    setOptA('');
    setOptB('');
    setOptC('');
    setOptD('');
    setQuestionExplanation('');
    showToast(`Question added to ${selectedCourseCode}!`);
  };

  const handleDeleteAlumni = (id: string) => {
    const updated = alumni.filter((a) => a.id !== id);
    assonStore.saveAlumni(updated);
    showToast('Alumni record deleted.');
  };

  return (
    <div className="min-h-screen bg-[#F4F7F6] pb-24">
      {/* Top Admin Header */}
      <div className="bg-[#1E293B] text-white border-b border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#1A759F] text-white flex items-center justify-center font-bold">
                <Shield className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#34A0A4]">
                  Administration & Governance Portal
                </span>
                <h1 className="text-xl sm:text-2xl font-black">
                  ASSON OAU Management Suite
                </h1>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {currentUser && (
                <div className="text-right hidden md:block">
                  <span className="text-xs font-bold text-white block">
                    {currentUser.name}
                  </span>
                  <span className="text-[11px] text-[#34A0A4] font-medium">
                    {currentUser.roleName}
                  </span>
                </div>
              )}
              <button
                onClick={() => {
                  assonStore.logout();
                  showToast('Logged out.');
                  onNavigateHome();
                }}
                className="px-3.5 py-1.5 bg-slate-800 hover:bg-slate-700 border border-slate-600 rounded-lg text-xs font-semibold text-slate-300 hover:text-white inline-flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-slate-700/60 flex items-center gap-2 overflow-x-auto py-2">
          <button
            onClick={() => setActiveTab('roles')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-colors cursor-pointer inline-flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'roles'
                ? 'bg-[#1A759F] text-white'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Shield className="w-4 h-4" />
            <span>Roles & Permissions ({roles.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('events')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-colors cursor-pointer inline-flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'events'
                ? 'bg-[#1A759F] text-white'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Calendar className="w-4 h-4" />
            <span>Manage Events ({events.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('articles')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-colors cursor-pointer inline-flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'articles'
                ? 'bg-[#1A759F] text-white'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Editorial Articles ({articles.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('alumni')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-colors cursor-pointer inline-flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'alumni'
                ? 'bg-[#1A759F] text-white'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <GraduationCap className="w-4 h-4" />
            <span>Alumni Records ({alumni.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('quizzes')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-colors cursor-pointer inline-flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'quizzes'
                ? 'bg-[#1A759F] text-white'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <HelpCircle className="w-4 h-4" />
            <span>Course Quizzes ({quizzes.length})</span>
          </button>
        </div>
      </div>

      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#1E293B] text-white px-5 py-3 rounded-xl shadow-xl border border-slate-700 flex items-center gap-2 text-xs font-bold animate-fadeIn">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Tab Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* ================= ROLES & USER MANAGEMENT TAB ================= */}
        {activeTab === 'roles' && (
          <div className="space-y-8 animate-fadeIn">
            {/* Header + Add Buttons */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
              <div>
                <h2 className="text-xl font-bold text-[#1E293B]">
                  Role-Based Access Control (RBAC)
                </h2>
                <p className="text-xs text-slate-500">
                  Create roles, customize administrative permissions, and assign departmental executive officers.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowRoleModal(true)}
                  className="px-4 py-2 bg-[#FF7A00] hover:bg-[#e66e00] text-white text-xs font-bold rounded-lg transition-colors inline-flex items-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <Plus className="w-4 h-4" />
                  <span>Create Other Role</span>
                </button>
                <button
                  onClick={() => setShowUserModal(true)}
                  className="px-4 py-2 bg-[#1A759F] hover:bg-[#13597a] text-white text-xs font-bold rounded-lg transition-colors inline-flex items-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <Users className="w-4 h-4" />
                  <span>Add Admin User</span>
                </button>
              </div>
            </div>

            {/* Roles Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {roles.map((role) => (
                <div
                  key={role.id}
                  className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-extrabold text-[#1A759F] uppercase tracking-wider">
                        Role
                      </span>
                      {role.id !== 'role-superadmin' && (
                        <button
                          onClick={() => handleDeleteRole(role.id)}
                          className="text-slate-400 hover:text-red-600 transition-colors cursor-pointer"
                          title="Delete role"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                    <h3 className="text-lg font-bold text-[#1E293B]">{role.name}</h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {role.description}
                    </p>
                  </div>

                  {/* Permissions List */}
                  <div className="pt-2 border-t border-slate-100 space-y-1.5">
                    <span className="text-[11px] font-bold uppercase text-slate-400 block">
                      Assigned Permissions:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {role.permissions.map((perm) => (
                        <span
                          key={perm}
                          className="px-2 py-0.5 bg-slate-100 text-slate-700 text-[10px] font-mono rounded"
                        >
                          {perm.replace('manage_', '')}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Assigned Users Table */}
            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
              <div className="p-5 border-b border-slate-100 flex items-center justify-between">
                <h3 className="text-base font-bold text-[#1E293B]">
                  Administrative Team & Assigned Roles
                </h3>
                <span className="text-xs text-slate-500 font-medium">
                  {adminUsers.length} Users Assigned
                </span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold uppercase tracking-wider">
                    <tr>
                      <th className="px-6 py-3">Full Name</th>
                      <th className="px-6 py-3">Email Address</th>
                      <th className="px-6 py-3">Assigned Role</th>
                      <th className="px-6 py-3">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {adminUsers.map((user) => (
                      <tr key={user.id} className="hover:bg-slate-50/70">
                        <td className="px-6 py-3.5 font-bold text-slate-900">
                          {user.name}
                        </td>
                        <td className="px-6 py-3.5 text-slate-600 font-mono">
                          {user.email}
                        </td>
                        <td className="px-6 py-3.5">
                          <span className="px-2.5 py-1 bg-[#1A759F]/10 text-[#1A759F] rounded font-bold">
                            {user.roleName}
                          </span>
                        </td>
                        <td className="px-6 py-3.5">
                          {user.id !== 'user-1' ? (
                            <button
                              onClick={() => {
                                const updated = adminUsers.filter((u) => u.id !== user.id);
                                assonStore.saveAdminUsers(updated);
                                showToast(`User ${user.name} removed.`);
                              }}
                              className="text-red-500 hover:text-red-700 cursor-pointer"
                            >
                              Remove
                            </button>
                          ) : (
                            <span className="text-slate-400 italic">Primary Admin</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ================= EVENTS TAB ================= */}
        {activeTab === 'events' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="flex items-center justify-between pb-4 border-b border-slate-200">
              <div>
                <h2 className="text-xl font-bold text-[#1E293B]">Manage Departmental Events</h2>
                <p className="text-xs text-slate-500">Add, edit, or remove symposiums, workshops, and fixtures.</p>
              </div>
              <button
                onClick={() => setShowEventModal(true)}
                className="px-4 py-2 bg-[#FF7A00] hover:bg-[#e66e00] text-white text-xs font-bold rounded-lg transition-colors inline-flex items-center gap-1.5 cursor-pointer shadow-xs"
              >
                <Plus className="w-4 h-4" />
                <span>Add Event</span>
              </button>
            </div>

            <div className="space-y-4">
              {events.map((ev) => (
                <div
                  key={ev._id}
                  className="bg-white rounded-xl border border-slate-200 p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-xs"
                >
                  <div className="space-y-1">
                    <span className="text-[11px] font-bold uppercase text-[#1A759F]">
                      {ev.category} · {ev.date}
                    </span>
                    <h3 className="text-base font-bold text-[#1E293B]">{ev.title}</h3>
                    <p className="text-xs text-slate-500 line-clamp-1">{ev.location} · {ev.description}</p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => handleDeleteEvent(ev._id)}
                      className="p-2 text-slate-400 hover:text-red-600 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
                      title="Delete event"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ================= ARTICLES TAB ================= */}
        {activeTab === 'articles' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="flex items-center justify-between pb-4 border-b border-slate-200">
              <div>
                <h2 className="text-xl font-bold text-[#1E293B]">Manage Editorial Publications</h2>
                <p className="text-xs text-slate-500">Publish articles with research findings and images.</p>
              </div>
              <button
                onClick={() => setShowArticleModal(true)}
                className="px-4 py-2 bg-[#FF7A00] hover:bg-[#e66e00] text-white text-xs font-bold rounded-lg transition-colors inline-flex items-center gap-1.5 cursor-pointer shadow-xs"
              >
                <Plus className="w-4 h-4" />
                <span>Publish New Article</span>
              </button>
            </div>

            <div className="space-y-4">
              {articles.map((art) => (
                <div
                  key={art._id}
                  className="bg-white rounded-xl border border-slate-200 p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-xs"
                >
                  <div className="space-y-1">
                    <span className="text-[11px] font-bold uppercase text-[#1A759F]">
                      {art.category} · by {art.author}
                    </span>
                    <h3 className="text-base font-bold text-[#1E293B]">{art.title}</h3>
                    <p className="text-xs text-slate-500 line-clamp-1">{art.excerpt}</p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => handleDeleteArticle(art._id)}
                      className="p-2 text-slate-400 hover:text-red-600 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
                      title="Delete article"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ================= ALUMNI TAB ================= */}
        {activeTab === 'alumni' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="flex items-center justify-between pb-4 border-b border-slate-200">
              <div>
                <h2 className="text-xl font-bold text-[#1E293B]">Manage Alumni Directory</h2>
                <p className="text-xs text-slate-500">Records strictly store full name and graduating year set.</p>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 border-b border-slate-200 font-bold uppercase tracking-wider text-slate-600">
                  <tr>
                    <th className="px-6 py-3">Full Name</th>
                    <th className="px-6 py-3">Graduating Set</th>
                    <th className="px-6 py-3">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {alumni.map((alum) => (
                    <tr key={alum.id} className="hover:bg-slate-50/70">
                      <td className="px-6 py-3 font-semibold text-slate-900">{alum.name}</td>
                      <td className="px-6 py-3 font-mono text-slate-600">Class of {alum.gradYear}</td>
                      <td className="px-6 py-3">
                        <button
                          onClick={() => handleDeleteAlumni(alum.id)}
                          className="text-red-500 hover:text-red-700 cursor-pointer font-bold"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ================= QUIZZES TAB ================= */}
        {activeTab === 'quizzes' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="flex items-center justify-between pb-4 border-b border-slate-200">
              <div>
                <h2 className="text-xl font-bold text-[#1E293B]">Manage Course Quizzes</h2>
                <p className="text-xs text-slate-500">Add questions and statistical explanations for students.</p>
              </div>
              <button
                onClick={() => setShowQuizModal(true)}
                className="px-4 py-2 bg-[#FF7A00] hover:bg-[#e66e00] text-white text-xs font-bold rounded-lg transition-colors inline-flex items-center gap-1.5 cursor-pointer shadow-xs"
              >
                <Plus className="w-4 h-4" />
                <span>Add Question</span>
              </button>
            </div>

            <div className="space-y-6">
              {quizzes.map((quiz) => (
                <div key={quiz.courseCode} className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4 shadow-xs">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <div>
                      <span className="text-xs font-bold text-[#1A759F] uppercase">{quiz.level}</span>
                      <h3 className="text-lg font-bold text-[#1E293B]">{quiz.courseCode}: {quiz.title}</h3>
                    </div>
                    <span className="text-xs font-semibold text-slate-500">
                      {quiz.questions.length} Questions
                    </span>
                  </div>

                  <div className="space-y-3">
                    {quiz.questions.map((q, qIdx) => (
                      <div key={q.id} className="p-3 bg-slate-50 rounded-lg text-xs space-y-1">
                        <span className="font-bold text-slate-700">Q{qIdx + 1}: {q.question}</span>
                        <p className="text-slate-500 italic">Correct: {q.options[q.correctAnswer]} ({q.explanation})</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* CREATE ROLE MODAL */}
      {showRoleModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <h3 className="text-base font-bold text-[#1E293B]">Create Other Role</h3>
            <form onSubmit={handleCreateRole} className="space-y-3">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Role Title / Name</label>
                <input
                  type="text"
                  value={newRoleName}
                  onChange={(e) => setNewRoleName(e.target.value)}
                  placeholder="e.g. Welfare & Tutorial Secretary"
                  required
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:outline-none focus:border-[#1A759F]"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Role Description</label>
                <textarea
                  rows={2}
                  value={newRoleDesc}
                  onChange={(e) => setNewRoleDesc(e.target.value)}
                  placeholder="Responsibilities and executive duties..."
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:outline-none focus:border-[#1A759F]"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-2">Granular Permissions</label>
                <div className="space-y-1.5 max-h-48 overflow-y-auto p-2 bg-slate-50 rounded-lg border border-slate-200">
                  {allAvailablePermissions.map((perm) => (
                    <label key={perm.key} className="flex items-center gap-2 text-xs text-slate-700 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedPermissions.includes(perm.key)}
                        onChange={() => handleTogglePermission(perm.key)}
                        className="rounded text-[#1A759F] focus:ring-[#1A759F]"
                      />
                      <span>{perm.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="pt-3 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowRoleModal(false)}
                  className="px-4 py-2 border border-slate-200 text-xs font-semibold text-slate-700 rounded-lg hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#FF7A00] hover:bg-[#e66e00] text-white text-xs font-bold rounded-lg transition-colors cursor-pointer shadow-xs"
                >
                  Save Role
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ADD ADMIN USER MODAL */}
      {showUserModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <h3 className="text-base font-bold text-[#1E293B]">Assign Admin User to Role</h3>
            <form onSubmit={handleCreateUser} className="space-y-3">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">User Full Name</label>
                <input
                  type="text"
                  value={newUserName}
                  onChange={(e) => setNewUserName(e.target.value)}
                  placeholder="e.g. Qazeem Anuoluwapo"
                  required
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:outline-none focus:border-[#1A759F]"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Email Address</label>
                <input
                  type="email"
                  value={newUserEmail}
                  onChange={(e) => setNewUserEmail(e.target.value)}
                  placeholder="e.g. vp@asson-oau.org"
                  required
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:outline-none focus:border-[#1A759F]"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Assign Role</label>
                <select
                  value={newUserRoleId}
                  onChange={(e) => setNewUserRoleId(e.target.value)}
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:outline-none focus:border-[#1A759F]"
                >
                  {roles.map((r) => (
                    <option key={r.id} value={r.id}>{r.name}</option>
                  ))}
                </select>
              </div>

              <div className="pt-3 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowUserModal(false)}
                  className="px-4 py-2 border border-slate-200 text-xs font-semibold text-slate-700 rounded-lg hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#1A759F] hover:bg-[#13597a] text-white text-xs font-bold rounded-lg transition-colors cursor-pointer shadow-xs"
                >
                  Assign Role
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ADD EVENT MODAL */}
      {showEventModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <h3 className="text-base font-bold text-[#1E293B]">Publish New Event</h3>
            <form onSubmit={handleSaveEvent} className="space-y-3">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Event Title</label>
                <input
                  type="text"
                  value={eventFormData.title}
                  onChange={(e) => setEventFormData({ ...eventFormData, title: e.target.value })}
                  placeholder="e.g. Statistical Machine Learning Masterclass"
                  required
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:outline-none focus:border-[#1A759F]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Date</label>
                  <input
                    type="date"
                    value={eventFormData.date}
                    onChange={(e) => setEventFormData({ ...eventFormData, date: e.target.value })}
                    required
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:outline-none focus:border-[#1A759F]"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Time</label>
                  <input
                    type="text"
                    value={eventFormData.time}
                    onChange={(e) => setEventFormData({ ...eventFormData, time: e.target.value })}
                    placeholder="10:00 AM WAT"
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:outline-none focus:border-[#1A759F]"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Venue / Location</label>
                <input
                  type="text"
                  value={eventFormData.location}
                  onChange={(e) => setEventFormData({ ...eventFormData, location: e.target.value })}
                  placeholder="Department of Statistics Lab, OAU"
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:outline-none focus:border-[#1A759F]"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Description</label>
                <textarea
                  rows={3}
                  value={eventFormData.description}
                  onChange={(e) => setEventFormData({ ...eventFormData, description: e.target.value })}
                  placeholder="Event agenda and keynote overview..."
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:outline-none focus:border-[#1A759F]"
                />
              </div>

              <div className="pt-3 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowEventModal(false)}
                  className="px-4 py-2 border border-slate-200 text-xs font-semibold text-slate-700 rounded-lg hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#FF7A00] hover:bg-[#e66e00] text-white text-xs font-bold rounded-lg transition-colors cursor-pointer"
                >
                  Save Event
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ADD ARTICLE MODAL */}
      {showArticleModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <h3 className="text-base font-bold text-[#1E293B]">Publish Editorial Article</h3>
            <form onSubmit={handleSaveArticle} className="space-y-3">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Article Title</label>
                <input
                  type="text"
                  value={articleFormData.title}
                  onChange={(e) => setArticleFormData({ ...articleFormData, title: e.target.value })}
                  placeholder="e.g. Statistical Inference in Modern Genomics"
                  required
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:outline-none focus:border-[#1A759F]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Category</label>
                  <select
                    value={articleFormData.category}
                    onChange={(e) => setArticleFormData({ ...articleFormData, category: e.target.value })}
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:outline-none focus:border-[#1A759F]"
                  >
                    <option value="Statistics & Data Science">Statistics & Data Science</option>
                    <option value="Opinion & Editorials">Opinion & Editorials</option>
                    <option value="Research & Innovation">Research & Innovation</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Author Name</label>
                  <input
                    type="text"
                    value={articleFormData.author}
                    onChange={(e) => setArticleFormData({ ...articleFormData, author: e.target.value })}
                    required
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:outline-none focus:border-[#1A759F]"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Short Excerpt</label>
                <input
                  type="text"
                  value={articleFormData.excerpt}
                  onChange={(e) => setArticleFormData({ ...articleFormData, excerpt: e.target.value })}
                  placeholder="Brief synopsis..."
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:outline-none focus:border-[#1A759F]"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Full Article Content</label>
                <textarea
                  rows={5}
                  value={articleFormData.content}
                  onChange={(e) => setArticleFormData({ ...articleFormData, content: e.target.value })}
                  placeholder="Write the full analytical article text here..."
                  required
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:outline-none focus:border-[#1A759F]"
                />
              </div>

              <div className="pt-3 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowArticleModal(false)}
                  className="px-4 py-2 border border-slate-200 text-xs font-semibold text-slate-700 rounded-lg hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#FF7A00] hover:bg-[#e66e00] text-white text-xs font-bold rounded-lg transition-colors cursor-pointer"
                >
                  Publish Article
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ADD QUIZ QUESTION MODAL */}
      {showQuizModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <h3 className="text-base font-bold text-[#1E293B]">Add Course Practice Question</h3>
            <form onSubmit={handleAddQuizQuestion} className="space-y-3">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Select Course</label>
                <select
                  value={selectedCourseCode}
                  onChange={(e) => setSelectedCourseCode(e.target.value)}
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:outline-none focus:border-[#1A759F]"
                >
                  {quizzes.map((q) => (
                    <option key={q.courseCode} value={q.courseCode}>
                      {q.courseCode}: {q.title}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Question Text</label>
                <textarea
                  rows={2}
                  value={newQuestionText}
                  onChange={(e) => setNewQuestionText(e.target.value)}
                  placeholder="e.g. Which theorem states that sample mean approaches expected value as sample size increases?"
                  required
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:outline-none focus:border-[#1A759F]"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[11px] font-bold text-slate-600 block mb-0.5">Option A</label>
                  <input
                    type="text"
                    value={optA}
                    onChange={(e) => setOptA(e.target.value)}
                    required
                    className="w-full p-1.5 bg-slate-50 border border-slate-200 rounded text-xs"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-slate-600 block mb-0.5">Option B</label>
                  <input
                    type="text"
                    value={optB}
                    onChange={(e) => setOptB(e.target.value)}
                    required
                    className="w-full p-1.5 bg-slate-50 border border-slate-200 rounded text-xs"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-slate-600 block mb-0.5">Option C</label>
                  <input
                    type="text"
                    value={optC}
                    onChange={(e) => setOptC(e.target.value)}
                    className="w-full p-1.5 bg-slate-50 border border-slate-200 rounded text-xs"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-slate-600 block mb-0.5">Option D</label>
                  <input
                    type="text"
                    value={optD}
                    onChange={(e) => setOptD(e.target.value)}
                    className="w-full p-1.5 bg-slate-50 border border-slate-200 rounded text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Correct Answer</label>
                <select
                  value={correctOptIndex}
                  onChange={(e) => setCorrectOptIndex(Number(e.target.value))}
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:outline-none focus:border-[#1A759F]"
                >
                  <option value={0}>Option A is Correct</option>
                  <option value={1}>Option B is Correct</option>
                  <option value={2}>Option C is Correct</option>
                  <option value={3}>Option D is Correct</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Statistical Explanation</label>
                <textarea
                  rows={2}
                  value={questionExplanation}
                  onChange={(e) => setQuestionExplanation(e.target.value)}
                  placeholder="Explain why this option is correct for the answer report..."
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:outline-none focus:border-[#1A759F]"
                />
              </div>

              <div className="pt-3 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowQuizModal(false)}
                  className="px-4 py-2 border border-slate-200 text-xs font-semibold text-slate-700 rounded-lg hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#FF7A00] hover:bg-[#e66e00] text-white text-xs font-bold rounded-lg transition-colors cursor-pointer"
                >
                  Add Question
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
