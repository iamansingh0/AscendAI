import React from 'react'

const AuthLayout = ({ children }) => {
  return (
    <div className='flex justify-center pt-20' suppressHydrationWarning>
        {children}
    </div>
  )
}

export default AuthLayout