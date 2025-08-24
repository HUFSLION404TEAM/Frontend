import React, { createContext, useState } from 'react';

export const OnboardingContext = createContext(); // ✅ export 확인

export const OnboardingProvider = ({ children }) => { // ✅ export 확인
  const [onboardingData, setOnboardingData] = useState({ /* ... */ });
  
  return (
    <OnboardingContext.Provider value={{ onboardingData, setOnboardingData }}>
      {children}
    </OnboardingContext.Provider>
  );
};