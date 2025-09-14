import PromptCard from "./PromptCard";

export default function PromptsSection() {
  return (
    <section className="py-8 sm:py-12 lg:py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Learn with AI-Powered Prompts
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto px-4">
            Master programming languages and frameworks with interactive examples and guided learning paths.
          </p>
        </div>

        <div className="space-y-8 sm:space-y-12">
          <PromptCard
            title="Landing Page"
            description="Generate a modern landing page with hero, call-to-action and testimonials."
            prompt={`Create a responsive landing page with a large hero section, headline, subheading, and call-to-action button. Add testimonial and features section.`}
            onLearnClick={() => console.log('Learn Landing Page clicked')}
            onVideoClick={() => console.log('Video Tutorial for Landing Page clicked')}
            onReferenceClick={() => console.log('Landing Page Reference clicked')}
            onTryClick={() => console.log('Try Landing Page Yourself clicked')}
          />

          <PromptCard
            title="Portfolio"
            description="Showcase personal projects and skills with style."
            prompt={`Generate a clean personal portfolio page with about section, skills grid, and project showcase cards.`}
            onLearnClick={() => console.log('Learn Portfolio clicked')}
            onVideoClick={() => console.log('Video Tutorial for Portfolio clicked')}
            onReferenceClick={() => console.log('Portfolio Reference clicked')}
            onTryClick={() => console.log('Try Portfolio Yourself clicked')}
          />

          <PromptCard
            title="Blog"
            description="Write and publish articles easily."
            prompt={`Create a blog page layout with posts preview cards, sidebar for categories/tags, and pagination.`}
            onLearnClick={() => console.log('Learn Blog clicked')}
            onVideoClick={() => console.log('Video Tutorial for Blog clicked')}
            onReferenceClick={() => console.log('Blog Reference clicked')}
            onTryClick={() => console.log('Try Blog Yourself clicked')}
          />

          <PromptCard
            title="Contact Form"
            description="Enable users to get in touch."
            prompt={`Generate a contact page with form fields (name, email, message) and a submit button styled with modern UI.`}
            onLearnClick={() => console.log('Learn Contact Form clicked')}
            onVideoClick={() => console.log('Video Tutorial for Contact Form clicked')}
            onReferenceClick={() => console.log('Contact Form Reference clicked')}
            onTryClick={() => console.log('Try Contact Form Yourself clicked')}
          />

          <PromptCard
            title="Footer"
            description="Professional website footer."
            prompt={`Create a footer with quick links, social icons, and copyright section.`}
            onLearnClick={() => console.log('Learn Footer clicked')}
            onVideoClick={() => console.log('Video Tutorial for Footer clicked')}
            onReferenceClick={() => console.log('Footer Reference clicked')}
            onTryClick={() => console.log('Try Footer Yourself clicked')}
          />
        </div>
      </div>
    </section>
  );
}
