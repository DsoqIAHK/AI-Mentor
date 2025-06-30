import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Brain, MessageSquare, BookOpen, User, Settings, TrendingUp, Clock, Target, LogOut, CreditCard, Wallet } from 'lucide-react';
import { useApp } from '../context/AppContext';
import CryptoWallet from './CryptoWallet';
import PaymentHistory from './PaymentHistory';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const { profile, knowledgeBase, chatHistory, signOut } = useApp();
  const [activeTab, setActiveTab] = React.useState('overview');

  const handleSignOut = async () => {
    await signOut();
  };

  const quickStats = [
    {
      icon: MessageSquare,
      label: 'Chat Sessions',
      value: chatHistory.length > 0 ? Math.ceil(chatHistory.length / 5) : 0,
      color: 'bg-blue-500'
    },
    {
      icon: BookOpen,
      label: 'Knowledge Sections',
      value: Object.values(knowledgeBase).filter(section => section.trim() !== '').length,
      color: 'bg-emerald-500'
    },
    {
      icon: Target,
      label: 'Goals Set',
      value: profile.goals?.length || 0,
      color: 'bg-purple-500'
    },
    {
      icon: TrendingUp,
      label: 'Skills Tracked',
      value: profile.skills?.length || 0,
      color: 'bg-orange-500'
    }
  ];

  const recentActivity = [
    { action: 'Updated resume in knowledge base', time: '2 hours ago', icon: BookOpen },
    { action: 'Had career strategy discussion', time: '1 day ago', icon: MessageSquare },
    { action: 'Added new career goals', time: '3 days ago', icon: Target },
    { action: 'Completed profile setup', time: '1 week ago', icon: User }
  ];

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Brain },
    { id: 'wallet', label: 'Crypto Wallet', icon: Wallet },
    { id: 'payments', label: 'Payment History', icon: CreditCard }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Brain className="h-8 w-8 text-blue-600" />
              <div>
                <h1 className="text-xl font-semibold text-gray-900">CareerMentor AI</h1>
                <p className="text-sm text-gray-500">Welcome back, {profile.name || 'Professional'}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => navigate('/pricing')}
                className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-colors flex items-center space-x-2"
              >
                <CreditCard className="h-4 w-4" />
                <span>Upgrade</span>
              </button>
              <button 
                onClick={() => navigate('/chat')}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
              >
                <MessageSquare className="h-4 w-4" />
                <span>Chat with Mentor</span>
              </button>
              <button 
                onClick={handleSignOut}
                className="p-2 text-gray-400 hover:text-gray-600"
                title="Sign Out"
              >
                <LogOut className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tab Navigation */}
        <div className="mb-8">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <tab.icon className="h-4 w-4" />
                  <span>{tab.label}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <>
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {quickStats.map((stat, index) => (
                <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
                      <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                    </div>
                    <div className={`p-3 rounded-lg ${stat.color}`}>
                      <stat.icon className="h-6 w-6 text-white" />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              {/* Main Actions */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
                  <div className="grid md:grid-cols-2 gap-4">
                    <button
                      onClick={() => navigate('/chat')}
                      className="p-6 border-2 border-dashed border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors group text-left"
                    >
                      <MessageSquare className="h-8 w-8 text-blue-600 mb-3 group-hover:scale-110 transition-transform" />
                      <h3 className="font-semibold text-gray-900 mb-2">Start Mentoring Session</h3>
                      <p className="text-sm text-gray-600">Get personalized career guidance and strategic advice</p>
                    </button>
                    
                    <button
                      onClick={() => navigate('/knowledge')}
                      className="p-6 border-2 border-dashed border-gray-200 rounded-lg hover:border-emerald-300 hover:bg-emerald-50 transition-colors group text-left"
                    >
                      <BookOpen className="h-8 w-8 text-emerald-600 mb-3 group-hover:scale-110 transition-transform" />
                      <h3 className="font-semibold text-gray-900 mb-2">Update Knowledge Base</h3>
                      <p className="text-sm text-gray-600">Add or modify your professional information</p>
                    </button>
                    
                    <button
                      onClick={() => navigate('/setup')}
                      className="p-6 border-2 border-dashed border-gray-200 rounded-lg hover:border-purple-300 hover:bg-purple-50 transition-colors group text-left"
                    >
                      <User className="h-8 w-8 text-purple-600 mb-3 group-hover:scale-110 transition-transform" />
                      <h3 className="font-semibold text-gray-900 mb-2">Edit Profile</h3>
                      <p className="text-sm text-gray-600">Customize your mentor's personality and style</p>
                    </button>
                    
                    <button 
                      onClick={() => navigate('/pricing')}
                      className="p-6 border-2 border-dashed border-gray-200 rounded-lg hover:border-orange-300 hover:bg-orange-50 transition-colors group text-left"
                    >
                      <TrendingUp className="h-8 w-8 text-orange-600 mb-3 group-hover:scale-110 transition-transform" />
                      <h3 className="font-semibold text-gray-900 mb-2">Upgrade Plan</h3>
                      <p className="text-sm text-gray-600">Unlock advanced features with crypto payments</p>
                    </button>
                  </div>
                </div>

                {/* AI Mentor Status */}
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-6 text-white">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-semibold mb-2">Your AI Mentor Status</h3>
                      <p className="text-blue-100 mb-4">
                        Personality: {profile.mentorPersonality} • Style: {profile.mentorStyle}
                      </p>
                      <div className="flex items-center space-x-2 text-blue-100">
                        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                        <span className="text-sm">Online and ready to help</span>
                      </div>
                    </div>
                    <Brain className="h-16 w-16 text-blue-200" />
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div>
                {/* Recent Activity */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
                  <div className="space-y-4">
                    {recentActivity.map((activity, index) => (
                      <div key={index} className="flex items-start space-x-3">
                        <div className="p-2 bg-gray-100 rounded-lg">
                          <activity.icon className="h-4 w-4 text-gray-600" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-gray-900">{activity.action}</p>
                          <p className="text-xs text-gray-500 flex items-center mt-1">
                            <Clock className="h-3 w-3 mr-1" />
                            {activity.time}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Knowledge Base Status */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Knowledge Base</h3>
                  <div className="space-y-3">
                    {[
                      { name: 'Resume', status: knowledgeBase.resume ? 'Complete' : 'Empty', color: knowledgeBase.resume ? 'text-green-600' : 'text-gray-400' },
                      { name: 'Goals', status: knowledgeBase.goals ? 'Complete' : 'Empty', color: knowledgeBase.goals ? 'text-green-600' : 'text-gray-400' },
                      { name: 'Achievements', status: knowledgeBase.achievements ? 'Complete' : 'Empty', color: knowledgeBase.achievements ? 'text-green-600' : 'text-gray-400' },
                      { name: 'Skills', status: knowledgeBase.skills ? 'Complete' : 'Empty', color: knowledgeBase.skills ? 'text-green-600' : 'text-gray-400' },
                      { name: 'Inspiration', status: knowledgeBase.inspiration ? 'Complete' : 'Empty', color: knowledgeBase.inspiration ? 'text-green-600' : 'text-gray-400' }
                    ].map((item, index) => (
                      <div key={index} className="flex justify-between items-center">
                        <span className="text-sm text-gray-700">{item.name}</span>
                        <span className={`text-xs font-medium ${item.color}`}>{item.status}</span>
                      </div>
                    ))}
                  </div>
                  <button
                    onClick={() => navigate('/knowledge')}
                    className="w-full mt-4 bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium"
                  >
                    Manage Knowledge Base
                  </button>
                </div>
              </div>
            </div>
          </>
        )}

        {activeTab === 'wallet' && (
          <div className="max-w-4xl mx-auto">
            <CryptoWallet />
          </div>
        )}

        {activeTab === 'payments' && (
          <div className="max-w-4xl mx-auto">
            <PaymentHistory />
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;