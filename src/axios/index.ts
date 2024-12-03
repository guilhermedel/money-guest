import axios from "axios"

const url = 'https://finance-api-xi.vercel.app/'

const urlInstance = axios.create({
  baseURL: url + 'api/',
})

urlInstance.interceptors.request.use(
  function(config) {
    const token = window.localStorage.token
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    if (config.method === 'post' && !config.url?.includes('/login')) {
      if (config.data && typeof config.data === 'object') {
        config.data.userId = localStorage.getItem('userId')
      }
    }

    return config
  },
  function(error) {
    return Promise.reject(error)
  }
)

export const api = {
  async get<typeResponse>(endpoint: string): Promise<typeResponse> {
    try {
      const response = await urlInstance.get<typeResponse>(endpoint)
      return response.data
    } catch(err) {
      if (axios.isAxiosError(err)) {
        const errorMessage = err.response?.data?.message || 'Erro desconhecido'
        const status = err.response?.status
        const customError = new Error(errorMessage) as { status?: number, message: string }
        customError.status = status
        throw customError
      }
      throw new Error('Erro desconhecido ao realizar a requisição');
    }
  },

  async post<typeBody, typeResponse>(endpoint: string, body: typeBody): Promise<typeResponse | undefined> {
    try {
      const response = await urlInstance.post<typeResponse>(endpoint, body)
      return response.data
    } catch (err) {
      if (axios.isAxiosError(err)) {
        const errorMessage = err.response?.data?.message || 'Erro desconhecido'
        const status = err.response?.status
        const customError = new Error(errorMessage) as { status?: number, message: string }
        customError.status = status
        throw customError
      }
      throw new Error('Erro desconhecido ao realizar a requisição');
    }
  },
  

  async put<typeBody, typeResponse>(endpoint: string, body: typeBody): Promise<typeResponse> {
    try {
      const response = await urlInstance.put<typeResponse>(endpoint, body)
      return response.data
    } catch(err) {
      if (axios.isAxiosError(err)) {
        const errorMessage = err.response?.data?.message || 'Erro desconhecido'
        const status = err.response?.status
        const customError = new Error(errorMessage) as { status?: number, message: string }
        customError.status = status
        throw customError
      }
      throw new Error('Erro desconhecido ao realizar a requisição');
    }
  },

  async delete(endpoint: string): Promise<void> {
    try {
      await urlInstance.delete(endpoint)
    } catch(err) {
      if (axios.isAxiosError(err)) {
        const errorMessage = err.response?.data?.message || 'Erro desconhecido'
        const status = err.response?.status
        const customError = new Error(errorMessage) as { status?: number, message: string }
        customError.status = status
        throw customError
      }
      throw new Error('Erro desconhecido ao realizar a requisição');
    }
  },

  async login<typeBody, typeResponse>(body: typeBody): Promise<typeResponse> {
    const response = await axios.post<typeResponse>(url + 'jwt-auth/v1/token', body)
    return response.data
  },

  async validateToken(): Promise<void> {
    await urlInstance.post(url + 'jwt-auth/v1/token/validate')
  },
}
