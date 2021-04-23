import instance from "../../config/axios"

const initialState = {
    Projects: [],
    Project: {}
}

export default function jobsReducer(state = initialState, action) {
    switch (action.type) {
        case 'SET_PROJECTS':
            return { ...state, Projects: action.payload }
        case 'SET_PROJECT':
            return { ...state, Project: action.payload }
        default:
            return state
    }
}

export function fetchprojects(token) {
    return async (dispatch) => {
        const { data } = await instance.get('/project', {
            headers: {
                access_token: token
            }
        })
        dispatch({ type: 'SET_PROJECTS', payload: data })
    }
}

export function fetchproject(id, token) {
    return async (dispatch) => {
        const { data } = await instance.get(`/project/${id}`, {
            headers: {
                access_token: token
            }
        })
        dispatch({ type: 'SET_PROJECT', payload: data })
    }
}
