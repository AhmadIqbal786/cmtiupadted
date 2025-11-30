import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCourses } from '../context/CourseContext';
import { Button } from '../components/Button';
import { CheckCircle, XCircle, Clock, AlertCircle } from 'lucide-react';

export const QuizView: React.FC = () => {
  const { courseId, lessonId } = useParams<{ courseId: string; lessonId: string }>();
  const navigate = useNavigate();
  const { courses } = useCourses();
  
  const course = courses.find(c => c.id === courseId);
  const lesson = course?.modules.flatMap(m => m.lessons).find(l => l.id === lessonId);
  
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<{[key: string]: number}>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!lesson || !lesson.quizData) return <div>Quiz not found</div>;

  const quiz = lesson.quizData;
  const currentQuestion = quiz.questions[currentQuestionIndex];

  const handleOptionSelect = (optionIndex: number) => {
    if (isSubmitted) return;
    setSelectedAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: optionIndex
    }));
  };

  const handleNext = () => {
    if (currentQuestionIndex < quiz.questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  const handleSubmit = () => {
    setIsSubmitted(true);
  };

  // Calculate Score
  const calculateScore = () => {
    let correct = 0;
    quiz.questions.forEach(q => {
      if (selectedAnswers[q.id] === q.correctOptionIndex) correct++;
    });
    return Math.round((correct / quiz.questions.length) * 100);
  };

  const score = isSubmitted ? calculateScore() : 0;
  const passed = score >= quiz.passingScore;

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-t-xl p-6 border-b border-gray-200 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{lesson.title}</h1>
            <p className="text-gray-500 text-sm">Question {currentQuestionIndex + 1} of {quiz.questions.length}</p>
          </div>
          {!isSubmitted && (
            <div className="flex items-center text-orange-600 bg-orange-50 px-3 py-1 rounded-full text-sm font-medium">
              <Clock className="w-4 h-4 mr-2" />
              15:00
            </div>
          )}
        </div>

        {/* Content */}
        <div className="bg-white rounded-b-xl shadow-sm p-8 min-h-[400px] flex flex-col">
          {!isSubmitted ? (
            <>
              <h2 className="text-lg font-medium text-gray-900 mb-6">{currentQuestion.text}</h2>
              <div className="space-y-3 mb-8">
                {currentQuestion.options.map((option, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleOptionSelect(idx)}
                    className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
                      selectedAnswers[currentQuestion.id] === idx
                        ? 'border-primary-600 bg-primary-50 text-primary-800'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <span className="inline-block w-6 font-bold text-gray-400 mr-2">{String.fromCharCode(65 + idx)}.</span>
                    {option}
                  </button>
                ))}
              </div>

              <div className="mt-auto flex justify-between">
                <Button 
                  variant="outline" 
                  disabled={currentQuestionIndex === 0}
                  onClick={() => setCurrentQuestionIndex(prev => prev - 1)}
                >
                  Previous
                </Button>
                {currentQuestionIndex === quiz.questions.length - 1 ? (
                  <Button onClick={handleSubmit}>Submit Quiz</Button>
                ) : (
                  <Button onClick={handleNext}>Next Question</Button>
                )}
              </div>
            </>
          ) : (
            <div className="text-center py-8">
              {passed ? (
                <div className="mx-auto flex items-center justify-center h-20 w-20 rounded-full bg-green-100 mb-6">
                  <CheckCircle className="h-10 w-10 text-green-600" />
                </div>
              ) : (
                <div className="mx-auto flex items-center justify-center h-20 w-20 rounded-full bg-red-100 mb-6">
                  <XCircle className="h-10 w-10 text-red-600" />
                </div>
              )}
              
              <h2 className="text-3xl font-bold text-gray-900 mb-2">{passed ? 'Quiz Passed!' : 'Quiz Failed'}</h2>
              <p className="text-gray-500 mb-8">You scored {score}% ({quiz.passingScore}% required to pass)</p>
              
              <div className="flex justify-center gap-4">
                <Button variant="outline" onClick={() => navigate(`/lesson/${courseId}/${lessonId}`)}>
                  Review Material
                </Button>
                {passed && (
                   <Button onClick={() => navigate(`/certificate/${courseId}`)}>
                     Get Certificate
                   </Button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};