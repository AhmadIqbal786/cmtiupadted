import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useCourses } from '../context/CourseContext';
import { useAuth } from '../App';
import { Button } from '../components/Button';
import { Download, Share2, ArrowLeft } from 'lucide-react';

export const Certificate: React.FC = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const { courses } = useCourses();
  const course = courses.find(c => c.id === courseId);
  const { user } = useAuth();

  if (!course || !user) return <div>Data not found</div>;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-12 px-4">
      <div className="mb-8 w-full max-w-4xl flex justify-between items-center no-print">
        <Link to="/dashboard">
           <Button variant="outline"><ArrowLeft className="w-4 h-4 mr-2"/> Back to Dashboard</Button>
        </Link>
        <div className="flex gap-2">
           <Button onClick={handlePrint}><Download className="w-4 h-4 mr-2"/> Download PDF</Button>
           <Button variant="secondary"><Share2 className="w-4 h-4 mr-2"/> Share</Button>
        </div>
      </div>

      {/* Certificate Template */}
      <div className="bg-white p-12 w-full max-w-4xl aspect-[1.414/1] shadow-2xl relative border-[20px] border-double border-primary-900 text-center flex flex-col items-center justify-center bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')]">
        
        {/* Corner Decorations */}
        <div className="absolute top-4 left-4 w-16 h-16 border-t-4 border-l-4 border-yellow-500"></div>
        <div className="absolute top-4 right-4 w-16 h-16 border-t-4 border-r-4 border-yellow-500"></div>
        <div className="absolute bottom-4 left-4 w-16 h-16 border-b-4 border-l-4 border-yellow-500"></div>
        <div className="absolute bottom-4 right-4 w-16 h-16 border-b-4 border-r-4 border-yellow-500"></div>

        <div className="mb-8">
           <h1 className="text-4xl font-serif text-primary-800 uppercase tracking-widest mb-2">Certificate</h1>
           <span className="text-xl font-serif text-yellow-600 uppercase tracking-widest">of Completion</span>
        </div>

        <p className="text-gray-600 italic mb-6">This is to certify that</p>
        
        <h2 className="text-5xl font-script text-gray-900 mb-8 font-bold border-b-2 border-gray-300 pb-4 px-12 inline-block min-w-[400px]">
          {user.name}
        </h2>

        <p className="text-gray-600 italic mb-6">has successfully completed the course</p>

        <h3 className="text-3xl font-bold text-primary-700 mb-8 max-w-2xl">
          {course.title}
        </h3>

        <div className="flex justify-between items-end w-full px-12 mt-12">
           <div className="text-center">
              <div className="w-40 border-b border-gray-400 mb-2"></div>
              <p className="text-sm font-bold text-gray-500 uppercase">Instructor</p>
              <p className="text-xs text-gray-400">{course.instructor}</p>
           </div>

           <div className="flex flex-col items-center">
              <div className="w-24 h-24 mb-4 bg-primary-900 rounded-full flex items-center justify-center text-white font-bold border-4 border-yellow-500 shadow-lg">
                 CMTI
              </div>
              <p className="text-xs text-gray-400">Verify at www.cmti.pk</p>
           </div>

           <div className="text-center">
              <div className="w-40 border-b border-gray-400 mb-2">
                 {new Date().toLocaleDateString()}
              </div>
              <p className="text-sm font-bold text-gray-500 uppercase">Date</p>
           </div>
        </div>
      </div>
    </div>
  );
};