import { Search, Code, Server, Database, GraduationCap, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type Section = "home" | "frontend" | "backend" | "database" | "learn" | "prompts";

interface HeroSectionProps {
  onSectionChange: (section: Section) => void;
}

export default function HeroSection({ onSectionChange }: HeroSectionProps) {
  const featureCards = [
    {
      id: "frontend" as Section,
      title: "Frontend",
      description: "UI components, layouts, and interactive elements",
      icon: Code,
      bgColor: "bg-orange-100",
      iconColor: "text-orange-500",
    },
    {
      id: "backend" as Section,
      title: "Backend", 
      description: "APIs, server logic, and application architecture",
      icon: Server,
      bgColor: "bg-blue-100",
      iconColor: "text-blue-500",
    },
    {
      id: "database" as Section,
      title: "Database",
      description: "Schema design, queries, and data management", 
      icon: Database,
      bgColor: "bg-purple-100",
      iconColor: "text-purple-500",
    },
    {
      id: "learn" as Section,
      title: "Learn",
      description: "Gamified learning with skill trees and rewards",
      icon: GraduationCap,
      bgColor: "bg-green-100", 
      iconColor: "text-green-500",
    },
    {
      id: "prompts" as Section,
      title: "Prompts",
      description: "AI-powered learning with interactive code examples",
      icon: BookOpen,
      bgColor: "bg-indigo-100", 
      iconColor: "text-indigo-500",
    },
  ];

  return (
    <section className="w3-light-grey py-8 sm:py-12 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-12">
            <h1
  className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 sm:mb-6
    text-transparent bg-clip-text
    bg-gradient-to-br from-green-600 via-green-500 to-green-900
    drop-shadow-lg shadow-black/60
    dark:from-green-400 dark:via-green-300 dark:to-green-700
    dark:drop-shadow-[0_4px_24px_rgba(0,0,0,0.8)] leading-tight"
>
  DON'T CODE, WEBSITES MADE FROM THE WORDS!
</h1>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 mb-6 sm:mb-8 max-w-3xl mx-auto px-4">
            The platform for building complete websites using AI prompts. 
            From frontend to backend, learn and build with structured guidance.
          </p>
          
          {/* Search Section */}
          <div className="max-w-2xl mx-auto mb-6 sm:mb-8 px-4">
            <div className="flex flex-col sm:flex-row items-stretch shadow-lg rounded-lg overflow-hidden bg-white">
              <Input 
                type="search" 
                placeholder="Search tutorials, e.g. React"
                className="flex-1 px-4 sm:px-6 py-3 sm:py-4 text-base sm:text-lg border-0 focus:outline-none focus:ring-2 focus:ring-primary rounded-none"
                data-testid="input-hero-search"
              />
              <Button 
                className="w3-green px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg hover:bg-emerald-600 transition-colors rounded-none"
                data-testid="button-hero-search"
              >
                <Search className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                Search
              </Button>
            </div>
          </div>

          <div className="text-center">
            <p className="text-gray-600 text-base sm:text-lg mb-4">
              <button 
                className="underline cursor-pointer hover:text-primary transition-colors"
                data-testid="link-not-sure-where-to-begin"
              >
                Not Sure Where To Begin?
              </button>
            </p>
          </div>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 sm:gap-6 mb-8 sm:mb-12">
          {featureCards.map((card) => {
            const IconComponent = card.icon;
            return (
              <div 
                key={card.id}
                className="bg-white rounded-lg shadow-lg p-4 sm:p-6 hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:scale-105" 
                onClick={() => onSectionChange(card.id)}
                data-testid={`card-${card.id}`}
              >
                <div className="text-center">
                  <div className={`w-12 h-12 sm:w-16 sm:h-16 ${card.bgColor} rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4`}>
                    <IconComponent className={`${card.iconColor}`} size={24} />
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">{card.title}</h3>
                  <p className="text-sm sm:text-base text-gray-600 mb-3 sm:mb-4 line-clamp-3">{card.description}</p>
                  <Button 
                    className="w-full bg-primary text-white py-2 rounded hover:bg-emerald-600 transition-colors text-sm sm:text-base"
                    data-testid={`button-explore-${card.id}`}
                  >
                    Explore {card.title}
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <footer className="bg-white py-4 mt-8 sm:mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-sm sm:text-base">© 2025 Prompty. All rights reserved.</span>
        </div>
      </footer>
    </section>
  );
}
