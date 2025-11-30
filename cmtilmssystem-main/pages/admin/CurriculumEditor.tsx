import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCourses } from '../../context/CourseContext';
import { Button } from '../../components/Button';
import { ArrowLeft, Plus, Edit2, Trash2, Video, FileText, Award, File, ChevronDown, ChevronRight, Upload, Link as LinkIcon } from 'lucide-react';
import { Course, Module, Lesson } from '../../types';

export const CurriculumEditor: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { courses, updateCourse } = useCourses();
  
  const course = courses.find(c => c.id === id);

  // Local state for UI
  const [editingModule, setEditingModule] = useState<Module | null>(null);
  const [editingLesson, setEditingLesson] = useState<{moduleId: string, lesson: Lesson} | null>(null);
  const [expandedModules, setExpandedModules] = useState<Set<string>>(new Set());
  
  // State for file upload vs url toggle
  const [uploadMode, setUploadMode] = useState<'url' | 'file'>('url');

  if (!course) return <div>Course not found</div>;

  const toggleModule = (modId: string) => {
    const newSet = new Set(expandedModules);
    if (newSet.has(modId)) newSet.delete(modId);
    else newSet.add(modId);
    setExpandedModules(newSet);
  };

  // --- Module Actions ---
  const handleAddModule = () => {
    const newModule: Module = {
      id: `mod-${Date.now()}`,
      title: 'New Module',
      lessons: []
    };
    updateCourse({
      ...course,
      modules: [...course.modules, newModule]
    });
    setExpandedModules(prev => new Set(prev).add(newModule.id));
    setEditingModule(newModule);
  };

  const handleSaveModule = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingModule) return;
    const updatedModules = course.modules.map(m => m.id === editingModule.id ? editingModule : m);
    updateCourse({ ...course, modules: updatedModules });
    setEditingModule(null);
  };

  const handleDeleteModule = (moduleId: string) => {
    if(!window.confirm("Delete this module and all its lessons?")) return;
    updateCourse({
      ...course,
      modules: course.modules.filter(m => m.id !== moduleId)
    });
  };

  // --- Lesson Actions ---
  const handleAddLesson = (moduleId: string) => {
    const newLesson: Lesson = {
      id: `less-${Date.now()}`,
      title: 'New Lesson',
      type: 'video',
      content: '',
      duration: '10:00'
    };
    setEditingLesson({ moduleId, lesson: newLesson });
    setUploadMode('url');
  };

  const handleSaveLesson = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingLesson) return;

    const moduleIndex = course.modules.findIndex(m => m.id === editingLesson.moduleId);
    if (moduleIndex === -1) return;

    const currentModule = course.modules[moduleIndex];
    const lessonExists = currentModule.lessons.some(l => l.id === editingLesson.lesson.id);

    let updatedLessons;
    if (lessonExists) {
        updatedLessons = currentModule.lessons.map(l => l.id === editingLesson.lesson.id ? editingLesson.lesson : l);
    } else {
        updatedLessons = [...currentModule.lessons, editingLesson.lesson];
    }

    const updatedModule = { ...currentModule, lessons: updatedLessons };
    const updatedModules = [...course.modules];
    updatedModules[moduleIndex] = updatedModule;

    updateCourse({ ...course, modules: updatedModules });
    setEditingLesson(null);
  };

  const handleDeleteLesson = (moduleId: string, lessonId: string) => {
    if(!window.confirm("Delete this lesson?")) return;
    const updatedModules = course.modules.map(m => {
        if(m.id === moduleId) {
            return { ...m, lessons: m.lessons.filter(l => l.id !== lessonId) };
        }
        return m;
    });
    updateCourse({ ...course, modules: updatedModules });
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && editingLesson) {
      // In a real application, you would upload this file to a server (AWS S3, etc.)
      // and get back a persistent URL. 
      // For this demo, we create a local ObjectURL. Note: This URL is temporary and 
      // will be lost if you refresh the page.
      const objectUrl = URL.createObjectURL(file);
      
      setEditingLesson({
        ...editingLesson,
        lesson: {
          ...editingLesson.lesson,
          content: objectUrl
        }
      });
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
            <Button variant="outline" onClick={() => navigate('/admin')}>
                <ArrowLeft className="w-4 h-4 mr-2" /> Done
            </Button>
            <div>
                <h1 className="text-2xl font-bold text-gray-900">Curriculum Editor</h1>
                <p className="text-gray-500 text-sm">{course.title}</p>
            </div>
        </div>
        <Button onClick={handleAddModule}>
            <Plus className="w-4 h-4 mr-2" /> Add Module
        </Button>
      </div>

      {/* Modules List */}
      <div className="space-y-4">
        {course.modules.length === 0 && (
            <div className="text-center py-12 bg-gray-50 rounded-xl border border-dashed border-gray-300">
                <p className="text-gray-500">No content yet. Click "Add Module" to start.</p>
            </div>
        )}

        {course.modules.map((module) => (
            <div key={module.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
                <div className="bg-gray-50 px-4 py-3 flex items-center justify-between">
                    <div className="flex items-center gap-2 flex-1 cursor-pointer" onClick={() => toggleModule(module.id)}>
                        {expandedModules.has(module.id) ? <ChevronDown className="w-5 h-5 text-gray-400" /> : <ChevronRight className="w-5 h-5 text-gray-400" />}
                        <h3 className="font-bold text-gray-800">{module.title}</h3>
                        <span className="text-xs text-gray-500">({module.lessons.length} lessons)</span>
                    </div>
                    <div className="flex gap-2">
                        <Button size="sm" variant="ghost" onClick={() => setEditingModule(module)}>
                            <Edit2 className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="ghost" className="text-red-500" onClick={() => handleDeleteModule(module.id)}>
                            <Trash2 className="w-4 h-4" />
                        </Button>
                    </div>
                </div>

                {expandedModules.has(module.id) && (
                    <div className="p-4 bg-white border-t border-gray-100">
                        <div className="space-y-2">
                            {module.lessons.map(lesson => (
                                <div key={lesson.id} className="flex items-center justify-between p-3 border border-gray-100 rounded-md hover:bg-gray-50 group">
                                    <div className="flex items-center gap-3">
                                        {lesson.type === 'video' && <Video className="w-4 h-4 text-blue-500" />}
                                        {lesson.type === 'text' && <FileText className="w-4 h-4 text-gray-500" />}
                                        {lesson.type === 'quiz' && <Award className="w-4 h-4 text-orange-500" />}
                                        {lesson.type === 'pdf' && <File className="w-4 h-4 text-red-500" />}
                                        <span className="text-sm font-medium">{lesson.title}</span>
                                    </div>
                                    <div className="opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
                                         <Button size="sm" variant="ghost" onClick={() => {
                                            setEditingLesson({ moduleId: module.id, lesson });
                                            // Determine default mode based on content content
                                            setUploadMode(lesson.content.startsWith('blob:') ? 'file' : 'url');
                                          }}>
                                            <Edit2 className="w-3 h-3" />
                                        </Button>
                                        <Button size="sm" variant="ghost" className="text-red-500" onClick={() => handleDeleteLesson(module.id, lesson.id)}>
                                            <Trash2 className="w-3 h-3" />
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <Button size="sm" variant="outline" className="mt-4 w-full" onClick={() => handleAddLesson(module.id)}>
                            <Plus className="w-4 h-4 mr-2" /> Add Lesson Material
                        </Button>
                    </div>
                )}
            </div>
        ))}
      </div>

      {/* Module Edit Modal (Overlay) */}
      {editingModule && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
              <div className="bg-white rounded-xl p-6 w-full max-w-md">
                  <h3 className="text-lg font-bold mb-4">Edit Module</h3>
                  <form onSubmit={handleSaveModule}>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Module Title</label>
                      <input 
                        type="text" 
                        required
                        className="w-full border border-gray-300 rounded-md px-3 py-2 mb-4"
                        value={editingModule.title}
                        onChange={e => setEditingModule({ ...editingModule, title: e.target.value })}
                      />
                      <div className="flex justify-end gap-2">
                          <Button type="button" variant="ghost" onClick={() => setEditingModule(null)}>Cancel</Button>
                          <Button type="submit">Save</Button>
                      </div>
                  </form>
              </div>
          </div>
      )}

      {/* Lesson Edit Modal (Overlay) */}
      {editingLesson && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
              <div className="bg-white rounded-xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto">
                  <h3 className="text-lg font-bold mb-4">{editingLesson.lesson.id.startsWith('less-') && !course.modules.flatMap(m=>m.lessons).find(l=>l.id===editingLesson.lesson.id) ? 'Add New Lesson' : 'Edit Lesson'}</h3>
                  <form onSubmit={handleSaveLesson} className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                        <input 
                            type="text" 
                            required
                            className="w-full border border-gray-300 rounded-md px-3 py-2"
                            value={editingLesson.lesson.title}
                            onChange={e => setEditingLesson({ ...editingLesson, lesson: { ...editingLesson.lesson, title: e.target.value } })}
                        />
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                            <select 
                                className="w-full border border-gray-300 rounded-md px-3 py-2"
                                value={editingLesson.lesson.type}
                                onChange={e => {
                                  const newType = e.target.value as any;
                                  setEditingLesson({ ...editingLesson, lesson: { ...editingLesson.lesson, type: newType } });
                                  // Reset content if switching types drastically
                                  if (newType === 'quiz') setUploadMode('url');
                                }}
                            >
                                <option value="video">Video</option>
                                <option value="pdf">PDF / Book</option>
                                <option value="text">Text / Article</option>
                                <option value="quiz">Quiz</option>
                            </select>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Duration</label>
                            <input 
                                type="text" 
                                className="w-full border border-gray-300 rounded-md px-3 py-2"
                                placeholder="e.g. 10:00 or 15 mins"
                                value={editingLesson.lesson.duration}
                                onChange={e => setEditingLesson({ ...editingLesson, lesson: { ...editingLesson.lesson, duration: e.target.value } })}
                            />
                          </div>
                      </div>

                      {/* Dynamic Input based on Type */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                           Content Source
                        </label>
                        
                        {(editingLesson.lesson.type === 'video' || editingLesson.lesson.type === 'pdf') && (
                          <div className="flex border-b border-gray-200 mb-4">
                            <button
                              type="button"
                              className={`flex-1 pb-2 text-sm font-medium ${uploadMode === 'url' ? 'border-b-2 border-primary-500 text-primary-600' : 'text-gray-500'}`}
                              onClick={() => setUploadMode('url')}
                            >
                              <div className="flex items-center justify-center gap-2">
                                <LinkIcon className="w-4 h-4"/> External Link
                              </div>
                            </button>
                            <button
                              type="button"
                              className={`flex-1 pb-2 text-sm font-medium ${uploadMode === 'file' ? 'border-b-2 border-primary-500 text-primary-600' : 'text-gray-500'}`}
                              onClick={() => setUploadMode('file')}
                            >
                              <div className="flex items-center justify-center gap-2">
                                <Upload className="w-4 h-4"/> Upload from Laptop
                              </div>
                            </button>
                          </div>
                        )}

                        {editingLesson.lesson.type === 'text' ? (
                            <textarea 
                                className="w-full border border-gray-300 rounded-md px-3 py-2 h-32"
                                value={editingLesson.lesson.content}
                                onChange={e => setEditingLesson({ ...editingLesson, lesson: { ...editingLesson.lesson, content: e.target.value } })}
                                placeholder="Enter article content here..."
                            />
                        ) : uploadMode === 'file' && (editingLesson.lesson.type === 'video' || editingLesson.lesson.type === 'pdf') ? (
                            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                                <input 
                                  type="file" 
                                  id="file-upload" 
                                  className="hidden" 
                                  accept={editingLesson.lesson.type === 'video' ? "video/mp4,video/webm" : "application/pdf"}
                                  onChange={handleFileUpload}
                                />
                                <label htmlFor="file-upload" className="cursor-pointer flex flex-col items-center">
                                    <Upload className="w-8 h-8 text-gray-400 mb-2" />
                                    <span className="text-primary-600 font-medium hover:text-primary-500">Click to upload {editingLesson.lesson.type}</span>
                                    <span className="text-xs text-gray-500 mt-1">
                                      {editingLesson.lesson.content.startsWith('blob:') ? 'File selected (Session Only)' : 'No file selected'}
                                    </span>
                                </label>
                                {editingLesson.lesson.content.startsWith('blob:') && (
                                  <p className="text-xs text-green-600 mt-2">File ready for preview.</p>
                                )}
                            </div>
                        ) : (
                            <input 
                                type="text" 
                                className="w-full border border-gray-300 rounded-md px-3 py-2"
                                placeholder={
                                  editingLesson.lesson.type === 'video' ? 'https://www.youtube.com/embed/...' : 
                                  editingLesson.lesson.type === 'pdf' ? 'https://example.com/book.pdf' :
                                  'Quiz ID'
                                }
                                value={editingLesson.lesson.content}
                                onChange={e => setEditingLesson({ ...editingLesson, lesson: { ...editingLesson.lesson, content: e.target.value } })}
                            />
                        )}
                        
                        <p className="text-xs text-gray-500 mt-2">
                            {editingLesson.lesson.type === 'video' && uploadMode === 'url' && 'Paste the embed URL for YouTube/Vimeo.'}
                            {editingLesson.lesson.type === 'video' && uploadMode === 'file' && 'Note: Uploaded files are available for this session only in this demo.'}
                        </p>
                      </div>

                      <div className="flex justify-end gap-2 pt-4">
                          <Button type="button" variant="ghost" onClick={() => setEditingLesson(null)}>Cancel</Button>
                          <Button type="submit">Save Lesson</Button>
                      </div>
                  </form>
              </div>
          </div>
      )}
    </div>
  );
};