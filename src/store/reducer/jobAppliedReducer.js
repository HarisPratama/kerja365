import instance from "../../config/axios"

const initialState = {
    Applications: [],
    Application: []
}

export default function jobAppliedReducer(state = initialState, action) {
    switch (action.type) {
        case 'SET_APPLICATIONS':
            return { ...state, Applications: action.payload }
        case 'SET_APPLICATION':
            return { ...state, Application: action.payload }
        default:
            return state
    }
}

export function fetchApplications(token) {
    return async (dispatch) => {
        const { data } = await instance.get('/application', {
            headers: {
                access_token: token
            }
        })
        dispatch({ type: 'SET_APPLICATIONS', payload: data })
    }
}

export function fetchApplication(token, jobId) {
    return async (dispatch) => {
        const { data } = await instance.get(`/application/applied/${jobId}`, {
            headers: {
                access_token: token
            }
        })
        dispatch({ type: 'SET_APPLICATION', payload: data })
    }
}
