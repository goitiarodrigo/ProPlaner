import { ActionType } from '@/interfaces/ActionType'
import { IComment } from '@/interfaces/IComments';
import { IUser } from '@/interfaces/IUser'
import { ICommentState } from '@/reducer/DataReducer';
import { createContext } from 'react'

interface IContext {
    handleLogin: (userData: IUser) => Promise<any>,
    dispatch: React.Dispatch<ActionType>,
    allComments: IComment[],
    findedComments: IComment
}

export const Context = createContext<IContext>({} as IContext)