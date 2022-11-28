import { IUser } from "./IUser";

export type ActionType = 
   | { type: "SIGN_IN", payload: IUser }
   | { type: "SIGN_OUT", payload: undefined }
   | { type: "GET_COMMENTS", payload: any }
   | { type: "OPEN_COMMENT", payload: any }