import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, BookOpen, LogOut, Menu, X, GraduationCap, Settings, Bell, HelpCircle, Mail } from 'lucide-react';
import { useAuth } from '../App';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, user, logout, isAdmin } = useAuth();

  const navItems = [
    { label: 'Home', path: '/', icon: LayoutDashboard, public: true },
    { label: 'Course Catalog', path: '/courses', icon: BookOpen, public: true },
    { label: 'LMS Dashboard', path: '/dashboard', icon: LayoutDashboard, public: false },
  ];

  const filteredItems = navItems.filter(item => item.public || isAuthenticated);

  if (isAdmin) {
    filteredItems.push({ label: 'Admin Panel', path: '/admin', icon: Settings, public: false });
  }

  const isActive = (path: string) => location.pathname === path;

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 font-sans">
      {/* Top Institutional Bar */}
      <div className="bg-primary-900 text-white text-xs py-2 px-4 border-b border-primary-800">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-4">
             <span className="opacity-80 hidden sm:inline">Coded Mind Technology Incubator (CMTI)</span>
             <a href="#" className="flex items-center hover:text-primary-200"><Mail className="w-3 h-3 mr-1" /> webmaster@cmti.pk</a>
             <a href="#" className="flex items-center hover:text-primary-200"><HelpCircle className="w-3 h-3 mr-1" /> Support</a>
          </div>
          <div className="flex items-center space-x-4">
            {isAuthenticated && user && (
              <span className="font-mono bg-primary-800 px-2 py-0.5 rounded text-primary-200">ID: {user.studentId || 'N/A'}</span>
            )}
            <span className="opacity-60">{new Date().toDateString()}</span>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link to="/" className="flex-shrink-0 flex items-center gap-3">
                <div className="bg-gradient-to-br from-primary-700 to-primary-500 text-white p-2.5 rounded-lg shadow-md">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <div className="flex flex-col">
                   <span className="font-bold text-xl text-gray-900 tracking-tight leading-none">CMTI</span>
                   <span className="text-[10px] text-gray-500 uppercase tracking-[0.2em] leading-none mt-0.5">Learning Management System</span>
                </div>
              </Link>
              <div className="hidden sm:ml-10 sm:flex sm:space-x-8">
                {filteredItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium h-16 transition-colors ${
                      isActive(item.path)
                        ? 'border-primary-600 text-primary-700'
                        : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                    }`}
                  >
                    <item.icon className={`w-4 h-4 mr-2 ${isActive(item.path) ? 'text-primary-600' : 'text-gray-400'}`} />
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
            
            {/* User Menu Desktop */}
            <div className="hidden sm:ml-6 sm:flex sm:items-center gap-4">
              {isAuthenticated && user ? (
                <>
                  <button className="p-2 text-gray-400 hover:text-primary-600 relative">
                    <Bell className="w-5 h-5" />
                    <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
                  </button>
                  <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
                    <div className="text-right hidden md:block">
                      <p className="text-sm font-medium text-gray-900 leading-tight">{user.name}</p>
                      <p className="text-[10px] text-gray-500 uppercase">{isAdmin ? 'Administrator' : 'Student'}</p>
                    </div>
                    <img
                      className="h-9 w-9 rounded-full ring-2 ring-white border border-gray-200 object-cover"
                      src={user.avatar}
                      alt={user.name}
                    />
                  </div>
                  <button 
                    onClick={handleLogout}
                    className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                    title="Sign Out"
                  >
                    <LogOut className="w-5 h-5" />
                  </button>
                </>
              ) : (
                <div className="flex items-center gap-3">
                  <Link to="/login" className="text-gray-600 hover:text-primary-700 font-medium text-sm px-3 py-2">
                    Log in
                  </Link>
                  <Link to="/signup" className="bg-primary-600 text-white px-5 py-2 rounded-full text-sm font-medium hover:bg-primary-700 shadow-sm transition-all hover:shadow-md">
                    Sign Up
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="flex items-center sm:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500"
              >
                {isMobileMenuOpen ? (
                  <X className="block h-6 w-6" />
                ) : (
                  <Menu className="block h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="sm:hidden bg-white border-t border-gray-200">
            <div className="pt-2 pb-3 space-y-1">
              {filteredItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block pl-3 pr-4 py-2 border-l-4 text-base font-medium ${
                    isActive(item.path)
                      ? 'bg-primary-50 border-primary-500 text-primary-700'
                      : 'border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700'
                  }`}
                >
                  <div className="flex items-center">
                    <item.icon className="w-5 h-5 mr-3" />
                    {item.label}
                  </div>
                </Link>
              ))}
            </div>
            
            <div className="pt-4 pb-4 border-t border-gray-200">
              {isAuthenticated && user ? (
                <>
                  <div className="flex items-center px-4">
                    <div className="flex-shrink-0">
                      <img
                        className="h-10 w-10 rounded-full"
                        src={user.avatar}
                        alt=""
                      />
                    </div>
                    <div className="ml-3">
                      <div className="text-base font-medium text-gray-800">{user.name}</div>
                      <div className="text-sm font-medium text-gray-500">{user.email}</div>
                    </div>
                  </div>
                  <div className="mt-3 px-2">
                     <button
                        onClick={handleLogout}
                        className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-500 hover:text-gray-900 hover:bg-gray-50"
                      >
                        Sign Out
                      </button>
                  </div>
                </>
              ) : (
                <div className="px-4 space-y-2">
                   <Link to="/login" className="block w-full text-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-primary-600 bg-gray-50 hover:bg-gray-100">
                     Log in
                   </Link>
                   <Link to="/signup" className="block w-full text-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-primary-600 hover:bg-primary-700">
                     Sign Up
                   </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-grow">
        {children}
      </main>
      
      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-auto">
        <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
           <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
             <div>
               <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase mb-4">Contact Us</h3>
               <p className="text-gray-500 text-sm">Katlang, Mirza Plaza, 1st Floor</p>
               <p className="text-gray-500 text-sm">contact@cmti.pk</p>
               <p className="text-gray-500 text-sm">+92 300 1234567</p>
             </div>
             <div>
               <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase mb-4">Quick Links</h3>
               <div className="space-y-2">
                 <Link to="/courses" className="block text-gray-500 text-sm hover:text-primary-600">All Courses</Link>
                 <Link to="/login" className="block text-gray-500 text-sm hover:text-primary-600">Student Login</Link>
               </div>
             </div>
             <div>
               <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase mb-4">Legal</h3>
               <div className="space-y-2">
                 <a href="#" className="block text-gray-500 text-sm hover:text-primary-600">Privacy Policy</a>
                 <a href="#" className="block text-gray-500 text-sm hover:text-primary-600">Terms of Service</a>
               </div>
             </div>
           </div>
          <p className="text-center text-sm text-gray-400 border-t border-gray-100 pt-8">
            &copy; {new Date().getFullYear()} Coded Mind Technology Incubator (CMTI). All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};