
import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { PromptInput } from './components/PromptInput';
import { GeneratedOutput } from './components/GeneratedOutput';
import { Loader } from './components/Loader';
import { generateCinematicPrompt } from './services/geminiService';

const App: React.FC = () => {
  const [userInput, setUserInput] = useState<string>('');
  const [generatedPrompt, setGeneratedPrompt] = useState<string>('');
  const [directorNotes, setDirectorNotes] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = useCallback(async () => {
    if (!userInput.trim()) {
      setError('Please enter a creative idea to start.');
      return;
    }
    setIsLoading(true);
    setError(null);
    setGeneratedPrompt('');
    setDirectorNotes('');

    try {
      const result = await generateCinematicPrompt(userInput);
      setGeneratedPrompt(result.cgml);
      setDirectorNotes(result.notes);
    } catch (err) {
      setError(
        err instanceof Error
          ? `Failed to generate prompt: ${err.message}`
          : 'An unknown error occurred.'
      );
    } finally {
      setIsLoading(false);
    }
  }, [userInput]);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 font-sans">
      <div className="container mx-auto px-4 py-8 md:py-12">
        <Header />
        <main className="mt-8 md:mt-12">
          <PromptInput
            value={userInput}
            onChange={setUserInput}
            onGenerate={handleGenerate}
            isLoading={isLoading}
          />
          
          {error && (
            <div className="mt-6 p-4 bg-red-900/50 border border-red-700 text-red-300 rounded-lg">
              <p className="font-semibold">Error</p>
              <p>{error}</p>
            </div>
          )}

          {isLoading && <Loader />}

          {!isLoading && (generatedPrompt || directorNotes) && (
            <GeneratedOutput 
              cgmlPrompt={generatedPrompt} 
              directorNotes={directorNotes} 
            />
          )}
        </main>
      </div>
    </div>
  );
};

export default App;
