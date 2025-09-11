import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Label } from './ui/label';
import { Slider } from './ui/slider';
import { 
  Brain, 
  Heart, 
  Target, 
  Users, 
  Zap, 
  CheckCircle,
  Clock,
  TrendingUp,
  Star
} from 'lucide-react';

interface Question {
  id: string;
  category: '5d-category';
  dimension: 'orientation' | 'interest' | 'personality' | 'aptitude' | 'eq';
  type: 'likert' | 'multiple-choice' | 'ranking' | 'scenario' | 'slider';
  question: string;
  options?: string[];
  scenarios?: { situation: string; responses: string[] };
  min?: number;
  max?: number;
  labels?: string[];
}

interface Advanced5DAssessmentProps {
  onComplete: (results: any) => void;
}

const assessmentDimensions = [
  {
    id: 'orientation',
    title: 'Orientation Style',
    description: 'How you approach work and learning',
    icon: Target,
    color: 'text-blue-600 dark:text-blue-400'
  },
  {
    id: 'interest',
    title: 'Career Interests',
    description: 'What motivates and engages you',
    icon: Heart,
    color: 'text-red-600 dark:text-red-400'
  },
  {
    id: 'personality',
    title: 'Personality Traits',
    description: 'Your behavioral patterns and preferences',
    icon: Users,
    color: 'text-green-600 dark:text-green-400'
  },
  {
    id: 'aptitude',
    title: 'Cognitive Aptitude',
    description: 'Your learning and problem-solving abilities',
    icon: Brain,
    color: 'text-purple-600 dark:text-purple-400'
  },
  {
    id: 'eq',
    title: 'Emotional Intelligence',
    description: 'Your emotional awareness and social skills',
    icon: Zap,
    color: 'text-orange-600 dark:text-orange-400'
  }
];

const psychometricQuestions: Question[] = [
  // Orientation Style Questions
  {
    id: 'o1',
    category: '5d-category',
    dimension: 'orientation',
    type: 'likert',
    question: 'I prefer working on tasks that have clear, structured guidelines',
    options: ['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree']
  },
  {
    id: 'o2',
    category: '5d-category',
    dimension: 'orientation',
    type: 'multiple-choice',
    question: 'When starting a new project, I typically:',
    options: [
      'Create a detailed plan before beginning',
      'Start with a rough outline and adapt as I go',
      'Jump right in and figure it out along the way',
      'Research extensively before taking any action'
    ]
  },
  {
    id: 'o3',
    category: '5d-category',
    dimension: 'orientation',
    type: 'scenario',
    question: 'You\'re given a complex problem to solve at work:',
    scenarios: {
      situation: 'Your manager assigns you a project with unclear requirements and a tight deadline.',
      responses: [
        'Ask for clarification and create a structured approach',
        'Start working immediately and adjust based on feedback',
        'Break it down into smaller, manageable tasks',
        'Collaborate with colleagues to brainstorm solutions'
      ]
    }
  },

  // Interest Questions
  {
    id: 'i1',
    category: '5d-category',
    dimension: 'interest',
    type: 'ranking',
    question: 'Rank these activities from most to least appealing:',
    options: [
      'Analyzing data and finding patterns',
      'Creating and designing visual content',
      'Leading and motivating teams',
      'Solving technical problems',
      'Helping and counseling others'
    ]
  },
  {
    id: 'i2',
    category: '5d-category',
    dimension: 'interest',
    type: 'likert',
    question: 'I enjoy working with cutting-edge technology and innovation',
    options: ['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree']
  },
  {
    id: 'i3',
    category: '5d-category',
    dimension: 'interest',
    type: 'multiple-choice',
    question: 'In your ideal work environment, you would be:',
    options: [
      'Working independently on focused tasks',
      'Collaborating closely with diverse teams',
      'Leading projects and making strategic decisions',
      'Mentoring and developing others'
    ]
  },

  // Personality Questions
  {
    id: 'p1',
    category: '5d-category',
    dimension: 'personality',
    type: 'likert',
    question: 'I feel energized when working in groups and social settings',
    options: ['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree']
  },
  {
    id: 'p2',
    category: '5d-category',
    dimension: 'personality',
    type: 'slider',
    question: 'How do you handle stress and pressure?',
    min: 1,
    max: 10,
    labels: ['Struggle significantly', 'Thrive under pressure']
  },
  {
    id: 'p3',
    category: '5d-category',
    dimension: 'personality',
    type: 'scenario',
    question: 'At a team meeting, you typically:',
    scenarios: {
      situation: 'You\'re in a brainstorming session with conflicting ideas being presented.',
      responses: [
        'Listen carefully and synthesize different viewpoints',
        'Actively contribute your own ideas and suggestions',
        'Ask probing questions to clarify concepts',
        'Focus on practical implementation of ideas'
      ]
    }
  },

  // Aptitude Questions
  {
    id: 'a1',
    category: '5d-category',
    dimension: 'aptitude',
    type: 'multiple-choice',
    question: 'If the pattern is 2, 6, 18, 54, what comes next?',
    options: ['108', '162', '216', '324']
  },
  {
    id: 'a2',
    category: '5d-category',
    dimension: 'aptitude',
    type: 'likert',
    question: 'I can quickly identify logical inconsistencies in arguments',
    options: ['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree']
  },
  {
    id: 'a3',
    category: '5d-category',
    dimension: 'aptitude',
    type: 'scenario',
    question: 'You need to learn a new software tool for your job:',
    scenarios: {
      situation: 'Your company is implementing a new project management system.',
      responses: [
        'Read the manual thoroughly before using it',
        'Learn by experimenting and trying features',
        'Take a structured online course',
        'Ask colleagues for tips and best practices'
      ]
    }
  },

  // EQ Questions
  {
    id: 'e1',
    category: '5d-category',
    dimension: 'eq',
    type: 'likert',
    question: 'I can easily recognize and understand others\' emotions',
    options: ['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree']
  },
  {
    id: 'e2',
    category: '5d-category',
    dimension: 'eq',
    type: 'scenario',
    question: 'A colleague seems upset after a meeting:',
    scenarios: {
      situation: 'You notice a team member looking distressed after receiving feedback.',
      responses: [
        'Approach them privately to offer support',
        'Give them space and check in later',
        'Suggest they speak with the manager',
        'Share your own similar experience to relate'
      ]
    }
  },
  {
    id: 'e3',
    category: '5d-category',
    dimension: 'eq',
    type: 'slider',
    question: 'How well do you manage your emotions in challenging situations?',
    min: 1,
    max: 10,
    labels: ['Very difficult', 'Very well']
  }
];

