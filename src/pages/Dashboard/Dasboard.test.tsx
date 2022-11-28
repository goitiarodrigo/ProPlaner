import { Provider } from "@/context/Provider"
import { fireEvent, render, screen } from "@testing-library/react"
import { QueryClient, QueryClientProvider } from "react-query"
import { BrowserRouter as Router } from "react-router-dom"
import Dashboard from "./Dashboard"


describe('Dashboard', () => {
    beforeEach(() => {
        const queryClient = new QueryClient()
        render(
            <Router>
                <QueryClientProvider client={queryClient} >
                    <Provider>
                        <Dashboard />
                    </Provider>
                </QueryClientProvider>
            </Router>
        )
    })

    test('Should exists a table for data', async () => {
        const table = await screen.findByRole(/table/i)
        expect(table).toBeDefined()
    })

    test('The modal should when the button inside the table is clicked and closed when clicked cross of modal', async () => {
        const openModalButton = await screen.findAllByRole(/open-modal/i)
        fireEvent.click(openModalButton[0])
        expect(screen.getByRole(/modal-container/i)).toBeDefined()
        const crossModal = screen.getByRole(/close-modal/i)
        fireEvent.click(crossModal)
        expect(screen.queryByRole(/modal-container/i)).toBeNull()
    })

    test('Number page should change when some arrow is clicked', async () => {
        const prevPageButton = await screen.findByRole(/prev-page/i)
        const nextPageButton = screen.getByRole(/next-page/i)
        fireEvent.click(nextPageButton)
        expect(screen.queryByText(/2 de/i)).toBeDefined()
        fireEvent.click(prevPageButton)
        expect(screen.queryByText(/2 de/i)).toBeNull()
    })

})