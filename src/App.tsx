import Layout from '@/components/Layout'
import router from '@/router'
import React from 'react'
import { RouterProvider } from 'react-router-dom'
function App() {
  return (
    <div className="flex h-screen">
      <Layout>
        <RouterProvider router={router}></RouterProvider>
      </Layout>
    </div>
  )
}

export default App
