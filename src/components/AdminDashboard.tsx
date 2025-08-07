import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Tip, Report, User, TipCategory, UserLevel } from '@/types';
import { defaultTips } from '@/data/tips';
import { Shield, LogOut, Users, FileText, BarChart3, Plus, Trash2, Share2 } from 'lucide-react';
import { toast } from 'sonner';
import { SocialShareButtons } from './SocialShareButtons';
import { AdminProfile } from './AdminProfile';
import { PrivacyPolicy } from './PrivacyPolicy';

export const AdminDashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const [tips, setTips] = useState<Tip[]>([]);
  const [reports, setReports] = useState<Report[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [showAddTip, setShowAddTip] = useState(false);

  // Form states
  const [newTipTitle, setNewTipTitle] = useState('');
  const [newTipContent, setNewTipContent] = useState('');
  const [newTipCategory, setNewTipCategory] = useState<TipCategory>('password-security');
  const [newTipLevels, setNewTipLevels] = useState<UserLevel[]>(['entry']);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    // Load tips
    const savedTips = localStorage.getItem('privacypal_tips');
    setTips(savedTips ? JSON.parse(savedTips) : defaultTips);

    // Load reports
    const savedReports = localStorage.getItem('privacypal_reports');
    setReports(savedReports ? JSON.parse(savedReports) : []);

    // Load users
    const savedUsers = localStorage.getItem('privacypal_users');
    setUsers(savedUsers ? JSON.parse(savedUsers) : []);
  };

  const addTip = () => {
    if (!newTipTitle.trim() || !newTipContent.trim()) {
      toast.error('Please fill in all fields');
      return;
    }

    const newTip: Tip = {
      id: Date.now().toString(),
      title: newTipTitle.trim(),
      content: newTipContent.trim(),
      category: newTipCategory,
      level: newTipLevels,
      createdAt: new Date().toISOString()
    };

    const updatedTips = [...tips, newTip];
    setTips(updatedTips);
    localStorage.setItem('privacypal_tips', JSON.stringify(updatedTips));

    // Reset form
    setNewTipTitle('');
    setNewTipContent('');
    setNewTipCategory('password-security');
    setNewTipLevels(['entry']);
    setShowAddTip(false);

    toast.success('Tip added successfully!');
  };

  const deleteTip = (tipId: string) => {
    const updatedTips = tips.filter(tip => tip.id !== tipId);
    setTips(updatedTips);
    localStorage.setItem('privacypal_tips', JSON.stringify(updatedTips));
    toast.success('Tip deleted successfully!');
  };

  const updateReportStatus = (reportId: string, status: Report['status']) => {
    const updatedReports = reports.map(report =>
      report.id === reportId ? { ...report, status } : report
    );
    setReports(updatedReports);
    localStorage.setItem('privacypal_reports', JSON.stringify(updatedReports));
    toast.success('Report status updated!');
  };

  const getUserStats = () => {
    const totalUsers = users.length;
    const entryLevel = users.filter(u => u.level === 'entry').length;
    const midLevel = users.filter(u => u.level === 'mid').length;
    const topLevel = users.filter(u => u.level === 'top').length;

    return {
      total: totalUsers,
      entry: totalUsers > 0 ? Math.round((entryLevel / totalUsers) * 100) : 0,
      mid: totalUsers > 0 ? Math.round((midLevel / totalUsers) * 100) : 0,
      top: totalUsers > 0 ? Math.round((topLevel / totalUsers) * 100) : 0
    };
  };

  const stats = getUserStats();

  if (!user || user.level !== 'admin') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Shield className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Access Denied</h2>
          <p className="text-gray-600">You need admin privileges to access this page.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Shield className="h-8 w-8 text-primary" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Welcome, {user.name}
                </h1>
                <p className="text-sm text-gray-600">Admin Dashboard - Manage PrivacyPal content and users</p>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <AdminProfile />
              <Button
                variant="ghost"
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
        <Tabs defaultValue="stats" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="stats">
              <BarChart3 className="h-4 w-4 mr-2" />
              Statistics
            </TabsTrigger>
            <TabsTrigger value="tips">
              <FileText className="h-4 w-4 mr-2" />
              Manage Tips
            </TabsTrigger>
            <TabsTrigger value="reports">
              <Users className="h-4 w-4 mr-2" />
              View Reports
            </TabsTrigger>
          </TabsList>

          {/* Statistics Tab */}
          <TabsContent value="stats">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Total Users</p>
                      <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
                    </div>
                    <Users className="h-8 w-8 text-primary" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Entry Level</p>
                      <p className="text-2xl font-bold text-green-600">{stats.entry}%</p>
                    </div>
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                      <span className="text-xs font-bold text-green-600">E</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Mid Level</p>
                      <p className="text-2xl font-bold text-blue-600">{stats.mid}%</p>
                    </div>
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-xs font-bold text-blue-600">M</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Top Level</p>
                      <p className="text-2xl font-bold text-purple-600">{stats.top}%</p>
                    </div>
                    <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                      <span className="text-xs font-bold text-purple-600">T</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Tips Management Tab */}
          <TabsContent value="tips">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">Manage Tips</h2>
                <Button
                  onClick={() => setShowAddTip(!showAddTip)}
                  className="gradient-bg hover:opacity-90"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add New Tip
                </Button>
              </div>

              {/* Add Tip Form */}
              {showAddTip && (
                <Card>
                  <CardHeader>
                    <CardTitle>Add New Security Tip</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="tipTitle">Title</Label>
                      <Input
                        id="tipTitle"
                        value={newTipTitle}
                        onChange={(e) => setNewTipTitle(e.target.value)}
                        placeholder="Enter tip title"
                      />
                    </div>

                    <div>
                      <Label htmlFor="tipContent">Content</Label>
                      <Textarea
                        id="tipContent"
                        value={newTipContent}
                        onChange={(e) => setNewTipContent(e.target.value)}
                        placeholder="Enter tip content"
                        rows={4}
                      />
                    </div>

                    <div>
                      <Label htmlFor="tipCategory">Category</Label>
                      <Select value={newTipCategory} onValueChange={(value: TipCategory) => setNewTipCategory(value)}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="password-security">Password Security</SelectItem>
                          <SelectItem value="mobile-security">Mobile Security</SelectItem>
                          <SelectItem value="wifi-safety">Wi-Fi Safety</SelectItem>
                          <SelectItem value="social-engineering">Social Engineering</SelectItem>
                          <SelectItem value="office-safety">Office Safety</SelectItem>
                          <SelectItem value="data-protection">Data Protection</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="flex space-x-2 pt-2">
                      <Button onClick={addTip} className="gradient-bg hover:opacity-90">
                        Add Tip
                      </Button>
                      <Button variant="outline" onClick={() => setShowAddTip(false)}>
                        Cancel
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Tips List */}
              <div className="space-y-4">
                {tips.map((tip) => (
                  <Card key={tip.id}>
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="font-medium text-gray-900 mb-1">{tip.title}</h3>
                          <p className="text-sm text-gray-600 mb-2">{tip.content}</p>
                          <div className="flex space-x-2 mb-3">
                            <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
                              {tip.category}
                            </span>
                            {tip.level.map(level => (
                              <span key={level} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                                {level}
                              </span>
                            ))}
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <Share2 className="h-4 w-4 text-gray-500" />
                              <span className="text-sm text-gray-500">Share:</span>
                              <SocialShareButtons tip={tip} />
                            </div>
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => deleteTip(tip.id)}
                          className="text-red-600 hover:text-red-700 hover:bg-red-50"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* Reports Tab */}
          <TabsContent value="reports">
            <div className="space-y-6">
              <h2 className="text-xl font-semibold">User Reports</h2>

              <div className="space-y-4">
                {reports.length === 0 ? (
                  <Card>
                    <CardContent className="text-center py-8">
                      <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-600">No reports submitted yet.</p>
                    </CardContent>
                  </Card>
                ) : (
                  reports.map((report) => (
                    <Card key={report.id}>
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-1">
                              <h3 className="font-medium text-gray-900">{report.title}</h3>
                              {report.isAnonymous && (
                                <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                                  Anonymous
                                </span>
                              )}
                            </div>
                            <p className="text-sm text-gray-600 mb-2">{report.description}</p>
                            <p className="text-xs text-gray-500">
                              Submitted on {new Date(report.createdAt).toLocaleDateString()}
                            </p>
                          </div>
                          <div className="flex flex-col space-y-2">
                            <Select
                              value={report.status}
                              onValueChange={(value: Report['status']) => updateReportStatus(report.id, value)}
                            >
                              <SelectTrigger className="w-32">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="pending">Pending</SelectItem>
                                <SelectItem value="reviewed">Reviewed</SelectItem>
                                <SelectItem value="resolved">Resolved</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                )}
              </div>
            </div>
          </TabsContent>
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