import test from 'node:test';
import assert from 'node:assert/strict';
import {
  isValidEmail,
  formatPhoneLink,
  filterArticles,
  countArticlesByCategory,
  filterAlumni,
  calculateQuizScore
} from './helpers';
import { Article, AlumniRecord, QuizQuestion } from '../types';

const sampleArticles: Article[] = [
  {
    _id: '1',
    title: 'The cost of ignoring data',
    slug: 'the-cost-of-ignoring-data',
    author: 'HIBATULLAH OMOTOLA LUQMAN',
    category: 'Statistics & Data Science',
    publishDate: '2026-04-21',
    excerpt: 'In today’s world, almost every system depends on data...',
    content: 'Data is crucial for every system.',
    featuredImage: 'https://example.com/img1.jpg',
    readTime: '4 min'
  },
  {
    _id: '2',
    title: 'Statistics in a Developing Economy',
    slug: 'statistics-developing-economy',
    author: 'Jacobs Odunayo M.',
    category: 'Opinion & Editorials',
    publishDate: '2025-11-20',
    excerpt: 'Facts with reliable figures...',
    content: 'We construct models and test hypotheses.',
    featuredImage: 'https://example.com/img2.jpg',
    readTime: '6 min'
  }
];

const sampleAlumni: AlumniRecord[] = [
  {
    id: '1',
    name: 'Ayobami Adebesin',
    gradYear: 2020
  },
  {
    id: '2',
    name: 'Amina Danjuma',
    gradYear: 2024
  }
];

const sampleQuestions: QuizQuestion[] = [
  {
    id: 'q1',
    question: 'What is the sum of deviations from mean?',
    options: ['Zero', 'One'],
    correctAnswer: 0,
    explanation: 'Sum of deviations is always 0.'
  },
  {
    id: 'q2',
    question: 'Poisson variance equals?',
    options: ['λ²', 'λ'],
    correctAnswer: 1,
    explanation: 'Variance equals lambda.'
  }
];

test('isValidEmail handles valid and invalid addresses', () => {
  assert.equal(isValidEmail('asson.oau@gmail.com'), true);
  assert.equal(isValidEmail('jacobsodunayo@gmail.com'), true);
  assert.equal(isValidEmail('invalid-email'), false);
  assert.equal(isValidEmail(''), false);
});

test('formatPhoneLink converts local Nigerian numbers to international dial uri', () => {
  assert.equal(formatPhoneLink('09052029197'), 'tel:+2349052029197');
  assert.equal(formatPhoneLink('07089225441'), 'tel:+2347089225441');
});

test('filterArticles filters by search and category', () => {
  const bySearch = filterArticles(sampleArticles, 'ignoring', null);
  assert.equal(bySearch.length, 1);
  assert.equal(bySearch[0].title, 'The cost of ignoring data');
});

test('countArticlesByCategory computes correct tallies', () => {
  const counts = countArticlesByCategory(sampleArticles, [
    'Statistics & Data Science',
    'Opinion & Editorials'
  ]);
  assert.equal(counts['Statistics & Data Science'], 1);
  assert.equal(counts['Opinion & Editorials'], 1);
});

test('filterAlumni filters by graduation year and text search', () => {
  const year2024 = filterAlumni(sampleAlumni, 2024, '');
  assert.equal(year2024.length, 1);
  assert.equal(year2024[0].name, 'Amina Danjuma');

  const searchAmina = filterAlumni(sampleAlumni, 'all', 'Amina');
  assert.equal(searchAmina.length, 1);
  assert.equal(searchAmina[0].name, 'Amina Danjuma');
});

test('calculateQuizScore correctly grades answers and computes percentage', () => {
  const fullScore = calculateQuizScore(sampleQuestions, { q1: 0, q2: 1 });
  assert.equal(fullScore.score, 2);
  assert.equal(fullScore.total, 2);
  assert.equal(fullScore.percentage, 100);
  assert.equal(fullScore.passed, true);

  const halfScore = calculateQuizScore(sampleQuestions, { q1: 0, q2: 0 });
  assert.equal(halfScore.score, 1);
  assert.equal(halfScore.percentage, 50);
  assert.equal(halfScore.passed, false);
});
