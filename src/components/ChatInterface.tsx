import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Brain, ArrowLeft, Send, User, Bot, Lightbulb, Target, TrendingUp, MessageSquare } from 'lucide-react';
import { useApp } from '../context/AppContext';

const ChatInterface: React.FC = () => {
  const navigate = useNavigate();
  const { profile, knowledgeBase, chatHistory, addMessage } = useApp();
  const [message, setMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatHistory]);

  const suggestedQuestions = [
    {
      icon: Target,
      question: "What are the practical steps to achieve my career goals?",
      category: "Goal Planning"
    },
    {
      icon: TrendingUp,
      question: "How should I frame my achievements in my next job interview?",
      category: "Interview Prep"
    },
    {
      icon: Lightbulb,
      question: "What skills should I develop to advance in my career?",
      category: "Skill Development"
    },
    {
      icon: MessageSquare,
      question: "Create a 3-year roadmap for my professional growth",
      category: "Career Strategy"
    }
  ];

  const generateResponse = (userMessage: string) => {
    // Simulate AI response based on user's knowledge base
    const responses = [
      `Based on your background in ${knowledgeBase.skills ? 'your mentioned skills' : 'your field'}, I recommend focusing on these strategic areas...`,
      `Looking at your career goals, here's a personalized roadmap that aligns with your ${profile.mentorPersonality.toLowerCase()} approach...`,
      `Given your achievements and current trajectory, I see several opportunities for growth...`,
      `Your unique combination of experience and goals suggests these next steps would be most impactful...`
    ];
    
    const randomResponse = responses[Math.floor(Math.random() * responses.length)];
    
    return `${randomResponse}

Here are my specific recommendations:

1. **Immediate Actions (Next 30 days)**
   - Review and update your professional profiles
   - Identify 2-3 key skills to develop based on your goals
   - Network with professionals in your target role

2. **Short-term Strategy (3-6 months)**
   - Take on projects that align with your career objectives
   - Seek mentorship or coaching in your growth areas
   - Build visibility through thought leadership

3. **Long-term Vision (1-2 years)**
   - Position yourself for the opportunities you've outlined
   - Develop expertise that sets you apart in your field
   - Create a personal brand that reflects your professional goals

Would you like me to elaborate on any of these areas or discuss a specific aspect of your career development?`;
  };

  const handleSendMessage = async () => {
    if (!message.trim()) return;

    const userMessage = message.trim();
    setMessage('');
    addMessage('user', userMessage);
    setIsTyping(true);

    // Simulate typing delay
    setTimeout(() => {
      const response = generateResponse(userMessage);
      addMessage('assistant', response);
      setIsTyping(false);
    }, 1500);
  };

  const handleSuggestedQuestion = (question: string) => {
    setMessage(question);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200 flex-shrink-0">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
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
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                  <Brain className="h-5 w-5 text-white" />
                </div>
                <div>
                  <span className="text-lg font-semibold text-gray-900">AI Career Mentor</span>
                  <div className="flex items-center space-x-2 text-xs text-gray-500">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span>Online • {profile.mentorPersonality}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col max-w-4xl mx-auto w-full">
        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-4 py-6">
          {chatHistory.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Brain className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Welcome to your AI Career Mentor
              </h3>
              <p className="text-gray-600 mb-8 max-w-md mx-auto">
                I'm here to provide personalized career guidance based on your profile and goals. 
                Ask me anything about your professional development!
              </p>

              {/* Suggested Questions */}
              <div className="grid md:grid-cols-2 gap-4 max-w-2xl mx-auto">
                {suggestedQuestions.map((item, index) => (
                  <button
                    key={index}
                    onClick={() => handleSuggestedQuestion(item.question)}
                    className="p-4 bg-white border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-all text-left group"
                  >
                    <div className="flex items-start space-x-3">
                      <div className="p-2 bg-gray-100 rounded-lg group-hover:bg-blue-100 transition-colors">
                        <item.icon className="h-4 w-4 text-gray-600 group-hover:text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <div className="text-xs text-gray-500 mb-1">{item.category}</div>
                        <div className="text-sm text-gray-900 font-medium">{item.question}</div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {chatHistory.map((msg, index) => (
                <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`flex items-start space-x-3 max-w-3xl ${msg.role === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                      msg.role === 'user' 
                        ? 'bg-gray-600' 
                        : 'bg-gradient-to-r from-blue-600 to-purple-600'
                    }`}>
                      {msg.role === 'user' ? (
                        <User className="h-4 w-4 text-white" />
                      ) : (
                        <Brain className="h-4 w-4 text-white" />
                      )}
                    </div>
                    <div className={`p-4 rounded-2xl ${
                      msg.role === 'user'
                        ? 'bg-gray-600 text-white'
                        : 'bg-white border border-gray-200'
                    }`}>
                      <div className="whitespace-pre-wrap text-sm leading-relaxed">
                        {msg.content}
                      </div>
                      <div className={`text-xs mt-2 ${
                        msg.role === 'user' ? 'text-gray-300' : 'text-gray-500'
                      }`}>
                        {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex justify-start">
                  <div className="flex items-start space-x-3 max-w-3xl">
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                      <Brain className="h-4 w-4 text-white" />
                    </div>
                    <div className="bg-white border border-gray-200 p-4 rounded-2xl">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        {/* Input Area */}
        <div className="border-t border-gray-200 bg-white p-4">
          <div className="flex space-x-4">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && handleSendMessage()}
              placeholder="Ask your AI mentor anything about your career..."
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <button
              onClick={handleSendMessage}
              disabled={!message.trim() || isTyping}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
            >
              <Send className="h-4 w-4" />
              <span>Send</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;