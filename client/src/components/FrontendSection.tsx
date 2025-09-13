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
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            <i className="fab fa-html5 text-orange-500 mr-3"></i>
            Frontend AI Prompts
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Generate beautiful UI components, layouts, and interactive elements with AI assistance
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {frontendCards.map((card) => {
            const IconComponent = card.icon;
            return (
              <div 
                key={card.id}
                className="bg-card border border-border rounded-lg p-6 hover:shadow-lg transition-shadow"
                data-testid={`card-frontend-${card.id}`}
              >
                <div className="flex items-center mb-4">
                  <div className={`w-12 h-12 ${card.bgColor} rounded-lg flex items-center justify-center mr-4`}>
                    <IconComponent className={`${card.iconColor}`} size={24} />
                  </div>
                  <h3 className="text-xl font-semibold">{card.title}</h3>
                </div>
                <p className="text-muted-foreground mb-4">{card.description}</p>
                <ul className="space-y-2 text-sm text-muted-foreground mb-4">
                  {card.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
                <Button 
                  className="w-full bg-primary text-primary-foreground py-2 rounded hover:bg-primary/90 transition-colors"
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
