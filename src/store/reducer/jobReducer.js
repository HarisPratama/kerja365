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