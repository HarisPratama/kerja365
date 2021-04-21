export const setNews = (data) => {
    return (dispatch) => {
        return dispatch({
            type: 'SET_NEWS',
            payload: data
        })
    }
}
