import { Provider } from "@/context/Provider"
import Login from "@/pages/Login/Login"
import { cleanup, fireEvent, render, screen } from "@testing-library/react"
import { BrowserRouter as Router } from "react-router-dom"
import NavBar from "./NavBar"

describe('NavBar', () => {
    beforeEach(() => {
        render(
            <Router>
                <Provider>
                    <NavBar />
                </Provider>
            </Router>
        )
    })

    test('Should exists user profile photo', () => {
        expect(screen.getByRole(/profile-photo/i)).toBeDefined()
    })

    test('Should close session when clicked on "LOG OUT" and redirect to Login page', () => {
        const openUserMenu = screen.getByRole(/open-menu/i)
        fireEvent.click(openUserMenu)
        expect(screen.getByRole(/modal-menu/i)).toBeDefined()
        const buttonToCloseSession = screen.getByRole(/close-session/i)
        fireEvent.click(buttonToCloseSession)
        expect(screen.queryByRole(/modal-menu/i)).toBeNull()
    })
})