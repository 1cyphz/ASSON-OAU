import { useState, useEffect } from 'react';
import {
  EventItem,
  Article,
  AlumniRecord,
  CourseQuiz,
  GalleryAlbum,
  Role,
  AdminUser
} from '../types';
import {
  EVENTS,
  ARTICLES,
  ALUMNI_RECORDS,
  COURSE_QUIZZES,
  GALLERY_ALBUMS,
  ASSON_ROLES,
  INITIAL_ADMIN_USERS
} from '../data/assonData';

const STORAGE_KEYS = {
  EVENTS: 'asson_events_v1',
  ARTICLES: 'asson_articles_v1',
  ALUMNI: 'asson_alumni_v1',
  QUIZZES: 'asson_quizzes_v1',
  GALLERY: 'asson_gallery_v1',
  ROLES: 'asson_roles_v1',
  ADMIN_USERS: 'asson_admin_users_v1',
  CURRENT_USER: 'asson_current_user_v1'
};

function getStorage<T>(key: string, defaultValue: T): T {
  try {
    const item = localStorage.getItem(key);
    if (item) {
      return JSON.parse(item);
    }
  } catch (e) {
    console.error(`Error reading ${key} from localStorage:`, e);
  }
  return defaultValue;
}

function setStorage<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    window.dispatchEvent(new Event('asson_storage_update'));
  } catch (e) {
    console.error(`Error writing ${key} to localStorage:`, e);
  }
}

export const assonStore = {
  getEvents: (): EventItem[] => getStorage(STORAGE_KEYS.EVENTS, EVENTS),
  saveEvents: (items: EventItem[]) => setStorage(STORAGE_KEYS.EVENTS, items),
  
  getArticles: (): Article[] => getStorage(STORAGE_KEYS.ARTICLES, ARTICLES),
  saveArticles: (items: Article[]) => setStorage(STORAGE_KEYS.ARTICLES, items),

  getAlumni: (): AlumniRecord[] => getStorage(STORAGE_KEYS.ALUMNI, ALUMNI_RECORDS),
  saveAlumni: (items: AlumniRecord[]) => setStorage(STORAGE_KEYS.ALUMNI, items),

  getQuizzes: (): CourseQuiz[] => getStorage(STORAGE_KEYS.QUIZZES, COURSE_QUIZZES),
  saveQuizzes: (items: CourseQuiz[]) => setStorage(STORAGE_KEYS.QUIZZES, items),

  getGallery: (): GalleryAlbum[] => getStorage(STORAGE_KEYS.GALLERY, GALLERY_ALBUMS),
  saveGallery: (items: GalleryAlbum[]) => setStorage(STORAGE_KEYS.GALLERY, items),

  getRoles: (): Role[] => getStorage(STORAGE_KEYS.ROLES, ASSON_ROLES),
  saveRoles: (items: Role[]) => setStorage(STORAGE_KEYS.ROLES, items),

  getAdminUsers: (): AdminUser[] => getStorage(STORAGE_KEYS.ADMIN_USERS, INITIAL_ADMIN_USERS),
  saveAdminUsers: (items: AdminUser[]) => setStorage(STORAGE_KEYS.ADMIN_USERS, items),

  getCurrentUser: (): AdminUser | null => getStorage(STORAGE_KEYS.CURRENT_USER, null),
  setCurrentUser: (user: AdminUser | null) => setStorage(STORAGE_KEYS.CURRENT_USER, user),

  login: (email: string, pass: string): { success: boolean; user?: AdminUser; error?: string } => {
    const users = getStorage(STORAGE_KEYS.ADMIN_USERS, INITIAL_ADMIN_USERS);
    // Support admin email or demo password
    const found = users.find((u) => u.email.toLowerCase() === email.trim().toLowerCase());
    if (found || (email.toLowerCase().includes('admin') && pass.length >= 4)) {
      const activeUser = found || users[0];
      setStorage(STORAGE_KEYS.CURRENT_USER, activeUser);
      return { success: true, user: activeUser };
    }
    return { success: false, error: 'Invalid email or password. You can use admin@asson-oau.org with any password.' };
  },

  logout: () => {
    localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
    window.dispatchEvent(new Event('asson_storage_update'));
  },

  resetDefaults: () => {
    localStorage.removeItem(STORAGE_KEYS.EVENTS);
    localStorage.removeItem(STORAGE_KEYS.ARTICLES);
    localStorage.removeItem(STORAGE_KEYS.ALUMNI);
    localStorage.removeItem(STORAGE_KEYS.QUIZZES);
    localStorage.removeItem(STORAGE_KEYS.GALLERY);
    localStorage.removeItem(STORAGE_KEYS.ROLES);
    localStorage.removeItem(STORAGE_KEYS.ADMIN_USERS);
    window.dispatchEvent(new Event('asson_storage_update'));
  }
};

export function useAssonData() {
  const [events, setEvents] = useState<EventItem[]>(assonStore.getEvents);
  const [articles, setArticles] = useState<Article[]>(assonStore.getArticles);
  const [alumni, setAlumni] = useState<AlumniRecord[]>(assonStore.getAlumni);
  const [quizzes, setQuizzes] = useState<CourseQuiz[]>(assonStore.getQuizzes);
  const [gallery, setGallery] = useState<GalleryAlbum[]>(assonStore.getGallery);
  const [roles, setRoles] = useState<Role[]>(assonStore.getRoles);
  const [adminUsers, setAdminUsers] = useState<AdminUser[]>(assonStore.getAdminUsers);
  const [currentUser, setCurrentUser] = useState<AdminUser | null>(assonStore.getCurrentUser);

  const refresh = () => {
    setEvents(assonStore.getEvents());
    setArticles(assonStore.getArticles());
    setAlumni(assonStore.getAlumni());
    setQuizzes(assonStore.getQuizzes());
    setGallery(assonStore.getGallery());
    setRoles(assonStore.getRoles());
    setAdminUsers(assonStore.getAdminUsers());
    setCurrentUser(assonStore.getCurrentUser());
  };

  useEffect(() => {
    const handler = () => refresh();
    window.addEventListener('asson_storage_update', handler);
    window.addEventListener('storage', handler);
    return () => {
      window.removeEventListener('asson_storage_update', handler);
      window.removeEventListener('storage', handler);
    };
  }, []);

  return {
    events,
    articles,
    alumni,
    quizzes,
    gallery,
    roles,
    adminUsers,
    currentUser,
    refresh
  };
}
