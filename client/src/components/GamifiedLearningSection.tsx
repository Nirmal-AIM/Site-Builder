import { Trophy, Medal, Star, Code, Clock, GraduationCap, Check, Play, Lock } from "lucide-react";

const skillTrees = [
  {
    id: "frontend",
    title: "Frontend Path",
    icon: "fab fa-html5",
    iconColor: "text-orange-500",
    skills: [
      { 
        name: "HTML Basics", 
        xp: 100, 
        status: "completed",
        description: "Learn HTML structure and elements"
      },
      { 
        name: "CSS Styling", 
        xp: 150, 
        status: "completed",
        description: "Master CSS styling and layouts"
      },
      { 
        name: "JavaScript ES6", 
        xp: 200, 
        status: "current",
        description: "Modern JavaScript features"
      },
      { 
        name: "React Components", 
        xp: 300, 
        status: "locked",
        description: "Build reusable React components"
      },
    ],
  },
  {
    id: "backend", 
    title: "Backend Path",
    icon: "fas fa-server",
    iconColor: "text-blue-500",
    skills: [
      { 
        name: "Node.js Basics", 
        xp: 150, 
        status: "completed",
        description: "Server-side JavaScript fundamentals"
      },
      { 
        name: "Express.js", 
        xp: 200, 
        status: "locked",
        description: "Web application framework"
      },
      { 
        name: "REST APIs", 
        xp: 250, 
        status: "locked",
        description: "Building RESTful services"
      },
      { 
        name: "Authentication", 
        xp: 300, 
        status: "locked",
        description: "User authentication systems"
      },
    ],
  },
  {
    id: "database",
    title: "Database Path", 
    icon: "fas fa-database",
    iconColor: "text-purple-500",
    skills: [
      { 
        name: "SQL Fundamentals", 
        xp: 100, 
        status: "locked",
        description: "Basic database operations"
      },
      { 
        name: "Database Design", 
        xp: 200, 
        status: "locked",
        description: "Schema and relationship design"
      },
      { 
        name: "Advanced Queries", 
        xp: 250, 
        status: "locked",
        description: "Complex SQL operations"
      },
      { 
        name: "NoSQL Databases", 
        xp: 300, 
        status: "locked",
        description: "MongoDB and document databases"
      },
    ],
  },
];

const achievements = [
  {
    id: "first-steps",
    title: "First Steps",
    description: "Completed HTML basics",
    icon: Trophy,
    bgColor: "bg-yellow-50",
    borderColor: "border-yellow-200",
    iconColor: "text-yellow-500",
  },
  {
    id: "code-warrior",
    title: "Code Warrior", 
    description: "Completed 5 challenges",
    icon: Code,
    bgColor: "bg-blue-50",
    borderColor: "border-blue-200", 
    iconColor: "text-blue-500",
  },
  {
    id: "consistent-learner",
    title: "Consistent Learner",
    description: "7-day learning streak",
    icon: Clock,
    bgColor: "bg-green-50",
    borderColor: "border-green-200",
    iconColor: "text-green-500",
  },
  {
    id: "rising-star", 
    title: "Rising Star",
    description: "Reached Level 5",
    icon: Star,
    bgColor: "bg-purple-50",
    borderColor: "border-purple-200",
    iconColor: "text-purple-500",
  },
];

export default function GamifiedLearningSection() {
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
        <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 lg:p-8 mb-8 sm:mb-12" data-testid="user-progress">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 sm:mb-6 gap-4">
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900">Level 5 Developer</h3>
              <p className="text-sm sm:text-base text-gray-600">1,250 XP • Next level: 500 XP to go</p>
            </div>
            <div className="text-left sm:text-right">
              <div className="text-2xl sm:text-3xl text-primary font-bold">1,250</div>
              <div className="text-xs sm:text-sm text-gray-500">Total XP</div>
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="w-full bg-gray-200 rounded-full h-2 sm:h-3 mb-4 sm:mb-6">
            <div className="bg-primary h-3 rounded-full" style={{ width: "75%" }}></div>
          </div>

          {/* Achievement Badges */}
          <div className="flex flex-wrap gap-2 sm:gap-3">
            <div className="flex items-center bg-yellow-50 border border-yellow-200 rounded-lg px-2 sm:px-3 py-1 sm:py-2">
              <Trophy className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-600 mr-1 sm:mr-2" />
              <span className="text-xs sm:text-sm font-medium">React Master</span>
            </div>
            <div className="flex items-center bg-blue-50 border border-blue-200 rounded-lg px-2 sm:px-3 py-1 sm:py-2">
              <Medal className="w-3 h-3 sm:w-4 sm:h-4 text-blue-600 mr-1 sm:mr-2" />
              <span className="text-xs sm:text-sm font-medium">API Builder</span>
            </div>
            <div className="flex items-center bg-purple-50 border border-purple-200 rounded-lg px-2 sm:px-3 py-1 sm:py-2">
              <Star className="w-3 h-3 sm:w-4 sm:h-4 text-purple-600 mr-1 sm:mr-2" />
              <span className="text-xs sm:text-sm font-medium">Database Pro</span>
            </div>
          </div>
        </div>

        {/* Skill Trees */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mb-8 sm:mb-12">
          {skillTrees.map((tree) => (
            <div key={tree.id} className="bg-white rounded-lg shadow-lg p-4 sm:p-6" data-testid={`skill-tree-${tree.id}`}>
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 sm:mb-6 text-center">
                <i className={`${tree.icon} ${tree.iconColor} mr-2`}></i>
                {tree.title}
              </h3>
              
              <div className="space-y-2 sm:space-y-4">
                {tree.skills.map((skill, index) => {
                  const styles = getSkillStyles(skill.status);
                  return (
                    <div key={skill.name}>
                      <div className="skill-tree-node relative">
                        <div 
                          className={`flex items-center p-2 sm:p-3 rounded-lg cursor-pointer ${styles.containerClass}`}
                          data-testid={`skill-${tree.id}-${skill.name.toLowerCase().replace(/\s+/g, '-')}`}
                        >
                          <div className={`w-6 h-6 sm:w-8 sm:h-8 ${styles.iconClass} rounded-full flex items-center justify-center mr-2 sm:mr-3`}>
                            {getSkillIcon(skill.status)}
                          </div>
                          <div>
                            <div className={`text-sm sm:text-base font-medium ${styles.textClass}`}>{skill.name}</div>
                            <div className={`text-xs sm:text-sm ${styles.xpClass}`}>{skill.xp} XP</div>
                          </div>
                        </div>
                      </div>
                      {index < tree.skills.length - 1 && (
                        <div className={`h-0.5 sm:h-1 w-full mx-auto rounded ${
                          skill.status === "completed" ? "skill-tree-line" : "bg-gray-200"
                        }`}></div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Recent Achievements */}
        <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 lg:p-8" data-testid="recent-achievements">
          <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">Recent Achievements</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
            {achievements.map((achievement) => {
              const IconComponent = achievement.icon;
              return (
                <div 
                  key={achievement.id}
                  className={`text-center p-3 sm:p-4 ${achievement.bgColor} rounded-lg border ${achievement.borderColor}`}
                  data-testid={`achievement-${achievement.id}`}
                >
                  <IconComponent className={`${achievement.iconColor} mb-2 mx-auto`} size={24} />
                  <h4 className="text-sm sm:text-base font-semibold text-gray-900">{achievement.title}</h4>
                  <p className="text-xs sm:text-sm text-gray-600">{achievement.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
