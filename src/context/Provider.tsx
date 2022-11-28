import { IUser } from '@/interfaces/IUser'
import { commentState, DataReducer } from '@/reducer/DataReducer'
import { initialState, UserReducer } from '@/reducer/UserReducer'
import { ValidateLogin } from '@/utils/ValidateLogin'
import { useReducer } from 'react'
import { Context } from './Context'

interface IProps {
    children: JSX.Element | JSX.Element[]
}

export const Provider = ({children}: IProps) => {

    const [stateReducer, dispatch] = useReducer(DataReducer, commentState)
    const [_, dispatchUser] = useReducer(UserReducer, initialState)

    const handleLogin = async (userData: IUser) => {
        const { email, password } = userData
        try {
            const response: any = await ValidateLogin(email!, password!)
            dispatchUser({type: 'SIGN_IN', payload: response})
            return response
        } catch (error) {
            return error
        }
    }

    return (
        <Context.Provider value={{
            handleLogin,
            dispatch,
            allComments: stateReducer.allComments,
            findedComments: stateReducer.findedComment!
        }}>
            {children}
        </Context.Provider>
    )
}