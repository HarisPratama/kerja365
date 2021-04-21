import instance from "../../config/axios"

const initialState = {
    User: {},
    Message: '',
    Token: '',
    Fulltimers: [],
    Freelancers: [],
    Jobseeker: {},
    GetUser: {},
    GetCv: {}
}

export default function userReducer(state = initialState, action) {
    switch (action.type) {
        case 'SET_USER':
            return { ...state, User: action.payload }
        case 'SET_MESSAGE':
            return { ...state, Message: action.payload }
        case 'SET_TOKEN':
            return { ...state, Token: action.payload }
        case 'SET_FULLTIMERS':
            return { ...state, Fulltimers: action.payload }
        case 'SET_FREELANCERS':
            return { ...state, Freelancers: action.payload }
        case 'SET_JOBSEEKER':
            return { ...state, Jobseeker: action.payload }
        case 'GET_USER':
            return { ...state, GetUser: action.payload }
        case 'GET_CV':
            return { ...state, GetCv: action.payload }
        default:
            return state
    }
}

export function updatePatchUser(id, payload) {
    return async (dispatch) => {
        try {
            const { data } = await instance.patch(`/user/${id}`, { interestCategory: payload })
            dispatch({ type: 'SET_MESSAGE', payload: 'success' })
        } catch (error) {
            dispatch({ type: 'SET_MESSAGE', payload: 'error' })
        }
    }
}

export function fetchUser(id, token) {
    return async (dispatch) => {
        try {
            const { data } = await instance.get(`/user/${id}`, {
                headers: {
                    access_token: token
                }
            })
            dispatch({ type: 'SET_USER', payload: data })
        } catch (error) {
            dispatch({ type: 'SET_MESSAGE', payload: 'error' })
        }
    }
}

export function fetchUserByEmail(email) {
    return async (dispatch) => {
        try {
            const { data } = await instance.get(`/user/email/${email}`)
            dispatch({ type: 'SET_USER', payload: data })
        } catch (error) {
            dispatch({ type: 'SET_MESSAGE', payload: error.message })
        }
    }
}

export function fetchUserByPhoneNumber(phoneNumber, token) {
    return async (dispatch) => {
        const { data } = await instance.get(`/user/phone-number/${phoneNumber}`, {
            headers: {
                access_token: token
            }
        })
        dispatch({ type: 'GET_USER', payload: data })
    }
}

export function fetchFulltimers(token) {
    return async (dispatch) => {
        try {
            const { data } = await instance.get(`/user/type/fulltimer`, {
                headers: {
                    access_token: token
                }
            })
            dispatch({ type: 'SET_FULLTIMERS', payload: data })
        } catch (error) {
            dispatch({ type: 'SET_MESSAGE', payload: error.message })
        }
    }
}

export function fetchFreelancers(token) {
    return async (dispatch) => {
        try {
            const { data } = await instance.get(`/user/type/freelancer`, {
                headers: {
                    access_token: token
                }
            })
            dispatch({ type: 'SET_FREELANCERS', payload: data })
        } catch (error) {
            dispatch({ type: 'SET_MESSAGE', payload: error.message })
        }
    }
}

export function fetchJobseeker(id, token) {
    return async (dispatch) => {
        try {
            const { data } = await instance.get(`/user/${id}`, {
                headers: {
                    access_token: token
                }
            })
            dispatch({ type: 'SET_JOBSEEKER', payload: data })
        } catch (error) {
            dispatch({ type: 'SET_MESSAGE', payload: error.message })
        }
    }
}

export function fetchGetUser(token, id) {
    return async (dispatch) => {
        const { data } = await instance.get(`/user/${id}`, {
            headers: {
                access_token: token
            }
        })
        dispatch({ type: 'GET_USER', payload: data })
    }
}

export function fetchGetCv(token, id) {
    return async (dispatch) => {
        try {
            const { data } = await instance.get(`/get-cv/${id}`, {
                headers: {
                    access_token: token
                }
            })
            if (data) {
                dispatch({ type: 'GET_CV', payload: data })
            } else throw { message: 'CV Not found' }
        } catch (error) {
            dispatch({ type: 'SET_MESSAGE', payload: error.message })
        }
    }
}
