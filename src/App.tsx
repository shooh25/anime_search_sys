import React from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'
import Top from './Top'

const App: React.FC = () => {
  const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      <Top />
    </QueryClientProvider>
  )
}

export default App
