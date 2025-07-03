
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Report } from '@/types';
import { AlertTriangle, Send, Eye } from 'lucide-react';
import { toast } from 'sonner';

interface ReportIssueProps {
  userId: string;
}

export const ReportIssue: React.FC<ReportIssueProps> = ({ userId }) => {
  const [reports, setReports] = useState<Report[]>([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [showMyReports, setShowMyReports] = useState(false);

  useEffect(() => {
    loadReports();
  }, []);

  const loadReports = () => {
    const saved = localStorage.getItem('privacypal_reports');
    if (saved) {
      setReports(JSON.parse(saved));
    }
  };

  const saveReports = (newReports: Report[]) => {
    localStorage.setItem('privacypal_reports', JSON.stringify(newReports));
    setReports(newReports);
  };

  const submitReport = () => {
    if (!title.trim() || !description.trim()) {
      toast.error('Please fill in all fields');
      return;
    }

    const newReport: Report = {
      id: Date.now().toString(),
      userId: isAnonymous ? undefined : userId,
      title: title.trim(),
      description: description.trim(),
      isAnonymous,
      status: 'pending',
      createdAt: new Date().toISOString()
    };

    const updatedReports = [...reports, newReport];
    saveReports(updatedReports);
    
    setTitle('');
    setDescription('');
    setIsAnonymous(false);
    toast.success('Report submitted successfully!');
  };

  const myReports = reports.filter(report => 
    !report.isAnonymous && report.userId === userId
  );

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Report Security Issue</h2>
        <p className="text-gray-600">
          Report cybersecurity incidents or concerns. You can choose to remain anonymous.
        </p>
      </div>

      {/* Report Form */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <AlertTriangle className="h-5 w-5 text-primary" />
            <span>Submit New Report</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="reportTitle">Issue Title *</Label>
            <Input
              id="reportTitle"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Brief description of the issue"
            />
          </div>
          
          <div>
            <Label htmlFor="reportDescription">Detailed Description *</Label>
            <Textarea
              id="reportDescription"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Provide as much detail as possible about the security issue..."
              rows={5}
            />
          </div>
          
          <div className="flex items-center space-x-2">
            <Checkbox
              id="anonymous"
              checked={isAnonymous}
              onCheckedChange={(checked) => setIsAnonymous(checked as boolean)}
            />
            <Label htmlFor="anonymous" className="text-sm">
              Submit this report anonymously
            </Label>
          </div>
          
          <Button 
            onClick={submitReport}
            className="gradient-bg hover:opacity-90"
          >
            <Send className="h-4 w-4 mr-2" />
            Submit Report
          </Button>
        </CardContent>
      </Card>

      {/* My Reports Section */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">My Reports</h3>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowMyReports(!showMyReports)}
        >
          <Eye className="h-4 w-4 mr-2" />
          {showMyReports ? 'Hide' : 'Show'} My Reports
        </Button>
      </div>

      {showMyReports && (
        <div className="space-y-4">
          {myReports.length === 0 ? (
            <Card>
              <CardContent className="text-center py-8">
                <AlertTriangle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">You haven't submitted any reports yet.</p>
              </CardContent>
            </Card>
          ) : (
            myReports.map((report) => (
              <Card key={report.id}>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-medium text-gray-900">{report.title}</h4>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      report.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                      report.status === 'reviewed' ? 'bg-blue-100 text-blue-700' :
                      'bg-green-100 text-green-700'
                    }`}>
                      {report.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">{report.description}</p>
                  <p className="text-xs text-gray-500">
                    Submitted on {new Date(report.createdAt).toLocaleDateString()}
                  </p>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      )}
    </div>
  );
};
