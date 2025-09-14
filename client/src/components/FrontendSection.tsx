import { Menu, FileText, Layout, MousePointer, BarChart3, Image } from "lucide-react";
import { Button } from "@/components/ui/button";

const frontendCards = [
  {
    id: "navigation",
    title: "Navigation",
    description: "Create responsive navbars, sidebars, and menus",
    icon: Menu,
    bgColor: "bg-blue-100",
    iconColor: "text-blue-600",
    features: [
      "• Responsive navigation bars",
      "• Mobile hamburger menus", 
      "• Breadcrumb navigation",
      "• Tab navigation",
    ],
  },
  {
    id: "forms",
    title: "Forms",
    description: "Build interactive forms with validation",
    icon: FileText,
    bgColor: "bg-green-100",
    iconColor: "text-green-600",
    features: [
      "• Contact forms",
      "• Login/Register forms",
      "• Multi-step forms",
      "• Form validation",
    ],
  },
  {
    id: "layouts",
    title: "Layouts",
    description: "Responsive grid systems and page layouts",
    icon: Layout,
    bgColor: "bg-purple-100",
    iconColor: "text-purple-600",
    features: [
      "• Grid layouts",
      "• Card layouts",
      "• Dashboard layouts",
      "• Landing page sections",
    ],
  },
  {
    id: "interactive",
    title: "Interactive",
    description: "Buttons, modals, tooltips, and animations",
    icon: MousePointer,
    bgColor: "bg-red-100",
    iconColor: "text-red-600",
    features: [
      "• Button variations",
      "• Modal dialogs",
      "• Tooltips & popovers",
      "• Animations & transitions",
    ],
  },
  {
    id: "data-display",
    title: "Data Display",
    description: "Tables, charts, and data visualization",
    icon: BarChart3,
    bgColor: "bg-yellow-100",
    iconColor: "text-yellow-600",
    features: [
      "• Data tables",
      "• Charts & graphs",
      "• Progress indicators",
      "• Statistics displays",
    ],
  },
  {
    id: "media",
    title: "Media",
    description: "Image galleries, videos, and carousels",
    icon: Image,
    bgColor: "bg-indigo-100",
    iconColor: "text-indigo-600",
    features: [
      "• Image galleries",
      "• Video players",
      "• Carousels & sliders",
      "• Media upload components",
    ],
  },
];

export default function FrontendSection() {
  return (
    <section className="py-8 sm:py-12 lg:py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            <i className="fab fa-html5 text-orange-500 mr-3"></i>
            Frontend AI Prompts
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto px-4">
            Generate beautiful UI components, layouts, and interactive elements with AI assistance
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {frontendCards.map((card) => {
            const IconComponent = card.icon;
            return (
              <div 
                key={card.id}
                className="bg-card border border-border rounded-lg p-4 sm:p-6 hover:shadow-lg transition-all duration-300 transform hover:scale-105"
                data-testid={`card-frontend-${card.id}`}
              >
                <div className="flex items-center mb-3 sm:mb-4">
                  <div className={`w-10 h-10 sm:w-12 sm:h-12 ${card.bgColor} rounded-lg flex items-center justify-center mr-3 sm:mr-4`}>
                    <IconComponent className={`${card.iconColor}`} size={24} />
                  </div>
                  <h3 className="text-lg sm:text-xl font-semibold">{card.title}</h3>
                </div>
                <p className="text-sm sm:text-base text-muted-foreground mb-3 sm:mb-4">{card.description}</p>
                <ul className="space-y-1 sm:space-y-2 text-xs sm:text-sm text-muted-foreground mb-3 sm:mb-4">
                  {card.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
                <Button 
                  className="w-full bg-primary text-primary-foreground py-2 rounded hover:bg-primary/90 transition-colors text-sm sm:text-base"
                  data-testid={`button-generate-${card.id}`}
                >
                  Generate Prompt
                </Button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
