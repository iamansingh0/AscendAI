import { getUserOnboardingStatus } from '@/actions/user';
import { industries } from '@/data/industries';
import { redirect } from 'next/navigation';
import React from 'react'

const OnboardingPage = async () => {
  // check if the user is already onboarded
  const { isOnboarded } = await getUserOnboardingStatus();
  if(isOnboarded) {
    redirect("/dashboard")
  }
  return (
    <main>
      <OnboardingForm industries={industries}/> 
      {/* we can only use hooks in client component */}
    </main>
  )
}

export default OnboardingPage;