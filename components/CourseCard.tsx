import React from 'react';
import { Course } from '../types';
import { BookOpen, Star, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

interface CourseCardProps {
  course: Course;
}

export const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
  return (
    <Link to={`/course/${course.id}`} className="group block h-full">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow h-full flex flex-col">
        <div className="relative h-48 overflow-hidden">
          <img 
            src={course.thumbnail} 
            alt={course.title} 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute top-2 left-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-md text-xs font-semibold text-primary-700">
            {course.category}
          </div>
          <div className="absolute bottom-2 right-2 bg-primary-600 text-white px-2 py-1 rounded-md text-xs font-bold">
            PKR {course.price.toLocaleString()}
          </div>
        </div>
        <div className="p-5 flex flex-col flex-grow">
          <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">{course.title}</h3>
          <p className="text-gray-500 text-sm mb-4 line-clamp-2 flex-grow">{course.description}</p>
          
          <div className="flex items-center justify-between text-xs text-gray-500 mt-auto pt-4 border-t border-gray-50">
            <div className="flex items-center">
              <Users className="w-4 h-4 mr-1" />
              {course.enrolledStudents.toLocaleString()}
            </div>
            <div className="flex items-center text-yellow-500">
              <Star className="w-4 h-4 mr-1 fill-current" />
              {course.rating}
            </div>
            <div className="flex items-center">
              <BookOpen className="w-4 h-4 mr-1" />
              {course.modules.length} Modules
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};
