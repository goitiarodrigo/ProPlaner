import { ActionType } from "@/interfaces/ActionType"
import { IUser } from "@/interfaces/IUser"

export const initialState: IUser = {
    name: '',
    profilePhoto: ''
}

export const UserReducer = (state: IUser, action: ActionType) => {
    switch (action.type) {
        case "SIGN_IN":
            localStorage.setItem('login', 'true')
            localStorage.setItem('name', action.payload.name!)
            localStorage.setItem('profilePhoto', action.payload.profilePhoto!)
            return {
                ...state,
                name: localStorage.getItem('name')!,
                profilePhoto: localStorage.getItem('profilePhoto')!
            }
        case "SIGN_OUT":
            localStorage.clear()
            return state
        default :
            return state
    }
}