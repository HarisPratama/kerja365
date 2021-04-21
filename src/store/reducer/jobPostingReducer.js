import instance from "../../config/axios"

const initialState = {
    JobPosting: [],
    Projects: [],
    ProjectTargets: [],
    Target: {}
}

export default function jobPostingReducer(state = initialState, action) {
    switch (action.type) {
        case 'SET_JOB_POSTING':
            return { ...state, JobPosting: action.payload }
        case 'SET_PROJECTS':
            return { ...state, Projects: action.payload }
        case 'SET_PROJECT_TARGETS':
            return { ...state, ProjectTargets: action.payload }
        case 'SET_TARGET':
            return { ...state, Target: action.payload }
        case 'ADD_JOB_POSTING':
            const addNewJobPost = state.JobPosting.concat(action.payload)
            return { ...state, JobPosting: addNewJobPost }
        default:
            return state
    }
}

export function fetchJobPosting(token) {
    return async (dispatch) => {
        const { data } = await instance.get('/job', {
            headers: {
                access_token: token
            }
        })
        dispatch({ type: 'SET_JOB_POSTING', payload: data })
    }
}
