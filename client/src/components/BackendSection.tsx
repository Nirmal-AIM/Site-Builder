import { Plug, Shield, Cog, Upload, Zap, FlaskConical } from "lucide-react";
import { Button } from "@/components/ui/button";

const backendCards = [
  {
    id: "rest-apis",
    title: "REST APIs",
    description: "Create RESTful API endpoints and services",
    icon: Plug,
    bgColor: "bg-green-100",
    iconColor: "text-green-600",
    features: [
      "• CRUD operations",
      "• Authentication middleware",
      "• Error handling",
      "• API documentation",
    ],
  },
  {
    id: "authentication",
    title: "Authentication",
    description: "Secure user authentication and authorization",
    icon: Shield,
    bgColor: "bg-red-100",
    iconColor: "text-red-600",
    features: [
      "• JWT authentication",
      "• OAuth integration",
      "• Role-based access",
      "• Password security",
    ],
  },
  {
    id: "server-setup",
    title: "Server Setup",
    description: "Configure servers and application environments",
    icon: Cog,
    bgColor: "bg-blue-100",
    iconColor: "text-blue-600",
    features: [
      "• Express.js setup",
      "• Middleware configuration",
      "• Environment variables",
      "• CORS & security",
    ],
  },
  {
    id: "file-handling",
    title: "File Handling",
    description: "Upload, process, and manage files",
    icon: Upload,
    bgColor: "bg-purple-100",
    iconColor: "text-purple-600",
    features: [
      "• File uploads",
      "• Image processing",
      "• File validation",
      "• Cloud storage integration",
    ],
  },
  {
    id: "real-time",
    title: "Real-time",
    description: "WebSockets and real-time communication",
    icon: Zap,
    bgColor: "bg-yellow-100",
    iconColor: "text-yellow-600",
    features: [
      "• Socket.io setup",
      "• Real-time chat",
      "• Live notifications",
      "• Collaborative features",
    ],
  },
  {
    id: "testing",
    title: "Testing",
    description: "Unit tests, integration tests, and API testing",
    icon: FlaskConical,
    bgColor: "bg-indigo-100",
    iconColor: "text-indigo-600",
    features: [
      "• Jest unit tests",
      "• API endpoint testing",
      "• Mock data setup",
      "• Test automation",
    ],
  },
];

export default function BackendSection() {
  return (
    <section className="py-16 w3-light-grey">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            <i className="fas fa-server text-blue-500 mr-3"></i>
            Backend AI Prompts
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Build robust APIs, server logic, and application architecture with AI guidance
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {backendCards.map((card) => {
            const IconComponent = card.icon;
            return (
              <div 
                key={card.id}
                className="bg-white rounded-lg border p-6 hover:shadow-lg transition-shadow"
                data-testid={`card-backend-${card.id}`}
              >
                <div className="flex items-center mb-4">
                  <div className={`w-12 h-12 ${card.bgColor} rounded-lg flex items-center justify-center mr-4`}>
                    <IconComponent className={`${card.iconColor}`} size={24} />
                  </div>
                  <h3 className="text-xl font-semibold">{card.title}</h3>
                </div>
                <p className="text-gray-600 mb-4">{card.description}</p>
                <ul className="space-y-2 text-sm text-gray-500 mb-4">
                  {card.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
                <Button 
                  className="w-full bg-primary text-white py-2 rounded hover:bg-emerald-600 transition-colors"
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
