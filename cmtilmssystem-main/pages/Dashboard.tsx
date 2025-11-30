import React from 'react';
import { useCourses } from '../context/CourseContext';
import { Link } from 'react-router-dom';
import { Clock, PlayCircle, BookOpen, Bell, AlertCircle, FileText, Calendar, CheckSquare } from 'lucide-react';
import { Button } from '../components/Button';
import { useAuth } from '../App';
import { MOCK_NOTICES } from '../constants';

export const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const { courses } = useCourses();
  
  if (!user) return null;

  // Filter courses user is enrolled in
  const enrolledCourses = courses.filter(course => user.enrolledCourses.includes(course.id));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Welcome & ID Strip */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6 flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-4">
           <img src={user.avatar} alt={user.name} className="w-12 h-12 rounded-full border-2 border-primary-100" />
           <div>
             <h1 className="text-xl font-bold text-gray-900">Welcome, {user.name}</h1>
             <p className="text-sm text-gray-500">Student ID: <span className="font-mono text-primary-700 bg-primary-50 px-1 rounded">{user.studentId || 'N/A'}</span></p>
           </div>
        </div>
        <div className="flex gap-3 text-sm">
           <div className="text-center px-4 border-r border-gray-100">
             <div className="font-bold text-lg text-primary-600">{enrolledCourses.length}</div>
             <div className="text-gray-500 text-xs uppercase">Courses</div>
           </div>
           <div className="text-center px-4 border-r border-gray-100">
             <div className="font-bold text-lg text-green-600">3.8</div>
             <div className="text-gray-500 text-xs uppercase">CGPA</div>
           </div>
           <div className="text-center px-4">
             <div className="font-bold text-lg text-orange-600">92%</div>
             <div className="text-gray-500 text-xs uppercase">Attend.</div>
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        
        {/* Left Column: Notice Board & Alerts (Sticky Style) */}
        <div className="lg:col-span-1 space-y-6">
          
          {/* Notice Board */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
             <div className="bg-primary-700 px-4 py-3 flex items-center justify-between">
                <h2 className="text-sm font-bold text-white uppercase tracking-wide flex items-center">
                   <Bell className="w-4 h-4 mr-2" /> Notice Board
                </h2>
             </div>
             <div className="p-0">
               <ul className="divide-y divide-gray-100">
                 {MOCK_NOTICES.map(notice => (
                   <li key={notice.id} className="p-4 hover:bg-gray-50 transition-colors cursor-pointer group">
                      <div className="flex justify-between items-start mb-1">
                        <span className="text-xs text-gray-400 font-mono">{notice.date}</span>
                        {notice.isNew && <span className="text-[10px] bg-red-100 text-red-600 px-1.5 py-0.5 rounded font-bold animate-pulse">NEW</span>}
                      </div>
                      <p className="text-sm text-gray-800 font-medium group-hover:text-primary-700 leading-snug">{notice.title}</p>
                   </li>
                 ))}
               </ul>
               <div className="p-2 bg-gray-50 text-center border-t border-gray-100">
                  <a href="#" className="text-xs text-primary-600 hover:text-primary-800 font-medium">View All Notices</a>
               </div>
             </div>
          </div>

          {/* Quick Links */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Student Services</h3>
            <div className="space-y-2">
               <button className="w-full text-left flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md transition-colors">
                  <FileText className="w-4 h-4 mr-3 text-gray-400" /> Date Sheet
               </button>
               <button className="w-full text-left flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md transition-colors">
                  <CheckSquare className="w-4 h-4 mr-3 text-gray-400" /> Grade Book
               </button>
               <button className="w-full text-left flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md transition-colors">
                  <Calendar className="w-4 h-4 mr-3 text-gray-400" /> Academic Calendar
               </button>
            </div>
          </div>
        </div>

        {/* Center: Courses */}
        <div className="lg:col-span-3 space-y-6">
           {/* To Do Section */}
           <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
              <div>
                 <h3 className="text-sm font-bold text-orange-800">Pending Actions</h3>
                 <ul className="mt-1 space-y-1">
                    <li className="text-sm text-orange-700">• DIT Mid-Term Quiz is due in 2 days.</li>
                    <li className="text-sm text-orange-700">• Submit assignment for "Web Development" Module 1.</li>
                 </ul>
              </div>
           </div>

           {/* Course Grid */}
           <div>
              <div className="flex justify-between items-center mb-4">
                 <h2 className="text-lg font-bold text-gray-900 flex items-center">
                   <PlayCircle className="w-5 h-5 mr-2 text-primary-600" />
                   Active Courses
                 </h2>
                 <Link to="/courses" className="text-sm text-primary-600 hover:underline">Register New Course</Link>
              </div>

              {enrolledCourses.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {enrolledCourses.map(course => (
                    <div key={course.id} className="bg-white rounded-lg border border-gray-200 hover:border-primary-300 transition-all shadow-sm hover:shadow-md flex flex-col overflow-hidden">
                      <div className="h-2 bg-primary-600 w-full"></div>
                      <div className="p-5 flex-1 flex flex-col">
                        <div className="flex justify-between items-start mb-2">
                           <span className="text-xs font-bold text-primary-600 bg-primary-50 px-2 py-0.5 rounded">{course.id.toUpperCase()}</span>
                           <span className="text-xs text-gray-400">{course.category}</span>
                        </div>
                        <h3 className="font-bold text-gray-900 mb-2 line-clamp-1" title={course.title}>{course.title}</h3>
                        <p className="text-xs text-gray-500 mb-4 flex items-center">
                           <img src={`https://ui-avatars.com/api/?name=${course.instructor}&background=random`} className="w-4 h-4 rounded-full mr-2" />
                           {course.instructor}
                        </p>
                        
                        <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between">
                            <div className="flex flex-col">
                                <span className="text-[10px] text-gray-400 uppercase">Progress</span>
                                <div className="w-24 h-1.5 bg-gray-100 rounded-full mt-1">
                                   <div className="h-full bg-green-500 rounded-full" style={{ width: '35%' }}></div>
                                </div>
                            </div>
                            <Link to={`/course/${course.id}`}>
                              <Button size="sm" variant="outline" className="text-xs">
                                Enter Class
                              </Button>
                            </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-10 bg-white rounded-lg border border-gray-200 border-dashed">
                   <BookOpen className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                   <p className="text-gray-500 mb-4">You haven't enrolled in any courses yet.</p>
                   <Link to="/courses">
                     <Button>Browse Course Catalog</Button>
                   </Link>
                </div>
              )}
           </div>
        </div>

      </div>
    </div>
  );
};