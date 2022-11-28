import Loader from '@/components/common/loader/Loader'
import { VITE_SOME_PASSWORD, VITE_SOME_USER } from '@/constant'
import { Provider } from '@/context/Provider'
import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react'
import Login from 'pages/Login/Login'
import { QueryClient, QueryClientProvider } from 'react-query'
import { BrowserRouter as Router } from 'react-router-dom'
import Dashboard from '../Dashboard/Dashboard'



describe('Login', () => {
    
    beforeEach(() => {
        render(
            <Router>
                <Provider>
                    <Login />
                </Provider>
            </Router>
        )
    })

    // const renderWithRouter = (ui, {route = '/'} = {}) => {
    //     window.history.pushState({}, 'Test page', route)
      
    //     return {
    //       user: userEvent.setup(),
    //       ...render(ui, {wrapper: Navigation}),
    //     }
    // }

    const setup = (value: string, role: string) => {
        const input = screen.getByRole(role)
        fireEvent.change(input, {target: {value}})
    }

    test('Should exist "Email" Input', () => {
        expect(screen.getByText(/email/i)).toBeDefined()
    })

    test('Should exist "Password" Input', () => {
        expect(screen.getByText(/password/i)).toBeDefined()
    })

    test('Should show errors when you clicked on "Login" and inputs are nulls', () => {
        const button: any = screen.getByText(/login/i)
        fireEvent.click(button)
        expect(screen.getAllByText('You must complete all fields')).toBeDefined()
    })

    test('Should show email error when you clicked on "Login" and email text is not email type', () => {
        setup('email@email', 'email-input')
        const button: any = screen.getByText(/login/i)
        fireEvent.click(button)
        expect(screen.queryByText(/The email type is incorrect/i)).toBeDefined()
    })

    test('Should show password error when you clicked on "Login" and password does not meet the requirements', () => {
        setup('test1', 'password-input')
        const button: any = screen.getByText(/login/i)
        fireEvent.click(button)
        expect(screen.queryByText(/Must contain at least 6 digits, letters and numbers/i)).toBeDefined()
    })

    test('Should show error when enter bad credentials', () => {
        setup('email@email.com', 'email-input')
        setup('test11', 'password-input')
        const button: any = screen.getByText(/login/i)
        fireEvent.click(button)
        expect(screen.queryByText(/Email or Password wrong/i)).toBeDefined()
    })

    test('Should change password visibility', () => {
        const button = screen.getByRole('visibility-password')
        fireEvent.click(button)
        const inputPassword = screen.getByRole('password-input')
        expect(inputPassword.getAttribute('type')).toBe('text')
    })
    
    test('Should redirect to "Dashboard" page when enter good credentials', async () => {
        setup(VITE_SOME_USER, 'email-input')
        setup(VITE_SOME_PASSWORD, 'password-input')
        const button: any = screen.getByText(/login/i)
        fireEvent.click(button)
        localStorage.setItem('login', 'true')
        cleanup()
        const queryClient = new QueryClient()
        
        render(
            <QueryClientProvider client={queryClient} >
                    <Router>
                        {localStorage.getItem('login') && <Dashboard />}
                    </Router>
            </QueryClientProvider>
        )
        await waitFor(() => expect(screen.getByRole(/loader/i)).toBeDefined()) 
        localStorage.clear()        
    })

})