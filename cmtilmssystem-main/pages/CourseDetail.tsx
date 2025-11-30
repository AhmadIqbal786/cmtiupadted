import React, { useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { useCourses } from '../context/CourseContext';
import { Button } from '../components/Button';
import { Play, FileText, Lock, Award, Check, File, Download, Info, Megaphone, Book } from 'lucide-react';
import { useAuth } from '../App';

export const CourseDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { courses } = useCourses();
  const course = courses.find(c => c.id === id);
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'info' | 'lessons' | 'announcements' | 'downloads'>('lessons');

  if (!course) {
    return <Navigate to="/courses" replace />;
  }

  const isEnrolled = user?.enrolledCourses.includes(course.id);

  // If not enrolled, force info tab
  if (!isEnrolled && activeTab !== 'info') setActiveTab('info');

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Course Header (Minimalist LMS Style) */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
             <div>
                <div className="flex items-center gap-2 mb-2">
                   <span className="text-xs font-bold bg-primary-100 text-primary-700 px-2 py-0.5 rounded">{course.id.toUpperCase()}</span>
                   <span className="text-xs text-gray-500">{course.category}</span>
                </div>
                <h1 className="text-2xl font-bold text-gray-900">{course.title}</h1>
                <p className="text-sm text-gray-500 mt-1">Instructor: {course.instructor}</p>
             </div>
             
             <div className="flex-shrink-0">
               {!isEnrolled && (
                 <Link to={`/checkout/${course.id}`}>
                   <Button size="lg" className="w-full md:w-auto shadow-sm">
                     Enroll Now - PKR {course.price.toLocaleString()}
                   </Button>
                 </Link>
               )}
               {isEnrolled && (
                   <div className="bg-green-50 text-green-700 px-4 py-2 rounded-md border border-green-200 text-sm font-bold flex items-center">
                       <Check className="w-4 h-4 mr-2" /> Enrolled
                   </div>
               )}
             </div>
          </div>

          {/* Tabs Navigation */}
          <div className="flex space-x-1 mt-8 border-b border-gray-200 overflow-x-auto no-scrollbar">
            <button
              onClick={() => setActiveTab('info')}
              className={`pb-3 px-4 text-sm font-medium border-b-2 whitespace-nowrap flex items-center ${activeTab === 'info' ? 'border-primary-600 text-primary-700' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
            >
              <Info className="w-4 h-4 mr-2" /> Course Overview
            </button>
            <button
              onClick={() => setActiveTab('lessons')}
              className={`pb-3 px-4 text-sm font-medium border-b-2 whitespace-nowrap flex items-center ${activeTab === 'lessons' ? 'border-primary-600 text-primary-700' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
            >
              <Book className="w-4 h-4 mr-2" /> Curriculum
            </button>
            <button
              onClick={() => setActiveTab('announcements')}
              disabled={!isEnrolled}
              className={`pb-3 px-4 text-sm font-medium border-b-2 whitespace-nowrap flex items-center ${activeTab === 'announcements' ? 'border-primary-600 text-primary-700' : 'border-transparent text-gray-500 hover:text-gray-700'} ${!isEnrolled && 'opacity-50 cursor-not-allowed'}`}
            >
              <Megaphone className="w-4 h-4 mr-2" /> Announcements
            </button>
            <button
              onClick={() => setActiveTab('downloads')}
              disabled={!isEnrolled}
              className={`pb-3 px-4 text-sm font-medium border-b-2 whitespace-nowrap flex items-center ${activeTab === 'downloads' ? 'border-primary-600 text-primary-700' : 'border-transparent text-gray-500 hover:text-gray-700'} ${!isEnrolled && 'opacity-50 cursor-not-allowed'}`}
            >
              <Download className="w-4 h-4 mr-2" /> Downloads
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
           
           {/* Main Content Area */}
           <div className="lg:col-span-2">
              
              {/* TAB: INFO */}
              {activeTab === 'info' && (
                <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                   <div className="aspect-video rounded-lg overflow-hidden bg-gray-100 mb-6 border border-gray-200">
                      <img src={course.thumbnail} className="w-full h-full object-cover" alt="Course Thumbnail" />
                   </div>
                   <h2 className="text-xl font-bold text-gray-900 mb-4">About this Course</h2>
                   <p className="text-gray-600 leading-relaxed mb-6">{course.description}</p>
                   
                   <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="bg-gray-50 p-4 rounded-lg">
                         <div className="text-xs text-gray-500 uppercase">Modules</div>
                         <div className="font-bold text-gray-900">{course.modules.length}</div>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-lg">
                         <div className="text-xs text-gray-500 uppercase">Students</div>
                         <div className="font-bold text-gray-900">{course.enrolledStudents.toLocaleString()}</div>
                      </div>
                   </div>
                </div>
              )}

              {/* TAB: LESSONS */}
              {activeTab === 'lessons' && (
                <div className="space-y-4">
                  <div className="flex justify-between items-center mb-2">
                     <h2 className="text-lg font-bold text-gray-900">Course Index</h2>
                     {isEnrolled && (
                        <span className="text-xs text-green-600 bg-green-50 px-2 py-1 rounded border border-green-200">
                           {Math.floor(Math.random() * 30)}% Completed
                        </span>
                     )}
                  </div>
                  {course.modules.map((module, mIdx) => (
                    <div key={module.id} className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm">
                      <div className="bg-gray-50 px-5 py-3 border-b border-gray-100 flex justify-between items-center">
                        <h3 className="font-bold text-gray-800 text-sm">{module.title}</h3>
                        <span className="text-xs text-gray-500 bg-white px-2 py-0.5 rounded border border-gray-200">{module.lessons.length} Items</span>
                      </div>
                      <div className="divide-y divide-gray-50">
                        {module.lessons.map((lesson, lIdx) => (
                          <div 
                            key={lesson.id} 
                            className="flex items-center px-5 py-3 hover:bg-gray-50 transition-colors group"
                          >
                            <div className="mr-4 text-gray-400 group-hover:text-primary-600">
                              {lesson.type === 'video' ? <Play className="w-4 h-4" /> : 
                               lesson.type === 'quiz' ? <Award className="w-4 h-4" /> : 
                               lesson.type === 'pdf' ? <File className="w-4 h-4" /> :
                               <FileText className="w-4 h-4" />}
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-gray-900 truncate">{lesson.title}</p>
                              <p className="text-xs text-gray-500">{lesson.duration}</p>
                            </div>
                            {isEnrolled || (lIdx === 0 && mIdx === 0) ? (
                              <Link to={`/lesson/${course.id}/${lesson.id}`}>
                                <Button size="sm" variant="outline" className="ml-4">
                                  {lesson.type === 'quiz' ? 'Start' : 'View'}
                                </Button>
                              </Link>
                            ) : (
                              <Lock className="w-4 h-4 text-gray-300 ml-4" />
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* TAB: ANNOUNCEMENTS */}
              {activeTab === 'announcements' && (
                <div className="space-y-4">
                  {course.announcements && course.announcements.length > 0 ? (
                     course.announcements.map(announcement => (
                       <div key={announcement.id} className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
                          <div className="flex justify-between items-start mb-2">
                             <h3 className="text-md font-bold text-gray-900">{announcement.title}</h3>
                             <span className="text-xs text-gray-500">{announcement.date}</span>
                          </div>
                          <div className="flex items-center gap-2 mb-4">
                             <div className="w-6 h-6 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 text-xs font-bold">
                                {announcement.author.charAt(0)}
                             </div>
                             <span className="text-xs text-gray-600">{announcement.author}</span>
                          </div>
                          <p className="text-sm text-gray-700 leading-relaxed bg-gray-50 p-4 rounded-md border border-gray-100">
                             {announcement.content}
                          </p>
                       </div>
                     ))
                  ) : (
                    <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
                       <Megaphone className="w-10 h-10 text-gray-300 mx-auto mb-2" />
                       <p className="text-gray-500">No announcements yet.</p>
                    </div>
                  )}
                </div>
              )}

              {/* TAB: DOWNLOADS */}
              {activeTab === 'downloads' && (
                <div className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm">
                   <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
                      <h3 className="font-bold text-gray-800">Downloadable Resources</h3>
                      <p className="text-xs text-gray-500">Handouts, past papers, and helper files.</p>
                   </div>
                   {course.resources && course.resources.length > 0 ? (
                      <ul className="divide-y divide-gray-100">
                        {course.resources.map(resource => (
                          <li key={resource.id} className="px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
                             <div className="flex items-center gap-3">
                                <div className={`p-2 rounded-lg ${resource.type === 'pdf' ? 'bg-red-100 text-red-600' : 'bg-blue-100 text-blue-600'}`}>
                                   <File className="w-5 h-5" />
                                </div>
                                <div>
                                   <p className="text-sm font-medium text-gray-900">{resource.title}</p>
                                   <p className="text-xs text-gray-500 uppercase">{resource.type} • {resource.size}</p>
                                </div>
                             </div>
                             <Button variant="outline" size="sm">
                                <Download className="w-4 h-4 mr-2" /> Download
                             </Button>
                          </li>
                        ))}
                      </ul>
                   ) : (
                     <div className="p-8 text-center text-gray-500">
                        No resources available for download.
                     </div>
                   )}
                </div>
              )}

           </div>

           {/* Sidebar Info */}
           <div className="space-y-6">
              {/* Instructor Card */}
              <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
                 <h3 className="text-xs font-bold text-gray-500 uppercase mb-4 tracking-wider">Instructor</h3>
                 <div className="flex items-center gap-3">
                    <img src={`https://ui-avatars.com/api/?name=${course.instructor}&background=random`} className="w-12 h-12 rounded-full" alt="" />
                    <div>
                       <div className="font-bold text-gray-900">{course.instructor}</div>
                       <div className="text-xs text-green-600 flex items-center gap-1">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div> Online
                       </div>
                    </div>
                 </div>
                 <Button variant="outline" className="w-full mt-4 text-xs">
                    <Megaphone className="w-3 h-3 mr-2" /> Ask Question
                 </Button>
              </div>

              {/* Course Features */}
              <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
                 <h3 className="text-xs font-bold text-gray-500 uppercase mb-4 tracking-wider">Course Features</h3>
                 <ul className="space-y-3 text-sm text-gray-600">
                    <li className="flex justify-between">
                       <span>Lectures</span>
                       <span className="font-medium text-gray-900">{course.modules.flatMap(m => m.lessons).length}</span>
                    </li>
                    <li className="flex justify-between">
                       <span>Duration</span>
                       <span className="font-medium text-gray-900">12 Weeks</span>
                    </li>
                    <li className="flex justify-between">
                       <span>Skill Level</span>
                       <span className="font-medium text-gray-900">Beginner</span>
                    </li>
                    <li className="flex justify-between">
                       <span>Certificate</span>
                       <span className="font-medium text-gray-900">Yes</span>
                    </li>
                 </ul>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};