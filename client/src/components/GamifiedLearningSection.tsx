import { useState, useEffect } from "react";
import { Trophy, Medal, Star, Code, Clock, GraduationCap, Check, Play, Lock, Target, BookOpen, ChevronRight, Sparkles, Globe, Smartphone, Database, Brain, Palette, Server } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/hooks/use-auth";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import type { UserProgress, UserAchievement } from "@shared/schema";

const allSkillTreeCategories = {
  "ai-prompting": {
    title: "AI & Prompting",
    icon: Brain,
    iconColor: "text-purple-500",
    trees: [
      {
        id: "prompting-basics",
        title: "Prompting Fundamentals",
        icon: Brain,
        iconColor: "text-blue-500",
        skills: [
          { 
            name: "Prompt Structure", 
            xp: 100, 
            description: "Learn the anatomy of effective prompts",
            task: "Write a clear, specific prompt to get a recipe for chocolate chip cookies. Include the desired output format and any constraints.",
            example: "Create a simple recipe for chocolate chip cookies with exactly 6 ingredients, formatted as a numbered list with prep time included."
          },
          { 
            name: "Context Setting", 
            xp: 150, 
            description: "Master the art of providing context",
            task: "Create a prompt that sets clear context for writing a professional email to decline a job offer politely.",
            example: "You are a professional communicator. Write a polite email declining a software engineer position at TechCorp, mentioning you've accepted another opportunity."
          },
          { 
            name: "Clear Instructions", 
            xp: 200, 
            description: "Give precise, actionable instructions",
            task: "Write a prompt to explain quantum computing to a 10-year-old using only simple analogies and no technical jargon.",
            example: "Explain quantum computing to a 10-year-old using only everyday objects as analogies. Keep it under 100 words and make it fun."
          },
          { 
            name: "Output Formatting", 
            xp: 250, 
            description: "Control how responses are structured",
            task: "Create a prompt that generates a comparison table between cats and dogs with exactly 5 characteristics.",
            example: "Create a comparison table between cats and dogs. Include exactly 5 characteristics: independence, energy level, grooming needs, space requirements, and training difficulty. Format as a markdown table."
          },
        ],
      },
      {
        id: "advanced-techniques", 
        title: "Advanced Techniques",
        icon: Star,
        iconColor: "text-purple-500",
        skills: [
          { 
            name: "Role-Based Prompting", 
            xp: 200, 
            description: "Use personas and roles for better responses",
            task: "Create a prompt where the AI acts as a financial advisor explaining investment strategies to a college student.",
            example: "You are an experienced financial advisor. Explain 3 basic investment strategies suitable for a college student with $500 to invest. Be encouraging and use simple terms."
          },
          { 
            name: "Chain of Thought", 
            xp: 300, 
            description: "Guide AI through step-by-step reasoning",
            task: "Write a prompt that guides the AI through solving a math word problem step by step.",
            example: "Solve this step by step: 'A store offers 20% off all items. If a jacket costs $80 after the discount, what was the original price?' Show each calculation step clearly."
          },
          { 
            name: "Few-Shot Learning", 
            xp: 350, 
            description: "Provide examples to guide responses",
            task: "Create a prompt with 2 examples that teaches the AI to write product descriptions in a specific style.",
            example: "Write product descriptions in this style:\n\nExample 1: Coffee Mug - 'Start your day right with this ceramic companion that holds your liquid motivation.'\n\nExample 2: Notebook - 'Capture your thoughts in this paper sanctuary where ideas come to life.'\n\nNow write a description for: Wireless Headphones"
          },
          { 
            name: "Constraint Handling", 
            xp: 400, 
            description: "Work within specific limitations effectively",
            task: "Write a prompt that asks for a story in exactly 50 words with specific character and setting constraints.",
            example: "Write a story in exactly 50 words featuring a detective, a missing cat, and a library setting. Include a plot twist and ensure the story has a complete beginning, middle, and end."
          },
        ],
      },
    ]
  },
  "web-development": {
    title: "Web Development",
    icon: Globe,
    iconColor: "text-green-500",
    trees: [
      {
        id: "frontend-basics",
        title: "Frontend Fundamentals",
        icon: Code,
        iconColor: "text-blue-500",
        skills: [
          { 
            name: "HTML Basics", 
            xp: 100, 
            description: "Learn HTML structure and semantic elements",
            task: "Create a semantic HTML page with header, nav, main, section, and footer elements for a portfolio website.",
            example: "Build a portfolio homepage with proper HTML5 semantic structure including navigation menu, hero section, and contact form."
          },
          { 
            name: "CSS Styling", 
            xp: 150, 
            description: "Master CSS for layout and design",
            task: "Style a responsive card component using CSS Grid and Flexbox with hover effects.",
            example: "Create a product card with image, title, description, and price that looks good on both desktop and mobile."
          },
          { 
            name: "JavaScript Fundamentals", 
            xp: 200, 
            description: "Learn JavaScript basics and DOM manipulation",
            task: "Build an interactive to-do list with add, delete, and mark complete functionality using vanilla JavaScript.",
            example: "Create a to-do app that saves items to localStorage and has filtering options (all, active, completed)."
          },
          { 
            name: "Responsive Design", 
            xp: 250, 
            description: "Create layouts that work on all devices",
            task: "Build a responsive navigation that becomes a hamburger menu on mobile devices.",
            example: "Design a navigation bar that collapses to a hamburger menu below 768px width with smooth animations."
          },
        ],
      },
      {
        id: "frontend-frameworks",
        title: "Frontend Frameworks",
        icon: Star,
        iconColor: "text-green-500",
        skills: [
          { 
            name: "React Basics", 
            xp: 200, 
            description: "Learn React components and state management",
            task: "Build a counter app with increment, decrement, and reset functionality using React hooks.",
            example: "Create a React component that manages counter state and displays the value with styled buttons."
          },
          { 
            name: "React Hooks", 
            xp: 300, 
            description: "Master useState, useEffect, and custom hooks",
            task: "Build a weather app that fetches data from an API and updates every 5 minutes using useEffect.",
            example: "Create a weather widget that shows current conditions and auto-refreshes, with loading and error states."
          },
          { 
            name: "State Management", 
            xp: 350, 
            description: "Learn Redux or Context API for complex state",
            task: "Build a shopping cart with add/remove items, quantity updates, and total calculation using context.",
            example: "Create a global shopping cart state that persists across page navigations in a React app."
          },
          { 
            name: "Component Libraries", 
            xp: 400, 
            description: "Use UI libraries like Material-UI or Chakra UI",
            task: "Build a dashboard with charts, tables, and forms using a component library of your choice.",
            example: "Create an admin dashboard with data visualization and form components using Material-UI or similar."
          },
        ],
      },
    ]
  },
  "mobile-development": {
    title: "Mobile Development",
    icon: Smartphone,
    iconColor: "text-indigo-500",
    trees: [
      {
        id: "react-native",
        title: "React Native",
        icon: Smartphone,
        iconColor: "text-blue-500",
        skills: [
          { 
            name: "React Native Basics", 
            xp: 100, 
            description: "Learn mobile app structure and components",
            task: "Build a simple 'Hello World' app with navigation between two screens.",
            example: "Create a mobile app with a welcome screen and a profile screen using React Native navigation."
          },
          { 
            name: "Mobile UI Components", 
            xp: 150, 
            description: "Master mobile-specific UI elements",
            task: "Build a contact list with search functionality and swipe-to-delete actions.",
            example: "Create a contacts app with FlatList, SearchBar, and SwipeRow components for mobile interactions."
          },
          { 
            name: "Device Features", 
            xp: 200, 
            description: "Access camera, GPS, and device sensors",
            task: "Build a photo gallery app that can take pictures and access device location.",
            example: "Create an app that captures photos, tags them with GPS coordinates, and displays them in a grid."
          },
          { 
            name: "App Store Deployment", 
            xp: 250, 
            description: "Prepare and publish mobile apps",
            task: "Package and prepare a React Native app for iOS App Store or Google Play Store submission.",
            example: "Configure app icons, splash screens, and build signed APK/IPA files for store deployment."
          },
        ],
      },
    ]
  },
  "data-science": {
    title: "Data Science",
    icon: Database,
    iconColor: "text-orange-500",
    trees: [
      {
        id: "python-data",
        title: "Python for Data Science",
        icon: Database,
        iconColor: "text-blue-500",
        skills: [
          { 
            name: "Pandas Basics", 
            xp: 100, 
            description: "Learn data manipulation with pandas",
            task: "Load a CSV dataset and perform basic data cleaning and exploration using pandas.",
            example: "Import sales data, handle missing values, and calculate summary statistics using pandas DataFrame."
          },
          { 
            name: "Data Visualization", 
            xp: 150, 
            description: "Create charts and graphs with matplotlib/seaborn",
            task: "Create a dashboard with bar charts, line plots, and scatter plots from a dataset.",
            example: "Build visualizations showing sales trends, customer demographics, and product performance metrics."
          },
          { 
            name: "Statistical Analysis", 
            xp: 200, 
            description: "Perform statistical tests and analysis",
            task: "Conduct hypothesis testing and correlation analysis on a business dataset.",
            example: "Analyze customer data to find significant relationships between demographics and purchasing behavior."
          },
          { 
            name: "Machine Learning", 
            xp: 250, 
            description: "Build predictive models with scikit-learn",
            task: "Train a machine learning model to predict customer churn or sales forecasting.",
            example: "Create a classification model to predict customer retention using historical transaction data."
          },
        ],
      },
    ]
  },
  "design": {
    title: "UI/UX Design",
    icon: Palette,
    iconColor: "text-pink-500",
    trees: [
      {
        id: "ui-design",
        title: "UI Design Fundamentals",
        icon: Palette,
        iconColor: "text-blue-500",
        skills: [
          { 
            name: "Design Principles", 
            xp: 100, 
            description: "Learn color theory, typography, and layout",
            task: "Create a style guide with color palette, typography scale, and spacing system.",
            example: "Design a brand style guide with primary/secondary colors, font hierarchy, and component spacing rules."
          },
          { 
            name: "Wireframing", 
            xp: 150, 
            description: "Create low-fidelity layouts and user flows",
            task: "Design wireframes for a mobile e-commerce app checkout process.",
            example: "Create wireframes showing the user journey from product selection to payment completion."
          },
          { 
            name: "Prototyping", 
            xp: 200, 
            description: "Build interactive prototypes with tools like Figma",
            task: "Create a clickable prototype for a social media app with navigation and interactions.",
            example: "Build an interactive prototype showing user onboarding flow with animations and transitions."
          },
          { 
            name: "Design Systems", 
            xp: 250, 
            description: "Create reusable component libraries",
            task: "Build a complete design system with buttons, forms, and navigation components.",
            example: "Design a component library with consistent styling, states, and documentation for development handoff."
          },
        ],
      },
    ]
  },
  "backend-development": {
    title: "Backend Development",
    icon: Server,
    iconColor: "text-gray-500",
    trees: [
      {
        id: "api-development",
        title: "API Development",
        icon: Server,
        iconColor: "text-blue-500",
        skills: [
          { 
            name: "REST APIs", 
            xp: 100, 
            description: "Build RESTful web services",
            task: "Create a REST API for a blog with CRUD operations for posts and comments.",
            example: "Build an Express.js API with GET, POST, PUT, DELETE endpoints for managing blog content."
          },
          { 
            name: "Database Design", 
            xp: 150, 
            description: "Design efficient database schemas",
            task: "Design a database schema for an e-commerce platform with users, products, and orders.",
            example: "Create normalized tables with proper relationships, indexes, and constraints for an online store."
          },
          { 
            name: "Authentication", 
            xp: 200, 
            description: "Implement secure user authentication",
            task: "Build a user authentication system with JWT tokens and password hashing.",
            example: "Create login/register endpoints with bcrypt password hashing and JWT-based session management."
          },
          { 
            name: "API Security", 
            xp: 250, 
            description: "Secure APIs with rate limiting and validation",
            task: "Implement rate limiting, input validation, and CORS policies for an API.",
            example: "Add security middleware for API protection including request validation and abuse prevention."
          },
        ],
      },
    ]
  }
};

