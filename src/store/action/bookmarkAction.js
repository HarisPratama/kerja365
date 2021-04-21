export const bookmarkJob = (data) => {
    return (dispatch) => {
        return dispatch({
            type: 'BOOKMARK_JOB',
            payload: data
        })
    }
}
