import instance from '../../config/axios'

const initialState = {
    Applicants: [],
    Applicant: {}
}

export default function applicantReducer(state = initialState, action) {
    switch (action.type) {
        case 'SET_APPLICANTS':
            return { ...state, Applicants: action.payload }
        case 'SET_APPLICANT':
            return { ...state, Applicant: action.payload }
        default:
            return state
    }
}

export function fetchApplicants(token) {
    return async (dispatch) => {
        const { data } = await instance.get('/application', {
            headers: {
                access_token: token
            }
        })
        dispatch({ type: 'SET_APPLICANTS', payload: data })
    }
}

export function fetchApplicant(id, token) {
    return async (dispatch) => {
        const { data } = await instance.get(`/application/${id}`, {
            headers: {
                access_token: token
            }
        })
        dispatch({ type: 'SET_APPLICANT', payload: data })
    }
}
