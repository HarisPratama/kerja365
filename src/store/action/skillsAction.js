export const setSkills = (data) => {
    return (dispatch) => {
        return dispatch({
            type: 'SET_SKILLS',
            payload: data
        })
    }
}

export const addSkill = (data) => {
    return (dispatch) => {
        return dispatch({
            type: 'ADD_SKILL',
            payload: data
        })
    }
}
