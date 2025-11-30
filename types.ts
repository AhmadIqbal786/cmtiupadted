export interface Question {
  id: string;
  text: string;
  options: string[];
  correctOptionIndex: number;
}

export interface QuizData {
  id: string;
  questions: Question[];
  passingScore: number;
}

export interface Lesson {
  id: string;
  title: string;
  type: 'video' | 'text' | 'quiz' | 'pdf';
  content: string; // Video URL, Text Content, Quiz ID, or PDF URL
  duration: string;
  completed?: boolean;
  quizData?: QuizData; // Optional quiz data if type is 'quiz'
}

export interface Module {
  id: string;
  title: string;
  lessons: Lesson[];
}

export interface Announcement {
  id: string;
  title: string;
  date: string;
  content: string;
  author: string;
}

export interface Resource {
  id: string;
  title: string;
  type: 'pdf' | 'doc' | 'ppt' | 'zip';
  url: string;
  size: string;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  instructor: string;
  thumbnail: string;
  category: string;
  price: number;
  modules: Module[];
  enrolledStudents: number;
  rating: number;
  announcements?: Announcement[];
  resources?: Resource[];
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: 'student' | 'admin' | 'instructor';
  enrolledCourses: string[]; // Course IDs
  studentId?: string; // e.g., BC123456789
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  timestamp: number;
}