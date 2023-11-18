import Error from '@/pages/Error'
import Home from '@/pages/Home'
import Util from '@/pages/Util'
import * as React from 'react'
import { createBrowserRouter } from 'react-router-dom'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
    errorElement: <Error />,
    children: [
      {
        path: 'utils/:id',
        element: <Util />
      }
    ]
  }
])

export default router
