import { Course, User } from './types';

export const MOCK_NOTICES = [
  { id: 1, title: 'Fall 2025 Semester Enrollment', date: 'Oct 15, 2025', isNew: true },
  { id: 2, title: 'Fee Submission Deadline Extended', date: 'Oct 12, 2025', isNew: true },
  { id: 3, title: 'Convocation Registration Open', date: 'Oct 10, 2025', isNew: false },
  { id: 4, title: 'Maintenance Scheduled for LMS', date: 'Oct 05, 2025', isNew: false },
];

export const MOCK_COURSES: Course[] = [
  {
    id: 'dit-1',
    title: 'DIT (Diploma in Information Technology) - 1 Year',
    description: 'A comprehensive one-year diploma covering Office Automation, Web Design, C++, and Database Management. Recognized by technical boards.',
    instructor: 'Sir Owais',
    thumbnail: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    category: 'Diploma',
    enrolledStudents: 150,
    rating: 4.9,
    price: 35000,
    announcements: [
      { id: 'a1', title: 'Welcome to DIT Fall Session', date: 'Sep 01, 2025', content: 'Welcome all students to the new session. Please ensure you have installed MS Office 2019 or later.', author: 'Sir Owais' },
      { id: 'a2', title: 'Mid-Term Date Sheet', date: 'Oct 20, 2025', content: 'The mid-term exams will commence from Nov 15th. Check the download section for the date sheet.', author: 'Admin' }
    ],
    resources: [
      { id: 'r1', title: 'DIT Syllabus Outline', type: 'pdf', url: '#', size: '1.2 MB' },
      { id: 'r2', title: 'MS Office Shortcut Keys', type: 'doc', url: '#', size: '450 KB' },
      { id: 'r3', title: 'C++ Compiler Setup Guide', type: 'pdf', url: '#', size: '2.5 MB' }
    ],
    modules: [
      {
        id: 'm1',
        title: 'Office Automation',
        lessons: [
          { id: 'l1', title: 'MS Word Advanced Formatting', type: 'video', content: 'https://www.youtube.com/embed/S-nHYzK-BVg', duration: '45:00' },
          { id: 'l2', title: 'Excel Formulas & Functions', type: 'text', content: 'Mastering VLOOKUP, HLOOKUP, and Pivot Tables is essential for data analysis...', duration: '30 min read' }
        ]
      },
      {
        id: 'm2',
        title: 'Mid-Term Assessment',
        lessons: [
          { 
            id: 'q1', 
            title: 'Office Automation Quiz', 
            type: 'quiz', 
            content: 'quiz-1', 
            duration: '20 min',
            quizData: {
              id: 'quiz-1',
              passingScore: 70,
              questions: [
                {
                  id: 'qq1',
                  text: 'Which function is used to find the highest value in a range?',
                  options: ['=SUM()', '=MAX()', '=TOP()', '=HIGH()'],
                  correctOptionIndex: 1
                },
                {
                  id: 'qq2',
                  text: 'What is the shortcut key for "Save" in MS Word?',
                  options: ['Ctrl+S', 'Ctrl+Alt+S', 'Shift+S', 'F5'],
                  correctOptionIndex: 0
                }
              ]
            }
          }
        ]
      }
    ]
  },
  {
    id: 'web-dev',
    title: 'Full Stack Web Development',
    description: 'Become a professional developer with HTML5, CSS3, JavaScript, React, and Node.js. Build real-world projects.',
    instructor: 'Engr. Ali Khan',
    thumbnail: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    category: 'Development',
    enrolledStudents: 89,
    rating: 4.8,
    price: 25000,
    announcements: [
      { id: 'wd-a1', title: 'Project Submission Guidelines', date: 'Oct 18, 2025', content: 'All final projects must be deployed on Vercel or Netlify. Submit the live link.', author: 'Engr. Ali Khan' }
    ],
    resources: [
      { id: 'wd-r1', title: 'VS Code Setup & Extensions', type: 'pdf', url: '#', size: '1.5 MB' },
      { id: 'wd-r2', title: 'HTML5 Cheatsheet', type: 'pdf', url: '#', size: '800 KB' }
    ],
    modules: [
      {
        id: 'wd1',
        title: 'Frontend Basics',
        lessons: [
          { id: 'wdl1', title: 'HTML5 Semantic Structure', type: 'video', content: 'https://www.youtube.com/embed/k7I4x3uBnO8', duration: '20:00' },
          { id: 'wdl2', title: 'CSS Flexbox & Grid', type: 'text', content: 'Flexbox is a one-dimensional layout method for laying out items in rows or columns...', duration: '25 min read' }
        ]
      }
    ]
  },
  {
    id: 'graphic-design',
    title: 'Professional Graphic Design',
    description: 'Master Adobe Photoshop, Illustrator, and Canva. Learn color theory, typography, and branding.',
    instructor: 'Ms. Sara',
    thumbnail: 'https://images.unsplash.com/photo-1626785774573-4b799314347d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    category: 'Design',
    enrolledStudents: 210,
    rating: 4.7,
    price: 18000,
    modules: [
      {
        id: 'gd1',
        title: 'Adobe Photoshop',
        lessons: [
          { id: 'gdl1', title: 'Layers and Masks', type: 'video', content: 'https://www.youtube.com/embed/IyR_uYsRsPs', duration: '30:00' }
        ]
      }
    ]
  },
  {
    id: 'freelancing',
    title: 'AI Tools & Freelancing Mastery',
    description: 'Learn to use ChatGPT, Midjourney, and setup profiles on Upwork and Fiverr to start earning in dollars.',
    instructor: 'Sir Bilal',
    thumbnail: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    category: 'Business',
    enrolledStudents: 500,
    rating: 5.0,
    price: 15000,
    modules: [
      {
        id: 'f1',
        title: 'Upwork Profile Setup',
        lessons: [
          { id: 'fl1', title: 'Writing a Winning Proposal', type: 'text', content: 'The proposal is your first impression. Focus on the client\'s problem, not just your skills...', duration: '15 min read' }
        ]
      }
    ]
  },
  {
    id: 'yt-automation',
    title: 'YouTube Automation',
    description: 'Build a cash-cow YouTube channel without showing your face. Scripting, voiceovers, and editing.',
    instructor: 'Team CMTI',
    thumbnail: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    category: 'Marketing',
    enrolledStudents: 120,
    rating: 4.6,
    price: 20000,
    modules: [
      {
        id: 'yt1',
        title: 'Niche Selection',
        lessons: [
          { id: 'ytl1', title: 'Finding High CPM Niches', type: 'video', content: 'https://www.youtube.com/embed/jNQXAC9IVRw', duration: '25:00' }
        ]
      }
    ]
  },
  {
    id: 'ms-office',
    title: 'Advanced MS Office Suite',
    description: 'Corporate level training for Word, Excel, PowerPoint, and Access.',
    instructor: 'Sir Ahmed',
    thumbnail: 'https://images.unsplash.com/photo-1580894732444-8ecded7900cd?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    category: 'Productivity',
    enrolledStudents: 300,
    rating: 4.8,
    price: 12000,
    modules: [
      {
        id: 'ms1',
        title: 'Excel Mastery',
        lessons: [
          { id: 'msl1', title: 'Data Visualization', type: 'video', content: 'https://www.youtube.com/embed/r897q_72b3k', duration: '40:00' }
        ]
      }
    ]
  }
];

export const MOCK_USER: User = {
  id: 'u1',
  name: 'Student User',
  email: 'student@cmti.pk',
  studentId: 'CMTI-2025-0042',
  avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80',
  role: 'student',
  enrolledCourses: ['dit-1', 'freelancing']
};