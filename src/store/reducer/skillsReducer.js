import instance from "../../config/axios"

const initialState = {
    Skills: []
}

export default function skillsReducer(state = initialState, action) {
    switch (action.type) {
        case 'SET_SKILLS':
            return { ...state, Skills: action.payload }
        case 'ADD_SKILL':
            const newSkill = state.Skills.concat(action.payload)
            return { ...state, Skills: newSkill }
        default:
            return state
    }
}

export function fetchSkills(token) {
    return async (dispatch) => {
        const { data } = await instance.get('/skill', {
            headers: {
                access_token: token
            }
        })
        dispatch({ type: 'SET_SKILLS', payload: data })
    }
}
