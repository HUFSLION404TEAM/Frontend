import React from 'react';
import { Outlet } from 'react-router-dom';
//import { OnboardingProvider } from './OnboardingContext.jsx';


export default function OnboardingOwnerPage() {
  return (
//    <OnboardingProvider>
      <Outlet />
//    </OnboardingProvider>
 );
}