export function Advanced5DAssessment({ onComplete }: Advanced5DAssessmentProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [currentDimension, setCurrentDimension] = useState<string>('orientation');
  const [timeStarted, setTimeStarted] = useState<Date>(new Date());
  const [dimensionProgress, setDimensionProgress] = useState<Record<string, number>>({});

  const currentQuestion = psychometricQuestions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / psychometricQuestions.length) * 100;

  useEffect(() => {
    // Update dimension progress
    const newProgress = { ...dimensionProgress };
    assessmentDimensions.forEach(dim => {
      const dimensionQuestions = psychometricQuestions.filter(q => q.dimension === dim.id);
      const answeredCount = dimensionQuestions.filter(q => answers[q.id] !== undefined).length;
      newProgress[dim.id] = (answeredCount / dimensionQuestions.length) * 100;
    });
    setDimensionProgress(newProgress);

    // Update current dimension
    if (currentQuestion) {
      setCurrentDimension(currentQuestion.dimension);
    }
  }, [currentQuestionIndex, answers]);

  const handleAnswer = (value: any) => {
    setAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: value
    }));
  };

  const handleNext = () => {
    if (currentQuestionIndex < psychometricQuestions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      handleComplete();
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const handleComplete = () => {
    const timeCompleted = new Date();
    const timeTaken = Math.round((timeCompleted.getTime() - timeStarted.getTime()) / 1000 / 60); // minutes

    // Calculate dimension scores
    const dimensionScores = assessmentDimensions.reduce((scores, dimension) => {
      const dimensionQuestions = psychometricQuestions.filter(q => q.dimension === dimension.id);
      let totalScore = 0;
      let maxScore = 0;

      dimensionQuestions.forEach(question => {
        const answer = answers[question.id];
        if (answer !== undefined) {
          if (question.type === 'likert') {
            totalScore += answer;
            maxScore += 4; // 0-4 scale
          } else if (question.type === 'slider') {
            totalScore += answer;
            maxScore += question.max || 10;
          } else if (question.type === 'multiple-choice' || question.type === 'scenario') {
            totalScore += answer === 0 ? 4 : answer === 1 ? 3 : answer === 2 ? 2 : 1;
            maxScore += 4;
          }
        }
      });

      scores[dimension.id] = maxScore > 0 ? Math.round((totalScore / maxScore) * 100) : 0;
      return scores;
    }, {} as Record<string, number>);

    // Generate personality insights
    const personalityProfile = generatePersonalityProfile(dimensionScores, answers);
    
    const results = {
      timestamp: timeCompleted.toISOString(),
      timeTaken,
      dimensionScores,
      personalityProfile,
      answers,
      rawScores: dimensionScores,
      overallScore: Math.round(Object.values(dimensionScores).reduce((a, b) => a + b, 0) / 5)
    };

    onComplete(results);
  };

  const renderQuestion = () => {
    const answer = answers[currentQuestion.id];

    switch (currentQuestion.type) {
      case 'likert':
        return (
          <RadioGroup value={answer?.toString() || ''} onValueChange={(value) => handleAnswer(parseInt(value))}>
            <div className="space-y-3">
              {currentQuestion.options?.map((option, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                  <Label htmlFor={`option-${index}`} className="cursor-pointer">
                    {option}
                  </Label>
                </div>
              ))}
            </div>
          </RadioGroup>
        );

      case 'multiple-choice':
        return (
          <RadioGroup value={answer?.toString() || ''} onValueChange={(value) => handleAnswer(parseInt(value))}>
            <div className="space-y-3">
              {currentQuestion.options?.map((option, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                  <Label htmlFor={`option-${index}`} className="cursor-pointer">
                    {option}
                  </Label>
                </div>
              ))}
            </div>
          </RadioGroup>
        );

      case 'scenario':
        return (
          <div className="space-y-4">
            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <p className="text-blue-900 dark:text-blue-100">
                <strong>Scenario:</strong> {currentQuestion.scenarios?.situation}
              </p>
            </div>
            <RadioGroup value={answer?.toString() || ''} onValueChange={(value) => handleAnswer(parseInt(value))}>
              <div className="space-y-3">
                {currentQuestion.scenarios?.responses.map((response, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <RadioGroupItem value={index.toString()} id={`response-${index}`} />
                    <Label htmlFor={`response-${index}`} className="cursor-pointer">
                      {response}
                    </Label>
                  </div>
                ))}
              </div>
            </RadioGroup>
          </div>
        );

      case 'slider':
        return (
          <div className="space-y-4">
            <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
              <span>{currentQuestion.labels?.[0]}</span>
              <span>{currentQuestion.labels?.[1]}</span>
            </div>
            <Slider
              value={[answer || currentQuestion.min || 1]}
              onValueChange={(value) => handleAnswer(value[0])}
              min={currentQuestion.min || 1}
              max={currentQuestion.max || 10}
              step={1}
              className="w-full"
            />
            <div className="text-center">
              <Badge variant="secondary">{answer || currentQuestion.min || 1}</Badge>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const currentDimensionInfo = assessmentDimensions.find(d => d.id === currentDimension);
  const Icon = currentDimensionInfo?.icon || Brain;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="flex items-center justify-center gap-2">
            <Brain className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
            5-D Psychometric Career Assessment
          </CardTitle>
          <CardDescription>
            Comprehensive evaluation of your orientation style, interests, personality, aptitude, and emotional intelligence
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Overall Progress */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Overall Progress</span>
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {currentQuestionIndex + 1} of {psychometricQuestions.length}
            </span>
          </div>
          <Progress value={progress} className="w-full" />
        </CardContent>
      </Card>

      {/* Dimension Progress */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {assessmentDimensions.map((dimension) => {
          const DimIcon = dimension.icon;
          const isActive = dimension.id === currentDimension;
          const progress = dimensionProgress[dimension.id] || 0;
          
          return (
            <Card key={dimension.id} className={`${isActive ? 'ring-2 ring-indigo-500' : ''}`}>
              <CardContent className="p-4 text-center">
                <DimIcon className={`h-6 w-6 mx-auto mb-2 ${dimension.color}`} />
                <h3 className="font-medium text-sm mb-1">{dimension.title}</h3>
                <Progress value={progress} className="w-full h-2" />
                <span className="text-xs text-gray-600 dark:text-gray-400 mt-1 block">
                  {Math.round(progress)}%
                </span>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Current Question */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3 mb-4">
            <Icon className={`h-8 w-8 ${currentDimensionInfo?.color}`} />
            <div>
              <CardTitle className="text-lg">{currentDimensionInfo?.title}</CardTitle>
              <CardDescription>{currentDimensionInfo?.description}</CardDescription>
            </div>
          </div>
          <Badge variant="outline" className="w-fit">
            Question {currentQuestionIndex + 1}
          </Badge>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h3 className="text-lg font-medium mb-4">{currentQuestion.question}</h3>
            {renderQuestion()}
          </div>

          <div className="flex justify-between">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentQuestionIndex === 0}
            >
              Previous
            </Button>
            <Button
              onClick={handleNext}
              disabled={answers[currentQuestion.id] === undefined}
              className="bg-indigo-600 hover:bg-indigo-700"
            >
              {currentQuestionIndex === psychometricQuestions.length - 1 ? 'Complete Assessment' : 'Next'}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Time Indicator */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-center gap-2 text-sm text-gray-600 dark:text-gray-400">
            <Clock className="h-4 w-4" />
            Estimated time remaining: {Math.max(1, Math.round((psychometricQuestions.length - currentQuestionIndex - 1) * 0.5))} minutes
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function generatePersonalityProfile(scores: Record<string, number>, answers: Record<string, any>) {
  // Generate insights based on dimension scores
  const insights = [];
  
  if (scores.orientation > 75) {
    insights.push("You prefer structured, methodical approaches to work and learning.");
  } else if (scores.orientation < 40) {
    insights.push("You thrive in flexible, adaptive environments with room for creativity.");
  }
  
  if (scores.personality > 70) {
    insights.push("You're energized by social interactions and collaborative environments.");
  } else if (scores.personality < 40) {
    insights.push("You work best in quiet, focused environments with minimal distractions.");
  }
  
  if (scores.eq > 80) {
    insights.push("You have strong emotional intelligence and interpersonal skills.");
  }
  
  if (scores.aptitude > 75) {
    insights.push("You demonstrate high cognitive ability and quick learning capacity.");
  }

  return {
    strengths: getTopStrengths(scores),
    workStyle: getWorkStyle(scores),
    careerFit: getCareerFit(scores),
    developmentAreas: getDevelopmentAreas(scores),
    insights
  };
}

function getTopStrengths(scores: Record<string, number>) {
  const strengths = [];
  if (scores.orientation > 70) strengths.push("Strategic Planning");
  if (scores.interest > 70) strengths.push("Intrinsic Motivation");
  if (scores.personality > 70) strengths.push("Team Collaboration");
  if (scores.aptitude > 70) strengths.push("Problem Solving");
  if (scores.eq > 70) strengths.push("Emotional Intelligence");
  return strengths;
}

function getWorkStyle(scores: Record<string, number>) {
  if (scores.personality > 60 && scores.eq > 60) return "Collaborative Leader";
  if (scores.aptitude > 70 && scores.orientation > 60) return "Analytical Strategist";
  if (scores.interest > 70 && scores.personality < 50) return "Independent Innovator";
  return "Balanced Professional";
}

function getCareerFit(scores: Record<string, number>) {
  const fits = [];
  if (scores.aptitude > 70 && scores.orientation > 60) fits.push("Technical Roles");
  if (scores.eq > 70 && scores.personality > 60) fits.push("Leadership Positions");
  if (scores.interest > 70) fits.push("Creative Fields");
  if (scores.orientation > 70) fits.push("Project Management");
  return fits;
}

function getDevelopmentAreas(scores: Record<string, number>) {
  const areas = [];
  if (scores.eq < 60) areas.push("Emotional Intelligence");
  if (scores.personality < 50) areas.push("Team Collaboration");
  if (scores.orientation < 50) areas.push("Strategic Planning");
  if (scores.aptitude < 60) areas.push("Analytical Skills");
  return areas;
}