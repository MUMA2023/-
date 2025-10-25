
import React from 'react';
import { Icon } from './Icon';

interface PromptInputProps {
  value: string;
  onChange: (value: string) => void;
  onGenerate: () => void;
  isLoading: boolean;
}

export const PromptInput: React.FC<PromptInputProps> = ({ value, onChange, onGenerate, isLoading }) => {
  return (
    <div className="w-full max-w-3xl mx-auto">
      <label htmlFor="prompt-input" className="block text-lg font-medium text-gray-300 mb-2">
        1. Describe Your Scene
      </label>
      <div className="relative">
        <textarea
          id="prompt-input"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="e.g., A lone astronaut discovers a glowing alien artifact on a desolate mars-like planet."
          rows={5}
          className="w-full p-4 bg-gray-800 border-2 border-gray-700 rounded-lg text-gray-200 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-colors duration-200 resize-none"
          disabled={isLoading}
        />
      </div>
      <div className="mt-4 text-center">
         <p className="text-gray-500 text-sm mb-4">You can start with a simple idea. The AI will flesh out the cinematic details for you.</p>
        <button
          onClick={onGenerate}
          disabled={isLoading}
          className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-cyan-600 text-white font-semibold rounded-lg shadow-lg hover:bg-cyan-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 focus:ring-offset-gray-900 transition-all duration-200 disabled:bg-gray-600 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Generating...
            </>
          ) : (
            <>
              <Icon name="sparkles" className="w-5 h-5" />
              Architect Prompt
            </>
          )}
        </button>
      </div>
    </div>
  );
};
