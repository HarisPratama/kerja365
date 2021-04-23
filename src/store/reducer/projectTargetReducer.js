import instance from "../../config/axios"

const initialState = {
    Targets: [],
    Comments: []
}

export default function projectTargetReducer(state = initialState, action) {
    switch (action.type) {
        case 'SET_PROJECT_TARGETS':
            return { ...state, Targets: action.payload }
        case 'SET_COMMENTS':
            return { ...state, Comments: action.payload }
        default:
            return state
    }
}


export function fetchTargets(token, jobId) {
    return async (dispatch) => {
        const { data } = await instance.get(`job/${jobId}/target`, {
            headers: {
                access_token: token
            }
        })
        dispatch({ type: 'SET_PROJECT_TARGETS', payload: data })
    }
}

export function fetchComments(token, targetId) {
    return async (dispatch) => {
        const { data } = await instance.get(`/comment-target/${targetId}`, {
            headers: {
                access_token: token
            }
        })
        dispatch({ type: 'SET_COMMENTS', payload: data })
    }
}
