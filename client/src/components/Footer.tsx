import { Twitter, Github } from "lucide-react";

export default function Footer() {
  const footerSections = [
    {
      title: "Learning Paths",
      links: [
        "Frontend Development",
        "Backend Development", 
        "Database Design",
        "Full Stack",
      ],
    },
    {
      title: "Resources",
      links: [
        "Documentation",
        "Tutorials",
        "Community", 
        "Blog",
      ],
    },
    {
      title: "Support",
      links: [
        "Help Center",
        "Contact Us",
        "Privacy Policy",
        "Terms of Service",
      ],
    },
  ];

  return (
    <footer className="w3-dark mt-16">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold text-white mb-4">Prompty</h3>
            <p className="text-gray-300 text-sm mb-4">
              The ultimate platform for building websites with AI assistance.
            </p>
            <div className="flex space-x-4">
              <a 
                href="#" 
                className="text-gray-300 hover:text-white transition-colors"
                data-testid="link-twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a 
                href="#" 
                className="text-gray-300 hover:text-white transition-colors"
                data-testid="link-github"
              >
                <Github className="w-5 h-5" />
              </a>
              <a 
                href="#" 
                className="text-gray-300 hover:text-white transition-colors"
                data-testid="link-discord"
              >
                <i className="fab fa-discord"></i>
              </a>
            </div>
          </div>
          
          {footerSections.map((section) => (
            <div key={section.title}>
              <h4 className="text-lg font-semibold text-white mb-4">{section.title}</h4>
              <ul className="space-y-2 text-sm">
                {section.links.map((link) => (
                  <li key={link}>
                    <a 
                      href="#" 
                      className="text-gray-300 hover:text-white transition-colors"
                      data-testid={`link-${link.toLowerCase().replace(/\s+/g, '-')}`}
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        <div className="border-t border-gray-600 mt-8 pt-8 text-center">
          <p className="text-gray-300 text-sm">
            &copy; 2025 Prompty. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
