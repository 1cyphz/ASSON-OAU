import {
  ASSON_EXECUTIVES,
  STATISTICS_RESOURCES,
  NEWSLETTERS,
  ARTICLES,
  EVENTS,
  COURSE_QUIZZES,
  GALLERY_ALBUMS,
  ALUMNI_RECORDS,
  ASSON_CONSTITUTION
} from '../data/assonData';
import {
  Article,
  Newsletter,
  EventItem,
  AcademicPart,
  Executive,
  CourseQuiz,
  GalleryAlbum,
  AlumniRecord
} from '../types';

export const api = {
  async getStatisticsResources(): Promise<AcademicPart[]> {
    return STATISTICS_RESOURCES;
  },

  async getQuizzes(): Promise<CourseQuiz[]> {
    return COURSE_QUIZZES;
  },

  async getArticles(): Promise<Article[]> {
    return ARTICLES;
  },

  async getNewsletters(): Promise<Newsletter[]> {
    return NEWSLETTERS;
  },

  async getEvents(): Promise<EventItem[]> {
    return EVENTS;
  },

  async getGalleryAlbums(): Promise<GalleryAlbum[]> {
    return GALLERY_ALBUMS;
  },

  async getAlumni(): Promise<AlumniRecord[]> {
    return ALUMNI_RECORDS;
  },

  async getExecutives(): Promise<Executive[]> {
    return ASSON_EXECUTIVES;
  },

  async getConstitution() {
    return ASSON_CONSTITUTION;
  }
};
