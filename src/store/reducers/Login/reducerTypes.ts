import { IUser } from "../../../models/IUsers";


export interface stateType  {
    isAuth: boolean,
    user: IUser,
    isLoading: boolean,
    error: string,
    
}