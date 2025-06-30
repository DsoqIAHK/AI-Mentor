import React, { useState } from 'react';
import { Brain, Mail, Lock, User, AlertCircle, CheckCircle, Eye, EyeOff, RefreshCw } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

const AuthPage: React.FC = () => {
  const { signIn, signUp, resendConfirmation } = useAuth();
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showResendConfirmation, setShowResendConfirmation] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    confirmEmail: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    jobTitle: '',
    company: ''
  });
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const validatePassword = (password: string) => {
    const minLength = password.length >= 8;
    const hasUpper = /[A-Z]/.test(password);
    const hasLower = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    
    return {
      minLength,
      hasUpper,
      hasLower,
      hasNumber,
      hasSpecial,
      isValid: minLength && hasUpper && hasLower && hasNumber && hasSpecial
    };
  };

  const passwordValidation = validatePassword(formData.password);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setError('');
    setShowResendConfirmation(false);
  };

  const handleResendConfirmation = async () => {
    if (!formData.email) {
      setError('Please enter your email address');
      return;
    }

    setResendLoading(true);
    try {
      const { error } = await resendConfirmation(formData.email);
      if (error) throw error;
      
      setSuccess('Confirmation email sent! Please check your inbox and spam folder.');
      setError('');
    } catch (err: any) {
      setError(err.message || 'Failed to resend confirmation email');
    } finally {
      setResendLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');
    setShowResendConfirmation(false);

    try {
      if (isSignUp) {
        // Validation for sign up
        if (formData.email !== formData.confirmEmail) {
          throw new Error('Email addresses do not match');
        }
        
        if (formData.password !== formData.confirmPassword) {
          throw new Error('Passwords do not match');
        }

        if (!passwordValidation.isValid) {
          throw new Error('Password does not meet security requirements');
        }

        if (!formData.firstName.trim() || !formData.lastName.trim()) {
          throw new Error('First name and last name are required');
        }

        const { data, error } = await signUp(formData.email, formData.password, {
          firstName: formData.firstName,
          lastName: formData.lastName,
          jobTitle: formData.jobTitle,
          company: formData.company
        });
        
        if (error) throw error;

        // Email confirmation is ALWAYS required
        setSuccess(`Account created successfully! 📧 We've sent a confirmation email to ${formData.email}. Please check your inbox (and spam folder) and click the verification link before signing in.`);
        
        // Reset form and switch to sign in
        setFormData({
          email: formData.email,
          confirmEmail: '',
          password: '',
          confirmPassword: '',
          firstName: '',
          lastName: '',
          jobTitle: '',
          company: ''
        });
        setIsSignUp(false);
      } else {
        const { error } = await signIn(formData.email, formData.password);
        if (error) {
          if (error.message === 'UNCONFIRMED_EMAIL') {
            setShowResendConfirmation(true);
            throw new Error('⚠️ Please verify your email address before signing in. Check your inbox for a confirmation email.');
          }
          throw error;
        }
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <Brain className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">CareerMentor AI</h1>
          <p className="text-gray-600">
            {isSignUp ? 'Create your account to get started' : 'Welcome back to your AI career mentor'}
          </p>
        </div>

        {/* Auth Form */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <div className="flex items-center space-x-3 mb-2">
                  <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0" />
                  <p className="text-red-700 text-sm">{error}</p>
                </div>
                
                {showResendConfirmation && (
                  <button
                    type="button"
                    onClick={handleResendConfirmation}
                    disabled={resendLoading}
                    className="mt-3 bg-red-100 text-red-700 px-4 py-2 rounded-lg hover:bg-red-200 transition-colors text-sm font-medium flex items-center space-x-2 disabled:opacity-50"
                  >
                    {resendLoading ? (
                      <div className="w-4 h-4 border-2 border-red-600 border-t-transparent rounded-full animate-spin"></div>
                    ) : (
                      <RefreshCw className="h-4 w-4" />
                    )}
                    <span>{resendLoading ? 'Sending...' : 'Resend Confirmation Email'}</span>
                  </button>
                )}
              </div>
            )}

            {success && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-start space-x-3">
                <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                <p className="text-green-700 text-sm">{success}</p>
              </div>
            )}

            {isSignUp && (
              <>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      First Name *
                    </label>
                    <input
                      type="text"
                      value={formData.firstName}
                      onChange={(e) => handleInputChange('firstName', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="John"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      value={formData.lastName}
                      onChange={(e) => handleInputChange('lastName', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Doe"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Job Title
                  </label>
                  <input
                    type="text"
                    value={formData.jobTitle}
                    onChange={(e) => handleInputChange('jobTitle', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Software Engineer"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Company
                  </label>
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) => handleInputChange('company', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Tech Corp"
                  />
                </div>
              </>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address *
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="john@example.com"
                  required
                />
              </div>
            </div>

            {isSignUp && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Confirm Email Address *
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="email"
                    value={formData.confirmEmail}
                    onChange={(e) => handleInputChange('confirmEmail', e.target.value)}
                    className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      formData.confirmEmail && formData.email !== formData.confirmEmail 
                        ? 'border-red-300 bg-red-50' 
                        : 'border-gray-300'
                    }`}
                    placeholder="john@example.com"
                    required
                  />
                </div>
                {formData.confirmEmail && formData.email !== formData.confirmEmail && (
                  <p className="text-red-600 text-xs mt-1">Email addresses do not match</p>
                )}
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password *
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your password"
                  required
                  minLength={8}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            {isSignUp && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Confirm Password *
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      value={formData.confirmPassword}
                      onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                      className={`w-full pl-10 pr-12 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        formData.confirmPassword && formData.password !== formData.confirmPassword 
                          ? 'border-red-300 bg-red-50' 
                          : 'border-gray-300'
                      }`}
                      placeholder="Confirm your password"
                      required
                      minLength={8}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                  {formData.confirmPassword && formData.password !== formData.confirmPassword && (
                    <p className="text-red-600 text-xs mt-1">Passwords do not match</p>
                  )}
                </div>

                {/* Password Requirements */}
                {formData.password && (
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-sm font-medium text-gray-700 mb-2">Password Requirements:</p>
                    <div className="space-y-1">
                      {[
                        { label: 'At least 8 characters', valid: passwordValidation.minLength },
                        { label: 'One uppercase letter', valid: passwordValidation.hasUpper },
                        { label: 'One lowercase letter', valid: passwordValidation.hasLower },
                        { label: 'One number', valid: passwordValidation.hasNumber },
                        { label: 'One special character', valid: passwordValidation.hasSpecial }
                      ].map((req, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <div className={`w-2 h-2 rounded-full ${req.valid ? 'bg-green-500' : 'bg-gray-300'}`} />
                          <span className={`text-xs ${req.valid ? 'text-green-700' : 'text-gray-600'}`}>
                            {req.label}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </>
            )}

            <button
              type="submit"
              disabled={loading || (isSignUp && !passwordValidation.isValid)}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-4 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <>
                  <User className="h-5 w-5" />
                  <span>{isSignUp ? 'Create Account' : 'Sign In'}</span>
                </>
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={() => {
                setIsSignUp(!isSignUp);
                setError('');
                setSuccess('');
                setShowResendConfirmation(false);
                setFormData({
                  email: formData.email, // Keep email when switching
                  confirmEmail: '',
                  password: '',
                  confirmPassword: '',
                  firstName: '',
                  lastName: '',
                  jobTitle: '',
                  company: ''
                });
              }}
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              {isSignUp 
                ? 'Already have an account? Sign in' 
                : "Don't have an account? Sign up"
              }
            </button>
          </div>

          {/* Email Confirmation Notice */}
          <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <div className="flex items-start space-x-3">
              <Mail className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-blue-900 mb-1">
                  📧 Email Confirmation Required
                </p>
                <p className="text-xs text-blue-700">
                  {isSignUp 
                    ? "After creating your account, you'll receive a confirmation email. You must click the verification link before you can sign in."
                    : "If you recently signed up, make sure to verify your email address by clicking the link in your confirmation email before signing in."
                  }
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="mt-8 text-center">
          <p className="text-gray-600 text-sm mb-4">Join thousands of professionals who are accelerating their careers</p>
          <div className="flex justify-center space-x-6 text-xs text-gray-500">
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <span>Secure & Private</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
              <span>24/7 Available</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
              <span>Personalized</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;