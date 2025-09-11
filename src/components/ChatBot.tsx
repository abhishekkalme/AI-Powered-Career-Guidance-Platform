import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { ScrollArea } from './ui/scroll-area';
import { Avatar, AvatarFallback } from './ui/avatar';
import { 
  MessageSquare, 
  Send, 
  Bot, 
  User, 
  Lightbulb, 
  MapPin, 
  BookOpen,
  TrendingUp,
  Clock
} from 'lucide-react';

interface ChatBotProps {
  userData: any;
}

interface Message {
  id: string;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
  suggestions?: string[];
}

export function ChatBot({ userData }: ChatBotProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'bot',
      content: "Hi! I'm your AI Career Counselor. I've analyzed your profile and assessment results. I can help you with career guidance, skill development planning, and answering any questions about your career path. What would you like to know?",
      timestamp: new Date(),
      suggestions: [
        "How do I become a Data Scientist?",
        "What skills should I learn first?",
        "Tell me about salary expectations",
        "How long will it take to transition?"
      ]
    }
  ]);
  
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  const quickActions = [
    { icon: MapPin, text: "Career Roadmap", color: "bg-blue-100 text-blue-600" },
    { icon: BookOpen, text: "Learning Resources", color: "bg-green-100 text-green-600" },
    { icon: TrendingUp, text: "Salary Insights", color: "bg-purple-100 text-purple-600" },
    { icon: Clock, text: "Timeline Planning", color: "bg-orange-100 text-orange-600" }
  ];

  const generateBotResponse = (userMessage: string): Message => {
    // Simple keyword-based responses (in real app, this would use actual AI)
    const message = userMessage.toLowerCase();
    
    let response = "";
    let suggestions: string[] = [];

    if (message.includes('data scientist') || message.includes('data science')) {
      response = `Based on your profile, becoming a Data Scientist is an excellent fit! Here's a personalized roadmap:

**Your Advantages:**
- Strong analytical thinking (${userData.assessmentResults?.scores?.analytical || 85}% score)
- Good technical aptitude (${userData.assessmentResults?.scores?.technical || 78}% score)

**Recommended Path:**
1. **Immediate (0-3 months):** Master Python and SQL basics
2. **Short-term (3-6 months):** Learn statistics, pandas, and data visualization
3. **Medium-term (6-12 months):** Dive into machine learning and build portfolio projects
4. **Long-term (12+ months):** Specialize in areas like NLP, computer vision, or MLOps

**Timeline:** With your background, expect 8-12 months of focused learning to be job-ready for entry-level positions.`;
      
      suggestions = [
        "What specific Python skills should I learn?",
        "How do I build a data science portfolio?",
        "What are entry-level data scientist salaries?",
        "Which online courses do you recommend?"
      ];
    }
    else if (message.includes('skill') || message.includes('learn')) {
      response = `Based on your skill gap analysis, here are your priority learning areas:

**High Priority Skills (Start Immediately):**
- Python Programming (Gap: ${userData.skillGaps?.find((s: any) => s.skill === 'Python')?.required - userData.skillGaps?.find((s: any) => s.skill === 'Python')?.current || 30} points)
- Machine Learning (Gap: ${userData.skillGaps?.find((s: any) => s.skill === 'Machine Learning')?.required - userData.skillGaps?.find((s: any) => s.skill === 'Machine Learning')?.current || 45} points)

**Learning Strategy:**
1. Focus on one skill at a time for better retention
2. Practice with real projects, not just tutorials
3. Join communities (Reddit, Stack Overflow, Kaggle)
4. Build a portfolio showcasing each skill

**Time Investment:** Plan for 10-15 hours per week for optimal progress.`;
      
      suggestions = [
        "Show me Python learning resources",
        "How do I practice machine learning?",
        "What projects should I build?",
        "How to balance learning with work?"
      ];
    }
    else if (message.includes('salary') || message.includes('pay') || message.includes('money')) {
      response = `Here's the salary outlook for your target careers:

**Data Scientist:**
- Entry Level: $75,000 - $95,000
- Mid Level (3-5 years): $95,000 - $130,000
- Senior Level (5+ years): $130,000 - $180,000+

**Factors Affecting Salary:**
- Location (SF Bay Area +40%, NYC +30%, Austin +15%)
- Industry (Tech/Finance pay highest)
- Specialization (AI/ML specialists earn 15-25% more)
- Company size (Big Tech companies offer highest packages)

**Your Salary Progression:**
Based on your profile, expect to start around $80,000-$90,000 in your location, with potential to reach $120,000+ within 3-4 years.`;
      
      suggestions = [
        "How to negotiate salary?",
        "Which locations pay most?",
        "What about remote work salaries?",
        "How do bonuses work in tech?"
      ];
    }
    else if (message.includes('time') || message.includes('long') || message.includes('duration')) {
      response = `Here's a realistic timeline for your career transition:

**Phase 1: Foundation (3-4 months)**
- Python basics, SQL, statistics fundamentals
- Start building simple projects

**Phase 2: Skill Building (4-6 months)**
- Advanced Python, pandas, scikit-learn
- Complete 2-3 substantial projects

**Phase 3: Specialization (3-4 months)**
- Machine learning algorithms, deep learning
- Domain-specific knowledge (finance, healthcare, etc.)

**Phase 4: Job Search (2-3 months)**
- Portfolio refinement, networking, interviews

**Total Timeline: 12-17 months** for a complete transition, but you could start applying for junior roles after 8-10 months.

**Acceleration Tips:**
- Dedicate 15+ hours per week
- Join bootcamps or structured programs
- Network actively in the community`;
      
      suggestions = [
        "Can I transition faster with a bootcamp?",
        "How many hours should I study daily?",
        "When should I start applying for jobs?",
        "What if I'm learning part-time?"
      ];
    }
    else if (message.includes('course') || message.includes('resource') || message.includes('learn')) {
      response = `Here are the best learning resources based on your profile:

**Python Programming:**
- Python for Everybody (Coursera) - Great for beginners
- Automate the Boring Stuff - Practical Python applications
- Python Data Science Handbook - For data-focused learning

**Data Science & ML:**
- Andrew Ng's Machine Learning Course (Coursera)
- Fast.ai - Practical deep learning
- Kaggle Learn - Free micro-courses

**Practice Platforms:**
- Kaggle - Competitions and datasets
- GitHub - Portfolio building
- Google Colab - Free coding environment

**Indian Resources:**
- SWAYAM courses (Government platform)
- IIT online courses
- Skill India digital platform

**Budget:** Many quality resources are free. Budget $50-100/month for premium courses if needed.`;
      
      suggestions = [
        "Which course should I start with?",
        "Are free courses sufficient?",
        "How to choose between options?",
        "Do I need paid certifications?"
      ];
    }
    else {
      response = `I understand you're asking about "${userMessage}". Based on your career profile and assessment results, I can provide guidance on:

**Career Planning:**
- Specific career transitions and roadmaps
- Skill development strategies
- Timeline and milestone planning

**Learning & Development:**
- Course recommendations and learning paths
- Project ideas for portfolio building
- Skill gap prioritization

**Market Insights:**
- Salary expectations and negotiation
- Industry trends and job market analysis
- Company and role targeting

How can I help you with any of these areas?`;
      
      suggestions = [
        "Tell me about Data Scientist career path",
        "What skills should I prioritize?",
        "Show me salary expectations",
        "Help me plan my learning timeline"
      ];
    }

    return {
      id: Date.now().toString(),
      type: 'bot',
      content: response,
      timestamp: new Date(),
      suggestions
    };
  };

  const handleSendMessage = (text?: string) => {
    const messageText = text || inputValue.trim();
    if (!messageText) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: messageText,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate bot thinking time
    setTimeout(() => {
      const botResponse = generateBotResponse(messageText);
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Chat Interface */}
      <div className="lg:col-span-2">
        <Card className="h-[600px] flex flex-col">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center space-x-2">
              <MessageSquare className="h-5 w-5 text-blue-600" />
              <span>AI Career Counselor</span>
              <Badge variant="secondary" className="bg-green-100 text-green-800">
                Online
              </Badge>
            </CardTitle>
            <CardDescription>
              Get personalized career advice based on your profile and assessment
            </CardDescription>
          </CardHeader>

          <CardContent className="flex-1 flex flex-col space-y-4">
            <ScrollArea className="flex-1 pr-4" ref={scrollAreaRef}>
              <div className="space-y-4">
                {messages.map((message) => (
                  <div key={message.id} className={`flex items-start space-x-3 ${message.type === 'user' ? 'justify-end' : ''}`}>
                    {message.type === 'bot' && (
                      <Avatar className="w-8 h-8">
                        <AvatarFallback className="bg-blue-100 text-blue-600">
                          <Bot className="h-4 w-4" />
                        </AvatarFallback>
                      </Avatar>
                    )}
                    
                    <div className={`max-w-[80%] space-y-2 ${message.type === 'user' ? 'order-first' : ''}`}>
                      <div className={`p-3 rounded-lg ${
                        message.type === 'user' 
                          ? 'bg-blue-600 text-white ml-auto' 
                          : 'bg-gray-100 text-gray-900'
                      }`}>
                        <p className="whitespace-pre-line">{message.content}</p>
                      </div>
                      
                      {message.suggestions && (
                        <div className="flex flex-wrap gap-2">
                          {message.suggestions.map((suggestion, index) => (
                            <Button
                              key={index}
                              variant="outline"
                              size="sm"
                              className="text-xs h-7"
                              onClick={() => handleSendMessage(suggestion)}
                            >
                              {suggestion}
                            </Button>
                          ))}
                        </div>
                      )}
                      
                      <p className="text-xs text-gray-500">
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>

                    {message.type === 'user' && (
                      <Avatar className="w-8 h-8">
                        <AvatarFallback className="bg-gray-200 text-gray-600">
                          <User className="h-4 w-4" />
                        </AvatarFallback>
                      </Avatar>
                    )}
                  </div>
                ))}

                {isTyping && (
                  <div className="flex items-start space-x-3">
                    <Avatar className="w-8 h-8">
                      <AvatarFallback className="bg-blue-100 text-blue-600">
                        <Bot className="h-4 w-4" />
                      </AvatarFallback>
                    </Avatar>
                    <div className="bg-gray-100 text-gray-900 p-3 rounded-lg">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </ScrollArea>

            <div className="flex space-x-2">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask me about your career path, skills, or any guidance you need..."
                className="flex-1"
              />
              <Button 
                onClick={() => handleSendMessage()}
                disabled={!inputValue.trim() || isTyping}
                size="icon"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Sidebar */}
      <div className="space-y-6">
        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Lightbulb className="h-5 w-5" />
              <span>Quick Actions</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {quickActions.map((action, index) => {
              const Icon = action.icon;
              return (
                <Button
                  key={index}
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => handleSendMessage(action.text)}
                >
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center mr-3 ${action.color}`}>
                    <Icon className="h-4 w-4" />
                  </div>
                  {action.text}
                </Button>
              );
            })}
          </CardContent>
        </Card>

        {/* Your Context */}
        <Card>
          <CardHeader>
            <CardTitle>Your Profile Context</CardTitle>
            <CardDescription>
              Information I'm using to personalize advice
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="text-sm">
              <p className="font-medium">Top Career Match:</p>
              <p className="text-gray-600">
                {userData.careerRecommendations?.[0]?.title || 'Data Scientist'} 
                ({userData.careerRecommendations?.[0]?.match || 92}% match)
              </p>
            </div>
            
            <div className="text-sm">
              <p className="font-medium">Key Strengths:</p>
              <div className="flex flex-wrap gap-1 mt-1">
                <Badge variant="secondary" className="text-xs">Analytical</Badge>
                <Badge variant="secondary" className="text-xs">Problem Solving</Badge>
                <Badge variant="secondary" className="text-xs">Technical</Badge>
              </div>
            </div>
            
            <div className="text-sm">
              <p className="font-medium">Priority Skills:</p>
              <div className="flex flex-wrap gap-1 mt-1">
                {userData.skillGaps?.slice(0, 3).map((skill: any, index: number) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {skill.skill}
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Suggested Questions */}
        <Card>
          <CardHeader>
            <CardTitle>Suggested Questions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {[
              "How do I transition to data science?",
              "What's the job market like?",
              "Should I get a certification?",
              "How to build a portfolio?",
              "What about remote opportunities?",
              "Industry salary benchmarks?"
            ].map((question, index) => (
              <Button
                key={index}
                variant="ghost"
                size="sm"
                className="w-full justify-start text-left h-auto p-2"
                onClick={() => handleSendMessage(question)}
              >
                <span className="text-xs text-gray-600">{question}</span>
              </Button>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}