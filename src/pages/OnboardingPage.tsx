import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserProfile } from '../components/UserProfile';
import { Brain, Users, Target } from 'lucide-react';

export function OnboardingPage() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    { id: 'profile', title: 'User Profile', icon: Users },
    { id: 'assessment', title: 'Assessment', icon: Brain },
    { id: 'results', title: 'Career Insights', icon: Target }
  ];

  const handleProfileComplete = (profileData: any) => {
    // Store profile data in localStorage or context
    localStorage.setItem('careerAI_profile', JSON.stringify(profileData));
    navigate('/assessment');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Progress Steps */}
      <div className="mb-6 md:mb-8">
        <div className="flex items-center justify-center space-x-2 md:space-x-8 overflow-x-auto pb-4">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isActive = index === currentStep;
            const isCompleted = index < currentStep;
            
            return (
              <div key={step.id} className="flex items-center flex-shrink-0">
                <div className={`flex items-center space-x-2 md:space-x-3 ${isActive ? 'text-indigo-600 dark:text-indigo-400' : isCompleted ? 'text-green-600 dark:text-green-400' : 'text-gray-400 dark:text-gray-500'}`}>
                  <div className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center border-2 
                    ${isActive ? 'border-indigo-600 bg-indigo-50 dark:border-indigo-400 dark:bg-indigo-900/20' : 
                      isCompleted ? 'border-green-600 bg-green-50 dark:border-green-400 dark:bg-green-900/20' : 'border-gray-300 bg-gray-50 dark:border-gray-600 dark:bg-gray-800'}`}>
                    <Icon className="h-4 w-4 md:h-5 md:w-5" />
                  </div>
                  <span className="font-medium text-sm md:text-base hidden sm:block">{step.title}</span>
                  <span className="font-medium text-xs sm:hidden">{step.title.split(' ')[0]}</span>
                </div>
                {index < steps.length - 1 && (
                  <div className={`w-6 md:w-12 h-0.5 mx-2 md:mx-4 ${isCompleted ? 'bg-green-600 dark:bg-green-400' : 'bg-gray-300 dark:bg-gray-600'}`} />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Main Content */}
      <UserProfile onComplete={handleProfileComplete} />
    </div>
  );
}