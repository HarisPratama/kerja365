export const addExperience = (data) => {
    return (dispatch) => {
      return dispatch({
        type: 'ADD_EXPERIENCE',
        payload: data
      })
    }
  }
  