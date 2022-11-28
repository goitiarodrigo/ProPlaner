import { ActionType } from "@/interfaces/ActionType";
import { IComment } from "@/interfaces/IComments";

export interface ICommentState {
    allComments: IComment[]
    findedComment?: IComment
}

export const commentState: ICommentState = {
    allComments: [],
    findedComment: {
        id: '',
        name: '',
        email: '',
        body: '',
    }
}

export const DataReducer = (state: ICommentState, action: ActionType) => {
    switch (action.type) {
        case "GET_COMMENTS":
            return {
                ...state,
                allComments: action.payload
            }
        case "OPEN_COMMENT":
            return {
                ...state,
                findedComment: state.allComments.find(element => element.id === action.payload)
            }
        default:
            return state
    }
}