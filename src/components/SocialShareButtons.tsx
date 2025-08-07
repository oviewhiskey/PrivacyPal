
import React from 'react';
import { Button } from '@/components/ui/button';
import { Facebook, Linkedin, Twitter } from 'lucide-react';
import { Tip } from '@/types';

interface SocialShareButtonsProps {
  tip: Tip;
}

export const SocialShareButtons: React.FC<SocialShareButtonsProps> = ({ tip }) => {
  const shareUrl = window.location.origin;
  const shareText = `${tip.title}: ${tip.content}`;
  
  const shareToTwitter = () => {
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`;
    window.open(url, '_blank', 'width=600,height=400');
  };

  const shareToFacebook = () => {
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}&quote=${encodeURIComponent(shareText)}`;
    window.open(url, '_blank', 'width=600,height=400');
  };

  const shareToLinkedIn = () => {
    const url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}&summary=${encodeURIComponent(shareText)}`;
    window.open(url, '_blank', 'width=600,height=400');
  };

  return (
    <div className="flex space-x-2">
      <Button
        variant="ghost"
        size="sm"
        onClick={shareToTwitter}
        className="text-blue-500 hover:text-blue-600 hover:bg-blue-50"
      >
        <Twitter className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={shareToFacebook}
        className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
      >
        <Facebook className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={shareToLinkedIn}
        className="text-blue-700 hover:text-blue-800 hover:bg-blue-50"
      >
        <Linkedin className="h-4 w-4" />
      </Button>
    </div>
  );
};
