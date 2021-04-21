export const setJobs = (data) => {
    return (dispatch) => {
        return dispatch({
            type: 'SET_JOBS',
            payload: data
        })
    }
}
