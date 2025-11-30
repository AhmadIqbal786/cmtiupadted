import React from 'react';
import { HashRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { Dashboard } from './pages/Dashboard';
import { CourseCatalog } from './pages/CourseCatalog';
import { CourseDetail } from './pages/CourseDetail';
import { LessonView } from './pages/LessonView';
import { Login } from './pages/Login';
import { Signup } from './pages/Signup';
import { Checkout } from './pages/Checkout';
import { QuizView } from './pages/QuizView';
import { Certificate } from './pages/Certificate';
import { CourseProvider } from './context/CourseContext';

// Admin Pages
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { CourseEditor } from './pages/admin/CourseEditor';
import { CurriculumEditor } from './pages/admin/CurriculumEditor';

// Simple Auth State Mock (In real app, use Context)
export const useAuth = () => {
  const user = localStorage.getItem('cmti_user');
  const parsedUser = user ? JSON.parse(user) : null;
  return {
    isAuthenticated: !!user,
    user: parsedUser,
    login: (userData: any) => localStorage.setItem('cmti_user', JSON.stringify(userData)),
    logout: () => localStorage.removeItem('cmti_user'),
    isAdmin: parsedUser?.role === 'admin'
  };
};

// Protected Route Component
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
};

// Admin Route Component
const AdminRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated, isAdmin } = useAuth();
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  if (!isAdmin) {
    return <Navigate to="/dashboard" replace />;
  }
  return <>{children}</>;
};

// Wrapper to conditionally apply layout
const LayoutWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const hideLayoutPaths = ['/login', '/signup', '/certificate'];
  const isHidden = hideLayoutPaths.some(path => location.pathname.startsWith(path)) || location.pathname.includes('/lesson/') || location.pathname.includes('/quiz/');
  
  if (isHidden) {
    return <>{children}</>;
  }

  return <Layout>{children}</Layout>;
};

const App: React.FC = () => {
  return (
    <CourseProvider>
      <Router>
        <LayoutWrapper>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/courses" element={<CourseCatalog />} />
            <Route path="/course/:id" element={<CourseDetail />} />
            
            {/* Protected Routes */}
            <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/checkout/:courseId" element={<ProtectedRoute><Checkout /></ProtectedRoute>} />
            <Route path="/lesson/:courseId/:lessonId" element={<ProtectedRoute><LessonView /></ProtectedRoute>} />
            <Route path="/quiz/:courseId/:lessonId" element={<ProtectedRoute><QuizView /></ProtectedRoute>} />
            <Route path="/certificate/:courseId" element={<ProtectedRoute><Certificate /></ProtectedRoute>} />

            {/* Admin Routes */}
            <Route path="/admin" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
            <Route path="/admin/course/:id" element={<AdminRoute><CourseEditor /></AdminRoute>} />
            <Route path="/admin/course/:id/curriculum" element={<AdminRoute><CurriculumEditor /></AdminRoute>} />
          </Routes>
        </LayoutWrapper>
      </Router>
    </CourseProvider>
  );
};

export default App;