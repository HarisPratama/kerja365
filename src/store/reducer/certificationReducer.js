import instance from "../../config/axios"

const initialState = {
    Certifications: [],
    Certification: {}
}

export default function certificationReducer(state = initialState, action) {
    switch (action.type) {
        case 'SET_CERTIFICATIONS':
            return { ...state, Certifications: action.payload }
        case 'SET_CERTIFICATION':
            return { ...state, Certification: action.payload }
        case 'ADD_CERTIFICATION':
            const newCertification = state.Certifications.concat(action.payload)
            return { ...state, Certifications: newCertification }
        default:
            return state
    }
}

export function fetchCertifications(token) {
    return async (dispatch) => {
        const { data } = await instance.get('/user/fulltime/certification', {
            headers: {
                access_token: token
            }
        })
        dispatch({ type: 'SET_CERTIFICATIONS', payload: data })
    }
}

export function fetchCertification(token, id) {
    return async (dispatch) => {
        const { data } = await instance.get(`/user/fulltime/certification/${id}`, {
            headers: {
                access_token: token
            }
        })
        dispatch({ type: 'SET_CERTIFICATION', payload: data })
    }
}
