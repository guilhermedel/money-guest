import { api } from "~/axios"
import type { IApiResponse } from "~/interface/service/ResponseRequest";
import type {
  IUserRegister,
  IUserResgisterResponse,
  IUserLogin,
  IUserLoginResponse, 
  IUserDataResponse,
  IUserData
} from "~/interface/pages/user"

const registerUser = async (
  card:  IUserRegister
): Promise<IApiResponse<IUserResgisterResponse>> => {
  try {
    const userResgisterResponse = await api.post<IUserRegister, IUserResgisterResponse>('usuarios/registro', card)
    
    if(userResgisterResponse !== undefined)
      return { error: null, data: userResgisterResponse }

    return { error: null, data: null}
  } catch(err) {
    return { error: err as Error, data: null }
  }
}

const userLogin = async(user: IUserLogin): Promise<IApiResponse<IUserLoginResponse>> =>{
  try {
    const userLoginResponse = await api.post<IUserLogin, IUserLoginResponse>('usuarios/login', user)
    
    if(userLoginResponse !== undefined)
      return { error: null, data:  userLoginResponse }

    return { error: null, data: null}
  } catch (err) {
    return { error: err as Error, data: null }
  }
}

const getUser = async(userId: string): Promise<IApiResponse<IUserDataResponse>> =>{
  try {
    const userDataResponse = await api.get<IUserDataResponse>(`usuarios/${userId}`)
    return { error: null, data: userDataResponse }
  } catch (err) {
    return { error: err as Error, data: null }
  }
}

const putUser = async(user: IUserData, userId: string): Promise<IApiResponse<null>> =>{
  try {
    const userLoginResponse = await api.put<IUserData, IUserData>(`usuarios/${userId}`, user)
    
    if(userLoginResponse !== undefined)
      return { error: null, data:  null }

    return { error: null, data: null}
  } catch (err) {
    return { error: err as Error, data: null }
  }
}

export default {
  registerUser,
  userLogin,
  getUser,
  putUser
};
