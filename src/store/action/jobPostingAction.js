export const setJobPosting = (data) => {
    return (dispatch) => {
        return dispatch({
            type: 'SET_JOB_POSTING',
            payload: data
        })
    }
}

export const addJobPosting = (data) => {
    return (dispatch) => {
        return dispatch({
            type: 'ADD_JOB_POSTING',
            payload: data
        })
    }
}
