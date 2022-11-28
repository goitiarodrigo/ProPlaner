import { IUser } from "@/interfaces/IUser";
import { ValidateLogin } from "@/utils/ValidateLogin";

export const handleLogin = async (payload: IUser) => {
    const response = await ValidateLogin(payload.email!, payload.password!)
    return response
}