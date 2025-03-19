import { getUserOnboardingStatus } from '@/actions/user'
import { redirect } from 'next/navigation';
import React from 'react'

const DashboardPage = async () => {
  const { isOnboarded } = await getUserOnboardingStatus();
  if(!isOnboarded) {
    redirect('/onboarding')
  }
  return (
    <div>DashboardPage</div>
  )
}

export default DashboardPage