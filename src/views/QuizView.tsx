import React, { useState, useEffect } from 'react';
import {
  HelpCircle,
  Clock,
  CheckCircle2,
  XCircle,
  RotateCcw,
  Award,
  ChevronRight,
  ChevronLeft,
  ArrowRight,
  BookOpen,
  Sparkles,
  BarChart2
} from 'lucide-react';
import { CourseQuiz } from '../types';
import { useAssonData } from '../services/assonStore';
import { calculateQuizScore } from '../utils/helpers';

export const QuizView: React.FC = () => {
  const { quizzes } = useAssonData();
  const [selectedQuiz, setSelectedQuiz] = useState<CourseQuiz | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<string, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  // Timer effect
  useEffect(() => {
    if (!isTimerRunning || quizSubmitted || timeLeft <= 0) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setQuizSubmitted(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [isTimerRunning, quizSubmitted, timeLeft]);

  const startQuiz = (quiz: CourseQuiz) => {
    setSelectedQuiz(quiz);
    setCurrentQuestionIndex(0);
    setUserAnswers({});
    setQuizSubmitted(false);
    setTimeLeft(quiz.durationMinutes * 60);
    setIsTimerRunning(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectOption = (questionId: string, optionIndex: number) => {
    if (quizSubmitted) return;
    setUserAnswers((prev) => ({ ...prev, [questionId]: optionIndex }));
  };

  const handleNext = () => {
    if (!selectedQuiz) return;
    if (currentQuestionIndex < selectedQuiz.questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  const handleSubmit = () => {
    setQuizSubmitted(true);
    setIsTimerRunning(false);
  };

  const handleReset = () => {
    if (!selectedQuiz) return;
    setCurrentQuestionIndex(0);
    setUserAnswers({});
    setQuizSubmitted(false);
    setTimeLeft(selectedQuiz.durationMinutes * 60);
    setIsTimerRunning(true);
  };

  const handleExitQuiz = () => {
    setSelectedQuiz(null);
    setQuizSubmitted(false);
    setIsTimerRunning(false);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div className="space-y-12 sm:space-y-16 pb-20 bg-[#F4F7F6]">
      {/* Page Header */}
      <section className="bg-gradient-to-b from-[#1A759F]/10 via-[#F4F7F6] to-[#F4F7F6] py-14 sm:py-20 border-b border-slate-200 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-[#1A759F]">
            Interactive Knowledge Assessment
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-[#1E293B] tracking-tight">
            Course Practice Quizzes
          </h1>
          <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Test and sharpen your comprehension across introductory probability, distribution theory, regression models, and statistical computing.
          </p>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {!selectedQuiz ? (
          /* Course Quiz Selection Grid */
          <div className="space-y-8">
            <div className="flex items-center justify-between pb-4 border-b border-slate-200">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-[#1E293B]">
                  Select a Course Quiz
                </h2>
                <p className="text-xs sm:text-sm text-slate-500">
                  Choose a course module to begin your timed test session
                </p>
              </div>
              <span className="text-xs font-semibold text-[#1A759F] bg-[#1A759F]/10 px-3 py-1 rounded-full">
                {quizzes.length} Courses Available
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {quizzes.map((quiz) => (
                <div
                  key={quiz.courseCode}
                  className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-7 shadow-xs hover:shadow-md hover:border-[#1A759F]/40 transition-all flex flex-col justify-between space-y-6"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-extrabold text-[#1A759F] bg-[#1A759F]/10 px-2.5 py-1 rounded">
                        {quiz.courseCode}
                      </span>
                      <span className="text-xs font-medium text-slate-500">
                        {quiz.level}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-[#1E293B]">
                      {quiz.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {quiz.description}
                    </p>

                    <div className="flex items-center gap-4 text-xs text-slate-500 pt-2 border-t border-slate-100">
                      <span className="inline-flex items-center gap-1">
                        <HelpCircle className="w-3.5 h-3.5 text-[#34A0A4]" />
                        {quiz.questions.length} Questions
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-amber-500" />
                        {quiz.durationMinutes} Minutes
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => startQuiz(quiz)}
                    className="w-full py-2.5 px-4 bg-[#FF7A00] hover:bg-[#e66e00] text-white text-xs font-bold rounded-lg transition-colors inline-flex items-center justify-center gap-2 cursor-pointer shadow-xs"
                  >
                    <span>Attempt Quiz</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        ) : (
          /* Active Quiz or Results Screen */
          <div className="bg-white rounded-2xl border border-slate-200 shadow-md p-6 sm:p-10 space-y-8 animate-fadeIn">
            {/* Quiz Top Navigation Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
              <div>
                <button
                  onClick={handleExitQuiz}
                  className="text-xs font-semibold text-slate-500 hover:text-slate-800 inline-flex items-center gap-1 mb-1 cursor-pointer"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                  <span>Back to Course Selection</span>
                </button>
                <h2 className="text-xl sm:text-2xl font-black text-[#1E293B]">
                  {selectedQuiz.courseCode}: {selectedQuiz.title}
                </h2>
              </div>

              <div className="flex items-center gap-3">
                {!quizSubmitted && (
                  <div className={`px-3 py-1.5 rounded-lg border text-xs font-bold inline-flex items-center gap-1.5 ${
                    timeLeft < 120 ? 'bg-red-50 text-red-600 border-red-200 animate-pulse' : 'bg-slate-50 text-slate-700 border-slate-200'
                  }`}>
                    <Clock className="w-4 h-4" />
                    <span>Time Left: {formatTime(timeLeft)}</span>
                  </div>
                )}
                {quizSubmitted && (
                  <button
                    onClick={handleReset}
                    className="px-3.5 py-1.5 bg-[#1A759F] hover:bg-[#13597a] text-white text-xs font-bold rounded-lg transition-colors inline-flex items-center gap-1.5 cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Retake Quiz</span>
                  </button>
                )}
              </div>
            </div>

            {!quizSubmitted ? (
              /* Ongoing Quiz View */
              <div className="space-y-6">
                {/* Progress Indicator */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs font-semibold text-slate-500">
                    <span>Question {currentQuestionIndex + 1} of {selectedQuiz.questions.length}</span>
                    <span>
                      {Object.keys(userAnswers).length} of {selectedQuiz.questions.length} Answered
                    </span>
                  </div>
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-[#1A759F] h-full transition-all duration-300"
                      style={{
                        width: `${((currentQuestionIndex + 1) / selectedQuiz.questions.length) * 100}%`
                      }}
                    />
                  </div>
                </div>

                {/* Current Question Block */}
                {(() => {
                  const q = selectedQuiz.questions[currentQuestionIndex];
                  const selectedOption = userAnswers[q.id];

                  return (
                    <div className="space-y-6 pt-2">
                      <div className="p-5 sm:p-6 bg-[#F4F7F6] rounded-xl border border-slate-200">
                        <span className="text-xs font-bold text-[#1A759F] uppercase tracking-wider block mb-2">
                          Question {currentQuestionIndex + 1}
                        </span>
                        <p className="text-base sm:text-lg font-bold text-[#1E293B] leading-snug">
                          {q.question}
                        </p>
                      </div>

                      {/* Options */}
                      <div className="space-y-3">
                        {q.options.map((option, idx) => {
                          const isSelected = selectedOption === idx;
                          return (
                            <button
                              key={idx}
                              onClick={() => handleSelectOption(q.id, idx)}
                              className={`w-full text-left p-4 rounded-xl border transition-all text-xs sm:text-sm font-medium flex items-center justify-between cursor-pointer ${
                                isSelected
                                  ? 'bg-[#1A759F]/10 border-[#1A759F] text-[#1A759F] font-bold shadow-xs'
                                  : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-50'
                              }`}
                            >
                              <div className="flex items-center gap-3">
                                <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                                  isSelected ? 'bg-[#1A759F] text-white' : 'bg-slate-100 text-slate-600'
                                }`}>
                                  {String.fromCharCode(65 + idx)}
                                </span>
                                <span>{option}</span>
                              </div>
                              {isSelected && <CheckCircle2 className="w-4 h-4 text-[#1A759F]" />}
                            </button>
                          );
                        })}
                      </div>

                      {/* Question Navigation Controls */}
                      <div className="flex items-center justify-between pt-6 border-t border-slate-100">
                        <button
                          onClick={handlePrev}
                          disabled={currentQuestionIndex === 0}
                          className="px-4 py-2 border border-slate-200 rounded-lg text-xs font-semibold text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed inline-flex items-center gap-1 cursor-pointer"
                        >
                          <ChevronLeft className="w-4 h-4" />
                          <span>Previous</span>
                        </button>

                        <div className="flex items-center gap-2">
                          {currentQuestionIndex < selectedQuiz.questions.length - 1 ? (
                            <button
                              onClick={handleNext}
                              className="px-5 py-2 bg-[#1A759F] hover:bg-[#13597a] text-white rounded-lg text-xs font-bold inline-flex items-center gap-1 transition-colors cursor-pointer"
                            >
                              <span>Next</span>
                              <ChevronRight className="w-4 h-4" />
                            </button>
                          ) : (
                            <button
                              onClick={handleSubmit}
                              className="px-6 py-2 bg-[#FF7A00] hover:bg-[#e66e00] text-white rounded-lg text-xs font-bold inline-flex items-center gap-1 shadow-sm transition-colors cursor-pointer"
                            >
                              <Award className="w-4 h-4" />
                              <span>Submit Quiz</span>
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })()}
              </div>
            ) : (
              /* Quiz Results & Detailed Explanation Review */
              <div className="space-y-8 animate-fadeIn">
                {(() => {
                  const score = calculateQuizScore(selectedQuiz, userAnswers);
                  const percentage = Math.round((score / selectedQuiz.questions.length) * 100);
                  const passed = percentage >= 60;

                  return (
                    <div className="p-6 sm:p-8 bg-gradient-to-r from-slate-900 to-[#1A759F] text-white rounded-2xl shadow-lg flex flex-col sm:flex-row items-center justify-between gap-6">
                      <div className="space-y-2 text-center sm:text-left">
                        <span className="text-xs font-bold uppercase tracking-wider text-[#34A0A4]">
                          Quiz Score Report
                        </span>
                        <h3 className="text-2xl sm:text-3xl font-extrabold">
                          {passed ? 'Outstanding Performance!' : 'Good Effort! Keep Practicing'}
                        </h3>
                        <p className="text-xs sm:text-sm text-slate-300">
                          You scored {score} out of {selectedQuiz.questions.length} questions ({percentage}%).
                        </p>
                      </div>

                      <div className="w-24 h-24 rounded-full bg-white/10 border-2 border-white/20 flex flex-col items-center justify-center shrink-0">
                        <span className="text-2xl font-black">{percentage}%</span>
                        <span className="text-[10px] text-slate-300 uppercase font-semibold">
                          {passed ? 'Passed' : 'Practice'}
                        </span>
                      </div>
                    </div>
                  );
                })()}

                {/* Question Breakdown and Explanations */}
                <div className="space-y-6">
                  <h3 className="text-lg font-bold text-[#1E293B]">
                    Detailed Answer Review & Statistical Explanations
                  </h3>

                  <div className="space-y-6">
                    {selectedQuiz.questions.map((q, qIdx) => {
                      const userChoice = userAnswers[q.id];
                      const isCorrect = userChoice === q.correctAnswer;

                      return (
                        <div
                          key={q.id}
                          className={`p-5 rounded-xl border ${
                            isCorrect
                              ? 'bg-emerald-50/50 border-emerald-200'
                              : 'bg-red-50/50 border-red-200'
                          }`}
                        >
                          <div className="flex items-start justify-between gap-4 mb-3">
                            <span className="text-xs font-bold text-slate-500">
                              Question {qIdx + 1}
                            </span>
                            {isCorrect ? (
                              <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700">
                                <CheckCircle2 className="w-4 h-4" /> Correct (+1)
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1 text-xs font-bold text-red-600">
                                <XCircle className="w-4 h-4" /> Incorrect (0)
                              </span>
                            )}
                          </div>

                          <p className="text-sm sm:text-base font-bold text-[#1E293B] mb-4">
                            {q.question}
                          </p>

                          <div className="space-y-2 mb-4">
                            {q.options.map((opt, optIdx) => {
                              const wasSelected = userChoice === optIdx;
                              const isTheCorrectOne = q.correctAnswer === optIdx;

                              let style = 'bg-white border-slate-200 text-slate-700';
                              if (isTheCorrectOne) {
                                style = 'bg-emerald-100/70 border-emerald-300 text-emerald-900 font-semibold';
                              } else if (wasSelected && !isCorrect) {
                                style = 'bg-red-100/70 border-red-300 text-red-900 line-through';
                              }

                              return (
                                <div
                                  key={optIdx}
                                  className={`p-2.5 rounded-lg border text-xs sm:text-sm flex items-center justify-between ${style}`}
                                >
                                  <span>{String.fromCharCode(65 + optIdx)}. {opt}</span>
                                  {isTheCorrectOne && (
                                    <span className="text-[11px] font-bold text-emerald-700 uppercase">Correct Answer</span>
                                  )}
                                  {wasSelected && !isCorrect && (
                                    <span className="text-[11px] font-bold text-red-600 uppercase">Your Choice</span>
                                  )}
                                </div>
                              );
                            })}
                          </div>

                          {/* Explanation */}
                          <div className="p-3 bg-white/80 border border-slate-200/80 rounded-lg text-xs text-slate-700">
                            <span className="font-bold text-[#1A759F] block mb-0.5">Statistical Explanation:</span>
                            {q.explanation}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
