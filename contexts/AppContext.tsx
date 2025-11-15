import React, { createContext, useState, ReactNode } from 'react';
import type { Pillar, BrandVoice, AppContextType } from '../types';

export const AppContext = createContext<AppContextType | null>(null);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [niche, setNiche] = useState<string | null>(null);
    const [pillars, setPillars] = useState<Pillar[]>([]);
    const [brandVoice, setBrandVoice] = useState<BrandVoice | null>(null);

    const handleOnboardingComplete = (completedNiche: string, completedPillars: Pillar[], completedVoice: BrandVoice) => {
        setNiche(completedNiche);
        setPillars(completedPillars);
        setBrandVoice(completedVoice);
    };

    return (
        <AppContext.Provider value={{
            niche,
            pillars,
            brandVoice,
            onboardingComplete: handleOnboardingComplete,
        }}>
            {children}
        </AppContext.Provider>
    );
};