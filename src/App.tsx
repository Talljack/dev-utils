import { Toaster } from '@/components/ui/toaster'
import router from '@/router'
import React from 'react'
import { RouterProvider } from 'react-router-dom'
function App() {
  return (
    <div className="flex h-screen">
      <RouterProvider router={router}></RouterProvider>
      <Toaster />
    </div>
  )
}

export default App
