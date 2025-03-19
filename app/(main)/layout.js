import React from 'react'

const MainLayout = ({children}) => {
  // redirect user after onboarding 
  return (
    <div className="mx-auto container mb-20 mt-24">{children}</div>
  )
}

export default MainLayout