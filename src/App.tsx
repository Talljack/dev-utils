import { Toaster } from '@/components/ui/toaster'
import router from '@/router'
import { RouterProvider } from 'react-router-dom'
// @ts-ignore
import { listen } from '@tauri-apps/api/event'
function App() {
  // @ts-ignore
  listen('custom', event => {
    console.log(event.payload)
  })
  return (
    <div className="flex h-screen">
      <RouterProvider router={router}></RouterProvider>
      <Toaster />
    </div>
  )
}

export default App
