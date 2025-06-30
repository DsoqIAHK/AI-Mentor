import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Brain, ArrowLeft, FileText, Target, Award, Lightbulb, User, Save, Upload } from 'lucide-react';
import { useApp } from '../context/AppContext';

const KnowledgeBase: React.FC = () => {
  const navigate = useNavigate();
  const { knowledgeBase, updateKnowledgeBase } = useApp();
  const [activeSection, setActiveSection] = useState('resume');
  const [formData, setFormData] = useState(knowledgeBase);
  const [saved, setSaved] = useState(false);

  const sections = [
    { id: 'resume', title: 'Resume & Experience', icon: FileText, description: 'Your professional background, work history, and qualifications' },
    { id: 'goals', title: 'Career Goals', icon: Target, description: 'Short-term and long-term career objectives' },
    { id: 'achievements', title: 'Achievements', icon: Award, description: 'Your proudest professional accomplishments' },
    { id: 'skills', title: 'Skills & Expertise', icon: User, description: 'Technical and soft skills you\'ve mastered' },
    { id: 'inspiration', title: 'Inspiration & Content', icon: Lightbulb, description: 'Articles, books, or content that inspires your career journey' }
  ];

  const handleSave = () => {
    Object.keys(formData).forEach(section => {
      updateKnowledgeBase(section, formData[section as keyof typeof formData]);
    });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type === 'text/plain') {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        setFormData({ ...formData, [activeSection]: content });
      };
      reader.readAsText(file);
    }
  };

  const getCompletionStatus = (section: string) => {
    const content = formData[section as keyof typeof formData];
    return content && content.trim().length > 50 ? 'Complete' : content && content.trim().length > 0 ? 'Partial' : 'Empty';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Complete': return 'text-green-600 bg-green-100';
      case 'Partial': return 'text-yellow-600 bg-yellow-100';
      default: return 'text-gray-500 bg-gray-100';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate('/dashboard')}
                className="text-gray-600 hover:text-gray-900 flex items-center space-x-2"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Back to Dashboard</span>
              </button>
              <div className="h-6 border-l border-gray-300" />
              <div className="flex items-center space-x-2">
                <Brain className="h-6 w-6 text-blue-600" />
                <span className="text-lg font-semibold text-gray-900">Knowledge Base</span>
              </div>
            </div>
            <button
              onClick={handleSave}
              className={`px-4 py-2 rounded-lg font-medium flex items-center space-x-2 transition-all ${
                saved 
                  ? 'bg-green-600 text-white' 
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              <Save className="h-4 w-4" />
              <span>{saved ? 'Saved!' : 'Save Changes'}</span>
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Sections</h3>
              <nav className="space-y-2">
                {sections.map((section) => {
                  const status = getCompletionStatus(section.id);
                  return (
                    <button
                      key={section.id}
                      onClick={() => setActiveSection(section.id)}
                      className={`w-full text-left p-3 rounded-lg transition-colors ${
                        activeSection === section.id
                          ? 'bg-blue-50 text-blue-900 border border-blue-200'
                          : 'hover:bg-gray-50'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center space-x-2">
                          <section.icon className="h-4 w-4 text-gray-600" />
                          <span className="font-medium text-sm">{section.title}</span>
                        </div>
                        <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(status)}`}>
                          {status}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              {sections.map((section) => (
                activeSection === section.id && (
                  <div key={section.id} className="p-6">
                    <div className="flex items-center justify-between mb-6">
                      <div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">{section.title}</h2>
                        <p className="text-gray-600">{section.description}</p>
                      </div>
                      <label className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors cursor-pointer flex items-center space-x-2">
                        <Upload className="h-4 w-4" />
                        <span>Upload File</span>
                        <input
                          type="file"
                          accept=".txt"
                          onChange={handleFileUpload}
                          className="hidden"
                        />
                      </label>
                    </div>

                    {/* Content Examples */}
                    {section.id === 'resume' && (
                      <div className="mb-6 p-4 bg-blue-50 rounded-lg">
                        <h4 className="font-medium text-blue-900 mb-2">What to include:</h4>
                        <ul className="text-sm text-blue-800 space-y-1">
                          <li>• Complete work history with roles and responsibilities</li>
                          <li>• Education background and certifications</li>
                          <li>• Key projects and accomplishments</li>
                          <li>• Technical skills and tools</li>
                        </ul>
                      </div>
                    )}

                    {section.id === 'goals' && (
                      <div className="mb-6 p-4 bg-green-50 rounded-lg">
                        <h4 className="font-medium text-green-900 mb-2">Examples of career goals:</h4>
                        <ul className="text-sm text-green-800 space-y-1">
                          <li>• "Get promoted to Senior Manager within 18 months"</li>
                          <li>• "Transition into product management by 2026"</li>
                          <li>• "Lead a team of 10+ engineers"</li>
                          <li>• "Develop expertise in AI/ML technologies"</li>
                        </ul>
                      </div>
                    )}

                    {section.id === 'achievements' && (
                      <div className="mb-6 p-4 bg-purple-50 rounded-lg">
                        <h4 className="font-medium text-purple-900 mb-2">Achievement examples:</h4>
                        <ul className="text-sm text-purple-800 space-y-1">
                          <li>• "Increased team productivity by 40% through process optimization"</li>
                          <li>• "Led successful product launch reaching 100K users in 6 months"</li>
                          <li>• "Received 'Employee of the Year' award in 2023"</li>
                          <li>• "Mentored 5 junior developers, 3 got promoted"</li>
                        </ul>
                      </div>
                    )}

                    <textarea
                      value={formData[section.id as keyof typeof formData]}
                      onChange={(e) => setFormData({ ...formData, [section.id]: e.target.value })}
                      className="w-full h-96 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                      placeholder={`Enter your ${section.title.toLowerCase()} here...`}
                    />

                    <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
                      <div>
                        {formData[section.id as keyof typeof formData].length} characters
                      </div>
                      <div>
                        Status: <span className={`font-medium ${getStatusColor(getCompletionStatus(section.id)).split(' ')[0]}`}>
                          {getCompletionStatus(section.id)}
                        </span>
                      </div>
                    </div>
                  </div>
                )
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KnowledgeBase;