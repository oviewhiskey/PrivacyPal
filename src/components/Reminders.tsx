
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Reminder } from '@/types';
import { Bell, Plus, Trash2, Calendar } from 'lucide-react';
import { toast } from 'sonner';

interface RemindersProps {
  userId: string;
}

export const Reminders: React.FC<RemindersProps> = ({ userId }) => {
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');

  useEffect(() => {
    loadReminders();
  }, [userId]);

  const loadReminders = () => {
    const saved = localStorage.getItem(`privacypal_reminders_${userId}`);
    if (saved) {
      setReminders(JSON.parse(saved));
    }
  };

  const saveReminders = (newReminders: Reminder[]) => {
    localStorage.setItem(`privacypal_reminders_${userId}`, JSON.stringify(newReminders));
    setReminders(newReminders);
  };

  const addReminder = () => {
    if (!title.trim() || !dueDate) {
      toast.error('Please fill in all required fields');
      return;
    }

    const newReminder: Reminder = {
      id: Date.now().toString(),
      userId,
      title: title.trim(),
      description: description.trim(),
      dueDate,
      completed: false,
      createdAt: new Date().toISOString()
    };

    const updatedReminders = [...reminders, newReminder];
    saveReminders(updatedReminders);
    
    setTitle('');
    setDescription('');
    setDueDate('');
    setShowForm(false);
    toast.success('Reminder added successfully!');
  };

  const toggleComplete = (id: string) => {
    const updatedReminders = reminders.map(reminder =>
      reminder.id === id ? { ...reminder, completed: !reminder.completed } : reminder
    );
    saveReminders(updatedReminders);
    toast.success('Reminder updated!');
  };

  const deleteReminder = (id: string) => {
    const updatedReminders = reminders.filter(reminder => reminder.id !== id);
    saveReminders(updatedReminders);
    toast.success('Reminder deleted!');
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Security Reminders</h2>
          <p className="text-gray-600">Never forget important security tasks</p>
        </div>
        <Button 
          onClick={() => setShowForm(!showForm)}
          className="gradient-bg hover:opacity-90"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Reminder
        </Button>
      </div>

      {/* Add Reminder Form */}
      {showForm && (
        <Card>
          <CardHeader>
            <CardTitle>Create New Reminder</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="title">Title *</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g., Update passwords"
              />
            </div>
            
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Additional details about the task..."
                rows={3}
              />
            </div>
            
            <div>
              <Label htmlFor="dueDate">Due Date *</Label>
              <Input
                id="dueDate"
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                min={new Date().toISOString().split('T')[0]}
              />
            </div>
            
            <div className="flex space-x-2 pt-2">
              <Button onClick={addReminder} className="gradient-bg hover:opacity-90">
                Create Reminder
              </Button>
              <Button variant="outline" onClick={() => setShowForm(false)}>
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Reminders List */}
      <div className="space-y-4">
        {reminders.length === 0 ? (
          <div className="text-center py-12">
            <Bell className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No reminders yet</h3>
            <p className="text-gray-600">Create your first security reminder to get started!</p>
          </div>
        ) : (
          reminders.map((reminder) => (
            <Card key={reminder.id} className={`${reminder.completed ? 'opacity-60' : ''}`}>
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3 flex-1">
                    <Checkbox
                      checked={reminder.completed}
                      onCheckedChange={() => toggleComplete(reminder.id)}
                      className="mt-1"
                    />
                    <div className="flex-1">
                      <h3 className={`font-medium ${reminder.completed ? 'line-through text-gray-500' : 'text-gray-900'}`}>
                        {reminder.title}
                      </h3>
                      {reminder.description && (
                        <p className={`text-sm mt-1 ${reminder.completed ? 'text-gray-400' : 'text-gray-600'}`}>
                          {reminder.description}
                        </p>
                      )}
                      <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                        <div className="flex items-center space-x-1">
                          <Calendar className="h-4 w-4" />
                          <span>{formatDate(reminder.dueDate)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => deleteReminder(reminder.id)}
                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};
