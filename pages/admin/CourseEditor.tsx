import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCourses } from '../../context/CourseContext';
import { Button } from '../../components/Button';
import { ArrowLeft, Save } from 'lucide-react';
import { Course } from '../../types';

export const CourseEditor: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { courses, addCourse, updateCourse } = useCourses();
  
  const isNew = !id || id === 'new';

  const [formData, setFormData] = useState<Partial<Course>>({
    title: '',
    description: '',
    instructor: '',
    price: 0,
    category: '',
    thumbnail: '',
    modules: [],
    enrolledStudents: 0,
    rating: 0
  });

  useEffect(() => {
    if (!isNew && id) {
      const course = courses.find(c => c.id === id);
      if (course) {
        setFormData(course);
      }
    }
  }, [id, courses, isNew]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isNew) {
      const newCourse: Course = {
        ...formData as Course,
        id: `course-${Date.now()}`,
        modules: [],
        enrolledStudents: 0,
        rating: 0
      };
      addCourse(newCourse);
      navigate(`/admin/course/${newCourse.id}/curriculum`);
    } else {
      updateCourse(formData as Course);
      navigate('/admin');
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <div className="flex items-center gap-4 mb-8">
        <Button variant="outline" onClick={() => navigate('/admin')}>
          <ArrowLeft className="w-4 h-4 mr-2" /> Back
        </Button>
        <h1 className="text-2xl font-bold text-gray-900">{isNew ? 'Create New Course' : 'Edit Course Details'}</h1>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700">Course Title</label>
              <input
                type="text"
                required
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                value={formData.title}
                onChange={e => setFormData({ ...formData, title: e.target.value })}
              />
            </div>

            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700">Description</label>
              <textarea
                required
                rows={4}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                value={formData.description}
                onChange={e => setFormData({ ...formData, description: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Instructor Name</label>
              <input
                type="text"
                required
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                value={formData.instructor}
                onChange={e => setFormData({ ...formData, instructor: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Category</label>
              <select
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                value={formData.category}
                onChange={e => setFormData({ ...formData, category: e.target.value })}
              >
                <option value="">Select Category</option>
                <option value="Diploma">Diploma</option>
                <option value="Development">Development</option>
                <option value="Design">Design</option>
                <option value="Business">Business</option>
                <option value="Marketing">Marketing</option>
                <option value="Productivity">Productivity</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Price (PKR)</label>
              <input
                type="number"
                required
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                value={formData.price}
                onChange={e => setFormData({ ...formData, price: Number(e.target.value) })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Thumbnail URL</label>
              <input
                type="url"
                required
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                value={formData.thumbnail}
                onChange={e => setFormData({ ...formData, thumbnail: e.target.value })}
                placeholder="https://example.com/image.jpg"
              />
            </div>
          </div>

          <div className="pt-4 flex justify-end">
            <Button type="submit">
              <Save className="w-4 h-4 mr-2" />
              {isNew ? 'Create & Continue' : 'Save Changes'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};