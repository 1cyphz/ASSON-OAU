export interface Executive {
  name: string;
  position: string;
  phone: string;
  image: string;
  department: string;
  bio?: string;
}

export interface AcademicPart {
  part: number;
  level: string;
  title: string;
  driveUrl: string;
  courses: string[];
  description: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface CourseQuiz {
  courseCode: string;
  title: string;
  level: string;
  description: string;
  durationMinutes: number;
  questions: QuizQuestion[];
}

export interface Article {
  _id: string;
  title: string;
  slug: string;
  author: string;
  authorRole?: string;
  category: string;
  publishDate: string;
  excerpt: string;
  content: string;
  featuredImage?: string;
  readTime: string;
  views?: number;
  likes?: number;
}

export interface Newsletter {
  _id: string;
  volume: number;
  title: string;
  description: string;
  publishDate: string;
  pdfUrl: string;
  coverImage?: string | null;
  downloadCount: number;
}

export interface EventItem {
  _id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  category: string;
  status: 'upcoming' | 'completed';
  image?: string;
  gallery: string[];
  speakers?: string[];
  registrationUrl?: string;
}

export interface GalleryImage {
  id?: string;
  url: string;
  caption: string;
}

export interface GalleryAlbum {
  id: string;
  title: string;
  date: string;
  category: string;
  coverImage: string;
  images: GalleryImage[];
}

export interface AlumniRecord {
  id: string;
  name: string;
  gradYear: number;
}

export interface Role {
  id: string;
  name: string;
  description: string;
  permissions: string[];
}

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  roleId: string;
  roleName: string;
  avatar?: string;
}
