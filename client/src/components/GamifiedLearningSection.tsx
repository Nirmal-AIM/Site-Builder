import { useState, useEffect } from "react";
import { Trophy, Medal, Star, Code, Clock, GraduationCap, Check, Play, Lock, Target, BookOpen, ChevronRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/hooks/use-auth";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import type { UserProgress } from "@shared/schema";

const skillTrees = [
  {
    id: "prompting-basics",
    title: "Prompting Fundamentals",
    icon: "fas fa-comment-dots",
    iconColor: "text-blue-500",
    skills: [
      { 
        name: "Prompt Structure", 
        xp: 100, 
        status: "current",
        description: "Learn the anatomy of effective prompts",
        task: "Write a clear, specific prompt to get a recipe for chocolate chip cookies. Include the desired output format and any constraints.",
        example: "Create a simple recipe for chocolate chip cookies with exactly 6 ingredients, formatted as a numbered list with prep time included."
      },
      { 
        name: "Context Setting", 
        xp: 150, 
        status: "locked",
        description: "Master the art of providing context",
        task: "Create a prompt that sets clear context for writing a professional email to decline a job offer politely.",
        example: "You are a professional communicator. Write a polite email declining a software engineer position at TechCorp, mentioning you've accepted another opportunity."
      },
      { 
        name: "Clear Instructions", 
        xp: 200, 
        status: "locked",
        description: "Give precise, actionable instructions",
        task: "Write a prompt to explain quantum computing to a 10-year-old using only simple analogies and no technical jargon.",
        example: "Explain quantum computing to a 10-year-old using only everyday objects as analogies. Keep it under 100 words and make it fun."
      },
      { 
        name: "Output Formatting", 
        xp: 250, 
        status: "locked",
        description: "Control how responses are structured",
        task: "Create a prompt that generates a comparison table between cats and dogs with exactly 5 characteristics.",
        example: "Create a comparison table between cats and dogs. Include exactly 5 characteristics: independence, energy level, grooming needs, space requirements, and training difficulty. Format as a markdown table."
      },
    ],
  },
  {
    id: "advanced-techniques", 
    title: "Advanced Techniques",
    icon: "fas fa-brain",
    iconColor: "text-purple-500",
    skills: [
      { 
        name: "Role-Based Prompting", 
        xp: 200, 
        status: "locked",
        description: "Use personas and roles for better responses",
        task: "Create a prompt where the AI acts as a financial advisor explaining investment strategies to a college student.",
        example: "You are an experienced financial advisor. Explain 3 basic investment strategies suitable for a college student with $500 to invest. Be encouraging and use simple terms."
      },
      { 
        name: "Chain of Thought", 
        xp: 300, 
        status: "locked",
        description: "Guide AI through step-by-step reasoning",
        task: "Write a prompt that guides the AI through solving a math word problem step by step.",
        example: "Solve this step by step: 'A store offers 20% off all items. If a jacket costs $80 after the discount, what was the original price?' Show each calculation step clearly."
      },
      { 
        name: "Few-Shot Learning", 
        xp: 350, 
        status: "locked",
        description: "Provide examples to guide responses",
        task: "Create a prompt with 2 examples that teaches the AI to write product descriptions in a specific style.",
        example: "Write product descriptions in this style:\n\nExample 1: Coffee Mug - 'Start your day right with this ceramic companion that holds your liquid motivation.'\n\nExample 2: Notebook - 'Capture your thoughts in this paper sanctuary where ideas come to life.'\n\nNow write a description for: Wireless Headphones"
      },
      { 
        name: "Constraint Handling", 
        xp: 400, 
        status: "locked",
        description: "Work within specific limitations effectively",
        task: "Write a prompt that asks for a story in exactly 50 words with specific character and setting constraints.",
        example: "Write a story in exactly 50 words featuring a detective, a missing cat, and a library setting. Include a plot twist and ensure the story has a complete beginning, middle, and end."
      },
    ],
  },
  {
    id: "specialized-prompting",
    title: "Specialized Applications", 
    icon: "fas fa-rocket",
    iconColor: "text-orange-500",
    skills: [
      { 
        name: "Creative Writing", 
        xp: 250, 
        status: "locked",
        description: "Prompts for creative and artistic content",
        task: "Create a prompt for writing a short story that includes specific mood, setting, and style requirements.",
        example: "Write a mysterious short story set in a 1940s jazz club. Use a noir style with descriptive language. Include a saxophone player, a secret message, and an unexpected revelation. Keep it under 300 words."
      },
      { 
        name: "Data Analysis", 
        xp: 300, 
        status: "locked",
        description: "Extract insights from data and information",
        task: "Write a prompt to analyze survey data and provide actionable business insights.",
        example: "Analyze this customer survey data: 70% want faster delivery, 45% want better packaging, 30% want lower prices. Identify the top 3 priorities and suggest specific improvements a startup should implement first."
      },
      { 
        name: "Code Generation", 
        xp: 350, 
        status: "locked",
        description: "Generate and explain code effectively",
        task: "Create a prompt for generating a Python function with specific requirements and documentation.",
        example: "Write a Python function that calculates compound interest. Include parameters for principal, rate, time, and compounding frequency. Add docstring documentation and example usage. Handle edge cases like negative values."
      },
      { 
        name: "Research & Synthesis", 
        xp: 400, 
        status: "locked",
        description: "Combine information from multiple sources",
        task: "Write a prompt that synthesizes information about renewable energy trends and creates an executive summary.",
        example: "Create an executive summary on renewable energy trends for 2024. Synthesize key points about solar, wind, and battery technology advances. Include 3 main opportunities and 2 challenges. Format for a CEO audience, max 200 words."
      },
    ],
  },
];

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

  // Get user progress (now uses session-based auth)
  const { data: userProgress = [], isError: progressError } = useQuery<UserProgress[]>({
    queryKey: ["/api/user/progress"],
    enabled: isAuthenticated,
  });

  // Get user achievements
  const { data: userAchievements = [] } = useQuery<any[]>({
    queryKey: ["/api/user/achievements"],
    enabled: isAuthenticated,
  });

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
        updateUser(data.user);
      }
      
      setShowCelebration(true);
      setTimeout(() => setShowCelebration(false), 3000);
      
      // Show achievement notifications
      if (data.newAchievements && data.newAchievements.length > 0) {
        data.newAchievements.forEach((achievement: any) => {
          toast({
            title: `🏆 Achievement Unlocked!`,
            description: `${achievement.title}: ${achievement.description}`,
          });
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
  const getSkillStatus = (treeId: string, skillName: string) => {
    const progress = userProgress.find(
      (p) => p.skillPath === treeId && p.skillNode === skillName.toLowerCase().replace(/\s+/g, '-')
    );
    if (progress?.completed) return "completed";
    
    // Check if previous skills are completed to determine if this one is unlocked
    const tree = skillTrees.find(t => t.id === treeId);
    if (!tree) return "locked";
    
    const skillIndex = tree.skills.findIndex(s => s.name === skillName);
    if (skillIndex === 0) return "current"; // First skill is always available
    
    const previousSkill = tree.skills[skillIndex - 1];
    const prevProgress = userProgress.find(
      (p) => p.skillPath === treeId && p.skillNode === previousSkill.name.toLowerCase().replace(/\s+/g, '-')
    );
    
    return prevProgress?.completed ? "current" : "locked";
  };

  // Use XP from user object (calculated on server)
  const totalXP = user?.xp || 0;

  const completedSkills = userProgress.filter(p => p.completed).length;
  const totalSkills = skillTrees.reduce((total, tree) => total + tree.skills.length, 0);
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
    
    const status = getSkillStatus(treeId, skillName);
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
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto px-4">
            Level up your skills with interactive challenges, skill trees, and rewards
          </p>
        </div>

        {/* User Progress */}
        <Card className="mb-8 sm:mb-12" data-testid="user-progress">
          <CardHeader>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <CardTitle className="text-xl sm:text-2xl">Prompt Engineer Level {user?.level || 1}</CardTitle>
                <CardDescription className="text-sm sm:text-base">
                  {totalXP} XP • {completedSkills}/{totalSkills} skills completed
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
              <div className="flex justify-between text-sm text-gray-600 mb-2">
                <span>Progress</span>
                <span>{Math.round(progressPercentage)}%</span>
              </div>
              <Progress value={progressPercentage} className="h-3" />
            </div>

            {/* Achievement Badges */}
            <div className="flex flex-wrap gap-2 sm:gap-3">
              {achievements.map((achievement) => {
                const IconComponent = achievement.icon;
                const earned = userAchievements.some(ua => ua.achievementId === achievement.id);
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
                    const status = getSkillStatus(tree.id, skill.name);
                    const styles = getSkillStyles(status);
                    return (
                      <div key={skill.name}>
                        <div className="skill-tree-node relative">
                          <div 
                            className={`flex items-center p-2 sm:p-3 rounded-lg cursor-pointer transition-all hover:shadow-md ${styles.containerClass}`}
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
                const earned = completedSkills >= 1; // Simple logic for now
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
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 animate-in fade-in duration-300">
            <Card className="max-w-md mx-4 text-center bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-200">
              <CardContent className="pt-6">
                <div className="text-6xl mb-4">🎉</div>
                <h2 className="text-2xl font-bold text-orange-900 mb-2">Congratulations!</h2>
                <p className="text-orange-800 mb-4">You've completed another prompting challenge!</p>
                <Button 
                  onClick={() => setShowCelebration(false)}
                  className="bg-orange-500 hover:bg-orange-600"
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
