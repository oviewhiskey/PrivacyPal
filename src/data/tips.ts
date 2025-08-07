
import { Tip } from '@/types';

export const defaultTips: Tip[] = [
  {
    id: '1',
    title: 'Use Strong, Unique Passwords',
    content: 'Create passwords with at least 12 characters, including uppercase, lowercase, numbers, and symbols. Use a different password for each account.',
    category: 'password-security',
    level: ['entry', 'mid', 'top'],
    createdAt: new Date().toISOString()
  },
  {
    id: '2',
    title: 'Enable Two-Factor Authentication',
    content: 'Add an extra layer of security by enabling 2FA on all your important accounts. Use authenticator apps instead of SMS when possible.',
    category: 'password-security',
    level: ['entry', 'mid', 'top'],
    createdAt: new Date().toISOString()
  },
  {
    id: '3',
    title: 'Keep Your Phone Updated',
    content: 'Always install security updates and patches for your mobile device. Enable automatic updates for critical security fixes.',
    category: 'mobile-security',
    level: ['entry', 'mid', 'top'],
    createdAt: new Date().toISOString()
  },
  {
    id: '4',
    title: 'Avoid Public Wi-Fi for Sensitive Tasks',
    content: 'Never access banking, shopping, or other sensitive accounts on public Wi-Fi. Use your mobile data or a VPN instead.',
    category: 'wifi-safety',
    level: ['entry', 'mid'],
    createdAt: new Date().toISOString()
  },
  {
    id: '5',
    title: 'Recognize Phishing Emails',
    content: 'Be suspicious of urgent requests, spelling errors, or unexpected attachments. Verify sender identity through a separate channel.',
    category: 'social-engineering',
    level: ['entry', 'mid', 'top'],
    createdAt: new Date().toISOString()
  },
  {
    id: '6',
    title: 'Lock Your Screen',
    content: 'Always lock your computer screen when stepping away, even briefly. Use Windows+L or Cmd+Ctrl+Q shortcuts.',
    category: 'office-safety',
    level: ['entry', 'mid'],
    createdAt: new Date().toISOString()
  },
  {
    id: '7',
    title: 'Review App Permissions',
    content: 'Regularly check what permissions your mobile apps have. Revoke access for apps that don\'t need certain permissions.',
    category: 'mobile-security',
    level: ['mid', 'top'],
    createdAt: new Date().toISOString()
  },
  {
    id: '8',
    title: 'Use WPA3 Encryption',
    content: 'Configure your home Wi-Fi with WPA3 encryption. If not available, use WPA2. Never use WEP or open networks.',
    category: 'wifi-safety',
    level: ['mid', 'top'],
    createdAt: new Date().toISOString()
  }
];
