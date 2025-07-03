
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';

interface PrivacyPolicyProps {
  trigger?: React.ReactNode;
  className?: string;
}

export const PrivacyPolicy: React.FC<PrivacyPolicyProps> = ({ 
  trigger, 
  className = "" 
}) => {
  const defaultTrigger = (
    <Button variant="ghost" className={`text-sm ${className}`}>
      Privacy Policy
    </Button>
  );

  return (
    <Dialog>
      <DialogTrigger asChild>
        {trigger || defaultTrigger}
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[80vh]">
        <DialogHeader>
          <DialogTitle>Privacy Policy</DialogTitle>
        </DialogHeader>
        <ScrollArea className="h-[60vh] pr-4">
          <div className="space-y-6 text-sm">
            <section>
              <h3 className="font-semibold text-base mb-2">1. Information We Collect</h3>
              <p className="text-gray-600 mb-2">
                We collect information you provide directly to us, such as when you create an account, 
                use our services, or contact us for support.
              </p>
              <ul className="list-disc pl-5 text-gray-600 space-y-1">
                <li>Account information (name, email address)</li>
                <li>Usage data and preferences</li>
                <li>Security tips and reports you submit</li>
              </ul>
            </section>

            <section>
              <h3 className="font-semibold text-base mb-2">2. How We Use Your Information</h3>
              <p className="text-gray-600 mb-2">We use the information we collect to:</p>
              <ul className="list-disc pl-5 text-gray-600 space-y-1">
                <li>Provide, maintain, and improve our services</li>
                <li>Send you security tips and educational content</li>
                <li>Respond to your comments and questions</li>
                <li>Monitor and analyze usage patterns</li>
              </ul>
            </section>

            <section>
              <h3 className="font-semibold text-base mb-2">3. Information Sharing</h3>
              <p className="text-gray-600">
                We do not sell, trade, or otherwise transfer your personal information to third parties. 
                This does not include trusted third parties who assist us in operating our website, 
                conducting our business, or serving our users, so long as those parties agree to keep 
                this information confidential.
              </p>
            </section>

            <section>
              <h3 className="font-semibold text-base mb-2">4. Data Security</h3>
              <p className="text-gray-600">
                We implement appropriate security measures to protect your personal information against 
                unauthorized access, alteration, disclosure, or destruction. However, no method of 
                transmission over the Internet is 100% secure.
              </p>
            </section>

            <section>
              <h3 className="font-semibold text-base mb-2">5. Local Storage</h3>
              <p className="text-gray-600">
                Our application uses browser local storage to save your preferences and session data. 
                This information is stored locally on your device and is not transmitted to our servers.
              </p>
            </section>

            <section>
              <h3 className="font-semibold text-base mb-2">6. Your Rights</h3>
              <p className="text-gray-600 mb-2">You have the right to:</p>
              <ul className="list-disc pl-5 text-gray-600 space-y-1">
                <li>Access the personal information we hold about you</li>
                <li>Request correction of inaccurate information</li>
                <li>Request deletion of your personal information</li>
                <li>Withdraw consent at any time</li>
              </ul>
            </section>

            <section>
              <h3 className="font-semibold text-base mb-2">7. Contact Us</h3>
              <p className="text-gray-600">
                If you have any questions about this Privacy Policy, please contact us at 
                voviewhiskey@3consult-ng.com.
              </p>
            </section>

            <section>
              <h3 className="font-semibold text-base mb-2">8. Changes to This Policy</h3>
              <p className="text-gray-600">
                We may update this Privacy Policy from time to time. We will notify you of any changes 
                by posting the new Privacy Policy on this page with an updated effective date.
              </p>
              <p className="text-gray-500 text-xs mt-2">
                Last updated: {new Date().toLocaleDateString()}
              </p>
            </section>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};
