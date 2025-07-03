
export type UserLevel = 'entry' | 'mid' | 'top' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  level: UserLevel;
  createdAt: string;
}

export interface Tip {
  id: string;
  title: string;
  content: string;
  category: TipCategory;
  level: UserLevel[];
  createdAt: string;
}

export type TipCategory = 
  | 'password-security'
  | 'mobile-security' 
  | 'wifi-safety'
  | 'social-engineering'
  | 'office-safety'
  | 'data-protection';

export interface Report {
  id: string;
  userId?: string;
  title: string;
  description: string;
  isAnonymous: boolean;
  status: 'pending' | 'reviewed' | 'resolved';
  createdAt: string;
}

export interface Reminder {
  id: string;
  userId: string;
  title: string;
  description: string;
  dueDate: string;
  completed: boolean;
  createdAt: string;
}
