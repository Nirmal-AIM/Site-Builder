interface PromptCardProps {
  title: string;
  description: string;
  prompt: string;
  onLearnClick?: () => void;
  onVideoClick?: () => void;
  onReferenceClick?: () => void;
  onTryClick?: () => void;
}

export default function PromptCard({
  title,
  description,
  prompt,
  onLearnClick = () => console.log('Learn clicked'),
  onVideoClick = () => console.log('Video Tutorial clicked'),
  onReferenceClick = () => console.log('Reference clicked'),
  onTryClick = () => console.log('Try it Yourself clicked')
}: PromptCardProps) {
  return (
    <div className="bg-gradient-to-r from-green-100 to-green-50 rounded-lg shadow-sm border border-gray-200 overflow-hidden" data-testid="card-prompt">
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[400px]">
        {/* Left Column - Content */}
        <div className="p-12 flex flex-col justify-center space-y-8">
          <div className="space-y-6">
            <h1 className="text-8xl font-black text-black" data-testid="text-title">
              {title}
            </h1>
            <p className="text-lg text-gray-800 font-medium" data-testid="text-description">
              {description}
            </p>
          </div>
          
          <div className="flex flex-col gap-4">
            <button 
              className="bg-green-500 hover:bg-green-600 text-white font-semibold px-8 py-4 rounded-full transition-colors duration-200"
              onClick={onLearnClick}
              data-testid="button-learn"
            >
              Learn {title}
            </button>
            <button 
              className="bg-yellow-300 hover:bg-yellow-400 text-gray-800 font-semibold px-8 py-4 rounded-full transition-colors duration-200"
              onClick={onVideoClick}
              data-testid="button-video"
            >
              Video Tutorial
            </button>
            <button 
              className="bg-gray-800 hover:bg-gray-900 text-white font-semibold px-8 py-4 rounded-full transition-colors duration-200"
              onClick={onReferenceClick}
              data-testid="button-reference"
            >
              {title} Reference
            </button>
          </div>
        </div>
        {/* Right Column - Code Display */}
        <div className="bg-gray-100 p-8 flex flex-col">
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900" data-testid="text-example-heading">
              {title} Example:
            </h3>
          </div>
          
          <div className="flex-1 bg-white rounded border border-gray-300 p-6 overflow-auto shadow-sm">
            <pre className="text-sm font-mono text-gray-800 whitespace-pre-wrap leading-relaxed" data-testid="text-prompt">
              {prompt}
            </pre>
          </div>
          
          <div className="mt-6">
            <button 
              className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-4 rounded-full transition-colors duration-200"
              onClick={onTryClick}
              data-testid="button-try"
            >
              Try it Yourself
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
