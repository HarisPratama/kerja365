import instance from '../../config/axios';

const initialState = {
    Jobs: [],
    Job: {}
}

export default function jobsReducer(state = initialState, action) {
    switch (action.type) {
        case 'SET_JOBS':
            return { ...state, Jobs: action.payload }
        case 'SET_JOB':
            return { ...state, Job: action.payload }
        default:
            return state
    }
}


export function fetchJobs(token) {
    return async (dispatch) => {
        const { data } = await instance.get('/job', {
            headers: {
                access_token: token
            }
        })
        dispatch({ type: 'SET_JOBS', payload: data })
    }
}

export function fetchJob(id, token) {
    return async (dispatch) => {
        const { data } = await instance.get(`/job/${id}`, {
            headers: {
                access_token: token
            }
        })
        dispatch({ type: 'SET_JOB', payload: data })
    }
}
