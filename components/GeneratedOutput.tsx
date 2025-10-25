
import React, { useState } from 'react';
import { Icon } from './Icon';

interface GeneratedOutputProps {
  cgmlPrompt: string;
  directorNotes: string;
}

const CopyButton: React.FC<{ textToCopy: string }> = ({ textToCopy }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      className="absolute top-2 right-2 p-2 bg-gray-700/50 hover:bg-gray-600/70 rounded-md transition-colors text-gray-300"
      aria-label="Copy to clipboard"
    >
      {copied ? <Icon name="check" className="w-5 h-5 text-green-400" /> : <Icon name="copy" className="w-5 h-5" />}
    </button>
  );
};

export const GeneratedOutput: React.FC<GeneratedOutputProps> = ({ cgmlPrompt, directorNotes }) => {
  return (
    <div className="mt-10 grid grid-cols-1 lg:grid-cols-5 gap-8">
      {cgmlPrompt && (
        <div className="lg:col-span-3">
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <Icon name="cgml" className="w-7 h-7 text-cyan-400" />
            CGML Prompt
          </h2>
          <div className="relative bg-gray-800 rounded-lg p-4 font-mono text-sm text-gray-300 shadow-lg border border-gray-700">
            <CopyButton textToCopy={cgmlPrompt} />
            <pre className="whitespace-pre-wrap break-words">
              <code>{cgmlPrompt}</code>
            </pre>
          </div>
        </div>
      )}
      
      {directorNotes && (
        <div className="lg:col-span-2">
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <Icon name="notes" className="w-7 h-7 text-cyan-400" />
            Director's Notes
          </h2>
          <div className="relative bg-gray-800/50 rounded-lg p-5 prose prose-invert prose-p:text-gray-300 prose-headings:text-gray-100 border border-gray-700/50">
             <CopyButton textToCopy={directorNotes} />
            {directorNotes.split('\n').map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
