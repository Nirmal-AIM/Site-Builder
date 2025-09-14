import { Network, Search, Layers, Leaf, ArrowLeftRight, Gauge } from "lucide-react";
import { Button } from "@/components/ui/button";

const databaseCards = [
  {
    id: "schema-design",
    title: "Schema Design",
    description: "Create efficient database schemas and relationships",
    icon: Network,
    bgColor: "bg-blue-100",
    iconColor: "text-blue-600",
    features: [
      "• Table relationships",
      "• Primary & foreign keys",
      "• Data normalization",
      "• Index optimization",
    ],
  },
  {
    id: "sql-queries",
    title: "SQL Queries",
    description: "Write complex queries and data operations",
    icon: Search,
    bgColor: "bg-green-100",
    iconColor: "text-green-600",
    features: [
      "• SELECT statements",
      "• JOINs & subqueries",
      "• Aggregations & grouping",
      "• Stored procedures",
    ],
  },
  {
    id: "orm-setup",
    title: "ORM Setup",
    description: "Configure Sequelize, Prisma, or Mongoose",
    icon: Layers,
    bgColor: "bg-purple-100",
    iconColor: "text-purple-600",
    features: [
      "• Model definitions",
      "• Migrations & seeders",
      "• Associations & hooks",
      "• Query optimizations",
    ],
  },
  {
    id: "nosql",
    title: "NoSQL",
    description: "MongoDB collections and document operations",
    icon: Leaf,
    bgColor: "bg-orange-100",
    iconColor: "text-orange-600",
    features: [
      "• Collection design",
      "• Aggregation pipelines",
      "• Indexes & performance",
      "• GridFS for files",
    ],
  },
  {
    id: "migrations",
    title: "Migrations",
    description: "Database migrations and data transformations",
    icon: ArrowLeftRight,
    bgColor: "bg-red-100",
    iconColor: "text-red-600",
    features: [
      "• Schema migrations",
      "• Data seeding",
      "• Rollback strategies",
      "• Version control",
    ],
  },
  {
    id: "performance",
    title: "Performance",
    description: "Query optimization and performance tuning",
    icon: Gauge,
    bgColor: "bg-yellow-100",
    iconColor: "text-yellow-600",
    features: [
      "• Query analysis",
      "• Index strategies",
      "• Caching solutions",
      "• Connection pooling",
    ],
  },
];

export default function DatabaseSection() {
  return (
    <section className="py-8 sm:py-12 lg:py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            <i className="fas fa-database text-purple-500 mr-3"></i>
            Database AI Prompts
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto px-4">
            Design schemas, write queries, and manage data with AI assistance
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {databaseCards.map((card) => {
            const IconComponent = card.icon;
            return (
              <div 
                key={card.id}
                className="bg-card border border-border rounded-lg p-4 sm:p-6 hover:shadow-lg transition-all duration-300 transform hover:scale-105"
                data-testid={`card-database-${card.id}`}
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
