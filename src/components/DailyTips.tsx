
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tip, TipCategory, UserLevel } from '@/types';
import { defaultTips } from '@/data/tips';
import { Shield, Smartphone, Wifi, Users, Building, Database, RefreshCw } from 'lucide-react';

interface DailyTipsProps {
  userLevel: UserLevel;
}

const categoryConfig = {
  'password-security': { icon: Shield, label: 'Password Security', color: 'bg-red-100 text-red-700' },
  'mobile-security': { icon: Smartphone, label: 'Mobile Security', color: 'bg-blue-100 text-blue-700' },
  'wifi-safety': { icon: Wifi, label: 'Wi-Fi Safety', color: 'bg-green-100 text-green-700' },
  'social-engineering': { icon: Users, label: 'Social Engineering', color: 'bg-purple-100 text-purple-700' },
  'office-safety': { icon: Building, label: 'Office Safety', color: 'bg-yellow-100 text-yellow-700' },
  'data-protection': { icon: Database, label: 'Data Protection', color: 'bg-indigo-100 text-indigo-700' }
};

export const DailyTips: React.FC<DailyTipsProps> = ({ userLevel }) => {
  const [tips, setTips] = useState<Tip[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<TipCategory | 'all'>('all');

  useEffect(() => {
    // Load tips from localStorage or use defaults
    const savedTips = localStorage.getItem('privacypal_tips');
    const allTips = savedTips ? JSON.parse(savedTips) : defaultTips;
    
    // Filter tips based on user level
    const userTips = allTips.filter((tip: Tip) => 
      userLevel === 'admin' || tip.level.includes(userLevel)
    );
    
    setTips(userTips);
  }, [userLevel]);

  const filteredTips = selectedCategory === 'all' 
    ? tips 
    : tips.filter(tip => tip.category === selectedCategory);

  const categories = Object.keys(categoryConfig) as TipCategory[];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Daily Security Tips</h2>
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => window.location.reload()}
          className="flex items-center space-x-2"
        >
          <RefreshCw className="h-4 w-4" />
          <span>Refresh</span>
        </Button>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2">
        <Button
          variant={selectedCategory === 'all' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setSelectedCategory('all')}
          className={selectedCategory === 'all' ? 'gradient-bg' : ''}
        >
          All Categories
        </Button>
        {categories.map((category) => {
          const config = categoryConfig[category];
          return (
            <Button
              key={category}
              variant={selectedCategory === category ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedCategory(category)}
              className={selectedCategory === category ? 'gradient-bg' : ''}
            >
              <config.icon className="h-4 w-4 mr-2" />
              {config.label}
            </Button>
          );
        })}
      </div>

      {/* Tips Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTips.map((tip) => {
          const config = categoryConfig[tip.category];
          const IconComponent = config.icon;
          
          return (
            <Card key={tip.id} className="card-hover">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-2">
                    <IconComponent className="h-5 w-5 text-primary" />
                    <Badge className={config.color} variant="secondary">
                      {config.label}
                    </Badge>
                  </div>
                </div>
                <CardTitle className="text-lg leading-tight">
                  {tip.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {tip.content}
                </p>
                <div className="mt-4 pt-3 border-t">
                  <div className="flex flex-wrap gap-1">
                    {tip.level.map((level) => (
                      <Badge key={level} variant="outline" className="text-xs">
                        {level} level
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {filteredTips.length === 0 && (
        <div className="text-center py-12">
          <Shield className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No tips found</h3>
          <p className="text-gray-600">
            {selectedCategory === 'all' 
              ? 'No tips available for your level yet.' 
              : 'No tips in this category for your level.'}
          </p>
        </div>
      )}
    </div>
  );
};
