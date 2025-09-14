import PromptCard from "./PromptCard";

export default function PromptsSection() {
  const htmlCode = `<!DOCTYPE html>
<html>
<head>
  <title>HTML Tutorial</title>
</head>
<body>
  <h1>This is a heading</h1>
  <p>This is a paragraph.</p>
</body>
</html>`;

  const reactCode = `import React from 'react';

function App() {
  return (
    <div className="App">
      <h1>Hello World!</h1>
      <p>Welcome to React</p>
    </div>
  );
}

export default App;`;

  const nodeCode = `const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});`;

  const pythonCode = `from flask import Flask

app = Flask(__name__)

@app.route('/')
def hello_world():
    return 'Hello, World!'

if __name__ == '__main__':
    app.run(debug=True)`;

  const handleLearnClick = (title: string) => {
    console.log(`Learn ${title} clicked`);
    // Add your learning logic here
  };

  const handleVideoClick = (title: string) => {
    console.log(`Video Tutorial for ${title} clicked`);
    // Add your video tutorial logic here
  };

  const handleReferenceClick = (title: string) => {
    console.log(`${title} Reference clicked`);
    // Add your reference logic here
  };

  const handleCertifiedClick = (title: string) => {
    console.log(`Get Certified in ${title} clicked`);
    // Add your certification logic here
  };

  const handleTryClick = (title: string) => {
    console.log(`Try ${title} Yourself clicked`);
    // Add your try it yourself logic here
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Learn with AI-Powered Prompts
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Master programming languages and frameworks with interactive examples and guided learning paths.
          </p>
        </div>

        <div className="space-y-12">
          <PromptCard
            title="HTML"
            description="The language for building web pages"
            prompt={htmlCode}
            onLearnClick={() => handleLearnClick('HTML')}
            onVideoClick={() => handleVideoClick('HTML')}
            onReferenceClick={() => handleReferenceClick('HTML')}
            onCertifiedClick={() => handleCertifiedClick('HTML')}
            onTryClick={() => handleTryClick('HTML')}
          />

          <PromptCard
            title="React"
            description="A JavaScript library for building user interfaces"
            prompt={reactCode}
            onLearnClick={() => handleLearnClick('React')}
            onVideoClick={() => handleVideoClick('React')}
            onReferenceClick={() => handleReferenceClick('React')}
            onCertifiedClick={() => handleCertifiedClick('React')}
            onTryClick={() => handleTryClick('React')}
          />

          <PromptCard
            title="Node.js"
            description="JavaScript runtime for server-side development"
            prompt={nodeCode}
            onLearnClick={() => handleLearnClick('Node.js')}
            onVideoClick={() => handleVideoClick('Node.js')}
            onReferenceClick={() => handleReferenceClick('Node.js')}
            onCertifiedClick={() => handleCertifiedClick('Node.js')}
            onTryClick={() => handleTryClick('Node.js')}
          />

          <PromptCard
            title="Python"
            description="A versatile programming language for web development"
            prompt={pythonCode}
            onLearnClick={() => handleLearnClick('Python')}
            onVideoClick={() => handleVideoClick('Python')}
            onReferenceClick={() => handleReferenceClick('Python')}
            onCertifiedClick={() => handleCertifiedClick('Python')}
            onTryClick={() => handleTryClick('Python')}
          />
        </div>
      </div>
    </section>
  );
}
