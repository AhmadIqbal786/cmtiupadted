import React, { useState } from 'react';
import { useParams, Navigate, Link, useNavigate } from 'react-router-dom';
import { useCourses } from '../context/CourseContext';
import { ChevronLeft, ChevronRight, CheckCircle, Menu, Award, FileText, Download, Play } from 'lucide-react';
import { AITutorWidget } from '../components/AITutorWidget';
import { Button } from '../components/Button';

export const LessonView: React.FC = () => {
  const { courseId, lessonId } = useParams<{ courseId: string; lessonId: string }>();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const navigate = useNavigate();
  const { courses } = useCourses();

  // Find data
  const course = courses.find(c => c.id === courseId);
  
  // Flatten lessons to find current, prev, next
  const allLessons = course?.modules.flatMap(m => m.lessons) || [];
  const currentLessonIndex = allLessons.findIndex(l => l.id === lessonId);
  const currentLesson = allLessons[currentLessonIndex];
  
  const prevLesson = currentLessonIndex > 0 ? allLessons[currentLessonIndex - 1] : null;
  const nextLesson = currentLessonIndex < allLessons.length - 1 ? allLessons[currentLessonIndex + 1] : null;

  if (!course || !currentLesson) {
    return <Navigate to="/dashboard" replace />;
  }

  // Helper to check if a lesson is active
  const isLessonActive = (id: string) => id === lessonId;

  // Helper to determine if content is an embed url or direct file
  const isEmbedUrl = (url: string) => {
    return url.includes('youtube.com') || url.includes('vimeo.com') || url.includes('embed');
  };

  const handleStartQuiz = () => {
    navigate(`/quiz/${courseId}/${lessonId}`);
  };

  return (
    <div className="flex h-[calc(100vh-64px)] overflow-hidden bg-gray-100">
      
      {/* Sidebar - Curriculum */}
      <div className={`flex-shrink-0 bg-white border-r border-gray-200 transition-all duration-300 ${isSidebarOpen ? 'w-80' : 'w-0 overflow-hidden'}`}>
        <div className="h-full flex flex-col">
          <div className="p-4 border-b border-gray-200 bg-gray-50">
            <h2 className="font-bold text-gray-800 text-sm uppercase tracking-wider mb-1">Curriculum</h2>
            <p className="text-xs text-gray-500 truncate">{course.title}</p>
          </div>
          <div className="flex-1 overflow-y-auto">
            {course.modules.map((module) => (
              <div key={module.id} className="border-b border-gray-100">
                <div className="px-4 py-3 bg-gray-50/50 text-xs font-bold text-gray-500 uppercase">
                  {module.title}
                </div>
                <div>
                  {module.lessons.map((lesson) => (
                    <Link
                      key={lesson.id}
                      to={`/lesson/${course.id}/${lesson.id}`}
                      className={`block px-4 py-3 text-sm border-l-4 transition-colors ${
                        isLessonActive(lesson.id)
                          ? 'border-primary-500 bg-primary-50 text-primary-700 font-medium'
                          : 'border-transparent text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${isLessonActive(lesson.id) ? 'border-primary-500' : 'border-gray-300'}`}>
                           {/* Add logic for completed later */}
                        </div>
                        <span className="truncate">{lesson.title}</span>
                      </div>
                      <div className="pl-6 text-xs text-gray-400 mt-1">{lesson.duration}</div>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 bg-gray-100 relative">
        {/* Toggle Sidebar Button (Mobile/Desktop) */}
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="absolute top-4 left-4 z-10 p-2 bg-white rounded-md shadow-md hover:bg-gray-50 text-gray-600"
          title="Toggle Sidebar"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="flex-1 overflow-y-auto">
          <div className="max-w-4xl mx-auto p-4 sm:p-8">
            
            {/* Content Render Logic */}
            <div className="bg-black rounded-xl overflow-hidden shadow-lg aspect-video mb-8 relative group">
              {currentLesson.type === 'video' ? (
                isEmbedUrl(currentLesson.content) ? (
                  <iframe
                    className="w-full h-full"
                    src={currentLesson.content}
                    title={currentLesson.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                ) : (
                  <video 
                    className="w-full h-full"
                    controls
                    src={currentLesson.content}
                    controlsList="nodownload"
                  >
                    Your browser does not support the video tag.
                  </video>
                )
              ) : currentLesson.type === 'quiz' ? (
                 <div className="w-full h-full bg-white flex flex-col items-center justify-center p-8 text-center">
                    <div className="bg-primary-50 p-6 rounded-full mb-6">
                       <Award className="w-16 h-16 text-primary-600" />
                    </div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">{currentLesson.title}</h2>
                    <p className="text-gray-500 mb-8 max-w-md">
                      Test your knowledge of this module.
                    </p>
                    <Button size="lg" onClick={handleStartQuiz}>Start Quiz Now</Button>
                 </div>
              ) : currentLesson.type === 'pdf' ? (
                <div className="w-full h-full bg-white flex flex-col items-center justify-center p-8 text-center">
                    <div className="bg-red-50 p-6 rounded-full mb-6">
                       <FileText className="w-16 h-16 text-red-600" />
                    </div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">{currentLesson.title}</h2>
                    <p className="text-gray-500 mb-8 max-w-md">
                      This lesson contains a downloadable resource or book.
                    </p>
                    <div className="flex gap-3">
                      <a href={currentLesson.content} target="_blank" rel="noopener noreferrer">
                          <Button size="lg" className="bg-red-600 hover:bg-red-700 text-white">
                              <Download className="w-4 h-4 mr-2" /> View/Download PDF
                          </Button>
                      </a>
                    </div>
                    {/* Preview Iframe for PDFs if browser supports it */}
                    {currentLesson.content.startsWith('blob:') && (
                        <div className="mt-8 w-full h-64 border border-gray-200 rounded-lg overflow-hidden">
                           <iframe src={currentLesson.content} className="w-full h-full"></iframe>
                        </div>
                    )}
                 </div>
              ) : (
                <div className="w-full h-full bg-white text-gray-800 p-8 overflow-y-auto">
                   <h3 className="text-2xl font-bold mb-4">{currentLesson.title}</h3>
                   <div className="prose max-w-none text-gray-600 whitespace-pre-wrap">
                     {currentLesson.content}
                   </div>
                </div>
              )}
            </div>

            {/* Lesson Info & Nav */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 mb-20">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-gray-100 pb-6 mb-6">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">{currentLesson.title}</h1>
                  <p className="text-gray-500 mt-1">Module: {course.modules.find(m => m.lessons.some(l => l.id === lessonId))?.title}</p>
                </div>
                <Button variant="outline" className="flex-shrink-0">
                  <CheckCircle className="w-4 h-4 mr-2" /> Mark Complete
                </Button>
              </div>

              <div className="flex justify-between items-center">
                {prevLesson ? (
                  <Link to={`/lesson/${course.id}/${prevLesson.id}`}>
                    <Button variant="ghost">
                      <ChevronLeft className="w-4 h-4 mr-2" /> Previous Lesson
                    </Button>
                  </Link>
                ) : (
                  <div></div>
                )}

                {nextLesson ? (
                  <Link to={`/lesson/${course.id}/${nextLesson.id}`}>
                    <Button>
                      Next Lesson <ChevronRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                ) : (
                  <Link to={`/certificate/${course.id}`}>
                    <Button variant="primary">
                       Get Certificate <Award className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                )}
              </div>
            </div>

          </div>
        </div>

        {/* AI Tutor */}
        <AITutorWidget 
          courseTitle={course.title} 
          lessonTitle={currentLesson.title} 
        />
      </div>
    </div>
  );
};