
import React from 'react';
import { Icon } from './Icon';

export const Header: React.FC = () => {
  return (
    <header className="text-center">
      <div className="flex items-center justify-center gap-4">
        <Icon name="film" className="w-10 h-10 md:w-12 md:h-12 text-cyan-400" />
        <h1 className="text-3xl md:text-5xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
          Cinematic Prompt Architect
        </h1>
      </div>
      <p className="mt-3 md:mt-4 text-md md:text-lg text-gray-400 max-w-2xl mx-auto">
        Transform your vision into structured, professional prompts for AI video generation with the power of CGML.
      </p>
    </header>
  );
};
