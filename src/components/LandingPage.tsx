
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { AuthModal } from './AuthModal';
import { PrivacyPolicy } from './PrivacyPolicy';
import { Shield, Users, Gamepad2, BookOpen, AlertTriangle, Trophy } from 'lucide-react';

export const LandingPage: React.FC = () => {
  const [authModal, setAuthModal] = useState<'signin' | 'signup' | 'admin' | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
      {/* Header */}
      <header className="container mx-auto px-4 py-6">
        <nav className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Shield className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold text-gray-900">PrivacyPal</span>
          </div>
          <div className="space-x-4">
            <Button 
              variant="ghost" 
              onClick={() => setAuthModal('signin')}
              className="hover:bg-primary/10"
            >
              Sign In
            </Button>
            <Button 
              variant="ghost" 
              onClick={() => setAuthModal('admin')}
              className="text-xs hover:bg-primary/10"
            >
              Admin
            </Button>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <main className="container mx-auto px-4 py-12">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Welcome To <span className="text-primary">PrivacyPal</span>
            <br />Privacy in your Pocket
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Your organization's privacy awareness platform. Learn, engage, and protect through daily tips, games, and best practices..
          </p>
          
          <div className="space-y-4 sm:space-y-0 sm:space-x-4 sm:flex sm:justify-center">
            <Button 
              size="lg" 
              className="gradient-bg hover:opacity-90 transition-opacity text-lg px-8 py-4"
              onClick={() => setAuthModal('signup')}
            >
              Get Started Free
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-primary text-primary hover:bg-primary/10"
              onClick={() => setAuthModal('signin')}
            >
              I Have an Account
            </Button>
          </div>
        </div>

        {/* Features Grid */}
        <div className="mt-20">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Everything You Need to Stay Secure
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-6 shadow-lg card-hover">
              <BookOpen className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-3">Daily Security Tips</h3>
              <p className="text-gray-600">
                Get personalized cybersecurity tips covering passwords, mobile security, 
                Wi-Fi safety, and more.
              </p>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-lg card-hover">
              <Gamepad2 className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-3">Interactive Games</h3>
              <p className="text-gray-600">
                Learn through engaging quizzes, drag-and-drop exercises, 
                and true/false challenges.
              </p>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-lg card-hover">
              <Users className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-3">Skill-Based Learning</h3>
              <p className="text-gray-600">
                Content tailored to your experience level - from beginner 
                to advanced cybersecurity professional.
              </p>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-lg card-hover">
              <AlertTriangle className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-3">Smart Reminders</h3>
              <p className="text-gray-600">
                Never forget important security tasks with our 
                personalized reminder system.
              </p>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-lg card-hover">
              <Shield className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-3">Anonymous Reporting</h3>
              <p className="text-gray-600">
                Report security incidents and get help while maintaining 
                your privacy and anonymity.
              </p>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-lg card-hover">
              <Trophy className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-3">Track Progress</h3>
              <p className="text-gray-600">
                Monitor your learning journey and celebrate your 
                cybersecurity knowledge milestones.
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-20 text-center">
          <div className="bg-white rounded-2xl p-8 shadow-xl max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Ready to Secure Your Digital Life?
            </h2>
            <p className="text-gray-600 mb-6">
              Join thousands of users who are already improving their cybersecurity knowledge.
            </p>
            <Button 
              size="lg" 
              className="gradient-bg hover:opacity-90 transition-opacity text-lg px-8 py-4"
              onClick={() => setAuthModal('signup')}
            >
              Start Learning Today
            </Button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t mt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center">
            <PrivacyPolicy className="text-gray-600 hover:text-primary" />
          </div>
        </div>
      </footer>

      {/* Auth Modals */}
      {authModal && (
        <AuthModal
          isOpen={!!authModal}
          onClose={() => setAuthModal(null)}
          mode={authModal}
        />
      )}
    </div>
  );
};
