import Home from '@/pages/Home'
import Util from '@/pages/Util'
import * as React from 'react'
import { createBrowserRouter } from 'react-router-dom'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/util/:id',
    element: <Util />
  }
])

export default router
