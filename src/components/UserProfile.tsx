import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Checkbox } from './ui/checkbox';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { User, GraduationCap, Briefcase, Target, Plus, X } from 'lucide-react';

interface UserProfileProps {
  initialData?: any;
  onComplete: (data: any) => void;
}

export function UserProfile({ initialData, onComplete }: UserProfileProps) {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    // Basic Info
    name: initialData?.name || '',
    age: initialData?.age || '',
    location: initialData?.location || '',
    email: initialData?.email || '',
    
    // Education
    education: initialData?.education || '',
    field: initialData?.field || '',
    graduation: initialData?.graduation || '',
    gpa: initialData?.gpa || '',
    
    // Experience
    experience: initialData?.experience || '',
    currentRole: initialData?.currentRole || '',
    industry: initialData?.industry || '',
    skills: initialData?.skills || [],
    
    // Goals & Interests
    careerGoals: initialData?.careerGoals || '',
    interests: initialData?.interests || [],
    workStyle: initialData?.workStyle || '',
    salaryExpectation: initialData?.salaryExpectation || ''
  });

  const [newSkill, setNewSkill] = useState('');
  const [newInterest, setNewInterest] = useState('');

  const steps = [
    { title: 'Basic Information', icon: User },
    { title: 'Education', icon: GraduationCap },
    { title: 'Experience & Skills', icon: Briefcase },
    { title: 'Goals & Preferences', icon: Target }
  ];

  const addSkill = () => {
    if (newSkill.trim() && !formData.skills.includes(newSkill.trim())) {
      setFormData(prev => ({
        ...prev,
        skills: [...prev.skills, newSkill.trim()]
      }));
      setNewSkill('');
    }
  };

  const removeSkill = (skill: string) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.filter((s: string) => s !== skill)
    }));
  };

  const addInterest = () => {
    if (newInterest.trim() && !formData.interests.includes(newInterest.trim())) {
      setFormData(prev => ({
        ...prev,
        interests: [...prev.interests, newInterest.trim()]
      }));
      setNewInterest('');
    }
  };

  const removeInterest = (interest: string) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.filter((i: string) => i !== interest)
    }));
  };

  const handleNext = () => {
    if (step < steps.length - 1) {
      setStep(step + 1);
    } else {
      onComplete(formData);
    }
  };

  const handleBack = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };

  const progressPercentage = ((step + 1) / steps.length) * 100;

  const predefinedInterests = [
    'Technology', 'Healthcare', 'Education', 'Finance', 'Marketing',
    'Design', 'Research', 'Management', 'Entrepreneurship', 'Creative Arts',
    'Social Impact', 'Environment', 'Travel', 'Sports', 'Gaming'
  ];

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-2xl">Build Your Profile</CardTitle>
            <CardDescription>
              Help us understand your background to provide personalized career guidance
            </CardDescription>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600">{step + 1} of {steps.length}</span>
            <Progress value={progressPercentage} className="w-20" />
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Step Indicator */}
        <div className="flex items-center justify-between mb-8">
          {steps.map((stepInfo, index) => {
            const Icon = stepInfo.icon;
            const isActive = index === step;
            const isCompleted = index < step;
            
            return (
              <div key={index} className="flex flex-col items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 mb-2
                  ${isActive ? 'border-blue-500 bg-blue-50 text-blue-600' : 
                    isCompleted ? 'border-green-500 bg-green-50 text-green-600' : 
                    'border-gray-300 bg-gray-50 text-gray-400'}`}>
                  <Icon className="h-5 w-5" />
                </div>
                <span className={`text-xs text-center ${isActive ? 'text-blue-600' : isCompleted ? 'text-green-600' : 'text-gray-400'}`}>
                  {stepInfo.title}
                </span>
              </div>
            );
          })}
        </div>

        {/* Step Content */}
        {step === 0 && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Basic Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Full Name *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Enter your full name"
                />
              </div>
              <div>
                <Label htmlFor="age">Age *</Label>
                <Input
                  id="age"
                  type="number"
                  value={formData.age}
                  onChange={(e) => setFormData(prev => ({ ...prev, age: e.target.value }))}
                  placeholder="Your age"
                />
              </div>
              <div>
                <Label htmlFor="location">Location *</Label>
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                  placeholder="City, Country"
                />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  placeholder="your.email@example.com"
                />
              </div>
            </div>
          </div>
        )}

        {step === 1 && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Educational Background</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="education">Highest Education Level *</Label>
                <Select value={formData.education} onValueChange={(value) => setFormData(prev => ({ ...prev, education: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select education level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="high-school">High School (10th/12th)</SelectItem>
                    <SelectItem value="diploma">Diploma</SelectItem>
                    <SelectItem value="bachelors">Bachelor's Degree</SelectItem>
                    <SelectItem value="masters">Master's Degree</SelectItem>
                    <SelectItem value="phd">PhD</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="field">Field of Study *</Label>
                <Input
                  id="field"
                  value={formData.field}
                  onChange={(e) => setFormData(prev => ({ ...prev, field: e.target.value }))}
                  placeholder="e.g., Computer Science, Business, etc."
                />
              </div>
              <div>
                <Label htmlFor="graduation">Graduation Year</Label>
                <Input
                  id="graduation"
                  type="number"
                  value={formData.graduation}
                  onChange={(e) => setFormData(prev => ({ ...prev, graduation: e.target.value }))}
                  placeholder="2024"
                />
              </div>
              <div>
                <Label htmlFor="gpa">GPA/Percentage (Optional)</Label>
                <Input
                  id="gpa"
                  value={formData.gpa}
                  onChange={(e) => setFormData(prev => ({ ...prev, gpa: e.target.value }))}
                  placeholder="e.g., 3.8 or 85%"
                />
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold">Experience & Skills</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="experience">Years of Experience</Label>
                <Select value={formData.experience} onValueChange={(value) => setFormData(prev => ({ ...prev, experience: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select experience level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0">Fresh Graduate / No Experience</SelectItem>
                    <SelectItem value="1-2">1-2 years</SelectItem>
                    <SelectItem value="3-5">3-5 years</SelectItem>
                    <SelectItem value="5-10">5-10 years</SelectItem>
                    <SelectItem value="10+">10+ years</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="currentRole">Current Role (if any)</Label>
                <Input
                  id="currentRole"
                  value={formData.currentRole}
                  onChange={(e) => setFormData(prev => ({ ...prev, currentRole: e.target.value }))}
                  placeholder="e.g., Software Developer, Student, etc."
                />
              </div>
            </div>

            <div>
              <Label htmlFor="industry">Industry/Sector</Label>
              <Input
                id="industry"
                value={formData.industry}
                onChange={(e) => setFormData(prev => ({ ...prev, industry: e.target.value }))}
                placeholder="e.g., Technology, Healthcare, Finance, etc."
              />
            </div>

            <div>
              <Label>Skills & Technologies</Label>
              <div className="flex gap-2 mb-3">
                <Input
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  placeholder="Add a skill (e.g., Python, Marketing, Leadership)"
                  onKeyPress={(e) => e.key === 'Enter' && addSkill()}
                />
                <Button type="button" onClick={addSkill} size="sm">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {formData.skills.map((skill: string, index: number) => (
                  <Badge key={index} variant="secondary" className="flex items-center gap-1">
                    {skill}
                    <X 
                      className="h-3 w-3 cursor-pointer" 
                      onClick={() => removeSkill(skill)}
                    />
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold">Goals & Preferences</h3>
            
            <div>
              <Label htmlFor="careerGoals">Career Goals</Label>
              <Textarea
                id="careerGoals"
                value={formData.careerGoals}
                onChange={(e) => setFormData(prev => ({ ...prev, careerGoals: e.target.value }))}
                placeholder="Describe your career aspirations and what you hope to achieve in the next 3-5 years..."
                rows={3}
              />
            </div>

            <div>
              <Label>Interests & Passions</Label>
              <div className="flex gap-2 mb-3">
                <Input
                  value={newInterest}
                  onChange={(e) => setNewInterest(e.target.value)}
                  placeholder="Add an interest"
                  onKeyPress={(e) => e.key === 'Enter' && addInterest()}
                />
                <Button type="button" onClick={addInterest} size="sm">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="mb-3">
                <p className="text-sm text-gray-600 mb-2">Or select from common interests:</p>
                <div className="flex flex-wrap gap-2">
                  {predefinedInterests.map((interest) => (
                    <Badge
                      key={interest}
                      variant={formData.interests.includes(interest) ? "default" : "outline"}
                      className="cursor-pointer"
                      onClick={() => {
                        if (formData.interests.includes(interest)) {
                          removeInterest(interest);
                        } else {
                          setFormData(prev => ({
                            ...prev,
                            interests: [...prev.interests, interest]
                          }));
                        }
                      }}
                    >
                      {interest}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {formData.interests.map((interest: string, index: number) => (
                  <Badge key={index} variant="secondary" className="flex items-center gap-1">
                    {interest}
                    <X 
                      className="h-3 w-3 cursor-pointer" 
                      onClick={() => removeInterest(interest)}
                    />
                  </Badge>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="workStyle">Preferred Work Style</Label>
                <Select value={formData.workStyle} onValueChange={(value) => setFormData(prev => ({ ...prev, workStyle: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select work style" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="remote">Remote</SelectItem>
                    <SelectItem value="hybrid">Hybrid</SelectItem>
                    <SelectItem value="office">In-office</SelectItem>
                    <SelectItem value="flexible">Flexible</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="salaryExpectation">Salary Expectation (Optional)</Label>
                <Input
                  id="salaryExpectation"
                  value={formData.salaryExpectation}
                  onChange={(e) => setFormData(prev => ({ ...prev, salaryExpectation: e.target.value }))}
                  placeholder="e.g., $60,000 - $80,000"
                />
              </div>
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex justify-between pt-6 border-t">
          <Button 
            variant="outline" 
            onClick={handleBack} 
            disabled={step === 0}
          >
            Back
          </Button>
          <Button onClick={handleNext}>
            {step === steps.length - 1 ? 'Complete Profile' : 'Next'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}