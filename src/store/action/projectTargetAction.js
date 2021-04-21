export const setProjectTarget = (data) => {
    return (dispatch) => {
        return dispatch({
            type: 'SET_PROJECT_TARGET',
            payload: data
        })
    }
}
