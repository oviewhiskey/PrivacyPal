
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAuth } from '@/contexts/AuthContext';
import { UserLevel } from '@/types';
import { toast } from 'sonner';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: 'signin' | 'signup' | 'admin';
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, mode }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [level, setLevel] = useState<UserLevel>('entry');
  const [isLoading, setIsLoading] = useState(false);
  const { login, register } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (mode === 'signup') {
        const success = await register(name, email, password, level);
        if (success) {
          toast.success('Account created successfully!');
          onClose();
        } else {
          toast.error('Email already exists');
        }
      } else {
        const success = await login(email, password);
        if (success) {
          toast.success('Welcome back!');
          onClose();
        } else {
          toast.error('Invalid credentials');
        }
      }
    } catch (error) {
      toast.error('Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setEmail('');
    setPassword('');
    setName('');
    setLevel('entry');
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => { if (!open) { onClose(); resetForm(); } }}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center text-xl font-semibold">
            {mode === 'signin' ? 'Welcome Back' : 
             mode === 'admin' ? 'Admin Login' : 'Join PrivacyPal'}
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === 'signup' && (
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                placeholder="Enter your full name"
              />
            </div>
          )}
          
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder={mode === 'admin' ? 'Enter Your Eamil' : 'Enter your email'}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder={mode === 'admin' ? 'Enter Password' : 'Enter your password'}
            />
          </div>
          
          {mode === 'signup' && (
            <div className="space-y-2">
              <Label htmlFor="level">Experience Level</Label>
              <Select value={level} onValueChange={(value: UserLevel) => setLevel(value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select your level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="entry">Entry Level - New to cybersecurity</SelectItem>
                  <SelectItem value="mid">Mid Level - Some experience</SelectItem>
                  <SelectItem value="top">Top Level - Advanced user</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}
          
          <Button 
            type="submit" 
            className="w-full gradient-bg hover:opacity-90 transition-opacity"
            disabled={isLoading}
          >
            {isLoading ? 'Loading...' : 
             mode === 'signin' ? 'Sign In' : 
             mode === 'admin' ? 'Admin Login' : 'Create Account'}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
