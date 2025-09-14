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
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[300px] sm:min-h-[400px]">
        {/* Left Column - Content */}
        <div className="p-4 sm:p-6 lg:p-12 flex flex-col justify-center space-y-4 sm:space-y-6 lg:space-y-8">
          <div className="space-y-3 sm:space-y-4 lg:space-y-6">
            <h1 className="text-3xl sm:text-5xl lg:text-6xl xl:text-8xl font-black text-black leading-tight" data-testid="text-title">
              {title}
            </h1>
            <p className="text-sm sm:text-base lg:text-lg text-gray-800 font-medium" data-testid="text-description">
              {description}
            </p>
          </div>
          
          <div className="flex flex-col gap-2 sm:gap-3 lg:gap-4">
            <button 
              className="bg-green-500 hover:bg-green-600 text-white font-semibold px-4 sm:px-6 lg:px-8 py-2 sm:py-3 lg:py-4 rounded-full transition-colors duration-200 text-sm sm:text-base"
              onClick={onLearnClick}
              data-testid="button-learn"
            >
              Learn {title}
            </button>
            <button 
              className="bg-yellow-300 hover:bg-yellow-400 text-gray-800 font-semibold px-4 sm:px-6 lg:px-8 py-2 sm:py-3 lg:py-4 rounded-full transition-colors duration-200 text-sm sm:text-base"
              onClick={onVideoClick}
              data-testid="button-video"
            >
              Video Tutorial
            </button>
            <button 
              className="bg-gray-800 hover:bg-gray-900 text-white font-semibold px-4 sm:px-6 lg:px-8 py-2 sm:py-3 lg:py-4 rounded-full transition-colors duration-200 text-sm sm:text-base"
              onClick={onReferenceClick}
              data-testid="button-reference"
            >
              {title} Reference
            </button>
          </div>
        </div>
        {/* Right Column - Code Display */}
        <div className="bg-gray-100 p-4 sm:p-6 lg:p-8 flex flex-col">
          <div className="mb-3 sm:mb-4 lg:mb-6">
            <h3 className="text-base sm:text-lg font-semibold text-gray-900" data-testid="text-example-heading">
              {title} Example:
            </h3>
          </div>
          
          <div className="flex-1 bg-white rounded border border-gray-300 p-3 sm:p-4 lg:p-6 overflow-auto shadow-sm">
            <pre className="text-xs sm:text-sm font-mono text-gray-800 whitespace-pre-wrap leading-relaxed" data-testid="text-prompt">
              {prompt}
            </pre>
          </div>
          
          <div className="mt-3 sm:mt-4 lg:mt-6">
            <button 
              className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 sm:py-3 lg:py-4 rounded-full transition-colors duration-200 text-sm sm:text-base"
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
