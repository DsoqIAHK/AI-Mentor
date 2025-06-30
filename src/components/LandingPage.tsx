import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Brain, Target, MessageSquare, Shield, Zap, Users, ChevronRight, Star } from 'lucide-react';

const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: Brain,
      title: 'Digital Replica Creation',
      description: 'Build a comprehensive digital version of your professional identity with AI-powered analysis.'
    },
    {
      icon: Target,
      title: 'Strategic Career Planning',
      description: 'Get personalized roadmaps and actionable steps tailored to your unique goals and background.'
    },
    {
      icon: MessageSquare,
      title: 'Unlimited Mentoring',
      description: 'Chat with your AI mentor 24/7 for instant guidance on any career challenge or decision.'
    },
    {
      icon: Shield,
      title: 'Secure & Private',
      description: 'Your data remains completely confidential and secure in your personal account.'
    }
  ];

  const steps = [
    {
      number: '01',
      title: 'Create Your Profile',
      description: 'Define your AI mentor\'s personality and style to match your preferences.'
    },
    {
      number: '02',
      title: 'Feed the Knowledge Base',
      description: 'Upload your resume, goals, achievements, and professional information.'
    },
    {
      number: '03',
      title: 'Start Strategic Dialogue',
      description: 'Begin conversations with your personalized AI mentor for career guidance.'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Brain className="h-8 w-8 text-blue-600" />
              <span className="text-xl font-bold text-gray-900">CareerMentor AI</span>
            </div>
            <button
              onClick={() => navigate('/setup')}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Get Started
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-20 pb-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Build Your Digital Replica.
              <span className="text-blue-600 block">Unlock Your Career Potential.</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              The first AI mentor that knows you better than you know yourself. Turn your career data 
              into a strategic success plan with personalized guidance available 24/7.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <button
                onClick={() => navigate('/setup')}
                className="bg-blue-600 text-white px-8 py-4 rounded-xl hover:bg-blue-700 transition-all duration-200 font-semibold text-lg flex items-center justify-center group transform hover:scale-105"
              >
                Start Building Your Mentor
                <ChevronRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-xl hover:border-gray-400 transition-colors font-semibold text-lg">
                Watch Demo
              </button>
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-1">10K+</div>
                <div className="text-gray-600 text-sm">Career Goals Achieved</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-emerald-600 mb-1">24/7</div>
                <div className="text-gray-600 text-sm">Available Support</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600 mb-1">100%</div>
                <div className="text-gray-600 text-sm">Personalized Advice</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Choose CareerMentor AI?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Experience absolute personalization with strategic insights that go beyond generic career advice.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="group p-6 bg-gray-50 rounded-2xl hover:bg-white hover:shadow-xl transition-all duration-300 border border-transparent hover:border-blue-100">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4 group-hover:bg-blue-600 transition-colors">
                  <feature.icon className="h-6 w-6 text-blue-600 group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Three simple steps to transform your career guidance experience.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
                  <div className="text-5xl font-bold text-blue-100 mb-4">{step.number}</div>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-3">{step.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{step.description}</p>
                </div>
                {index < steps.length - 1 && (
                  <ChevronRight className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 h-8 w-8 text-blue-300" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Success Stories</h2>
            <p className="text-xl text-gray-600">See how professionals are transforming their careers</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah Chen",
                role: "Software Engineer → Senior Product Manager",
                content: "The AI mentor helped me identify the exact skills I needed to transition into product management. The personalized roadmap was spot-on.",
                rating: 5
              },
              {
                name: "Marcus Rodriguez",
                role: "Marketing Specialist → VP of Growth",
                content: "Having a mentor that truly understands my background and goals made all the difference. The strategic insights were invaluable.",
                rating: 5
              },
              {
                name: "Dr. Emily Watson",
                role: "Research Scientist → Biotech Startup CEO",
                content: "The career guidance was incredibly detailed and actionable. It's like having a top-tier career consultant available 24/7.",
                rating: 5
              }
            ].map((testimonial, index) => (
              <div key={index} className="bg-gray-50 p-6 rounded-2xl">
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 mb-4 italic">"{testimonial.content}"</p>
                <div>
                  <div className="font-semibold text-gray-900">{testimonial.name}</div>
                  <div className="text-sm text-gray-600">{testimonial.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Build Your Digital Career Mentor?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of professionals who are already accelerating their careers with AI-powered guidance.
          </p>
          <button
            onClick={() => navigate('/setup')}
            className="bg-white text-blue-600 px-8 py-4 rounded-xl hover:bg-gray-100 transition-colors font-semibold text-lg transform hover:scale-105 duration-200"
          >
            Start Your Journey Today
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <Brain className="h-8 w-8 text-blue-400" />
                <span className="text-xl font-bold">CareerMentor AI</span>
              </div>
              <p className="text-gray-400 leading-relaxed">
                Empowering professionals worldwide with personalized AI career guidance 
                that adapts to your unique journey and goals.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Security</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2025 CareerMentor AI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;