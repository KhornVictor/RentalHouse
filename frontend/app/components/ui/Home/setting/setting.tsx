import React from 'react'
import NotFound from '../../error/notFound'

export default function Setting() {
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <NotFound text="Settings Page Not Found" backButtonVisible={false} />
    </div>
  )
}
