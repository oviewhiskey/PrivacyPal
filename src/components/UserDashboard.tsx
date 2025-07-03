
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DailyTips } from './DailyTips';
import { GameZone } from './GameZone';
import { Reminders } from './Reminders';
import { ReportIssue } from './ReportIssue';
import { PrivacyPolicy } from './PrivacyPolicy';
import { Shield, LogOut, BookOpen, Gamepad2, Bell, AlertTriangle } from 'lucide-react';

export const UserDashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('tips');

  if (!user) return null;

  const canAccessGames = user.level === 'entry' || user.level === 'mid';
  const canAccessReminders = user.level === 'entry' || user.level === 'mid';
  const canAccessReports = user.level === 'entry';

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Shield className="h-8 w-8 text-primary" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">PrivacyPal</h1>
                <p className="text-sm text-gray-600">Welcome back, {user.name}!</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">{user.name}</p>
                <p className="text-xs text-gray-500 capitalize">{user.level} Level</p>
              </div>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={logout}
                className="hover:bg-red-50 hover:text-red-600"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 flex-1">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4">
            <TabsTrigger value="tips" className="flex items-center space-x-2">
              <BookOpen className="h-4 w-4" />
              <span>Daily Tips</span>
            </TabsTrigger>
            
            {canAccessGames && (
              <TabsTrigger value="games" className="flex items-center space-x-2">
                <Gamepad2 className="h-4 w-4" />
                <span>Games</span>
              </TabsTrigger>
            )}
            
            {canAccessReminders && (
              <TabsTrigger value="reminders" className="flex items-center space-x-2">
                <Bell className="h-4 w-4" />
                <span>Reminders</span>
              </TabsTrigger>
            )}
            
            {canAccessReports && (
              <TabsTrigger value="reports" className="flex items-center space-x-2">
                <AlertTriangle className="h-4 w-4" />
                <span>Report</span>
              </TabsTrigger>
            )}
          </TabsList>

          <TabsContent value="tips">
            <DailyTips userLevel={user.level} />
          </TabsContent>

          {canAccessGames && (
            <TabsContent value="games">
              <GameZone userLevel={user.level} />
            </TabsContent>
          )}

          {canAccessReminders && (
            <TabsContent value="reminders">
              <Reminders userId={user.id} />
            </TabsContent>
          )}

          {canAccessReports && (
            <TabsContent value="reports">
              <ReportIssue userId={user.id} />
            </TabsContent>
          )}
        </Tabs>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t mt-auto">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-center">
            <PrivacyPolicy className="text-gray-600 hover:text-primary" />
          </div>
        </div>
      </footer>
    </div>
  );
};
