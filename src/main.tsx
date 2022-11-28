import { QueryClient, QueryClientProvider } from 'react-query'
import ReactDOM from 'react-dom/client'
import App from './App'
import { Provider } from './context/Provider'

const body = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
          refetchOnWindowFocus: false,
        },
      },
})

body.render(
    <QueryClientProvider client={queryClient} >
        <Provider>
            <App />
        </Provider>
    </QueryClientProvider>
)
