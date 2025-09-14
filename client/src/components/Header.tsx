import { useState } from "react";
import { Search, Menu, X, Code, Server, Database, GraduationCap, BookOpen, LogIn, UserPlus, LogOut, User, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/hooks/use-auth";

type Section = "home" | "frontend" | "backend" | "database" | "learn" | "prompts";

interface HeaderProps {
  currentSection: Section;
  onSectionChange: (section: Section) => void;
  onShowLogin: () => void;
  onShowSignup: () => void;
}

export default function Header({ 
  currentSection, 
  onSectionChange, 
  onShowLogin, 
  onShowSignup 
}: HeaderProps) {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const { user, logout, isAuthenticated } = useAuth();

  const navItems = [
    { id: "frontend" as Section, label: "Frontend", icon: Code },
    { id: "backend" as Section, label: "Backend", icon: Server },
    { id: "database" as Section, label: "Database", icon: Database },
    { id: "learn" as Section, label: "Learn", icon: GraduationCap },
    { id: "prompts" as Section, label: "Prompts", icon: BookOpen },
  ];

  return (
    <header className="w3-dark shadow-lg sticky top-0 z-50">
      <div className="w-full max-w-none">
        {/* Main Navigation */}
        <nav className="flex items-center justify-between px-4 sm:px-6 py-3 w-full">
          {/* Logo */}
          <div className="flex items-center flex-shrink-0">
            <button 
              onClick={() => onSectionChange("home")}
              className="text-xl sm:text-2xl font-bold text-white hover:text-primary transition-colors"
              data-testid="button-logo"
            >
              <i className="fas fa-code text-primary mr-2"></i>
              Prompty
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-2 xl:space-x-3 flex-1 justify-center">
            {navItems.map((item) => {
              const IconComponent = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => onSectionChange(item.id)}
                  className={`px-4 py-2 text-white hover:bg-slate-700 rounded transition-colors ${
                    currentSection === item.id ? "bg-slate-700" : ""
                  } text-sm xl:text-base`}
                  data-testid={`button-nav-${item.id}`}
                >
                  <IconComponent className="w-4 h-4 mr-1 inline" />
                  {item.label}
                </button>
              );
            })}
          </div>

          {/* User Actions */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            {/* Search */}
            <div className="hidden lg:flex items-center space-x-2">
              <Input 
                type="search" 
                placeholder="Search tutorials" 
                className="w-48 xl:w-64 text-gray-900 rounded-l-md rounded-r-none border-0 focus:ring-2 focus:ring-primary text-sm"
                data-testid="input-search"
              />
              <Button 
                className="w3-green px-4 py-2 rounded-l-none rounded-r-md hover:bg-emerald-600 transition-colors"
                data-testid="button-search"
              >
                <Search className="w-4 h-4" />
              </Button>
            </div>
            
            {/* User Buttons */}
            {isAuthenticated ? (
              <div className="flex items-center space-x-2 sm:space-x-3">
                <div className="hidden sm:flex items-center text-white">
                  <User className="w-4 h-4 mr-2" />
                  <span className="text-sm truncate max-w-24">{user?.name}</span>
                </div>
                <Button 
                  variant="outline" 
                  onClick={logout}
                  className="px-2 sm:px-4 py-2 bg-transparent border border-red-500 text-red-500 hover:bg-red-500 hover:text-white transition-colors text-sm"
                  data-testid="button-logout"
                >
                  <LogOut className="w-4 h-4 sm:mr-1" />
                  <span className="hidden sm:inline">Logout</span>
                </Button>
              </div>
            ) : (
              <>
                <Button 
                  variant="outline" 
                  onClick={onShowLogin}
                  className="px-2 sm:px-4 py-2 bg-transparent border border-primary text-primary hover:bg-primary hover:text-white transition-colors text-sm"
                  data-testid="button-login"
                >
                  <LogIn className="w-4 h-4 sm:mr-1" />
                  <span className="hidden sm:inline">Sign In</span>
                </Button>
                <Button 
                  onClick={onShowSignup}
                  className="px-2 sm:px-4 py-2 w3-green hover:bg-emerald-600 transition-colors text-sm"
                  data-testid="button-signup"
                >
                  <UserPlus className="w-4 h-4 sm:mr-1" />
                  <span className="hidden sm:inline">Sign Up</span>
                </Button>
              </>
            )}

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              className="lg:hidden text-white p-2 ml-2"
              data-testid="button-mobile-menu"
            >
              {showMobileMenu ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </nav>

        {/* Secondary Navigation */}
        <div className="hidden md:block border-t border-slate-600 px-0 py-2 overflow-x-auto">
          <div className="flex space-x-4 lg:space-x-6 text-sm px-4 sm:px-6 whitespace-nowrap">
            {[
              "Landing Pages", 
              "personal Websites", 
              "Blog", 
              "Contact Forms", 
              "Custom Page Builder", 
              "E-commerce", 
              "Web Sites", 
              "AI PROMPTS",
              "Image Generation",
              "Code Generation",
              "Video Generation",
              "Explore Prompts"
            ].map((tech) => (
              <button
                key={tech}
                className="text-gray-300 hover:text-white py-1 transition-colors text-xs lg:text-sm"
                data-testid={`button-tech-${tech.toLowerCase().replace(/\./g, "")}`}
              >
                {tech}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {showMobileMenu && (
        <div className="lg:hidden border-t border-slate-600">
          <div className="px-4 py-4 space-y-3 max-h-screen overflow-y-auto">
            <div className="flex mb-4 lg:hidden">
              <Input 
                type="search" 
                placeholder="Search..." 
                className="flex-1 px-3 py-2 rounded-l-md border-0 text-gray-900 focus:outline-none"
                data-testid="input-mobile-search"
              />
              <Button className="w3-green px-3 py-2 rounded-r-md" data-testid="button-mobile-search">
                <Search className="w-4 h-4" />
              </Button>
            </div>
            
            {/* Secondary nav items in mobile */}
            <div className="mb-4 pb-4 border-b border-slate-600">
              <div className="grid grid-cols-2 gap-2 text-xs">
                {["Landing Pages", "Websites", "Blog", "Forms", "E-commerce", "AI PROMPTS"].map((tech) => (
                  <button
                    key={tech}
                    className="text-gray-300 hover:text-white py-2 px-2 rounded transition-colors text-left"
                  >
                    {tech}
                  </button>
                ))}
              </div>
            </div>
            
            {navItems.map((item) => {
              const IconComponent = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    onSectionChange(item.id);
                    setShowMobileMenu(false);
                  }}
                  className="w-full text-left px-3 py-2 text-white hover:bg-slate-700 rounded flex items-center transition-colors"
                  data-testid={`button-mobile-nav-${item.id}`}
                >
                  <IconComponent className="w-4 h-4 mr-2" />
                  {item.label}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
}
