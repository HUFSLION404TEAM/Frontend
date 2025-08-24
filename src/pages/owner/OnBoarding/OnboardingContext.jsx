import React, { createContext, useState } from 'react';

// 1. Context 생성 (데이터 보관함)
export const OnboardingContext = createContext();

// 2. Provider 생성 (데이터 공급자)
export const OnboardingProvider = ({ children }) => {
  const [onboardingData, setOnboardingData] = useState({
    category: '',
    storeName: '',
    address: '',
    contact: '',
    businessNumber: '',
    introduction: '',
    summary: '',
  });

  return (
    <OnboardingContext.Provider value={{ onboardingData, setOnboardingData }}>
      {children}
    </OnboardingContext.Provider>
  );
};