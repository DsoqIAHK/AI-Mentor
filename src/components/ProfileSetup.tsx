import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Brain, ArrowLeft, ArrowRight, User, Settings, Target } from 'lucide-react';
import { useApp } from '../context/AppContext';

const ProfileSetup: React.FC = () => {
  const navigate = useNavigate();
  const { profile, createProfile, updateProfile } = useApp();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    mentorPersonality: 'Professional and Strategic',
    mentorStyle: 'Direct and Action-Oriented',
    goals: [] as string[],
    currentGoal: ''
  });

  // Initialize form data with existing profile
  useEffect(() => {
    if (profile) {
      setFormData({
        name: profile.name || '',
        mentorPersonality: profile.mentorPersonality || 'Professional and Strategic',
        mentorStyle: profile.mentorStyle || 'Direct and Action-Oriented',
        goals: profile.goals || [],
        currentGoal: ''
      });
    }
  }, [profile]);

  const personalities = [
    'Professional and Strategic',
    'Friendly and Supportive',
    'Direct and No-Nonsense',
    'Creative and Innovative',
    'Analytical and Data-Driven'
  ];

  const styles = [
    'Direct and Action-Oriented',
    'Thoughtful and Reflective',
    'Encouraging and Motivating',
    'Challenging and Growth-Focused',
    'Collaborative and Inclusive'
  ];

  const handleNext = async () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    } else {
      try {
        const profileData = {
          name: formData.name,
          mentor_personality: formData.mentorPersonality,
          mentor_style: formData.mentorStyle,
          goals: formData.goals
        };

        if (profile && profile.name) {
          // Update existing profile
          await updateProfile(profileData);
        } else {
          // Create new profile
          await createProfile(profileData);
        }
        
        navigate('/dashboard');
      } catch (error) {
        console.error('Error saving profile:', error);
      }
    }
  };

  const addGoal = () => {
    if (formData.currentGoal.trim()) {
      setFormData({
        ...formData,
        goals: [...formData.goals, formData.currentGoal.trim()],
        currentGoal: ''
      });
    }
  };

  const removeGoal = (index: number) => {
    setFormData({
      ...formData,
      goals: formData.goals.filter((_, i) => i !== index)
    });
  };

  const steps = [
    { number: 1, title: 'Personal Info', icon: User },
    { number: 2, title: 'Mentor Setup', icon: Settings },
    { number: 3, title: 'Goals', icon: Target }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Brain className="h-8 w-8 text-blue-600" />
              <span className="text-xl font-bold text-gray-900">CareerMentor AI</span>
            </div>
            <button
              onClick={() => navigate('/dashboard')}
              className="text-gray-600 hover:text-gray-900 flex items-center space-x-2"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Dashboard</span>
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Progress Steps */}
        <div className="mb-12">
          <div className="flex items-center justify-center mb-8">
            {steps.map((step, index) => (
              <React.Fragment key={step.number}>
                <div className={`flex items-center space-x-3 ${currentStep >= step.number ? 'text-blue-600' : 'text-gray-400'}`}>
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${
                    currentStep >= step.number ? 'bg-blue-600 border-blue-600 text-white' : 'border-gray-300'
                  }`}>
                    <step.icon className="h-5 w-5" />
                  </div>
                  <span className="font-medium">{step.title}</span>
                </div>
                {index < steps.length - 1 && (
                  <div className={`w-16 h-0.5 mx-4 ${currentStep > step.number ? 'bg-blue-600' : 'bg-gray-300'}`} />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Step Content */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          {currentStep === 1 && (
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                {profile && profile.name ? 'Update Your Profile' : 'Welcome to CareerMentor AI'}
              </h2>
              <p className="text-gray-600 mb-8">
                {profile && profile.name ? 'Update your information below.' : "Let's start by getting to know you better."}
              </p>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    What's your name?
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
                    placeholder="Enter your full name"
                  />
                </div>
                
                <div className="bg-blue-50 p-6 rounded-lg">
                  <h3 className="font-semibold text-blue-900 mb-2">What happens next?</h3>
                  <p className="text-blue-800 text-sm">
                    We'll help you customize your AI mentor's personality and communication style, 
                    then set up your knowledge base with your professional information.
                  </p>
                </div>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Customize Your AI Mentor</h2>
              <p className="text-gray-600 mb-8">Choose the personality and style that resonates with you.</p>
              
              <div className="space-y-8">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-4">
                    Mentor Personality
                  </label>
                  <div className="grid md:grid-cols-2 gap-3">
                    {personalities.map((personality) => (
                      <button
                        key={personality}
                        onClick={() => setFormData({ ...formData, mentorPersonality: personality })}
                        className={`p-4 border-2 rounded-lg text-left transition-all ${
                          formData.mentorPersonality === personality
                            ? 'border-blue-500 bg-blue-50 text-blue-900'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="font-medium">{personality}</div>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-4">
                    Communication Style
                  </label>
                  <div className="grid md:grid-cols-2 gap-3">
                    {styles.map((style) => (
                      <button
                        key={style}
                        onClick={() => setFormData({ ...formData, mentorStyle: style })}
                        className={`p-4 border-2 rounded-lg text-left transition-all ${
                          formData.mentorStyle === style
                            ? 'border-blue-500 bg-blue-50 text-blue-900'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="font-medium">{style}</div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Set Your Career Goals</h2>
              <p className="text-gray-600 mb-8">Add your short-term and long-term career objectives.</p>
              
              <div className="space-y-6">
                <div className="flex space-x-3">
                  <input
                    type="text"
                    value={formData.currentGoal}
                    onChange={(e) => setFormData({ ...formData, currentGoal: e.target.value })}
                    onKeyPress={(e) => e.key === 'Enter' && addGoal()}
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="e.g., Get promoted to Senior Manager within 18 months"
                  />
                  <button
                    onClick={addGoal}
                    className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                  >
                    Add
                  </button>
                </div>

                {formData.goals.length > 0 && (
                  <div className="space-y-3">
                    <h3 className="font-medium text-gray-900">Your Goals:</h3>
                    {formData.goals.map((goal, index) => (
                      <div key={index} className="flex items-center justify-between bg-gray-50 p-4 rounded-lg">
                        <span className="text-gray-900">{goal}</span>
                        <button
                          onClick={() => removeGoal(index)}
                          className="text-red-500 hover:text-red-700 font-medium text-sm"
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                <div className="bg-green-50 p-6 rounded-lg">
                  <h3 className="font-semibold text-green-900 mb-2">Almost Ready!</h3>
                  <p className="text-green-800 text-sm">
                    After completing setup, you'll be able to add detailed information to your knowledge base 
                    and start having strategic conversations with your AI mentor.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Navigation */}
        <div className="flex justify-between">
          <button
            onClick={() => currentStep > 1 ? setCurrentStep(currentStep - 1) : navigate('/dashboard')}
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>{currentStep > 1 ? 'Previous' : 'Back to Dashboard'}</span>
          </button>
          
          <button
            onClick={handleNext}
            disabled={currentStep === 1 && !formData.name.trim()}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span>{currentStep === 3 ? 'Complete Setup' : 'Next'}</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileSetup;