import { Article, AlumniRecord, QuizQuestion, CourseQuiz } from '../types';

/**
 * Validates standard email address
 */
export function isValidEmail(email: string): boolean {
  if (!email || typeof email !== 'string') return false;
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email.trim());
}

/**
 * Formats a Nigerian local phone number for tel: links
 */
export function formatPhoneLink(phone: string): string {
  if (!phone) return '#';
  const clean = phone.replace(/[^0-9]/g, '');
  if (clean.startsWith('0') && clean.length === 11) {
    return `tel:+234${clean.slice(1)}`;
  }
  return `tel:${clean}`;
}

/**
 * Filter articles by search term and selected category
 */
export function filterArticles(
  articles: Article[],
  searchTerm: string,
  category: string | null
): Article[] {
  const term = searchTerm.trim().toLowerCase();
  return articles.filter((art) => {
    const matchesCategory =
      !category || category === 'All' || art.category === category;
    const matchesSearch =
      !term ||
      art.title.toLowerCase().includes(term) ||
      art.excerpt.toLowerCase().includes(term) ||
      art.author.toLowerCase().includes(term) ||
      art.content.toLowerCase().includes(term);

    return matchesCategory && matchesSearch;
  });
}

/**
 * Calculate category counts for editorial posts
 */
export function countArticlesByCategory(
  articles: Article[],
  categories: string[]
): Record<string, number> {
  const counts: Record<string, number> = {};
  for (const cat of categories) {
    counts[cat] = 0;
  }
  for (const art of articles) {
    if (counts[art.category] !== undefined) {
      counts[art.category] += 1;
    } else {
      counts[art.category] = 1;
    }
  }
  return counts;
}

/**
 * Filter alumni records strictly by full name and graduation year
 */
export function filterAlumni(
  alumni: AlumniRecord[],
  yearFilter: number | 'all',
  searchQuery: string
): AlumniRecord[] {
  const query = searchQuery.trim().toLowerCase();
  return alumni.filter((item) => {
    const matchesYear = yearFilter === 'all' || item.gradYear === yearFilter;
    const matchesQuery = !query || item.name.toLowerCase().includes(query);
    return matchesYear && matchesQuery;
  });
}

export interface QuizScoreResult {
  score: number;
  total: number;
  percentage: number;
  passed: boolean;
  valueOf(): number;
}

/**
 * Calculate Quiz score and percentage
 */
export function calculateQuizScore(
  quizOrQuestions: CourseQuiz | QuizQuestion[],
  answers: Record<string, number>
): QuizScoreResult {
  const questions = Array.isArray(quizOrQuestions)
    ? quizOrQuestions
    : quizOrQuestions.questions;
  let score = 0;
  const total = questions.length;

  for (const q of questions) {
    if (answers[q.id] === q.correctAnswer) {
      score += 1;
    }
  }

  const percentage = total > 0 ? Math.round((score / total) * 100) : 0;
  const passed = percentage >= 60;

  return {
    score,
    total,
    percentage,
    passed,
    valueOf() {
      return score;
    }
  };
}

/**
 * Format date string safely
 */
export function formatDate(dateStr: string): string {
  try {
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return dateStr;
    return d.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  } catch {
    return dateStr;
  }
}
