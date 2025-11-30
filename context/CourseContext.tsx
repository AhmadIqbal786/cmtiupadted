import React, { createContext, useContext, useState, useEffect } from 'react';
import { Course } from '../types';
import { MOCK_COURSES } from '../constants';

interface CourseContextType {
  courses: Course[];
  addCourse: (course: Course) => void;
  updateCourse: (course: Course) => void;
  deleteCourse: (id: string) => void;
  getCourse: (id: string) => Course | undefined;
}

const CourseContext = createContext<CourseContextType | undefined>(undefined);

export const CourseProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [courses, setCourses] = useState<Course[]>(() => {
    try {
      const saved = localStorage.getItem('cmti_courses');
      return saved ? JSON.parse(saved) : MOCK_COURSES;
    } catch (e) {
      return MOCK_COURSES;
    }
  });

  useEffect(() => {
    localStorage.setItem('cmti_courses', JSON.stringify(courses));
  }, [courses]);

  const addCourse = (course: Course) => {
    setCourses((prev) => [...prev, course]);
  };

  const updateCourse = (updatedCourse: Course) => {
    setCourses((prev) => prev.map(c => c.id === updatedCourse.id ? updatedCourse : c));
  };

  const deleteCourse = (id: string) => {
    setCourses((prev) => prev.filter(c => c.id !== id));
  };

  const getCourse = (id: string) => courses.find(c => c.id === id);

  return (
    <CourseContext.Provider value={{ courses, addCourse, updateCourse, deleteCourse, getCourse }}>
      {children}
    </CourseContext.Provider>
  );
};

export const useCourses = () => {
  const context = useContext(CourseContext);
  if (!context) throw new Error('useCourses must be used within a CourseProvider');
  return context;
};