const achievements = [
  {
    id: "prompt-pioneer",
    title: "Prompt Pioneer",
    description: "Completed first prompting task",
    icon: Trophy,
    bgColor: "bg-yellow-50",
    borderColor: "border-yellow-200",
    iconColor: "text-yellow-500",
  },
  {
    id: "context-master",
    title: "Context Master", 
    description: "Mastered context setting",
    icon: Code,
    bgColor: "bg-blue-50",
    borderColor: "border-blue-200", 
    iconColor: "text-blue-500",
  },
  {
    id: "consistent-prompter",
    title: "Consistent Prompter",
    description: "5-day prompting streak",
    icon: Clock,
    bgColor: "bg-green-50",
    borderColor: "border-green-200",
    iconColor: "text-green-500",
  },
  {
    id: "ai-whisperer", 
    title: "AI Whisperer",
    description: "Advanced technique expert",
    icon: Star,
    bgColor: "bg-purple-50",
    borderColor: "border-purple-200",
    iconColor: "text-purple-500",
  },
];

export default function GamifiedLearningSection() {
  const { user, isAuthenticated, updateUser } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [selectedSkill, setSelectedSkill] = useState<{tree: string, skill: string} | null>(null);
  const [userPrompt, setUserPrompt] = useState("");
  const [showCelebration, setShowCelebration] = useState(false);
  const [earnedXP, setEarnedXP] = useState<number | null>(null);
  const [newLevel, setNewLevel] = useState<number | null>(null);
  const [showXPAnimation, setShowXPAnimation] = useState(false);
  const [newlyUnlockedSkills, setNewlyUnlockedSkills] = useState<string[]>([]);
  const [previousProgress, setPreviousProgress] = useState<UserProgress[]>([]);
  const [offlineProgress, setOfflineProgress] = useState<UserProgress[]>([]);
  const [offlineAchievements, setOfflineAchievements] = useState<UserAchievement[]>([]);
  const [offlineUser, setOfflineUser] = useState<any>(null);
  const [isUsingOfflineData, setIsUsingOfflineData] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>(() => {
    // Load saved category from localStorage
    if (typeof window !== 'undefined') {
      const savedCategory = localStorage.getItem('selectedSkillCategory');
      return savedCategory || "ai-prompting";
    }
    return "ai-prompting";
  });

  // Get user progress (now uses session-based auth)
  const { data: userProgress = [], isError: progressError } = useQuery<UserProgress[]>({
    queryKey: ["/api/user/progress"],
    enabled: isAuthenticated,
  });

  // Get user achievements
  const { data: userAchievements = [] } = useQuery<UserAchievement[]>({
    queryKey: ["/api/user/achievements"],
    enabled: isAuthenticated,
  });

  // LocalStorage backup and restore functionality
  useEffect(() => {
    if (isAuthenticated && user && userProgress.length > 0) {
      const progressBackup = {
        user: {
          id: user.id,
          level: user.level,
          xp: user.xp,
          name: user.name,
        },
        progress: userProgress,
        achievements: userAchievements,
        lastSaved: new Date().toISOString(),
      };
      localStorage.setItem('skillTreeProgress', JSON.stringify(progressBackup));
    }
  }, [user, userProgress, userAchievements, isAuthenticated]);

  // Restore from localStorage on load (fallback for offline)
  useEffect(() => {
    if (!isAuthenticated || progressError) {
      try {
        const backup = localStorage.getItem('skillTreeProgress');
        if (backup) {
          const data = JSON.parse(backup);
          if (data.progress && data.achievements && data.user) {
            // Verify user matches (if we have a user logged in)
            if (!user || !user.id || user.id === data.user.id) {
              setOfflineProgress(data.progress);
              setOfflineAchievements(data.achievements);
              setOfflineUser(data.user);
              setIsUsingOfflineData(true);
              console.log('Restored offline backup from:', data.lastSaved);
            }
          }
        }
      } catch (error) {
        console.error('Failed to restore from localStorage:', error);
      }
    } else {
      // Clear offline data when back online
      setIsUsingOfflineData(false);
      setOfflineProgress([]);
      setOfflineAchievements([]);
      setOfflineUser(null);
    }
  }, [isAuthenticated, progressError, user]);

  // Save selected category to localStorage when it changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('selectedSkillCategory', selectedCategory);
    }
  }, [selectedCategory]);

  // Get current skill trees for selected category
  const skillTrees = allSkillTreeCategories[selectedCategory as keyof typeof allSkillTreeCategories]?.trees || [];

  // Detect newly unlocked skills
  useEffect(() => {
    if (userProgress.length > 0 && previousProgress.length > 0 && skillTrees.length > 0) {
      const newlyUnlocked: string[] = [];
      
      skillTrees.forEach(tree => {
        tree.skills.forEach((skill: any, index: number) => {
          if (index > 0) { // Skip first skill as it's always unlocked
            const skillKey = `${tree.id}-${skill.name}`;
            const wasLocked = getSkillStatus(tree.id, skill.name, previousProgress) === "locked";
            const isNowUnlocked = getSkillStatus(tree.id, skill.name, userProgress) === "current";
            
            if (wasLocked && isNowUnlocked) {
              newlyUnlocked.push(skillKey);
            }
          }
        });
      });
      
      if (newlyUnlocked.length > 0) {
        setNewlyUnlockedSkills(newlyUnlocked);
        setTimeout(() => setNewlyUnlockedSkills([]), 3000);
      }
    }
    
    if (userProgress.length >= 0) { // Only update if userProgress is available
      setPreviousProgress(userProgress);
    }
  }, [userProgress, selectedCategory]); // Add selectedCategory as dependency

  // Complete task mutation
  const completeTaskMutation = useMutation({
    mutationFn: async (data: { skillPath: string; skillNode: string }) => {
      const response = await apiRequest("POST", "/api/user/progress", {
        skillPath: data.skillPath,
        skillNode: data.skillNode,
        completed: true,
      });
      return response.json();
    },
    onSuccess: (data) => {
      // Update user progress and achievements cache
      queryClient.invalidateQueries({ queryKey: ["/api/user/progress"] });
      queryClient.invalidateQueries({ queryKey: ["/api/user/achievements"] });
      
      // If XP was earned, update the user data in auth context
      if (data.user && data.earnedXP) {
        const oldLevel = user?.level || 1;
        updateUser(data.user);
        
        // Check for level up
        if (data.user.level > oldLevel) {
          setNewLevel(data.user.level);
        }
        
        // Set earned XP for animation
        setEarnedXP(data.earnedXP);
        setShowXPAnimation(true);
        setTimeout(() => setShowXPAnimation(false), 2000);
      }
      
      setShowCelebration(true);
      setTimeout(() => setShowCelebration(false), 4000);
      
      // Show achievement notifications
      if (data.newAchievements && data.newAchievements.length > 0) {
        data.newAchievements.forEach((achievement: any, index: number) => {
          setTimeout(() => {
            toast({
              title: `🏆 Achievement Unlocked!`,
              description: `${achievement.title}: ${achievement.description}`,
            });
          }, index * 1000); // Stagger achievement notifications
        });
      }
      
      const message = data.earnedXP 
        ? `Great work! You've earned ${data.earnedXP} XP and unlocked new challenges.`
        : "Great work! You've unlocked new challenges.";
      
      toast({
        title: "🎉 Task Completed!",
        description: message,
      });
      setSelectedSkill(null);
      setUserPrompt("");
    },
    onError: (error: any) => {
      console.error('Task completion error:', error);
      if (error.message?.includes('Authentication required') || error.status === 401) {
        toast({
          title: "Authentication Required",
          description: "Please log in to save your progress.",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Error Completing Task",
          description: "Something went wrong. Please try again.",
          variant: "destructive",
        });
      }
    },
  });

  // Get skill status based on user progress
  const getSkillStatus = (treeId: string, skillName: string, progressData = userProgress) => {
    const progress = progressData.find(
      (p) => p.skillPath === treeId && p.skillNode === skillName.toLowerCase().replace(/\s+/g, '-')
    );
    if (progress?.completed) return "completed";
    
    // Check if previous skills are completed to determine if this one is unlocked
    const tree = skillTrees.find(t => t.id === treeId);
    if (!tree) return "locked";
    
    const skillIndex = tree.skills.findIndex(s => s.name === skillName);
    if (skillIndex === 0) return "current"; // First skill is always available
    
    const previousSkill = tree.skills[skillIndex - 1];
    const prevProgress = progressData.find(
      (p) => p.skillPath === treeId && p.skillNode === previousSkill.name.toLowerCase().replace(/\s+/g, '-')
    );
    
    return prevProgress?.completed ? "current" : "locked";
  };

  // Use data from offline backup when available, otherwise server data
  const currentProgress = isUsingOfflineData ? offlineProgress : userProgress;
  const currentAchievements = isUsingOfflineData ? offlineAchievements : userAchievements;
  const currentUser = isUsingOfflineData ? offlineUser : user;

  // Use XP from user object (calculated on server or backup)
  const totalXP = currentUser?.xp || 0;

  const completedSkills = currentProgress.filter(p => p.completed).length;
  const totalSkills = skillTrees.reduce((total: number, tree: any) => total + tree.skills.length, 0);
  const progressPercentage = totalSkills > 0 ? (completedSkills / totalSkills) * 100 : 0;

  const handleStartTask = (treeId: string, skillName: string) => {
    if (!isAuthenticated) {
      toast({
        title: "Login Required",
        description: "Please log in to start learning tasks.",
        variant: "destructive",
      });
      return;
    }
    
    const status = getSkillStatus(treeId, skillName, currentProgress);
    if (status === "locked") {
      toast({
        title: "Skill Locked",
        description: "Complete the previous skill to unlock this one.",
        variant: "destructive",
      });
      return;
    }
    if (status === "completed") {
      toast({
        title: "Already Completed",
        description: "You've already mastered this skill!",
      });
      return;
    }
    setSelectedSkill({ tree: treeId, skill: skillName });
  };

  const handleCompleteTask = () => {
    if (!isAuthenticated) {
      toast({
        title: "Login Required",
        description: "Please log in to save your progress.",
        variant: "destructive",
      });
      return;
    }
    
    if (!selectedSkill || !userPrompt.trim()) {
      toast({
        title: "Task Not Ready",
        description: "Please write your prompt before completing the task.",
        variant: "destructive",
      });
      return;
    }

    completeTaskMutation.mutate({
      skillPath: selectedSkill.tree,
      skillNode: selectedSkill.skill.toLowerCase().replace(/\s+/g, '-'),
    });
  };

  const getCurrentTask = () => {
    if (!selectedSkill) return null;
    const tree = skillTrees.find(t => t.id === selectedSkill.tree);
    const skill = tree?.skills.find(s => s.name === selectedSkill.skill);
    return skill;
  };

  const currentTask = getCurrentTask();
  const getSkillIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <Check className="w-4 h-4 text-white" />;
      case "current":
        return <Play className="w-4 h-4 text-white" />;
      default:
        return <Lock className="w-4 h-4 text-gray-500" />;
    }
  };

  const getSkillStyles = (status: string) => {
    switch (status) {
      case "completed":
        return {
          containerClass: "bg-green-50 border-2 border-green-300",
          iconClass: "bg-green-500",
          textClass: "text-green-800",
          xpClass: "text-green-600",
        };
      case "current":
        return {
          containerClass: "bg-primary/10 border-2 border-primary",
          iconClass: "bg-primary",
          textClass: "text-primary",
          xpClass: "text-primary",
        };
      default:
        return {
          containerClass: "bg-gray-50 border-2 border-gray-200 opacity-60",
          iconClass: "bg-gray-300",
          textClass: "text-gray-600",
          xpClass: "text-gray-500",
        };
    }
  };

  return (
    <section className="py-8 sm:py-12 lg:py-16 w3-light-grey">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            <GraduationCap className="inline w-10 h-10 text-green-500 mr-3" />
            Gamified Learning
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto px-4 mb-8">
            Level up your skills with interactive challenges, skill trees, and rewards
          </p>

          {/* Category Navigation */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {Object.entries(allSkillTreeCategories).map(([categoryKey, category]) => {
              const IconComponent = category.icon;
              const isActive = selectedCategory === categoryKey;
              return (
                <Button
                  key={categoryKey}
                  variant={isActive ? "default" : "outline"}
                  onClick={() => setSelectedCategory(categoryKey)}
                  className={`flex items-center gap-2 transition-all duration-200 ${
                    isActive 
                      ? "bg-primary text-primary-foreground transform scale-105 shadow-lg" 
                      : "hover:scale-105"
                  }`}
                  data-testid={`category-${categoryKey}`}
                >
                  <IconComponent className={`w-4 h-4 ${isActive ? "text-white" : category.iconColor}`} />
                  {category.title}
                </Button>
              );
            })}
          </div>
        </div>

        {/* User Progress */}
        <Card className="mb-8 sm:mb-12" data-testid="user-progress">
          <CardHeader>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <CardTitle className="text-xl sm:text-2xl">Prompt Engineer Level {currentUser?.level || 1}</CardTitle>
                <CardDescription className="text-sm sm:text-base">
                  {totalXP} XP • {completedSkills}/{totalSkills} skills completed
                  {isUsingOfflineData && <span className="text-orange-600"> (Offline)</span>}
                </CardDescription>
              </div>
              <div className="text-left sm:text-right">
                <div className="text-2xl sm:text-3xl text-primary font-bold">{totalXP}</div>
                <div className="text-xs sm:text-sm text-gray-500">Total XP</div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {/* Progress Bar */}
            <div className="mb-6">
              <div className="flex justify-between items-center text-sm text-gray-600 mb-2">
                <span>Progress</span>
                <div className="flex items-center gap-2">
                  <span>{Math.round(progressPercentage)}%</span>
                  {showXPAnimation && earnedXP && (
                    <span className="text-green-500 font-bold animate-bounce">
                      +{earnedXP} XP!
                    </span>
                  )}
                </div>
              </div>
              <Progress value={progressPercentage} className="h-3 transition-all duration-1000 ease-out" />
            </div>

            {/* Achievement Badges */}
            <div className="flex flex-wrap gap-2 sm:gap-3">
              {achievements.map((achievement) => {
                const IconComponent = achievement.icon;
                const earned = currentAchievements.some(ua => ua.achievementId === achievement.id);
                return (
                  <Badge
                    key={achievement.id}
                    variant={earned ? "default" : "secondary"}
                    className={`${earned ? achievement.bgColor : "bg-gray-100"} ${earned ? achievement.borderColor : "border-gray-200"} border`}
                  >
                    <IconComponent className={`w-3 h-3 mr-1 ${earned ? achievement.iconColor : "text-gray-400"}`} />
                    {achievement.title}
                  </Badge>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Active Task Panel */}
        {selectedSkill && currentTask && (
          <Card className="mb-8 border-primary/20 bg-primary/5" data-testid="active-task">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5 text-primary" />
                Current Task: {currentTask.name}
              </CardTitle>
              <CardDescription>{currentTask.description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-semibold text-blue-900 mb-2 flex items-center gap-2">
                  <BookOpen className="w-4 h-4" />
                  Your Challenge
                </h4>
                <p className="text-blue-800 text-sm">{currentTask.task}</p>
              </div>
              
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h4 className="font-semibold text-green-900 mb-2">Example Solution</h4>
                <p className="text-green-800 text-sm font-mono bg-white p-2 rounded border">
                  {currentTask.example}
                </p>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Your Prompt:</label>
                <textarea
                  value={userPrompt}
                  onChange={(e) => setUserPrompt(e.target.value)}
                  placeholder="Write your prompt here..."
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                  rows={4}
                  data-testid="input-user-prompt"
                />
              </div>

              <div className="flex gap-3">
                <Button
                  onClick={handleCompleteTask}
                  disabled={!userPrompt.trim() || completeTaskMutation.isPending}
                  className="flex-1"
                  data-testid="button-complete-task"
                >
                  {completeTaskMutation.isPending ? "Completing..." : "Complete Task"}
                  <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSelectedSkill(null);
                    setUserPrompt("");
                  }}
                  data-testid="button-cancel-task"
                >
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Skill Trees */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mb-8 sm:mb-12">
          {skillTrees.map((tree) => (
            <Card key={tree.id} data-testid={`skill-tree-${tree.id}`}>
              <CardHeader>
                <CardTitle className="text-lg sm:text-xl text-center">
                  <i className={`${tree.icon} ${tree.iconColor} mr-2`}></i>
                  {tree.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 sm:space-y-4">
                  {tree.skills.map((skill, index) => {
                    const status = getSkillStatus(tree.id, skill.name, currentProgress);
                    const styles = getSkillStyles(status);
                    const skillKey = `${tree.id}-${skill.name}`;
                    const isNewlyUnlocked = newlyUnlockedSkills.includes(skillKey);
                    return (
                      <div key={skill.name}>
                        <div className="skill-tree-node relative">
                          <div 
                            className={`flex items-center p-2 sm:p-3 rounded-lg cursor-pointer transition-all duration-300 hover:shadow-md hover:scale-105 ${styles.containerClass} ${isNewlyUnlocked ? 'animate-pulse ring-2 ring-primary ring-opacity-75' : ''}`}
                            onClick={() => handleStartTask(tree.id, skill.name)}
                            data-testid={`skill-${tree.id}-${skill.name.toLowerCase().replace(/\s+/g, '-')}`}
                          >
                            <div className={`w-6 h-6 sm:w-8 sm:h-8 ${styles.iconClass} rounded-full flex items-center justify-center mr-2 sm:mr-3`}>
                              {getSkillIcon(status)}
                            </div>
                            <div className="flex-1">
                              <div className={`text-sm sm:text-base font-medium ${styles.textClass}`}>{skill.name}</div>
                              <div className={`text-xs sm:text-sm ${styles.xpClass}`}>{skill.xp} XP</div>
                            </div>
                            {status === "current" && (
                              <Button size="sm" variant="ghost" className="ml-2">
                                Start
                              </Button>
                            )}
                          </div>
                        </div>
                        {index < tree.skills.length - 1 && (
                          <div className={`h-0.5 sm:h-1 w-full mx-auto rounded ${
                            status === "completed" ? "bg-primary" : "bg-gray-200"
                          }`}></div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Achievement Showcase */}
        <Card data-testid="recent-achievements">
          <CardHeader>
            <CardTitle className="text-xl sm:text-2xl flex items-center gap-2">
              <Sparkles className="w-6 h-6 text-yellow-500" />
              Your Achievements
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
              {achievements.map((achievement) => {
                const IconComponent = achievement.icon;
                const earned = currentAchievements.some(ua => ua.achievementId === achievement.id);
                return (
                  <div 
                    key={achievement.id}
                    className={`text-center p-3 sm:p-4 rounded-lg border transition-all ${
                      earned 
                        ? `${achievement.bgColor} ${achievement.borderColor} shadow-sm` 
                        : "bg-gray-50 border-gray-200 opacity-60"
                    }`}
                    data-testid={`achievement-${achievement.id}`}
                  >
                    <IconComponent 
                      className={`mb-2 mx-auto ${earned ? achievement.iconColor : "text-gray-400"}`} 
                      size={24} 
                    />
                    <h4 className={`text-sm sm:text-base font-semibold ${
                      earned ? "text-gray-900" : "text-gray-500"
                    }`}>
                      {achievement.title}
                    </h4>
                    <p className={`text-xs sm:text-sm ${
                      earned ? "text-gray-600" : "text-gray-400"
                    }`}>
                      {achievement.description}
                    </p>
                    {earned && (
                      <Badge variant="secondary" className="mt-2 text-xs">
                        Earned!
                      </Badge>
                    )}
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Celebration Popup */}
        {showCelebration && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 animate-in fade-in duration-300" data-testid="celebration-popup">
            <Card className="max-w-md mx-4 text-center bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-200 animate-in zoom-in duration-500">
              <CardContent className="pt-6">
                <div className="text-6xl mb-4 animate-bounce">
                  {newLevel ? "🎊" : "🎉"}
                </div>
                {newLevel && (
                  <div className="mb-4">
                    <div className="text-4xl font-bold text-purple-600 animate-pulse">
                      LEVEL UP!
                    </div>
                    <div className="text-lg text-purple-700">
                      You reached Level {newLevel}!
                    </div>
                  </div>
                )}
                <h2 className="text-2xl font-bold text-orange-900 mb-2">
                  {newLevel ? "Outstanding Achievement!" : "Congratulations!"}
                </h2>
                <p className="text-orange-800 mb-4">
                  {earnedXP ? `You've earned ${earnedXP} XP and ` : "You've "}
                  completed another prompting challenge!
                </p>
                <Button 
                  onClick={() => {
                    setShowCelebration(false);
                    setNewLevel(null);
                    setEarnedXP(null);
                  }}
                  className="bg-orange-500 hover:bg-orange-600 transform hover:scale-105 transition-transform"
                >
                  Continue Learning
                </Button>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </section>
  );
}
