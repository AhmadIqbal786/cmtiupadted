import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/Button';
import { ArrowRight, Book, CheckCircle, Shield, Award, MapPin, Phone } from 'lucide-react';
import { useCourses } from '../context/CourseContext';
import { CourseCard } from '../components/CourseCard';

export const Home: React.FC = () => {
  const { courses } = useCourses();
  const featuredCourses = courses.slice(0, 4);

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-gray-900 to-gray-800 text-white overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1951&q=80" 
            alt="Students learning" 
            className="w-full h-full object-cover opacity-20"
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="lg:w-2/3">
            <span className="inline-block px-4 py-1 rounded-full bg-primary-600 text-sm font-semibold mb-6">
              Welcome to CMTI.pk
            </span>
            <h1 className="text-4xl tracking-tight font-extrabold sm:text-5xl md:text-6xl mb-6">
              Coded Mind Technology Incubator
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl">
              Empowering the youth of Pakistan with cutting-edge IT skills. 
              Join our certified courses in Programming, Freelancing, and Design.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/courses">
                <Button size="lg" className="w-full sm:w-auto flex items-center justify-center">
                  Explore Courses <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link to="/signup">
                <Button variant="outline" size="lg" className="w-full sm:w-auto bg-transparent border-white text-white hover:bg-white/10">
                  Join Now
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Stats/Features Banner */}
      <div className="bg-primary-600">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-3 text-center">
            <div className="flex flex-col items-center p-4">
              <div className="p-3 bg-primary-500 rounded-full mb-3">
                <Award className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white">Certified Diploma</h3>
              <p className="mt-2 text-primary-100">Recognized 1-Year DIT Program</p>
            </div>
            <div className="flex flex-col items-center p-4">
              <div className="p-3 bg-primary-500 rounded-full mb-3">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white">Placement Guarantee</h3>
              <p className="mt-2 text-primary-100">Internship opportunities for top students</p>
            </div>
            <div className="flex flex-col items-center p-4">
              <div className="p-3 bg-primary-500 rounded-full mb-3">
                <CheckCircle className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white">Freelancing Focus</h3>
              <p className="mt-2 text-primary-100">Learn to earn on Upwork & Fiverr</p>
            </div>
          </div>
        </div>
      </div>

      {/* Popular Courses */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-gray-900">Most Popular Programs</h2>
            <p className="mt-4 text-gray-500">Fast-track your career with our top-rated courses</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredCourses.map(course => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
          <div className="mt-12 text-center">
            <Link to="/courses">
              <Button variant="outline" size="lg">View All Courses</Button>
            </Link>
          </div>
        </div>
      </div>

      {/* About Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">
            <div>
              <h2 className="text-3xl font-extrabold text-gray-900 mb-6">About CMTI</h2>
              <p className="text-lg text-gray-600 mb-6">
                Located in the heart of Katlang at Mirza Plaza, Coded Mind Technology Incubator is the premier institute for digital skills. We bridge the gap between traditional education and modern industry demands.
              </p>
              <ul className="space-y-4 mb-8">
                <li className="flex items-start">
                  <CheckCircle className="flex-shrink-0 h-6 w-6 text-primary-600 mr-3" />
                  <span className="text-gray-600">State-of-the-art Computer Lab</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="flex-shrink-0 h-6 w-6 text-primary-600 mr-3" />
                  <span className="text-gray-600">Expert Instructors from Industry</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="flex-shrink-0 h-6 w-6 text-primary-600 mr-3" />
                  <span className="text-gray-600">High-speed Internet & Power Backup</span>
                </li>
              </ul>
              <div className="flex items-center gap-4 text-gray-600">
                <MapPin className="w-5 h-5 text-primary-600" />
                <span>Katlang, Mirza Plaza, 1st Floor</span>
              </div>
            </div>
            <div className="mt-10 lg:mt-0 relative">
              <div className="aspect-w-4 aspect-h-3 rounded-xl overflow-hidden shadow-2xl">
                 <img 
                   src="https://images.unsplash.com/photo-1531482615713-2afd69097998?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" 
                   alt="CMTI Lab" 
                   className="object-cover w-full h-full"
                 />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-primary-700">
        <div className="max-w-2xl mx-auto text-center py-16 px-4 sm:py-20 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
            <span className="block">Ready to start your journey?</span>
            <span className="block">Start your free trial today.</span>
          </h2>
          <p className="mt-4 text-lg leading-6 text-primary-100">
            Join thousands of students who have successfully launched their careers through CMTI.
          </p>
          <div className="mt-8">
            <Link to="/signup">
              <Button size="lg" className="bg-white text-primary-600 hover:bg-gray-50">
                Register Now
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};