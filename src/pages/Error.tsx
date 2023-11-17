import { Button } from '@components/ui/button'
import React from 'react'
import { useNavigate, useRouteError } from 'react-router-dom'

export default function ErrorPage() {
  const error = useRouteError()
  const navigate = useNavigate()
  console.error(error)

  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>Cannot find others</p>
      <Button onClick={() => navigate('/')}>Go Home</Button>
    </div>
  )
}
